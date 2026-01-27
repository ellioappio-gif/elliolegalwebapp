import { NextRequest, NextResponse } from 'next/server'
import { AI_CONFIG } from '@/lib/ai/config'
import { verifyAuth, getPlanLimits } from '@/lib/ai/auth-middleware'
import { aiAskLimiter } from '@/lib/ai/rate-limiter'
import { logUsage, checkUsageQuota } from '@/lib/ai/usage-tracker'
import { validateInput } from '@/lib/ai/input-validator'
import { moderateInput, moderateOutput, ensureLegalDisclaimer, checkLegalContext } from '@/lib/ai/moderation'
import { faqCache } from '@/lib/ai/cache'
import { withAnthropicRetry } from '@/lib/ai/retry'
import type { AskRequest, AskResponse, AIError } from '@/lib/ai/types'

const categoryContextMap: Record<string, keyof typeof AI_CONFIG.systemPrompts> = {
  general: 'generalLegal',
  contracts: 'contractAnalysis',
  rights: 'legalAssistant',
  business: 'legalAssistant',
}

export async function POST(request: NextRequest): Promise<NextResponse<AskResponse | AIError>> {
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

    // 2. Check usage quota
    const quotaCheck = checkUsageQuota(userId, auth.user.plan || 'free')
    if (!quotaCheck.withinQuota) {
      return NextResponse.json(
        { 
          error: 'Daily usage limit exceeded. Please upgrade your plan or try again tomorrow.', 
          code: 'QUOTA_EXCEEDED',
        },
        { status: 429 }
      )
    }

    // 3. Rate limiting
    const rateLimitResult = aiAskLimiter.check(userId)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please wait before asking another question.', 
          code: 'RATE_LIMITED',
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.retryAfter || 60000) / 1000)),
          }
        }
      )
    }

    // 4. Parse request
    const body: AskRequest = await request.json()
    const { question, category = 'general' } = body

    // 5. Input validation
    const validationResult = validateInput(question, 2000)
    if (validationResult.blocked) {
      return NextResponse.json(
        { error: validationResult.reason || 'Invalid question', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    const sanitizedQuestion = validationResult.sanitized

    // 6. Content moderation (input)
    const inputModeration = moderateInput(sanitizedQuestion)
    if (inputModeration.blocked) {
      return NextResponse.json(
        { error: inputModeration.reason || 'Question not allowed', code: 'CONTENT_BLOCKED' },
        { status: 400 }
      )
    }

    // 7. Check FAQ cache
    const cached = faqCache.get(sanitizedQuestion, category)
    if (cached) {
      logUsage({
        userId,
        endpoint: 'ask',
        inputTokens: 0,
        outputTokens: 0,
        model: cached.model,
        category,
        cached: true,
        latencyMs: Date.now() - startTime,
        success: true,
      })

      return NextResponse.json({
        question: sanitizedQuestion,
        answer: cached.content,
        confidence: 0.95,
        model: cached.model,
      })
    }

    // 8. Get API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured', code: 'MISSING_API_KEY' },
        { status: 500 }
      )
    }

    const contextKey = categoryContextMap[category] || 'generalLegal'
    const systemPrompt = AI_CONFIG.systemPrompts[contextKey]
    const model = process.env.ANTHROPIC_MODEL || AI_CONFIG.model

    // 9. Call Anthropic API with retry logic
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
          max_tokens: planLimits.maxTokensPerRequest,
          temperature: 0.5,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: `Category: ${category}\n\nQuestion: ${sanitizedQuestion}`,
            },
          ],
        }),
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Anthropic API error:', errorData)
      
      logUsage({
        userId,
        endpoint: 'ask',
        inputTokens: 0,
        outputTokens: 0,
        model,
        category,
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
    let answer = data.content[0]?.text || ''

    // 10. Content moderation (output)
    const outputModeration = moderateOutput(answer)
    if (outputModeration.filtered) {
      answer = outputModeration.filtered
    }

    // 11. Check legal context appropriateness
    const legalCheck = checkLegalContext(answer)
    if (!legalCheck.appropriate) {
      console.warn('[Legal Check] Warnings:', legalCheck.warnings)
    }

    // 12. Ensure legal disclaimer
    answer = ensureLegalDisclaimer(answer)

    // 13. Calculate confidence score
    const confidence = calculateConfidence(answer, legalCheck.appropriate)

    // 14. Cache the response
    faqCache.set(sanitizedQuestion, answer, data.model, category)

    // 15. Log usage
    const inputTokens = data.usage?.input_tokens || 0
    const outputTokens = data.usage?.output_tokens || 0
    
    logUsage({
      userId,
      endpoint: 'ask',
      inputTokens,
      outputTokens,
      model: data.model,
      category,
      cached: false,
      latencyMs: Date.now() - startTime,
      success: true,
    })

    return NextResponse.json({
      question: sanitizedQuestion,
      answer,
      confidence,
      model: data.model,
    })
  } catch (error) {
    console.error('AI ask error:', error)
    
    logUsage({
      userId,
      endpoint: 'ask',
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

function calculateConfidence(answer: string, contextAppropriate: boolean): number {
  let confidence = 0.85

  if (answer.length > 500) confidence += 0.05
  if (answer.length > 1000) confidence += 0.03

  const hedgingPhrases = ['might', 'may', 'possibly', 'uncertain', 'not sure', 'consult']
  const lowerAnswer = answer.toLowerCase()
  for (const phrase of hedgingPhrases) {
    if (lowerAnswer.includes(phrase)) {
      confidence -= 0.02
    }
  }

  if (!contextAppropriate) {
    confidence -= 0.1
  }

  return Math.min(0.98, Math.max(0.6, confidence))
}
