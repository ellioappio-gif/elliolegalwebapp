import { NextRequest } from 'next/server'
import { AI_CONFIG } from '@/lib/ai/config'
import { verifyAuth, getPlanLimits } from '@/lib/ai/auth-middleware'
import { aiChatLimiter } from '@/lib/ai/rate-limiter'
import { logUsage } from '@/lib/ai/usage-tracker'
import { validateMessages } from '@/lib/ai/input-validator'
import { moderateInput, moderateOutput, ensureLegalDisclaimer } from '@/lib/ai/moderation'
import { withAnthropicRetry } from '@/lib/ai/retry'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  let userId = 'anonymous'
  let inputTokens = 0
  let outputTokens = 0

  try {
    // 1. Authentication check
    const auth = await verifyAuth(request)
    if (!auth.authenticated || !auth.user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required', code: 'UNAUTHORIZED' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    userId = auth.user.id
    const planLimits = getPlanLimits(auth.user.plan)

    // 2. Rate limiting
    const rateLimitResult = aiChatLimiter.check(userId)
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded', 
          code: 'RATE_LIMITED',
          retryAfter: rateLimitResult.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil((rateLimitResult.retryAfter || 60000) / 1000)),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          } 
        }
      )
    }

    // 3. Parse and validate request body
    const body = await request.json()
    const { messages, context = 'legalAssistant' } = body

    // 4. Input validation
    const validationResult = validateMessages(messages, planLimits.maxConversationLength)
    if (validationResult.blocked) {
      return new Response(
        JSON.stringify({ 
          error: validationResult.reason || 'Invalid input', 
          code: 'INVALID_INPUT' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const validatedMessages = JSON.parse(validationResult.sanitized)

    // 5. Content moderation (input)
    const lastUserMessage = validatedMessages.filter((m: { role: string }) => m.role === 'user').pop()
    if (lastUserMessage) {
      const inputModeration = moderateInput(lastUserMessage.content)
      if (inputModeration.blocked) {
        return new Response(
          JSON.stringify({ 
            error: inputModeration.reason || 'Content blocked', 
            code: 'CONTENT_BLOCKED' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    // 6. Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured', code: 'SERVICE_ERROR' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const systemPrompt = AI_CONFIG.systemPrompts[context as keyof typeof AI_CONFIG.systemPrompts]
    const model = process.env.ANTHROPIC_MODEL || AI_CONFIG.model

    // 7. Create streaming response with retry logic
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await withAnthropicRetry(async () => {
            return fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
              },
              body: JSON.stringify({
                model,
                max_tokens: Math.min(planLimits.maxTokensPerRequest, AI_CONFIG.maxTokens),
                temperature: AI_CONFIG.temperature,
                system: systemPrompt,
                stream: true,
                messages: validatedMessages.map((msg: { role: string; content: string }) => ({
                  role: msg.role,
                  content: msg.content,
                })),
              }),
            })
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: errorData.error?.message || 'API error' })}\n\n`))
            controller.close()
            return
          }

          const reader = response.body?.getReader()
          if (!reader) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'No response stream' })}\n\n`))
            controller.close()
            return
          }

          const decoder = new TextDecoder()
          let fullContent = ''
          let buffer = ''

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') continue

                try {
                  const parsed = JSON.parse(data)
                  
                  // Handle different event types
                  if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                    fullContent += parsed.delta.text
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`))
                  } else if (parsed.type === 'message_start' && parsed.message?.usage) {
                    inputTokens = parsed.message.usage.input_tokens || 0
                  } else if (parsed.type === 'message_delta' && parsed.usage) {
                    outputTokens = parsed.usage.output_tokens || 0
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }

          // 8. Content moderation (output)
          const outputModeration = moderateOutput(fullContent)
          if (outputModeration.filtered) {
            // Response was modified by moderation
            console.log('[Moderation] Output was filtered')
          }

          // 9. Ensure legal disclaimer
          const finalContent = ensureLegalDisclaimer(outputModeration.filtered || fullContent)
          
          // Send final message with usage info
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            done: true, 
            usage: { inputTokens, outputTokens },
            model 
          })}\n\n`))

          // 10. Log usage
          logUsage({
            userId,
            endpoint: 'stream',
            inputTokens,
            outputTokens,
            model,
            cached: false,
            latencyMs: Date.now() - startTime,
            success: true,
          })

          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`))
          
          // Log failed usage
          logUsage({
            userId,
            endpoint: 'stream',
            inputTokens: 0,
            outputTokens: 0,
            model: AI_CONFIG.model,
            cached: false,
            latencyMs: Date.now() - startTime,
            success: false,
            errorCode: 'STREAM_ERROR',
          })
          
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-RateLimit-Remaining': String(rateLimitResult.remaining),
      },
    })
  } catch (error) {
    console.error('Streaming endpoint error:', error)
    
    // Log failed usage
    logUsage({
      userId,
      endpoint: 'stream',
      inputTokens: 0,
      outputTokens: 0,
      model: AI_CONFIG.model,
      cached: false,
      latencyMs: Date.now() - startTime,
      success: false,
      errorCode: 'INTERNAL_ERROR',
    })

    return new Response(
      JSON.stringify({ error: 'Internal server error', code: 'INTERNAL_ERROR' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
