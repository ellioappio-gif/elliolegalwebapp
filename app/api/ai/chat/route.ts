import { NextRequest, NextResponse } from 'next/server'
import { AI_CONFIG } from '@/lib/ai/config'
import { verifyAuth, getPlanLimits } from '@/lib/ai/auth-middleware'
import { aiChatLimiter } from '@/lib/ai/rate-limiter'
import { logUsage } from '@/lib/ai/usage-tracker'
import { validateMessages } from '@/lib/ai/input-validator'
import { moderateInput, moderateOutput, ensureLegalDisclaimer } from '@/lib/ai/moderation'
import { aiResponseCache } from '@/lib/ai/cache'
import { withAnthropicRetry } from '@/lib/ai/retry'
import type { AIRequest, AIResponse, AIError } from '@/lib/ai/types'

export async function POST(request: NextRequest): Promise<NextResponse<AIResponse | AIError>> {
  const startTime = Date.now()
  let userId = 'anonymous'

  try {
    // 1. Authentication check
    const auth = await verifyAuth(request)
    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }
    userId = auth.user.id
    const planLimits = getPlanLimits(auth.user.plan)

    // 2. Rate limiting
    const rateLimitResult = aiChatLimiter.check(userId)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please wait before sending more requests.', 
          code: 'RATE_LIMITED',
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.retryAfter || 60000) / 1000)),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          }
        }
      )
    }

    // 3. Parse request
    const body: AIRequest = await request.json()
    const { messages, context = 'legalAssistant', maxTokens, temperature } = body

    // 4. Input validation
    const validationResult = validateMessages(messages, planLimits.maxConversationLength)
    if (validationResult.blocked) {
      return NextResponse.json(
        { error: validationResult.reason || 'Invalid input', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    const validatedMessages = JSON.parse(validationResult.sanitized)

    // 5. Content moderation (input)
    const lastUserMessage = validatedMessages.filter((m: { role: string }) => m.role === 'user').pop()
    if (lastUserMessage) {
      const inputModeration = moderateInput(lastUserMessage.content)
      if (inputModeration.blocked) {
        return NextResponse.json(
          { error: inputModeration.reason || 'Content not allowed', code: 'CONTENT_BLOCKED' },
          { status: 400 }
        )
      }
    }

    // 6. Check cache (only for single-turn conversations)
    if (validatedMessages.length === 1 && lastUserMessage) {
      const cached = aiResponseCache.get(lastUserMessage.content, context)
      if (cached) {
        logUsage({
          userId,
          endpoint: 'chat',
          inputTokens: 0,
          outputTokens: 0,
          model: cached.model,
          cached: true,
          latencyMs: Date.now() - startTime,
          success: true,
        })

        return NextResponse.json({
          content: cached.content,
          usage: { inputTokens: 0, outputTokens: 0 },
          model: cached.model,
        })
      }
    }

    // 7. Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured', code: 'MISSING_API_KEY' },
        { status: 500 }
      )
    }

    const systemPrompt = AI_CONFIG.systemPrompts[context as keyof typeof AI_CONFIG.systemPrompts]
    const model = process.env.ANTHROPIC_MODEL || AI_CONFIG.model

    // 8. Call Anthropic API with retry logic
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
          max_tokens: Math.min(maxTokens || planLimits.maxTokensPerRequest, AI_CONFIG.maxTokens),
          temperature: temperature ?? AI_CONFIG.temperature,
          system: systemPrompt,
          messages: validatedMessages.map((msg: { role: string; content: string }) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Anthropic API error:', errorData)
      
      logUsage({
        userId,
        endpoint: 'chat',
        inputTokens: 0,
        outputTokens: 0,
        model,
        cached: false,
        latencyMs: Date.now() - startTime,
        success: false,
        errorCode: 'API_ERROR',
      })

      return NextResponse.json(
        { 
          error: 'AI service error', 
          code: 'API_ERROR',
          details: errorData.error?.message || 'Unknown error'
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    let content = data.content[0]?.text || ''

    // 9. Content moderation (output)
    const outputModeration = moderateOutput(content)
    if (outputModeration.filtered) {
      content = outputModeration.filtered
    }

    // 10. Ensure legal disclaimer
    content = ensureLegalDisclaimer(content)

    // 11. Cache the response (only for single-turn)
    if (validatedMessages.length === 1 && lastUserMessage) {
      aiResponseCache.set(lastUserMessage.content, content, data.model, context)
    }

    // 12. Log usage
    const inputTokens = data.usage?.input_tokens || 0
    const outputTokens = data.usage?.output_tokens || 0
    
    logUsage({
      userId,
      endpoint: 'chat',
      inputTokens,
      outputTokens,
      model: data.model,
      cached: false,
      latencyMs: Date.now() - startTime,
      success: true,
    })

    return NextResponse.json({
      content,
      usage: {
        inputTokens,
        outputTokens,
      },
      model: data.model,
    })
  } catch (error) {
    console.error('AI chat error:', error)
    
    logUsage({
      userId,
      endpoint: 'chat',
      inputTokens: 0,
      outputTokens: 0,
      model: AI_CONFIG.model,
      cached: false,
      latencyMs: Date.now() - startTime,
      success: false,
      errorCode: 'INTERNAL_ERROR',
    })

    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
