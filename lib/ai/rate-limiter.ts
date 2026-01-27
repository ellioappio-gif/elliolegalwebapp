// Rate Limiter - Prevent API abuse by limiting requests per user

interface RateLimitEntry {
  count: number
  resetTime: number
}

interface RateLimitConfig {
  maxRequests: number      // Maximum requests allowed
  windowMs: number         // Time window in milliseconds
  blockDurationMs?: number // How long to block after exceeding limit
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = {
      blockDurationMs: config.windowMs * 2, // Default: block for 2x the window
      ...config,
    }

    // Clean up expired entries periodically
    setInterval(() => this.cleanup(), 60000) // Every minute
  }

  /**
   * Check if a request is allowed for a given identifier
   * @param identifier - User ID, IP address, or API key
   * @returns Object with allowed status and remaining requests
   */
  check(identifier: string): {
    allowed: boolean
    remaining: number
    resetIn: number
    retryAfter?: number
  } {
    const now = Date.now()
    const entry = this.store.get(identifier)

    // No existing entry - allow and create
    if (!entry) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs,
      })
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetIn: this.config.windowMs,
      }
    }

    // Window has expired - reset
    if (now >= entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs,
      })
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetIn: this.config.windowMs,
      }
    }

    // Within window - check limit
    if (entry.count >= this.config.maxRequests) {
      const retryAfter = entry.resetTime - now
      return {
        allowed: false,
        remaining: 0,
        resetIn: retryAfter,
        retryAfter,
      }
    }

    // Increment and allow
    entry.count++
    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetIn: entry.resetTime - now,
    }
  }

  /**
   * Reset rate limit for an identifier (e.g., after successful payment)
   */
  reset(identifier: string): void {
    this.store.delete(identifier)
  }

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now >= entry.resetTime + (this.config.blockDurationMs || 0)) {
        this.store.delete(key)
      }
    }
  }
}

// Pre-configured rate limiters for different use cases
export const aiChatLimiter = new RateLimiter({
  maxRequests: 20,      // 20 requests
  windowMs: 60 * 1000,  // per minute
})

export const aiAskLimiter = new RateLimiter({
  maxRequests: 10,      // 10 requests
  windowMs: 60 * 1000,  // per minute
})

// Stricter limiter for unauthenticated users
export const guestLimiter = new RateLimiter({
  maxRequests: 5,       // 5 requests
  windowMs: 60 * 1000,  // per minute
})

export { RateLimiter }
export type { RateLimitConfig }
