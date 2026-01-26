/**
 * ellio Theme - Main Export
 *
 * Defaults to ellio-v2.0 (canonical theme)
 *
 * Usage:
 * import { colors, typography, spacing } from '@/src/theme'
 */

// Primary export: ellio-v2.0
export {
  colors,
  getColor,
  typography,
  getTypographyPreset,
  remToPx,
  spacing,
  radius,
  shadow,
  motion,
  getTransition,
  shouldReduceMotion,
  buttons,
  inputs,
  cards,
  navigation,
  feedback,
  textRules,
  accessibility,
  voice,
  motionRules,
  theme,
} from './ellio-v2.0';

export default require('./ellio-v2.0');
