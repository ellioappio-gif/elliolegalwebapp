// Input Validator - Sanitize user input to prevent prompt injection

export interface ValidationResult {
  valid: boolean
  sanitized: string
  warnings: string[]
  blocked: boolean
  reason?: string
}

// Patterns that might indicate prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore (all |previous |above |prior )?(instructions|prompts|rules)/i,
  /disregard (all |previous |above |prior )?(instructions|prompts|rules)/i,
  /forget (all |previous |above |prior )?(instructions|prompts|rules)/i,
  /you are now/i,
  /new (instructions|rules|prompt)/i,
  /system prompt/i,
  /\[\[system\]\]/i,
  /\{\{system\}\}/i,
  /<\|system\|>/i,
  /pretend (you are|to be|you're)/i,
  /act as (if|though)/i,
  /roleplay as/i,
  /jailbreak/i,
  /bypass (filter|safety|restriction)/i,
  /reveal your (instructions|prompt|rules)/i,
  /what are your (instructions|rules)/i,
  /output your (system|initial) (prompt|message)/i,
]

// Patterns for potentially harmful content
const HARMFUL_PATTERNS = [
  /how to (make|create|build) (a |)(bomb|explosive|weapon)/i,
  /how to (hack|break into)/i,
  /how to (hurt|harm|kill)/i,
  /illegal (activity|activities|drug)/i,
]

// Characters that could be used for injection
const SUSPICIOUS_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g

/**
 * Validate and sanitize user input
 */
export function validateInput(input: string, maxLength: number = 5000): ValidationResult {
  const warnings: string[] = []
  let sanitized = input

  // Check for empty input
  if (!input || typeof input !== 'string') {
    return {
      valid: false,
      sanitized: '',
      warnings: ['Input is required'],
      blocked: true,
      reason: 'Empty input',
    }
  }

  // Check length
  if (input.length > maxLength) {
    sanitized = input.substring(0, maxLength)
    warnings.push(`Input truncated to ${maxLength} characters`)
  }

  // Remove control characters
  if (SUSPICIOUS_CHARS.test(sanitized)) {
    sanitized = sanitized.replace(SUSPICIOUS_CHARS, '')
    warnings.push('Removed suspicious control characters')
  }

  // Check for prompt injection attempts
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: '',
        warnings: ['Potentially malicious input detected'],
        blocked: true,
        reason: 'Possible prompt injection attempt',
      }
    }
  }

  // Check for harmful content
  for (const pattern of HARMFUL_PATTERNS) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: '',
        warnings: ['Request contains potentially harmful content'],
        blocked: true,
        reason: 'Harmful content detected',
      }
    }
  }

  // Normalize whitespace
  sanitized = sanitized
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Limit consecutive repeated characters (potential spam/DoS)
  sanitized = sanitized.replace(/(.)\1{20,}/g, '$1$1$1$1$1')

  return {
    valid: true,
    sanitized,
    warnings,
    blocked: false,
  }
}

/**
 * Validate chat messages array
 */
export function validateMessages(
  messages: Array<{ role: string; content: string }>,
  maxMessages: number = 50
): ValidationResult {
  const warnings: string[] = []

  if (!Array.isArray(messages)) {
    return {
      valid: false,
      sanitized: '',
      warnings: ['Messages must be an array'],
      blocked: true,
      reason: 'Invalid message format',
    }
  }

  if (messages.length === 0) {
    return {
      valid: false,
      sanitized: '',
      warnings: ['At least one message is required'],
      blocked: true,
      reason: 'No messages provided',
    }
  }

  if (messages.length > maxMessages) {
    return {
      valid: false,
      sanitized: '',
      warnings: [`Maximum ${maxMessages} messages allowed`],
      blocked: true,
      reason: 'Too many messages',
    }
  }

  // Validate each message
  const validatedMessages = []
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    
    if (!msg.role || !['user', 'assistant'].includes(msg.role)) {
      return {
        valid: false,
        sanitized: '',
        warnings: [`Invalid role at message ${i}`],
        blocked: true,
        reason: 'Invalid message role',
      }
    }

    const contentValidation = validateInput(msg.content)
    if (contentValidation.blocked) {
      return contentValidation
    }

    warnings.push(...contentValidation.warnings.map(w => `Message ${i}: ${w}`))
    validatedMessages.push({
      role: msg.role,
      content: contentValidation.sanitized,
    })
  }

  return {
    valid: true,
    sanitized: JSON.stringify(validatedMessages),
    warnings,
    blocked: false,
  }
}

/**
 * Escape special characters for safe logging
 */
export function sanitizeForLogging(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .substring(0, 500)
}
