/**
 * ellio v2.0 - Main Theme Export
 *
 * Single entry point for all theme tokens and utilities
 * Canonical API for the ellio design system
 *
 * Usage:
 * import { colors, typography, spacing, radius, shadow, motion } from '@/src/theme'
 * Or destructure:
 * import { colors } from '@/src/theme'
 */

// Export all token categories
export { colors, getColor } from './tokens.colors';
export { typography, getTypographyPreset, remToPx } from './tokens.typography';
export { spacing, radius, shadow, motion, getTransition, shouldReduceMotion } from './tokens.layout';

// Export rules for documentation and enforcement
export {
  buttons,
  inputs,
  cards,
  navigation,
  feedback,
  textRules,
  accessibility,
  voice,
  motionRules,
} from './tokens.rules';

// Re-export as a single theme object for convenience
import { colors } from './tokens.colors';
import { typography } from './tokens.typography';
import { spacing, radius, shadow, motion } from './tokens.layout';

/**
 * Complete theme object
 * Use this if you prefer a single theme import
 */
export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  motion,
} as const;

// Freeze theme to prevent mutations
Object.freeze(theme);
Object.freeze(colors);
Object.freeze(typography);
Object.freeze(spacing);
Object.freeze(radius);
Object.freeze(shadow);
Object.freeze(motion);
