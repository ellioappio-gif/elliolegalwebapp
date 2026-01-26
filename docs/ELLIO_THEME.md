# ellio Theme Specification

**Version:** 1.0.0  
**Status:** Canonical design system  
**Last Updated:** January 26, 2026  

---

## Overview

The ellio theme is a calm, harmonious design system built around the core promise: **"Not all at once."** Every design decision prioritizes reassurance, clarity, and a gentle approach to complex legal topics.

The theme is deliberately minimal, avoiding unnecessary complexity. It uses a limited color palette, generous whitespace, and readable typography to create an environment where users feel supported, not overwhelmed.

---

## Design Principles

### 1. **Calm and Reassuring**
- Soft, cool color palette (indigo + sky blue)
- Gentle shadows and motion
- Ample whitespace to reduce cognitive load
- Never harsh or aggressive visual patterns

### 2. **Transparent and Honest**
- Clear labeling with no hidden complexity
- Plain language in all copy
- Visible state feedback (loading, success, error)
- No unnecessary decoration

### 3. **Non-Urgent and Patient**
- "Not all at once." is the emotional core
- Copy acknowledges the user's pace
- Buttons invite, not demand
- Errors are presented gently, with clear solutions

### 4. **Modern and Clean**
- Rounded corners throughout (friendly, not clinical)
- System fonts for reliability
- Subtle elevation, never heavy shadows
- Consistent spacing and proportions

---

## Color System

### Brand Colors

**Primary: Indigo**
```
indigo.500:  #6366f1  (bright, accent)
indigo.600:  #4f46e5  (primary buttons, links, focus)
indigo.700:  #4338ca  (hover, pressed states)
```

**Accent: Sky Blue**
```
sky.300:  #7dd3fc   (light accent, backgrounds)
sky.400:  #38bdf8   (secondary buttons, borders)
sky.500:  #0ea5e9   (deep accent)
```

### Neutral Colors

Cool grays, never pure black:
```
neutral.0:    #ffffff     (white)
neutral.50:   #f8fafc     (almost white, default background)
neutral.100:  #f1f5f9     (very light gray)
neutral.200:  #e2e8f0     (light gray, borders)
neutral.300:  #cbd5e1     (medium light gray)
neutral.500:  #64748b     (medium gray, secondary text)
neutral.700:  #334155     (dark gray, primary text)
neutral.900:  #0f172a     (almost black, strongest contrast)
```

### Semantic Colors

- **Success:** `#10b981` (green, calm)
- **Warning:** `#f59e0b` (amber, cautionary)
- **Danger:** `#ef4444` (red, but not alarming)
- **Info:** `#3b82f6` (blue, informational)

### Surface Tokens

```
background:  #f8fafc     (neutral.50, page default)
raised:      #ffffff     (neutral.0, cards)
overlay:     rgba(15, 23, 42, 0.5)  (dark semi-transparent)
disabled:    #f1f5f9     (neutral.100, disabled controls)
```

### Text Tokens

```
primary:      #0f172a    (neutral.900, main body text)
secondary:    #334155    (neutral.700, supporting text)
tertiary:     #64748b    (neutral.500, hints, captions)
inverse:      #ffffff    (white on dark)
link:         #4f46e5    (brand.indigo.600, underlined)
disabled:     #cbd5e1    (neutral.300, faded)
```

### Border Tokens

```
default:  #e2e8f0    (neutral.200, standard)
subtle:   #f1f5f9    (neutral.100, soft)
focus:    #4f46e5    (brand.indigo.600, accessible)
```

### State Colors

```
hover:    rgba(79, 70, 229, 0.08)   (indigo wash)
focus:    rgba(79, 70, 229, 0.1)    (indigo wash, slightly more)
active:   rgba(79, 70, 229, 0.12)   (indigo wash, pressed)
disabled: rgba(203, 213, 225, 0.5)  (gray, faded)
```

### Contrast Rules

- **WCAG AA compliant:** All primary text must have minimum 4.5:1 contrast
  - `primary` text on `background`: 10:1 ✓
  - `primary` text on `raised`: 10:1 ✓
  - `link` on `background`: 6:1 ✓
- **WCAG AAA compliant:** All critical interface elements (buttons, form fields)
- **Never use:** Pure black (`#000000`) or pure white on pure white
- **Disabled text:** Must never be the only affordance; always show visual or interactive hint

---

## Typography

### Font Stack (System Fonts)

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", 
             "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", 
             "Helvetica Neue", sans-serif;
