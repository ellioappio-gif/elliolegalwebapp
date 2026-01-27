// Usage Tracker - Log token usage per user for billing/analytics

export interface UsageRecord {
  userId: string
  timestamp: Date
  endpoint: 'chat' | 'ask' | 'stream'
  inputTokens: number
  outputTokens: number
  totalTokens: number
  model: string
  category?: string
  cached: boolean
  latencyMs: number
  success: boolean
  errorCode?: string
}

export interface UsageInput {
  userId: string
  endpoint: 'chat' | 'ask' | 'stream'
  inputTokens: number
  outputTokens: number
  model: string
  category?: string
  cached: boolean
  latencyMs: number
  success: boolean
  errorCode?: string
}

export interface UsageSummary {
  totalRequests: number
  totalInputTokens: number
  totalOutputTokens: number
  totalTokens: number
  cachedRequests: number
  failedRequests: number
  averageLatencyMs: number
  costEstimate: number
}

// In-memory storage for demo - in production, use a database
const usageStore: UsageRecord[] = []

// Token pricing (approximate, per 1M tokens)
const PRICING = {
  'claude-sonnet-4-5-20241022': {
    input: 3.00,   // $3 per 1M input tokens
    output: 15.00, // $15 per 1M output tokens
  },
} as const

/**
 * Log a usage record
 */
export function logUsage(record: UsageInput): void {
  const fullRecord: UsageRecord = {
    ...record,
    timestamp: new Date(),
    totalTokens: record.inputTokens + record.outputTokens,
  }

  usageStore.push(fullRecord)

  // In production, also persist to database
  console.log('[Usage]', JSON.stringify({
    userId: fullRecord.userId,
    endpoint: fullRecord.endpoint,
    tokens: fullRecord.totalTokens,
    cached: fullRecord.cached,
    latencyMs: fullRecord.latencyMs,
  }))

  // Cleanup old records (keep last 10000)
  if (usageStore.length > 10000) {
    usageStore.splice(0, usageStore.length - 10000)
  }
}

/**
 * Get usage summary for a user within a time range
 */
export function getUserUsage(
  userId: string,
  startDate?: Date,
  endDate?: Date
): UsageSummary {
  const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Default: last 30 days
  const end = endDate || new Date()

  const userRecords = usageStore.filter(
    (r) => r.userId === userId && r.timestamp >= start && r.timestamp <= end
  )

  if (userRecords.length === 0) {
    return {
      totalRequests: 0,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalTokens: 0,
      cachedRequests: 0,
      failedRequests: 0,
      averageLatencyMs: 0,
      costEstimate: 0,
    }
  }

  const summary = userRecords.reduce(
    (acc, record) => {
      acc.totalRequests++
      acc.totalInputTokens += record.inputTokens
      acc.totalOutputTokens += record.outputTokens
      acc.totalLatencyMs += record.latencyMs
      if (record.cached) acc.cachedRequests++
      if (!record.success) acc.failedRequests++
      return acc
    },
    {
      totalRequests: 0,
      totalInputTokens: 0,
      totalOutputTokens: 0,
      totalLatencyMs: 0,
      cachedRequests: 0,
      failedRequests: 0,
    }
  )

  // Calculate cost estimate
  const pricing = PRICING['claude-sonnet-4-5-20241022']
  const inputCost = (summary.totalInputTokens / 1_000_000) * pricing.input
  const outputCost = (summary.totalOutputTokens / 1_000_000) * pricing.output

  return {
    totalRequests: summary.totalRequests,
    totalInputTokens: summary.totalInputTokens,
    totalOutputTokens: summary.totalOutputTokens,
    totalTokens: summary.totalInputTokens + summary.totalOutputTokens,
    cachedRequests: summary.cachedRequests,
    failedRequests: summary.failedRequests,
    averageLatencyMs: Math.round(summary.totalLatencyMs / summary.totalRequests),
    costEstimate: Math.round((inputCost + outputCost) * 100) / 100,
  }
}

/**
 * Check if user is within their usage quota
 */
export function checkUsageQuota(
  userId: string,
  plan: string
): { withinQuota: boolean; currentUsage: number; limit: number } {
  const quotas: Record<string, number> = {
    free: 10_000,      // 10k tokens/day
    basic: 100_000,    // 100k tokens/day
    premium: 500_000,  // 500k tokens/day
    enterprise: 5_000_000, // 5M tokens/day
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayUsage = usageStore
    .filter((r) => r.userId === userId && r.timestamp >= today)
    .reduce((sum, r) => sum + r.totalTokens, 0)

  const limit = quotas[plan] || quotas.free

  return {
    withinQuota: todayUsage < limit,
    currentUsage: todayUsage,
    limit,
  }
}

/**
 * Get recent usage records for a user
 */
export function getRecentUsage(userId: string, limit: number = 10): UsageRecord[] {
  return usageStore
    .filter((r) => r.userId === userId)
    .slice(-limit)
    .reverse()
}
