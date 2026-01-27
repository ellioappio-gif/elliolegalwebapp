// Retry Logic - Auto-retry on temporary API failures with exponential backoff

export interface RetryConfig {
  maxRetries: number
  initialDelayMs: number
  maxDelayMs: number
  backoffMultiplier: number
  retryableStatusCodes: number[]
  retryableErrors: string[]
}

const DEFAULT_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
  retryableStatusCodes: [429, 500, 502, 503, 504],
  retryableErrors: [
    'ECONNRESET',
    'ETIMEDOUT',
    'ENOTFOUND',
    'overloaded',
    'rate_limit',
  ],
}

/**
 * Sleep for a given duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Calculate delay with exponential backoff and jitter
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
  const exponentialDelay = config.initialDelayMs * Math.pow(config.backoffMultiplier, attempt)
  const cappedDelay = Math.min(exponentialDelay, config.maxDelayMs)
  // Add jitter (±25%) to prevent thundering herd
  const jitter = cappedDelay * 0.25 * (Math.random() * 2 - 1)
  return Math.round(cappedDelay + jitter)
}

/**
 * Check if an error is retryable
 */
function isRetryable(
  error: Error | Response,
  config: RetryConfig
): boolean {
  // Check HTTP response status codes
  if (error instanceof Response) {
    return config.retryableStatusCodes.includes(error.status)
  }

  // Check error messages/codes
  const errorMessage = error.message.toLowerCase()
  return config.retryableErrors.some(
    (retryableError) => errorMessage.includes(retryableError.toLowerCase())
  )
}

/**
 * Execute a function with retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const fullConfig = { ...DEFAULT_CONFIG, ...config }
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= fullConfig.maxRetries; attempt++) {
    try {
      const result = await fn()
      
      // If result is a Response, check if it's an error that should be retried
      if (result instanceof Response && !result.ok) {
        if (isRetryable(result, fullConfig) && attempt < fullConfig.maxRetries) {
          const delay = calculateDelay(attempt, fullConfig)
          console.log(`[Retry] Attempt ${attempt + 1} failed with status ${result.status}. Retrying in ${delay}ms...`)
          await sleep(delay)
          continue
        }
      }
      
      return result
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < fullConfig.maxRetries && isRetryable(lastError, fullConfig)) {
        const delay = calculateDelay(attempt, fullConfig)
        console.log(`[Retry] Attempt ${attempt + 1} failed: ${lastError.message}. Retrying in ${delay}ms...`)
        await sleep(delay)
        continue
      }

      throw lastError
    }
  }

  throw lastError || new Error('Max retries exceeded')
}

/**
 * Retry wrapper specifically for Anthropic API calls
 */
export async function withAnthropicRetry<T>(fn: () => Promise<T>): Promise<T> {
  return withRetry(fn, {
    maxRetries: 3,
    initialDelayMs: 1000,
    retryableStatusCodes: [429, 500, 502, 503, 529], // 529 = Anthropic overloaded
    retryableErrors: ['overloaded', 'rate_limit', 'timeout'],
  })
}
