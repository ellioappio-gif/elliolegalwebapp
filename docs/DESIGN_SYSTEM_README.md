# ellio Design System

The canonical design system for ellio applications. This directory contains the complete specification for visual identity, language, accessibility, and component patterns.

## Overview

The ellio design system establishes a single source of truth for all design decisions across the organization. Every color, spacing unit, typography size, and word choice is intentional and documented.

**Core Promise**: "Not all at once." — We design for calm, supportive interactions with legal content.

## Files in This Directory

### 1. [ELLIO_THEME.md](./ELLIO_THEME.md)
**Complete Visual Identity Specification**

Contains:
- Color system (brand colors, neutrals, semantic colors, surfaces, text/border/state layers)
- Typography (system font stack, 10 size presets, line heights, weights, preset styles)
- Spacing (8px-based scale, 8 tokens)
- Radius (4 rounded corner presets)
- Elevation (4 shadow levels)
- Motion (animation durations and easing)
- Component styling rules (buttons, cards, forms, navigation, modals, empty/error states)
- WCAG contrast verification (all combos verified 4.5:1+)
- Token usage checklist (12 items)
- Before/after refactoring example
- Tailwind configuration snippet
- Verification checklist (build, TypeScript, visual, contrast, motion, print)

**Use this when**: Designing new interfaces, verifying visual consistency, checking contrast, or understanding spacing/color decisions.

### 2. [ELLIO_VOICE.md](./ELLIO_VOICE.md)
**Canonical Language and Tone System**

Contains:
- Voice pillars: Calm, Supportive, Transparent, Non-Urgent, Non-Judgmental
- Grammar rules (sentence case, no emojis, no all-caps, no exclamation marks)
- Copy patterns for buttons, forms, errors, loading, empty states, disabled states, legal copy
- 6 before/after scenarios (onboarding, error, success, loading, empty state, recovery)
- Writing checklist (10 items)
- Special cases (technical terms, pluralization, brand voice consistency)

**Use this when**: Writing copy, designing UX microcopy, or creating user-facing messages.

### 3. [ELLIO_ACCESSIBILITY.md](./ELLIO_ACCESSIBILITY.md)
**WCAG AA/AAA Compliance Rules and Testing Guide**

Contains:
- Color contrast rules (4.5:1 for text, 3:1 for UI components)
- Typography & readability rules (font size minimums, line length, line height, no justification)
- Interaction & touch targets (44×44px mobile, 32×32px desktop, 8px spacing)
- Keyboard navigation (tab order, no traps, visible focus indicators)
- Semantic HTML (proper button/link distinction, form labels, headings, lists, images)
- ARIA attributes (when to use, best practices)
- Mobile accessibility (no orientation lock, 200% zoom, simple gestures)
- Color blindness safety (palette safe for all types, icon support)
- Dyslexia-friendly design (sans-serif, no italics, whitespace, left-aligned)
- Testing checklist (12 automated tests)
- Tool recommendations (axe DevTools, WAVE, Lighthouse, Pa11y)
- Inclusive language guide

**Use this when**: Building components, testing accessibility, reviewing PRs, or auditing existing pages.

## Token System

### TypeScript Tokens
**File**: `/src/theme/ellioTokens.ts`

Complete TypeScript token definitions exportable to any JavaScript/TypeScript project:

```typescript
import { colors, typography, spacing, radius, elevation, motion } from '@/src/theme/ellioTokens'

// Example usage
const buttonColor = colors.brand.indigo['600']  // #4f46e5
const paddingSmall = spacing[2]                  // 0.5rem / 8px
const titleStyle = typography.preset.h1          // 32px, 600 weight, 1.2 line-height
```

Helper functions:
- `getColor(path: string)` - Retrieve color by dot notation (e.g., "brand.indigo.600")
- `remToPx(rem: number)` - Convert rem units to pixels
- `focusRing()` - Standard focus outline for keyboard navigation

### Component Guide
**File**: `/src/theme/ellioComponents.md`

Detailed implementation guide for 10+ component types:
- Buttons (primary, secondary, tertiary, danger, disabled, loading)
- Cards (standard, highlighted/gradient)
- Form controls (text input, checkbox, radio, toggle, select, error state)
- Navigation (tabs, breadcrumbs)
- Modals & overlays
- Empty states
- Error states
- Loading/skeleton states
- Lists

Each component includes:
- Tailwind utility classes
- CSS variable fallbacks
- Accessibility attributes
- Before/after refactoring examples

## Quick Reference

### Colors
**Primary**: `#4f46e5` (Indigo 600) — Use for CTAs, primary actions, links
**Accent**: `#38bdf8` (Sky 400) — Use for secondary actions, highlights
**Neutral**: `#0f172a` (Neutral 900) — Use for primary text, headings
**Background**: `#f8fafc` (Neutral 50) — Use for page backgrounds, subtle contrast
**Text Secondary**: `#334155` (Neutral 700) — Use for secondary text, captions
**Danger**: `#ef4444` (Red) — Use for errors, destructive actions
**Success**: `#10b981` (Green) — Use for confirmations, success messages

