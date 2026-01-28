// Authentication Middleware - Ensure AI endpoints require authenticated users
// Claude Sonnet 4.5 is ENABLED FOR ALL TIERS - token limits vary by plan

import { NextRequest } from 'next/server'
import { AI_CONFIG } from './config'

export interface AuthUser {
  id: string
  email: string
  name: string
  plan?: 'free' | 'basic' | 'premium' | 'enterprise'
}

export interface AuthResult {
  authenticated: boolean
  user: AuthUser | null
  error?: string
}

/**
 * Verify the authentication token from request headers
 */
export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader) {
      return {
        authenticated: false,
        user: null,
        error: 'No authorization header provided',
      }
    }

    const token = authHeader.replace('Bearer ', '')
    
    if (!token) {
      return {
        authenticated: false,
        user: null,
        error: 'Invalid token format',
      }
    }

    // Verify token with your auth service
    // In production, this would verify JWT or session token
    const verifyResponse = await fetch(`${getBaseUrl(request)}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!verifyResponse.ok) {
      return {
        authenticated: false,
        user: null,
        error: 'Invalid or expired token',
      }
    }

    const userData = await verifyResponse.json()
    
    return {
      authenticated: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        plan: userData.plan || 'free',
      },
    }
  } catch (error) {
    console.error('Auth verification error:', error)
    return {
      authenticated: false,
      user: null,
      error: 'Authentication service error',
    }
  }
}

/**
 * Get base URL from request for internal API calls
 */
function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

/**
 * Get rate limits based on user plan
 * NOTE: Claude Sonnet 4.5 is available to ALL tiers - only limits differ
 */
export function getPlanLimits(plan?: string): {
  requestsPerMinute: number
  maxTokensPerRequest: number
  maxConversationLength: number
  model: string
} {
  // All tiers use Claude Sonnet 4.5
  const model = AI_CONFIG.model
  
  switch (plan) {
    case 'enterprise':
      return {
        requestsPerMinute: 100,
        maxTokensPerRequest: 8192,
        maxConversationLength: 50,
        model,
      }
    case 'premium':
      return {
        requestsPerMinute: 50,
        maxTokensPerRequest: 6144,
        maxConversationLength: 30,
        model,
      }
    case 'basic':
      return {
        requestsPerMinute: 20,
        maxTokensPerRequest: 4096,
        maxConversationLength: 20,
        model,
      }
    case 'free':
    default:
      return {
        requestsPerMinute: 10,
        maxTokensPerRequest: 2048,
        maxConversationLength: 10,
        model,
      }
  }
}
