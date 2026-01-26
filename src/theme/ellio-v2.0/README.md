# ellio v2.0 Theme System

The canonical design system for ellio. Single source of truth for colors, typography, spacing, and component rules.

## Principle

**"Not all at once."**

Every design decision reflects calm, harmony, reassurance, and transparency. The visual language must never feel urgent, overwhelming, or demanding.

## File Structure

```
src/theme/ellio-v2.0/
├── index.ts                 # Main export (use this)
├── tokens.colors.ts         # Complete color system
├── tokens.typography.ts     # Font system (system fonts only)
├── tokens.layout.ts         # Spacing, radius, elevation, motion
└── tokens.rules.ts          # Component constraints and rules
```

## Quick Start

### Import Tokens

```typescript
// Option 1: Individual imports
import { colors, typography, spacing, radius, shadow, motion } from '@/src/theme/ellio-v2.0'

// Option 2: Single theme object
import { theme } from '@/src/theme/ellio-v2.0'

// Usage
const primaryColor = colors.brand.indigo[600]  // '#4f46e5'
const padding = spacing[24]                     // '24px'
const h1 = typography.preset.h1                 // { fontSize: 32, ... }
```

### Use in Styles

```typescript
// React inline
style={{ 
  backgroundColor: colors.surface.background,
  padding: spacing[24],
  borderRadius: radius[12],
}}

// Tailwind (extend config with token values)
className="bg-[#f8fafc] p-6 rounded-lg"

// Or use Tailwind classes that match tokens
className="bg-neutral-50 p-6 rounded-lg"
```

## Token Categories

### 1. Colors

Complete palette with semantic naming:

- **Brand**: indigo (primary), sky (accent)
- **Neutral**: cool grays from 0-900 (never pure black)
- **Semantic**: success, warning, danger, info (+ subtle backgrounds)
- **Surface**: layered backgrounds for depth
- **Text**: primary, secondary, tertiary, placeholder, link, inverse
- **Border**: default, subtle, strong, focus
- **State**: pressed, hover, selected, disabled

**Rule**: Never use arbitrary hex values. Always use a token.

### 2. Typography

System fonts only (no custom fonts):

- **Family**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`
- **Weights**: 400, 500, 600, 700
- **Sizes**: 10-40px, all with computed line heights
- **Presets**: display, h1-h3, title, subtitle, body, caption, label

**Rule**: Never set arbitrary fontSize or fontWeight.

### 3. Spacing

8px base unit scale:

```
0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64
```

**Rule**: All spacing uses multiples of 8px (4px and 2px for edge cases).

### 4. Radius

```
6, 8, 12, 16, 24, full
```

**Rule**: Controls use 8, cards use 12, large components use 16.

### 5. Elevation and Shadow

```
none, soft, medium, large, focus
```

**Rule**: Use shadows sparingly. Prefer surface changes and borders.

### 6. Motion

**Durations**: fast (160ms), normal (220ms), slow (300ms)  
**Easing**: standard = `cubic-bezier(0.4, 0, 0.2, 1)` (professional, no bounce)

**Rule**: Respect `prefers-reduced-motion` preference.

## Component Rules

### Buttons

- Minimum height: 44px (44x44 tap target)
- Padding: 12px 24px
- Radius: 8px
- States: primary (indigo), secondary (border), tertiary (text), destructive (red), disabled (muted)
- Always sentence case. No all-caps.
- Focus ring: 2px, visible on all browsers

### Inputs

- Minimum height: 40px (44 with padding)
- Padding: 10px 12px
- Border: 1px, focus becomes 2px
- Always use `<label>` with `htmlFor`
- Error messages must be blame-free and helpful
- Focus ring must be visible

### Cards

- Padding: 24px
- Radius: 12px
- Border: subtle 1px or soft shadow (never both heavy)
- Background: white (surface.card)

### Navigation

- Selected state: underline, not background fill
- Color: brand.indigo.600
- Keyboard navigation: Tab, Arrow keys supported

### Empty, Error, Loading States

- **Empty**: Icon (optional) + message + one action
- **Error**: Semantic.danger color + blame-free message + fix suggestion
- **Loading**: Spinner + brief calm message (no countdown)

## Accessibility Guarantees

All tokens and rules enforce WCAG AA compliance:

- **Contrast**: 4.5:1 minimum (text), 3:1 (UI components)
- **Tap targets**: 44x44px (mobile), 32x32px (desktop)
- **Focus indicators**: 2px, always visible
- **Keyboard navigation**: Full support, no traps
- **Semantic HTML**: Proper button, input, link, nav usage
- **Motion**: Respects `prefers-reduced-motion`

## Voice and Tone

**Forbidden words**: ASAP, urgent, immediately, hurry, must, required, failed, error, oops, sorry  
**Allowed phrases**: "When you are ready", "Not all at once", "One step is enough", "You can change this later"

**Rules**:
- Sentence case only. No all-caps.
- No emoji anywhere.
- Avoid exclamation marks.
- Short sentences (max 15 words).
- Never blame the user.

## Enforcing the System

Run the theme audit script to detect violations:

```bash
scripts/theme_audit.sh
```

This checks for:
- Hard-coded hex colors outside allowed files
- Arbitrary fontFamily usage
- Magic spacing/radius values
- Violations of component rules

## Extending the System

To add a new token:

1. Add it to the appropriate `tokens.*.ts` file
2. Document the purpose and usage
3. Add to component rules if it affects UI behavior
4. Update `scripts/theme_audit.sh` if new category
5. Create a PR with rationale

All extensions must maintain the principle: **calm, harmonious, reassuring, non-urgent**.

## Migration from Legacy Theme

Existing theme in `src/theme/` is now legacy. gradual migration to ellio-v2.0:

```typescript
// Old (legacy)
import { colors } from '@/src/theme/ellioTokens'

// New (v2.0)
import { colors } from '@/src/theme/ellio-v2.0'
```

The main `src/theme/index.ts` exports ellio-v2.0 by default.

## Files Not to Edit

These are canonical and auto-generated or locked:

- All files in `src/theme/ellio-v2.0/`

To modify tokens, edit the appropriate `tokens.*.ts` file, rebuild, and commit with clear message.

## For Questions

- **Colors**: See `tokens.colors.ts` (all values and rules)
- **Typography**: See `tokens.typography.ts` (all sizes and fonts)
- **Components**: See `tokens.rules.ts` (all constraints)
- **Accessibility**: See `tokens.rules.ts#accessibility`
- **Voice**: See `tokens.rules.ts#voice`

---

**Version**: 2.0  
**Status**: Canonical  
**Last Updated**: January 26, 2025

"Not all at once." ✨