```

Rationale: System fonts are pre-installed, reduce bundle size, and render crisply on each platform.

### Font Sizes

```
10px   (0.625rem)  — Very small labels, metadata
12px   (0.75rem)   — Small captions, hints
14px   (0.875rem)  — Small body text
16px   (1rem)      — Default body text
18px   (1.125rem)  — Large body text
20px   (1.25rem)   — Subtitles, small headings
24px   (1.5rem)    — Heading 3
28px   (1.75rem)   — Heading 2
32px   (2rem)      — Heading 1
40px   (2.5rem)    — Display, hero
```

### Line Heights

- **Tight (1.2):** Headings (calm, not cramped)
- **Normal (1.5):** Body text and UI labels (readable)
- **Relaxed (1.75):** Long-form content (low density)

### Font Weights

- **Regular (400):** Body text, labels
- **Medium (500):** UI labels, badges
- **Semibold (600):** Headings, emphasis, button text
- **Bold (700):** Reserved, rarely used (avoid unless critical)

### Typography Rules

1. **No all-caps text.** Use sentence case (capitalize first letter only).
2. **Headings are calm.** Prefer medium weight (500–600) over bold.
3. **Body is readable.** Default to 16px on 1.5 line-height.
4. **Button text is sentence case.** Not "SIGN UP", but "Sign up".
5. **Links are underlined and colored.** Accessible to colorblind users.
6. **Disabled text is not the only indicator.** Always show opacity or gray tone.

### Preset Styles

```typescript
display   { size: 40px, weight: 600, lineHeight: 1.2 }
h1        { size: 32px, weight: 600, lineHeight: 1.2 }
h2        { size: 28px, weight: 600, lineHeight: 1.2 }
h3        { size: 24px, weight: 600, lineHeight: 1.2 }
title     { size: 20px, weight: 600, lineHeight: 1.5 }
subtitle  { size: 16px, weight: 500, lineHeight: 1.5 }
body      { size: 16px, weight: 400, lineHeight: 1.5 }
bodyEmph  { size: 16px, weight: 600, lineHeight: 1.5 }
caption   { size: 14px, weight: 400, lineHeight: 1.5 }
label     { size: 12px, weight: 500, lineHeight: 1.2 }
```

---

## Spacing System

Consistent, 8px-based spacing:

```
2:   0.5rem  (8px)
4:   1rem    (16px)
6:   1.5rem  (24px)
8:   2rem    (32px)
12:  3rem    (48px)
16:  4rem    (64px)
20:  5rem    (80px)
24:  6rem    (96px)
```

### Spacing Rules

- **Padding inside components:** 16px (1rem) default
- **Margin between sections:** 24px (1.5rem) default
- **Vertical rhythm:** Consistent 8px multiples
- **Whitespace over separators:** Prefer generous spacing over visible lines
- **Tap targets:** Minimum 44px × 44px (mobile), 32px × 32px (desktop)

---

## Radius System

Rounded corners convey friendliness and modernity:

```
8px  (0.5rem)      — Default controls (buttons, inputs)
12px (0.75rem)     — Cards, medium containers
16px (1rem)        — Large containers, modals
full (9999px)      — Pills, badges, fully rounded
```

### Radius Rules

- **Buttons:** `radius.8`
- **Cards:** `radius.12`
- **Modals/overlays:** `radius.16`
- **Badges/pills:** `radius.full`
- **Images:** Match container radius or use `radius.8`

---

## Elevation System

Subtle shadows, never heavy or "material" dramatic:

```
none:    no shadow
soft:    0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)
medium:  0 4px 6px rgba(15, 23, 42, 0.1), 0 2px 4px rgba(15, 23, 42, 0.06)
large:   0 10px 15px rgba(15, 23, 42, 0.1), 0 4px 6px rgba(15, 23, 42, 0.05)
```

### Elevation Rules

- **Cards at rest:** `elevation.soft`
- **Cards hovered:** `elevation.medium`
- **Modals/floating panels:** `elevation.medium` to `elevation.large`
- **Dragging/interaction:** `elevation.large`
- **Avoid:** Heavy drop shadows; they feel dated

---

## Motion System

Gentle, professional motion; no bouncy or playful easing:

```
fast:   160ms
normal: 220ms
slow:   300ms
easing: cubic-bezier(0.4, 0, 0.2, 1)  /* standard ease-in-out */
```

### Motion Rules

1. **Transitions:** Use `ease-in-out` (provided easing)
2. **Duration:** 160–220ms for most UI interactions
3. **Avoid:** Spring easing, bounce, overshoot
4. **Respect prefers-reduced-motion:** Disable motion for users who request it
5. **No playful motion:** No jiggle, shake, or personality-driven animation

---

## Component Styling Rules

### Buttons

**Primary (Indigo)**
- Background: `brand.indigo.600` (#4f46e5)
- Text: `text.inverse` (white)
- Hover: `brand.indigo.700` (#4338ca)
- Radius: `radius.8`
- Padding: 12px 24px (vertical × horizontal)
- Font weight: 600 (semibold)
- No shadow at rest; `elevation.soft` on hover
- Focus: 2px solid outline in `border.focus`

**Secondary (Indigo Border)**
- Background: `surface.raised`
- Border: 1px solid `brand.indigo.600`
- Text: `brand.indigo.600`
- Hover: `color.state.hover` background
- Radius: `radius.8`

**Tertiary (Text Link)**
- Background: transparent
- Text: `text.link` (underlined)
- Hover: `brand.indigo.700`
- No padding; inline

### Cards

- Background: `surface.raised`
- Border: 1px solid `border.default`
- Radius: `radius.12`
- Padding: 24px
- Shadow: `elevation.soft`
- Hover: `elevation.medium` (smooth transition)
- Never use heavy borders; whitespace is better

### Form Inputs

- Background: `surface.raised`
- Border: 1px solid `border.default`
- Text: `text.primary`
- Placeholder: `text.tertiary`
- Radius: `radius.8`
- Padding: 12px 16px
- **Focus:** 2px solid `border.focus` outline, no outline-offset
- **Error:** Border color becomes `semantic.danger`; error text in small red caption below field
- **Disabled:** Background `surface.disabled`, text `text.disabled`, cursor not-allowed

### Navigation

- Background: `surface.raised`
- Text (default): `text.secondary`
- Text (selected): `text.primary` with `brand.indigo.600` underline or subtle background tint
- Border: 1px solid `border.default` (if tab-style)
- No visual noise; calm hierarchy

### Empty States

- Icon: `text.tertiary`
- Heading: `text.primary`, h3 size
- Description: `text.secondary`, body size
- Call-to-action: Primary button in indigo
- Never guilt the user; be clear and encouraging

### Error States

- Background: `semantic.danger` with low opacity (e.g., `rgba(239, 68, 68, 0.1)`)
- Border: 1px solid `semantic.danger`
- Text: `semantic.danger` or `text.primary` (never white on red)
- Icon: `semantic.danger` in top left
- Copy: Brief apology, plain language, one next step

---

## Token Usage Checklist

Before shipping any UI change, verify:

- [ ] Colors are from `ellioTokens` or documented exceptions
- [ ] Typography sizes and weights follow presets
- [ ] Spacing is 8px multiples from `spacing` tokens
- [ ] Border-radius uses `radius` tokens
- [ ] Shadows use `elevation` tokens (max `medium`)
- [ ] Transitions use `motion` tokens
- [ ] No hardcoded hex values (except documented brand exceptions)
- [ ] Focus states include visible outline in `border.focus`
- [ ] Disabled states use `surface.disabled` + `text.disabled`
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Button tap targets are minimum 44×44px (mobile)
- [ ] No all-caps text; sentence case only
- [ ] Error copy is gentle and actionable

---

## Before & After: Sample Refactoring

### Before (Hard-coded)

```jsx
<button
  style={{
    background: '#2563eb',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    fontSize: '16px',
    fontWeight: '600',
  }}
