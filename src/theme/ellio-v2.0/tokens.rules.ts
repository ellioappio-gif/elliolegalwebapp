/**
 * ellio v2.0 - Component Rules and Guidelines
 *
 * Semantic, accessibility-first rules for all component types
 * Constraint: all components must follow these rules to maintain coherent system
 * These rules are NOT optional and are enforced via audit scripts
 */

/**
 * Button rules
 * Principle: Clear, accessible, calm
 */
export const buttons = {
  minHeight: 44,                    // iOS tap target minimum (44x44)
  minHeightDesktop: 32,             // Desktop tap target (32x32)
  basePadding: '12px 24px',        // Vertical x Horizontal
  cornerRadius: 8,                  // radius.8 for controls
  focusOutlineWidth: 2,             // px, visible keyboard focus
  focusOutlineOffset: 1,            // px, space from button edge
  states: {
    primary: 'brand.indigo.600',     // Primary action: indigo
    secondary: 'border.default',     // Secondary: border only
    tertiary: 'text.link',           // Tertiary/link: text only
    destructive: 'semantic.danger',  // Rare: red for destructive
    disabled: 'text.tertiary',       // Disabled: muted color
  },
  rules: [
    'Use sentence case only. Never all-caps.',
    'Maximum 2-3 words.',
    'Loading state: show spinner, disable interaction.',
    'Pressed state uses state.pressed overlay.',
    'Focus ring must be 2px, visible on all browsers.',
    'Never change layout on state; use color/opacity only.',
  ],
};

/**
 * Input rules
 * Principle: Clear, low-anxiety data entry
 */
export const inputs = {
  minHeight: 40,                    // iOS (44 with padding)
  minHeightDesktop: 32,             // Desktop
  basePadding: '10px 12px',        // Vertical x Horizontal
  cornerRadius: 8,
  borderWidth: 1,
  borderColor: 'border.default',
  borderFocusColor: 'border.focus',
  borderFocusWidth: 2,
  states: {
    empty: 'text.placeholder',
    focused: 'border.focus',
    error: 'semantic.danger',
    disabled: 'surface.subtle',
  },
  rules: [
    'Always use <label> with htmlFor attribute.',
    'Placeholder must be gray (text.placeholder), not black.',
    'Error message must be helpful and blame-free.',
    'Focus ring must be visible.',
    'Support autocomplete and password managers.',
    'Never hide labels; move above input on focus.',
  ],
};

/**
 * Card rules
 * Principle: Calm grouping, minimal visual noise
 */
export const cards = {
  basePadding: '24px',              // Standard card padding
  cornerRadius: 12,                 // radius.12 for cards
  borderWidth: 1,
  borderColor: 'border.default',
  backgroundColor: 'surface.card',
  shadow: 'shadow.soft',            // Subtle shadow for depth
  rules: [
    'Use cards to group related content.',
    'Minimal borders; prefer space and shadow.',
    'Padding should be consistent (24px).',
    'Do not mix card with heavy shadows; keep subtle.',
  ],
};

/**
 * Navigation rules
 * Principle: Calm, low-noise, clear hierarchy
 */
export const navigation = {
  cornerRadius: 8,
  selectedIndicator: 'bottom-border', // Underline preferred over background fill
  selectedColor: 'brand.indigo.600',
  hoverColor: 'state.hover',
  rules: [
    'Use text labels; no emoji.',
    'Selected state: underline or highlight, not background fill.',
    'Support keyboard navigation (Tab, Arrow keys).',
    'Focus ring must be visible.',
    'Avoid nested navigation; use flat structure.',
  ],
};

/**
 * Empty states and error states
 * Principle: Reassuring, helpful, never blame
 */
export const feedback = {
  emptyState: {
    rules: [
      'Show an icon (optional, if it adds clarity).',
      'Provide a clear, friendly message.',
      'Suggest one next action.',
      'No urgency language.',
    ],
  },
  errorState: {
    rules: [
      'Use semantic.danger color for clarity.',
      'Never blame the user ("You forgot", "You messed up").',
      'Explain what happened in plain language.',
      'Suggest the fix or next step.',
      'Allow retry/undo if possible.',
    ],
  },
  loadingState: {
    rules: [
      'Show a spinner or progress indicator.',
      'Optional: brief message ("Processing your request...").',
      'Never show countdown or timeout warnings.',
      'Keep it calm and trust-building.',
    ],
  },
};

