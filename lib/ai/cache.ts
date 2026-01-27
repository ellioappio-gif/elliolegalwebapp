// Response Cache - Cache common questions to reduce API costs

import crypto from 'crypto'

interface CacheEntry {
  response: string
  model: string
  createdAt: number
  expiresAt: number
  hitCount: number
}

interface CacheConfig {
  maxSize: number      // Maximum entries in cache
  defaultTTL: number   // Time to live in milliseconds
  minHitsToKeep: number // Minimum hits to survive cleanup
}

const DEFAULT_CONFIG: CacheConfig = {
  maxSize: 1000,
  defaultTTL: 24 * 60 * 60 * 1000, // 24 hours
  minHitsToKeep: 3,
}

class ResponseCache {
  private cache: Map<string, CacheEntry> = new Map()
  private config: CacheConfig

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }

    // Periodic cleanup
    setInterval(() => this.cleanup(), 60 * 60 * 1000) // Every hour
  }

  /**
   * Generate a cache key from the input
   */
  private generateKey(input: string, context?: string): string {
    const normalized = input.toLowerCase().trim()
    const data = context ? `${context}:${normalized}` : normalized
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 32)
  }

  /**
   * Normalize input for better cache matching
   */
  private normalizeInput(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')        // Collapse whitespace
      .replace(/[^\w\s?]/g, '')    // Remove special chars except ?
  }

  /**
   * Get a cached response
   */
  get(input: string, context?: string): { content: string; model: string } | null {
    const normalizedInput = this.normalizeInput(input)
    const key = this.generateKey(normalizedInput, context)
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    // Increment hit count
    entry.hitCount++

    return {
      content: entry.response,
      model: entry.model,
    }
  }

  /**
   * Set a cached response
   */
  set(
    input: string,
    response: string,
    model: string,
    context?: string,
    ttl?: number
  ): void {
    // Don't cache very short or very long responses
    if (response.length < 50 || response.length > 10000) {
      return
    }

    // Don't cache if response indicates uncertainty
    const uncertaintyIndicators = [
      "i'm not sure",
      "i cannot",
      "i don't have",
      "please provide more",
      "could you clarify",
    ]
    if (uncertaintyIndicators.some(ind => response.toLowerCase().includes(ind))) {
      return
    }

    const normalizedInput = this.normalizeInput(input)
    const key = this.generateKey(normalizedInput, context)
    const now = Date.now()

    this.cache.set(key, {
      response,
      model,
      createdAt: now,
      expiresAt: now + (ttl || this.config.defaultTTL),
      hitCount: 1,
    })

    // Enforce max size
    if (this.cache.size > this.config.maxSize) {
      this.evict()
    }
  }

  /**
   * Evict least valuable entries
   */
  private evict(): void {
    // Sort by value score (hit count / age)
    const entries = Array.from(this.cache.entries())
      .map(([key, entry]) => ({
        key,
        entry,
        score: entry.hitCount / ((Date.now() - entry.createdAt) / 3600000 + 1), // hits per hour
      }))
      .sort((a, b) => a.score - b.score)

    // Remove bottom 10%
    const toRemove = Math.ceil(entries.length * 0.1)
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i].key)
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number
    totalHits: number
    avgHitRate: number
  } {
    const entries = Array.from(this.cache.values())
    const totalHits = entries.reduce((sum, e) => sum + e.hitCount, 0)
    
    return {
      size: this.cache.size,
      totalHits,
      avgHitRate: entries.length > 0 ? totalHits / entries.length : 0,
    }
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear()
  }
}

// Singleton instance for the AI response cache
export const aiResponseCache = new ResponseCache({
  maxSize: 1000,
  defaultTTL: 12 * 60 * 60 * 1000, // 12 hours for legal content
})

// Separate cache for frequently asked questions
export const faqCache = new ResponseCache({
  maxSize: 200,
  defaultTTL: 7 * 24 * 60 * 60 * 1000, // 7 days for stable FAQ answers
})

export { ResponseCache }