### Spacing (8px scale)
- `0.5rem` (8px) - Minimal gaps
- `1rem` (16px) - Small gaps
- `1.5rem` (24px) - Default padding
- `2rem` (32px) - Medium spacing
- `3rem` (48px) - Large spacing
- `4rem` (64px) - Extra large spacing

### Typography
- **Display** (40px, 700 weight) - Page titles, hero text
- **H1** (32px, 600 weight) - Main headings
- **H2** (24px, 600 weight) - Section headings
- **H3** (20px, 600 weight) - Subsection headings
- **Body** (16px, 400 weight, 1.5 line-height) - Default text
- **Caption** (12px, 400 weight) - Hints, timestamps
- **Label** (14px, 500 weight) - Form labels

### Motion
- `160ms` - Quick interactions (hover, focus)
- `220ms` - Standard transitions (modals, state changes)
- `300ms` - Slower animations (page transitions, complex sequences)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - Professional, no bounce

## Checklists

### Before Shipping a New Feature
1. ✓ Use only tokens from ellioTokens.ts (no hard-coded values)
2. ✓ Verify contrast using ELLIO_ACCESSIBILITY.md contrast table
3. ✓ Check copy against ELLIO_VOICE.md voice pillars
4. ✓ Verify keyboard navigation (Tab, Enter, Escape)
5. ✓ Test with screen reader (NVDA, JAWS, VoiceOver)
6. ✓ Verify 44×44px touch targets (mobile)
7. ✓ Test at 200% zoom without horizontal scroll
8. ✓ Check color with color-blind simulator (all 4 types)
9. ✓ Verify motion respects prefers-reduced-motion
10. ✓ Test in Lighthouse (Accessibility 90+)

### When Reviewing Design/Code
1. ✓ Are all colors from the design system?
2. ✓ Is spacing using 8px multiples?
3. ✓ Are typography sizes one of the 10 presets?
4. ✓ Does copy follow voice pillars?
5. ✓ Are form inputs labeled with htmlFor?
6. ✓ Are focus states visible?
7. ✓ Is there ARIA for dynamic content?
8. ✓ Are semantic HTML tags used correctly?
9. ✓ Are error messages clear and actionable?
10. ✓ Does the layout work at 1024px width?

## Adding to Your Project

### For Next.js Projects
1. Copy `src/theme/ellioTokens.ts` to your project
2. Import in any component: `import { colors, typography, spacing } from '@/src/theme/ellioTokens'`
3. Use in Tailwind config or inline styles

### For Design Tools
1. Export color swatches from ellioTokens.ts hex values
2. Create typography styles matching the 10 presets
3. Set up spacing grid at 8px base unit
4. Reference ELLIO_THEME.md for complete specifications

### For Content Teams
1. Reference ELLIO_VOICE.md before writing any user-facing copy
2. Use the voice pillars (calm, supportive, transparent, non-urgent, non-judgmental)
3. Follow grammar rules (sentence case, no emoji, no all-caps)
4. Use copy patterns for common interactions

## Contact & Questions

For questions about the design system:
- **Visual design**: Reference ELLIO_THEME.md and see examples in the components directory
- **Component implementation**: See ellioComponents.md for code examples and Tailwind utilities
- **Accessibility compliance**: Check ELLIO_ACCESSIBILITY.md testing checklist
- **Copy & tone**: Follow ELLIO_VOICE.md voice pillars and patterns

## Versioning

Current version: 1.0.0
Last updated: 2025-01-26

All files in this directory should be treated as the canonical source. Changes to colors, typography, spacing, voice, or accessibility rules should be documented and communicated to all teams.

## Token Inventory

### Colors: 24+ unique values
- 3 brand indigo shades
- 3 brand sky shades
- 8 neutral grays
- 4 semantic colors (success, warning, danger, info)
- 4 surface layers (background, raised, overlay, disabled)
- 5 text layers (primary, secondary, tertiary, muted, inverted)
- 3 border layers (default, focus, muted)
- 4 state colors (hover, active, focus, disabled)

### Typography: 10 size presets
- Display (40px), H1 (32px), H2 (24px), H3 (20px)
- Title (18px), Subtitle (14px)
- Body (16px), Caption (12px), Label (14px)
- Plus custom variants (wide, narrow, monospace)

### Spacing: 8 tokens
- 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem, 3rem, 4rem, 6rem

### Radius: 4 tokens
- 8px (controls), 12px (cards), 16px (large), full (pills)

### Elevation: 4 levels
- None, Soft, Medium, Large

### Motion: 3 durations + easing
- 160ms, 220ms, 300ms + professional easing curve

---

**Remember**: The design system is a living document. As you use these tokens and rules, you'll discover ways to improve them. Document your findings and propose updates to keep the system fresh and practical.

"Not all at once." ✨
