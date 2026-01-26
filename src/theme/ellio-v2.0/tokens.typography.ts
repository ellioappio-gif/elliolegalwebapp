/**
 * ellio v2.0 - Typography Tokens
 *
 * Complete typography system using system fonts only.
 * No custom fonts to eliminate missing font warnings at runtime.
 * System fonts are platform-native and maximize reliability.
 *
 * Font stack: uses platform defaults (SF on iOS, Roboto on Android, system sans on web)
 * All sizes specified in pixels with computed line heights for accessibility
 * Principle: calm hierarchy, readable at all sizes, supports dynamic scaling
 */

export const typography = {
  /**
   * Font family tokens: System fonts only
   * Never use custom fonts without bundling verification
   */
  family: {
    // Primary sans-serif: platform-native system font
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    // Monospace: for code/technical content
    mono: 'ui-monospace, "SFMono-Regular", "Courier New", monospace',
  },

  /**
   * Font weight tokens: Complete set for hierarchy
   * Do not use arbitrary weights outside this set
   */
  weight: {
    regular: 400,     // Body text, default
    medium: 500,      // Emphasis, labels
    semibold: 600,    // Headings, strong emphasis
    bold: 700,        // Maximum emphasis
  },

  /**
   * Font size tokens: Complete scale from 10px to 40px
   * Each size includes computed line height for accessibility
   * Do not use arbitrary font sizes
   */
  size: {
    10: { fontSize: 10, lineHeight: 1.4 },  // Minimum (rare)
    12: { fontSize: 12, lineHeight: 1.5 },  // Captions, very small
    13: { fontSize: 13, lineHeight: 1.5 },  // Small labels
    14: { fontSize: 14, lineHeight: 1.5 },  // Small body, labels
    15: { fontSize: 15, lineHeight: 1.5 },  // Default small
    16: { fontSize: 16, lineHeight: 1.5 },  // PRIMARY BODY TEXT
    18: { fontSize: 18, lineHeight: 1.6 },  // Subtitle
    20: { fontSize: 20, lineHeight: 1.5 },  // Subheading
    22: { fontSize: 22, lineHeight: 1.4 },  // Medium heading
    24: { fontSize: 24, lineHeight: 1.4 },  // H3
    28: { fontSize: 28, lineHeight: 1.3 },  // H2
    32: { fontSize: 32, lineHeight: 1.2 },  // H1
    36: { fontSize: 36, lineHeight: 1.2 },  // Large heading
    40: { fontSize: 40, lineHeight: 1.1 },  // Display text
  },

  /**
   * Pre-composed typography styles
   * Use these for consistent hierarchy across the app
   * Do not define custom styles outside this set
   */
  preset: {
    display: {
      fontSize: 40,
      lineHeight: 1.1,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: 32,
      lineHeight: 1.2,
      fontWeight: 700,
    },
    h2: {
      fontSize: 28,
      lineHeight: 1.3,
      fontWeight: 700,
    },
    h3: {
      fontSize: 24,
      lineHeight: 1.4,
      fontWeight: 600,
    },
    title: {
      fontSize: 20,
      lineHeight: 1.5,
      fontWeight: 600,
    },
    subtitle: {
      fontSize: 18,
      lineHeight: 1.6,
      fontWeight: 500,
    },
    body: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    bodyEmphasis: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 600,
    },
    caption: {
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    captionEmphasis: {
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 600,
    },
    label: {
      fontSize: 14,
      lineHeight: 1.5,
      fontWeight: 500,
    },
  },

  /**
   * Line height tokens: Explicit values for accessibility
   * Support long-form content and reading comfort
   */
  lineHeight: {
    tight: 1.2,    // For headings
    normal: 1.5,   // For body text
    relaxed: 1.75, // For long-form content
    loose: 2,      // For documentation/instruction text
  },
} as const;

/**
 * Helper: Get a typography preset and merge with custom overrides
 * @param presetName - name of preset (e.g., 'body', 'h1')
 * @param overrides - optional style overrides
 * @returns typography object
 */
export function getTypographyPreset(
  presetName: keyof typeof typography.preset,
  overrides?: Partial<(typeof typography.preset)[keyof typeof typography.preset]>
) {
  const preset = typography.preset[presetName];
  return overrides ? { ...preset, ...overrides } : preset;
}

/**
 * Helper: Convert rem to pixels for calculations
 * @param rem - value in rem units
 * @returns value in pixels
 */
export function remToPx(rem: number): number {
  return Math.round(rem * 16); // Assuming 16px base
}
