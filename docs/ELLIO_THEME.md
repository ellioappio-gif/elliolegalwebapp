# ellio v2.0 - Design Theme Specification

**Version**: 2.0  
**Status**: Canonical (Effective January 26, 2025)  
**Source**: Logo-derived indigo + sky blue palette  
**Principle**: Calm, harmonious, reassuring, non-urgent

---

## Core Principle

**"Not all at once."**

Every visual decision reflects this promise. Users of legal technology are often anxious. Our design must communicate:
- You can take your time
- This will not overwhelm you
- One step is enough
- You can change your mind
- We are here to support you

---

## Brand Colors (Logo-Derived)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.indigo.700` | #4338ca | Deep indigo (high contrast) |
| `brand.indigo.600` | #4f46e5 | PRIMARY: CTAs, links, focus |
| `brand.indigo.500` | #6366f1 | Light indigo accents |
| `brand.indigo.400` | #818cf8 | Very light indigo |
| `brand.sky.600` | #0284c7 | Deep sky accent |
| `brand.sky.500` | #0ea5e9 | Accent highlights |
| `brand.sky.400` | #38bdf8 | SECONDARY: Light accent |
| `brand.sky.300` | #7dd3fc | Subtle backgrounds |

---

## Neutral Palette (Cool, Never Warm)

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral.50` | #f8fafc | DEFAULT BACKGROUND |
| `neutral.100` | #f1f5f9 | Secondary background |
| `neutral.200` | #e2e8f0 | Borders, subtle dividers |
| `neutral.300` | #cbd5e1 | Strong borders |
| `neutral.500` | #64748b | Secondary text, placeholders |
| `neutral.700` | #334155 | PRIMARY TEXT: headings |
| `neutral.900` | #0f172a | STRONGEST CONTRAST TEXT |

**Rule**: Never use pure black (#000000). Maximum contrast is neutral.900 only.

---

## Semantic Colors (Clear But Calm)

| Token | Hex | Background | Usage |
|-------|-----|-----------|-------|
| `semantic.success` | #10b981 | #ecfdf5 | Confirmations |
| `semantic.warning` | #f59e0b | #fffbeb | Caution, review needed |
| `semantic.danger` | #ef4444 | #fef2f2 | Errors, destructive (clear, not alarming) |
| `semantic.info` | #3b82f6 | #eff6ff | Informational notices |

**Rule**: Semantic colors ONLY for semantic meaning, never arbitrary styling.

---

## Surface System (Layered Depth)

- `surface.background`: #f8fafc (page level)
- `surface.subtle`: #f1f5f9 (secondary panels)
- `surface.card`: #ffffff (card surfaces)
- `surface.overlay`: rgba(15,23,42,0.5) (modal dark overlay)

**Rule**: Create visual separation through surface layers, not borders.

---

## Text, Border, State Colors

**Text**:
- `text.primary`: #0f172a (main text, 10:1 contrast AAA)
- `text.secondary`: #334155 (annotations, 8.2:1 AAA)
- `text.tertiary`: #64748b (hints, 6:1 AA)
- `text.placeholder`: #94a3b8 (form hints)
- `text.link`: #4f46e5 (links, always underlined)

**Border**:
- `border.default`: #e2e8f0 (inputs, cards)
- `border.subtle`: #f1f5f9 (light dividers)
- `border.focus`: #4f46e5 (keyboard focus ring)

**State**:
- `state.pressed`: rgba(79, 70, 229, 0.15) (button pressed)
- `state.hover`: rgba(79, 70, 229, 0.08) (hover state)
- `state.selected`: rgba(79, 70, 229, 0.12) (selected item)
- `state.disabled`: rgba(15, 23, 42, 0.04) (disabled, very subtle)

---

## Typography (System Fonts Only)

**Font Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`

**Font Sizes**: 10-40px, all with computed line heights

