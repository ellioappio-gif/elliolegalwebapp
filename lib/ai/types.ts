// AI Service Types

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AIRequest {
  messages: ChatMessage[]
  context?: 'legalAssistant' | 'contractAnalysis' | 'generalLegal'
  maxTokens?: number
  temperature?: number
}

export interface AIResponse {
  content: string
  usage?: {
    inputTokens: number
    outputTokens: number
  }
  model: string
}

export interface AIError {
  error: string
  code?: string
  details?: string
}

export interface AskRequest {
  question: string
  category: string
}

export interface AskResponse {
  question: string
  answer: string
  confidence: number
  model: string
}
