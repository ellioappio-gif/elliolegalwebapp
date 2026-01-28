// AI Service Types
// Claude Sonnet 4.5 enabled for ALL tiers

export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise'

export interface TierConfig {
  maxTokens: number
  requestsPerMinute: number
  requestsPerDay: number
  features: string[]
  adSupported: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AIRequest {
  messages: ChatMessage[]
  context?: 'legalAssistant' | 'contractAnalysis' | 'generalLegal'
  maxTokens?: number
  temperature?: number
  tier?: SubscriptionTier
}

export interface AIResponse {
  content: string
  usage?: {
    inputTokens: number
    outputTokens: number
  }
  model: string
  tier?: SubscriptionTier
}

export interface AIError {
  error: string
  code?: string
  details?: string
}

export interface AskRequest {
  question: string
  category: string
  tier?: SubscriptionTier
}

export interface AskResponse {
  question: string
  answer: string
  confidence: number
  model: string
  tier?: SubscriptionTier
}
