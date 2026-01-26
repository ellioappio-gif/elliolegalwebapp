/**
 * ellio v2.0 - Spacing, Radius, Elevation, Motion Tokens
 *
 * Complete token system for layout, borders, shadows, and animations
 * All values locked to prevent drift and ensure consistency
 */

/**
 * Spacing tokens: 8px-based scale for consistent rhythm
 * Do not use arbitrary spacing values
 */
export const spacing = {
  0: '0px',      // No space
  2: '2px',      // 1/4 unit (minimal gap)
  4: '4px',      // 1/2 unit
  6: '6px',      // 3/4 unit
  8: '8px',      // BASE UNIT: 1 unit
  10: '10px',    // 1.25 units
  12: '12px',    // 1.5 units
  14: '14px',    // 1.75 units
  16: '16px',    // 2 units
  20: '20px',    // 2.5 units
  24: '24px',    // 3 units
  28: '28px',    // 3.5 units
  32: '32px',    // 4 units
  40: '40px',    // 5 units
  48: '48px',    // 6 units
  56: '56px',    // 7 units
  64: '64px',    // 8 units
} as const;

/**
 * Border radius tokens: Calm, rounded geometry (not childish)
 * Small radii for controls, medium for cards, large for containers
 */
export const radius = {
  6: '6px',      // Minimal rounding: small elements
  8: '8px',      // Controls: inputs, buttons, small components
  12: '12px',    // Cards: default card border radius
  16: '16px',    // Large: containers, modals, large cards
  24: '24px',    // Hero: hero sections if needed
  full: '9999px', // Pills: badges, fully rounded elements
} as const;

/**
 * Elevation and shadow tokens: Subtle shadows for depth
 * Cross-platform safe. Prefer surface changes and borders over heavy shadows.
 * All shadows use dark base color with low opacity
 */
export const shadow = {
  none: 'none',
  soft: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  medium: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
  large: '0 10px 15px -3px rgba(15, 23, 42, 0.15), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
  focus: '0 0 0 3px rgba(79, 70, 229, 0.1), 0 0 0 1px rgba(79, 70, 229, 1)', // Focus ring
} as const;

/**
 * Motion tokens: Animation durations and easing
 * Gentle, professional transitions. No bounce.
 * Principle: support natural interaction, not draw attention
 */
export const motion = {
  duration: {
    fast: '160ms',    // Quick interactions: hover, simple state changes
    normal: '220ms',  // Standard: modal open/close, transitions
    slow: '300ms',    // Slow: page transitions, complex sequences
  },
  easing: {
    // Professional easing: cubic-bezier(0.4, 0, 0.2, 1)
    // Used by Material Design for a smooth, natural feel
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

/**
 * Helper: Construct a CSS transition value
 * @param property - CSS property to transition (e.g., 'background-color')
 * @param duration - duration key from motion.duration (e.g., 'normal')
 * @returns CSS transition string
 */
export function getTransition(
  property: string,
  duration: keyof typeof motion.duration = 'normal'
): string {
  return `${property} ${motion.duration[duration]} ${motion.easing.standard}`;
}

/**
 * Accessibility: Check if prefers-reduced-motion
 * If true, disable or reduce animations
 * Usage: const shouldAnimate = !shouldReduceMotion();
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