>
  Sign up
</button>
```

### After (Using Tokens)

```jsx
import { colors, spacing, radius, elevation, typography } from '@/theme/ellioTokens';

<button
  style={{
    background: colors.brand.indigo[600],
    color: colors.text.inverse,
    padding: `${spacing[4]} ${spacing[8]}`,
    borderRadius: radius[8],
    border: 'none',
    boxShadow: elevation.soft,
    fontSize: typography.size[16],
    fontWeight: typography.weight.semibold,
    cursor: 'pointer',
    transition: `background-color 220ms ${typography.easing}`,
  }}
  onMouseEnter={(e) => (e.currentTarget.style.background = colors.brand.indigo[700])}
>
  Sign up
</button>
```

Or with Tailwind utilities (preferred for Next.js):

```jsx
<button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-2 focus:outline-indigo-600 focus:outline-offset-2">
  Sign up
</button>
```

---

## Tailwind Configuration

The ellio theme maps to these Tailwind utilities:

```javascript
// In tailwind.config.ts (use @tailwindcss/postcss v4)
theme: {
  colors: {
    brand: {
      indigo: { 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca' },
      sky: { 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9' },
    },
    neutral: {
      0: '#ffffff', 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
      300: '#cbd5e1', 500: '#64748b', 700: '#334155', 900: '#0f172a',
    },
    semantic: {
      success: '#10b981', warning: '#f59e0b', danger: '#ef4444', info: '#3b82f6',
    },
    // ... (other tokens)
  },
  fontSize: { '10': '0.625rem', '12': '0.75rem', ... },
  spacing: { '2': '0.5rem', '4': '1rem', ... },
  borderRadius: { '8': '0.5rem', '12': '0.75rem', '16': '1rem', 'full': '9999px' },
}
```

---

## Verification Checklist

Before merging any theme changes:

1. **Build:** `npm run build` completes with no errors
2. **TypeScript:** `tsc --noEmit` shows no type errors
3. **Visual:** Browser inspection of key screens (dashboard, login, form)
4. **Contrast:** WCAG AA checker on all text / button combos
5. **Motion:** Test on low-end device or with `prefers-reduced-motion` enabled
6. **Print:** Ensure PDF export is readable (if applicable)

---

## Related Documents

- **[ELLIO_VOICE.md](ELLIO_VOICE.md)** – Language and tone guidelines
- **[ELLIO_ACCESSIBILITY.md](ELLIO_ACCESSIBILITY.md)** – Detailed accessibility rules
- **[ellioTokens.ts](../src/theme/ellioTokens.ts)** – Code implementation

---

## Version History

| Version | Date       | Changes |
|---------|------------|---------|
| 1.0.0   | 2026-01-26 | Initial canonical design system |

---

**Last Reviewed:** January 26, 2026  
**Next Review:** Quarterly or as brand evolves
