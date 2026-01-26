/**
 * ellio Design System Tokens
 * 
 * Canonical token set for all ellio applications.
 * This is the single source of truth for color, typography, spacing, and motion.
 * 
 * Usage: Import and apply these tokens to ensure brand consistency across all ellio apps.
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Brand colors: Deep indigo + sky blue gradient feel
  brand: {
    indigo: {
      500: '#6366f1',  // Bright indigo
      600: '#4f46e5',  // Primary indigo
      700: '#4338ca',  // Dark indigo
    },
    sky: {
      300: '#7dd3fc',  // Light sky
      400: '#38bdf8',  // Primary sky
      500: '#0ea5e9',  // Deep sky
    },
  },

  // Neutral grays: Cool, never harsh black
  neutral: {
    0: '#ffffff',      // Pure white
    50: '#f8fafc',     // Almost white, slightly cool
    100: '#f1f5f9',    // Very light gray
    200: '#e2e8f0',    // Light gray
    300: '#cbd5e1',    // Medium light gray
    500: '#64748b',    // Medium gray (readable text)
    700: '#334155',    // Dark gray (primary text)
    900: '#0f172a',    // Almost black (strongest contrast)
  },

  // Semantic colors: Success, warning, danger, info
  semantic: {
    success: '#10b981',   // Green
    warning: '#f59e0b',   // Amber
    danger: '#ef4444',    // Red
    info: '#3b82f6',      // Blue
  },

  // Surface tokens: Backgrounds and elevated surfaces
  surface: {
    background: '#f8fafc',     // Page background (neutral.50)
    raised: '#ffffff',         // Cards, raised surfaces (neutral.0)
    overlay: 'rgba(15, 23, 42, 0.5)',  // Semi-transparent dark overlay
    disabled: '#f1f5f9',       // Disabled state background
  },

  // Text tokens: Hierarchy and readability
  text: {
    primary: '#0f172a',        // Primary text (neutral.900)
    secondary: '#334155',      // Secondary text (neutral.700)
    tertiary: '#64748b',       // Tertiary text (neutral.500)
    inverse: '#ffffff',        // White text on dark
    link: '#4f46e5',          // Link color (brand.indigo.600)
    disabled: '#cbd5e1',       // Disabled text (neutral.300)
  },

  // Border tokens: Subtle to prominent
  border: {
    default: '#e2e8f0',        // Standard border (neutral.200)
    subtle: '#f1f5f9',         // Subtle border (neutral.100)
    focus: '#4f46e5',          // Focus ring (brand.indigo.600)
  },

  // State-specific
  state: {
    hover: 'rgba(79, 70, 229, 0.08)',  // Indigo with opacity for hover
    focus: 'rgba(79, 70, 229, 0.1)',   // Indigo with opacity for focus
    active: 'rgba(79, 70, 229, 0.12)', // Indigo with opacity for active
    disabled: 'rgba(203, 213, 225, 0.5)', // Gray opacity for disabled
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  // Font families: System fonts for reliability
  family: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    sansEmphasis: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },

  // Font sizes: 2px increments, readable on all devices
  size: {
    10: '0.625rem',   // 10px - Very small labels
    12: '0.75rem',    // 12px - Small text
    14: '0.875rem',   // 14px - Body small
    16: '1rem',       // 16px - Body default
    18: '1.125rem',   // 18px - Body large
    20: '1.25rem',    // 20px - Subtitle
    24: '1.5rem',     // 24px - Heading 3
    28: '1.75rem',    // 28px - Heading 2
    32: '2rem',       // 32px - Heading 1
    40: '2.5rem',     // 40px - Display
  },

  // Line heights: Matched to size for readability
  lineHeight: {
    tight: '1.2',     // Headings
    normal: '1.5',    // Body text
    relaxed: '1.75',  // Long-form content
  },

  // Font weights: Subtle, readable hierarchy
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Preset typography styles
  styles: {
    display: {
      size: '2.5rem',
      lineHeight: '1.2',
      weight: 600,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    h1: {
      size: '2rem',
      lineHeight: '1.2',
      weight: 600,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    h2: {
      size: '1.75rem',
      lineHeight: '1.2',
      weight: 600,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    h3: {
      size: '1.5rem',
      lineHeight: '1.2',
      weight: 600,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    title: {
      size: '1.25rem',
      lineHeight: '1.5',
      weight: 600,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    subtitle: {
      size: '1rem',
      lineHeight: '1.5',
      weight: 500,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    body: {
      size: '1rem',
      lineHeight: '1.5',
      weight: 400,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    bodyEmphasis: {
      size: '1rem',
      lineHeight: '1.5',
      weight: 600,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    caption: {
      size: '0.875rem',
      lineHeight: '1.5',
      weight: 400,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    label: {
      size: '0.75rem',
      lineHeight: '1.2',
      weight: 500,
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  2: '0.5rem',    // 8px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// ============================================================================
// RADIUS TOKENS
// ============================================================================

export const radius = {
  8: '0.5rem',    // Default controls
  12: '0.75rem',  // Cards, medium containers
  16: '1rem',     // Large containers
  full: '9999px', // Fully rounded (pills)
} as const;

// ============================================================================
// ELEVATION TOKENS
// ============================================================================

export const elevation = {
  none: 'none',
  soft: '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
  medium: '0 4px 6px rgba(15, 23, 42, 0.1), 0 2px 4px rgba(15, 23, 42, 0.06)',
  large: '0 10px 15px rgba(15, 23, 42, 0.1), 0 4px 6px rgba(15, 23, 42, 0.05)',
} as const;

// ============================================================================
// MOTION TOKENS
// ============================================================================

export const motion = {
  fast: '160ms',
  normal: '220ms',
  slow: '300ms',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Gentle, professional easing
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a color value by path.
 * Example: getColor('brand.indigo.600')
 */
export function getColor(path: string): string {
  const keys = path.split('.');
  let value: any = colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
}

/**
 * Convert rem to px for calculations.
 * Example: remToPx('1rem') => 16
 */
export function remToPx(rem: string): number {
  return parseInt(rem, 10) * 16;
}

/**
 * Generate a focus ring style (used for accessible focus states).
 */
export function focusRing(): string {
  return `outline: 2px solid ${colors.border.focus}; outline-offset: 2px;`;
}

export default {
  colors,
  typography,
  spacing,
  radius,
  elevation,
  motion,
  getColor,
  remToPx,
  focusRing,
};
