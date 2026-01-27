// Content Moderation - Filter inappropriate content before/after AI responses

export interface ModerationResult {
  flagged: boolean
  categories: ModerationCategory[]
  blocked: boolean
  reason?: string
  filtered?: string
}

export interface ModerationCategory {
  name: string
  flagged: boolean
  severity: 'low' | 'medium' | 'high'
}

// Content categories to check
const CONTENT_CATEGORIES = {
  hate: {
    patterns: [
      /\b(hate|hatred)\s+(speech|crime)/i,
      /racial\s+slur/i,
      /\b(racist|sexist|homophobic|transphobic)\b/i,
    ],
    severity: 'high' as const,
  },
  violence: {
    patterns: [
      /\b(kill|murder|assault|attack)\s+(someone|people|them|him|her)/i,
      /graphic\s+violence/i,
      /\b(torture|mutilate)\b/i,
    ],
    severity: 'high' as const,
  },
  selfHarm: {
    patterns: [
      /\b(suicide|self-harm|cut\s+myself)\b/i,
      /ways\s+to\s+(die|end\s+my\s+life)/i,
    ],
    severity: 'high' as const,
  },
  sexual: {
    patterns: [
      /explicit\s+sexual/i,
      /\b(pornography|porn)\b/i,
    ],
    severity: 'medium' as const,
  },
  illegalActivity: {
    patterns: [
      /how\s+to\s+(evade|avoid)\s+(taxes|law|police)/i,
      /\b(drug\s+dealing|money\s+laundering)\b/i,
      /forge\s+(documents|signatures)/i,
    ],
    severity: 'high' as const,
  },
  personalInfo: {
    patterns: [
      /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/, // SSN pattern
      /\b\d{16}\b/, // Credit card pattern
      /\bpassword\s*[:=]\s*\S+/i,
    ],
    severity: 'medium' as const,
  },
}

// Words/phrases to filter from output (replace with asterisks)
const OUTPUT_FILTERS = [
  /\b(fuck|shit|damn|ass|bitch)\b/gi,
]

/**
 * Moderate input content before sending to AI
 */
export function moderateInput(content: string): ModerationResult {
  const categories: ModerationCategory[] = []
  let flagged = false
  let blocked = false
  let reason: string | undefined

  for (const [categoryName, config] of Object.entries(CONTENT_CATEGORIES)) {
    const categoryFlagged = config.patterns.some((pattern) => pattern.test(content))
    
    categories.push({
      name: categoryName,
      flagged: categoryFlagged,
      severity: config.severity,
    })

    if (categoryFlagged) {
      flagged = true
      if (config.severity === 'high') {
        blocked = true
        reason = `Content flagged for ${categoryName}`
      }
    }
  }

  return {
    flagged,
    categories,
    blocked,
    reason,
  }
}

/**
 * Moderate output content after receiving from AI
 */
export function moderateOutput(content: string): ModerationResult {
  let filtered = content
  const categories: ModerationCategory[] = []
  let flagged = false

  // Check for problematic content
  for (const [categoryName, config] of Object.entries(CONTENT_CATEGORIES)) {
    const categoryFlagged = config.patterns.some((pattern) => pattern.test(content))
    
    categories.push({
      name: categoryName,
      flagged: categoryFlagged,
      severity: config.severity,
    })

    if (categoryFlagged) {
      flagged = true
    }
  }

  // Apply output filters (mild profanity filtering)
  for (const pattern of OUTPUT_FILTERS) {
    filtered = filtered.replace(pattern, (match) => '*'.repeat(match.length))
  }

  // Check if AI is trying to reveal system instructions
  const systemLeakPatterns = [
    /my (system |initial )?(instructions|prompt|rules) (are|is)/i,
    /i was (instructed|told|programmed) to/i,
    /here (are|is) my (system |initial )?(prompt|instructions)/i,
  ]

  const leakDetected = systemLeakPatterns.some((p) => p.test(content))
  if (leakDetected) {
    flagged = true
    categories.push({
      name: 'systemLeak',
      flagged: true,
      severity: 'medium',
    })
    // Redact the suspicious part
    filtered = '[Response filtered for security]'
  }

  return {
    flagged,
    categories,
    blocked: false,
    filtered: filtered !== content ? filtered : undefined,
  }
}

/**
 * Check if content is appropriate for the legal context
 */
export function checkLegalContext(content: string): {
  appropriate: boolean
  warnings: string[]
} {
  const warnings: string[] = []

  // Check for content that shouldn't be in legal responses
  const inappropriatePatterns = [
    {
      pattern: /this is (not |)legal advice/i,
      ok: true, // This is actually good - disclaimer
    },
    {
      pattern: /i (am|'m) (not |)a lawyer/i,
      ok: true, // Good disclaimer
    },
    {
      pattern: /you should definitely (sue|file|litigate)/i,
      ok: false,
      warning: 'Response contains overly directive legal guidance',
    },
    {
      pattern: /guaranteed to win/i,
      ok: false,
      warning: 'Response makes unrealistic promises about legal outcomes',
    },
  ]

  for (const check of inappropriatePatterns) {
    if (!check.ok && check.pattern.test(content) && check.warning) {
      warnings.push(check.warning)
    }
  }

  return {
    appropriate: warnings.length === 0,
    warnings,
  }
}

/**
 * Add legal disclaimer to response if not present
 */
export function ensureLegalDisclaimer(content: string): string {
  const hasDisclaimer = 
    /this is (not |general |)legal (advice|information)/i.test(content) ||
    /consult (with |)(a |an |your )(attorney|lawyer)/i.test(content) ||
    /not (a |)substitute for (legal |professional )advice/i.test(content)

  if (!hasDisclaimer) {
    return `${content}\n\n*Note: This information is for educational purposes only and should not be considered legal advice. Please consult with a licensed attorney for advice specific to your situation.*`
  }

  return content
}