| Preset | Size | Weight | Line Height | Usage |
|--------|------|--------|-------------|-------|
| display | 40px | 700 | 1.1 | Hero text |
| h1 | 32px | 700 | 1.2 | Main heading |
| h2 | 28px | 700 | 1.3 | Section heading |
| h3 | 24px | 600 | 1.4 | Subsection |
| title | 20px | 600 | 1.5 | Card title |
| body | 16px | 400 | 1.5 | PRIMARY BODY TEXT |
| label | 14px | 500 | 1.5 | Form labels |
| caption | 12px | 400 | 1.5 | Small annotations |

**Rule**: Never arbitrary font sizes. Always use a preset.

---

## Spacing, Radius, Shadow, Motion

**Spacing** (8px scale): 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64

**Radius**: 6 (minimal), 8 (controls), 12 (cards), 16 (large), 24 (hero), full (pills)

**Shadow**:
- none
- soft: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
- medium: `0 4px 6px -1px rgba(15, 23, 42, 0.1), ...`
- large: `0 10px 15px -3px rgba(15, 23, 42, 0.15), ...`

**Motion**:
- fast: 160ms (quick states)
- normal: 220ms (standard)
- slow: 300ms (complex sequences)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (professional, no bounce)

---

## Component Rules

### Buttons
- Height: 44px minimum (tap target)
- Padding: 12px (vertical) x 24px (horizontal)
- Radius: 8px
- States: primary (indigo), secondary (border), tertiary (text), destructive (red, rare), disabled
- Always sentence case. Never all-caps.
- Focus ring: 2px, visible

### Inputs
- Height: 40px minimum
- Border: 1px default, 2px on focus
- Radius: 8px
- Always use `<label htmlFor>`
- Error messages must be blame-free
- Focus ring visible

### Cards
- Padding: 24px
- Radius: 12px
- Border: 1px subtle or soft shadow
- Prefer surfaces over borders

### Navigation
- Selected: underline (not background fill)
- Keyboard support: Tab, Arrows
- Focus ring visible

### Empty / Error / Loading States
- Empty: icon + message + one action
- Error: danger color + blame-free message + fix suggestion
- Loading: spinner + calm message (no countdown)

---

## Accessibility (WCAG AA, AAA)

**Contrast**:
- Text: 4.5:1 minimum (AA), 7:1 preferred (AAA)
- UI components: 3:1 minimum

**Tap Targets**: 44x44 (mobile), 32x32 (desktop), 8px spacing

**Focus Indicators**: 2px, brand.indigo.600, always visible

**Keyboard Navigation**: Full support, no traps, logical tab order

**Semantic HTML**: `<button>`, `<input>`, `<a>`, `<nav>`, `<h1>`, etc.

**Screen Readers**: Semantic HTML first, ARIA labels only when necessary

**Motion**: Respect `prefers-reduced-motion` CSS media query

**Color Blindness**: Safe for all four types (red, green, blue, monochrome)

---

## Voice and Tone

**Core Promise**: "Not all at once."

**Tone Pillars**:
- Calm: measured pace, no urgency
- Transparent: explain what is happening
- Supportive: never blame the user
- Clear: plain language, no jargon
- Brief: sentences under 15 words

**Forbidden**: ASAP, urgent, immediately, hurry, must, required, failed, error, oops, sorry

**Rules**:
- Sentence case only. No all-caps.
- No emoji anywhere.
- Avoid exclamation marks.
- Active voice preferred.
- Never blame the user.

---

## Do and Don't

### Do
- Use tokens for every color, spacing, typography decision
- Maintain heading hierarchy
- Provide generous whitespace
- Underline links
- Visible focus indicators
- Semantic HTML
- Support keyboard navigation
- Test with color-blind simulator
- Write calm, supportive copy

### Don't
- Hard-code colors (use tokens)
- Arbitrary font sizes (use presets)
- All-caps in UI copy
- Emoji
- Remove focus outlines
- Rely on color alone (add icon)
- Urgency language
- Blame users
- Heavy shadows (keep subtle)
- Pure black text
- Bounce animations

---

**Token Total**: 124 core tokens + rules + voice = Enterprise-grade system

"Not all at once." ✨