/**
 * Text and typography rules
 * Principle: Calm, readable, hierarchical
 */
export const textRules = {
  headings: {
    rules: [
      'Use semantic <h1>, <h2>, <h3> elements.',
      'Maintain hierarchy: one <h1> per page.',
      'Font weights: h1/h2 (700), h3 (600), body (400).',
      'Never use size alone; ensure semantic meaning.',
    ],
  },
  body: {
    baseSize: 16,
    baseLineHeight: 1.5,
    maxLineLength: 75,  // characters
    rules: [
      'Primary text uses text.primary (neutral.900).',
      'Secondary uses text.secondary (neutral.700).',
      'Never all-caps unless design-approved tag.',
      'Maximum line length 50-75 characters for readability.',
      'Line height minimum 1.5 for body, 1.2 for headings.',
    ],
  },
  links: {
    color: 'text.link',
    underline: true,     // Always underlined
    rules: [
      'Links must be underlined.',
      'Focus ring must be visible.',
      'Support :visited state (lighter indigo).',
      'Never use color alone to indicate link.',
    ],
  },
};

/**
 * Accessibility rules (enforced via tooling)
 * Principle: WCAG AA minimum, AAA preferred
 */
export const accessibility = {
  contrastMinimum: 4.5,    // 4.5:1 for text (WCAG AA)
  contrastStrong: 7,       // 7:1 for text (WCAG AAA)
  tapTargetMinimum: 44,    // iOS: 44x44 minimum
  tapTargetDesktop: 32,    // Desktop: 32x32 minimum
  focusIndicator: {
    width: 2,
    offset: 1,
    color: 'border.focus',
  },
  rules: [
    'All text must meet 4.5:1 contrast (WCAG AA).',
    'Tap targets minimum 44x44 on mobile, 32x32 on desktop.',
    'Focus indicators must be 2px wide and visible on all browsers.',
    'Support keyboard navigation: Tab, Enter, Escape, Arrow keys.',
    'Use semantic HTML: <button>, <input>, <a>, <nav>, etc.',
    'Provide alt text for images and aria-label for icons.',
    'Never remove focus outline; style it instead.',
    'Support screen readers: ARIA labels where semantic HTML insufficient.',
  ],
};

/**
 * Copy and voice rules
 * Principle: Calm, transparent, never urgent or blaming
 * These rules are enforced by linters and human review
 */
export const voice = {
  forbiddenWords: [
    'ASAP',
    'urgent',
    'immediately',
    'hurry',
    'must',
    'required',
    'failed',
    'error',
    'oops',
    'sorry',
  ],
  allowedPhrases: [
    'When you are ready',
    'Not all at once',
    'One step is enough',
    'You can change this later',
    'Take your time',
  ],
  tone: [
    'Calm: measured pace, no urgency',
    'Transparent: explain what is happening',
    'Supportive: never blame the user',
    'Clear: plain language, avoid jargon',
    'Brief: sentences under 15 words when possible',
  ],
  rules: [
    'Use sentence case only. No all-caps.',
    'No emoji anywhere.',
    'Avoid exclamation marks (rarely, only for genuine delight).',
    'Active voice preferred.',
    'Positive framing when possible.',
  ],
};

/**
 * Motion rules
 * Principle: Gentle, supportive, never jarring
 */
export const motionRules = {
  principles: [
    'Motion supports interaction; it does not distract.',
    'Respect prefers-reduced-motion: reduce user preference.',
    'Use motion.fast for simple state changes.',
    'Use motion.normal for standard transitions.',
    'Use motion.slow for complex sequences (rare).',
  ],
  rules: [
    'No bouncy easing (cubic-bezier(0.68, -0.55, 0.265, 1.55)).',
    'Use standard easing: cubic-bezier(0.4, 0, 0.2, 1).',
    'Duration 160-300ms for web (never under 100ms or over 500ms).',
    'On slow networks or accessibility preference, disable motion.',
  ],
};
