# ellio Accessibility Guidelines

**Version:** 1.0.0  
**Status:** Canonical accessibility rules  
**Last Updated:** January 26, 2026  

---

## Overview

Accessibility is not a feature; it's a requirement. The ellio theme is designed to be inclusive by default, with clear rules for contrast, typography, interaction, and semantic HTML.

All ellio applications must meet **WCAG 2.1 AA** as a minimum. Aiming for AAA on critical paths (auth, payments, help).

---

## Color Contrast

### Primary Text on Backgrounds

**Requirement: 4.5:1 (WCAG AA) or 7:1 (WCAG AAA)**

| Foreground | Background | Contrast | Standard |
|-----------|-----------|----------|----------|
| `text.primary` (#0f172a) | `surface.background` (#f8fafc) | 10:1 | AAA ✓ |
| `text.primary` (#0f172a) | `surface.raised` (#ffffff) | 10:1 | AAA ✓ |
| `text.secondary` (#334155) | `surface.background` (#f8fafc) | 8.2:1 | AAA ✓ |
| `text.secondary` (#334155) | `surface.raised` (#ffffff) | 8.2:1 | AAA ✓ |
| `text.tertiary` (#64748b) | `surface.background` (#f8fafc) | 5.8:1 | AA ✓ |
| `text.tertiary` (#64748b) | `surface.raised` (#ffffff) | 5.8:1 | AA ✓ |
| `text.link` (#4f46e5) | `surface.background` (#f8fafc) | 6:1 | AA ✓ |
| `text.link` (#4f46e5) | `surface.raised` (#ffffff) | 6:1 | AA ✓ |

### Interactive Elements

**Requirement: 3:1 (WCAG AA) for UI components like buttons and borders**

| Foreground | Background | Contrast | Standard |
|-----------|-----------|----------|----------|
| `brand.indigo.600` button | `surface.raised` | 5.2:1 | AA ✓ |
| `border.default` (#e2e8f0) | `surface.raised` (#ffffff) | 2.5:1 | AA ✗ |

**Note:** Borders don't need 3:1 if they're purely decorative. For interactive borders (form fields, tabs), ensure 3:1 with adjacent background.

### Semantic Colors

| Color | Usage | Contrast Requirement |
|-------|-------|---------------------|
| `semantic.success` (#10b981) | Text, icon | 4.5:1 on white |
| `semantic.warning` (#f59e0b) | Text, icon | 4.5:1 on white |
| `semantic.danger` (#ef4444) | Error text | 4.5:1 on white |
| `semantic.info` (#3b82f6) | Info icon, text | 4.5:1 on white |

### Contrast Checking

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [APCA](https://www.myndex.com/APCA/) (newer, research-based)
- VS Code: [Peacock](https://marketplace.visualstudio.com/items?itemName=johnpapa.peacock) or browser DevTools color picker

**Rule:** Before shipping any custom color, run it through a contrast checker.

### Failures to Avoid

- Never use light gray text on white
- Never use white text on light gray
- Never use light blue on light gray
- Never use color as the only way to indicate state (always add text or icon)

---

## Typography & Readability

### Font Size Scales

**Mobile (max-width: 640px):**
- Display: 28px (down from 40px)
- H1: 24px (down from 32px)
- H2: 20px (down from 28px)
- Body: 16px (same)

**Tablet & Desktop:**
- As defined in `typography.size`

### Line Length

**Optimal:** 50–75 characters (including spaces)  
**Maximum:** 100 characters

**Rule:** Wider screens use 2–3 columns to keep line length comfortable.

### Line Height

| Context | Line Height | Rule |
|---------|-----------|------|
| Headings | 1.2 | Tight, calm |
| Body text | 1.5 | Readable, airy |
| Long form | 1.75 | Very loose, low density |

### Font Size Minimums

- **Body text:** Never below 14px (0.875rem)
- **UI labels:** Never below 12px (0.75rem)
- **Captions:** 12px minimum (0.75rem)
- **Don't make exceptions:** All users should be able to read without zooming

### Font Weight

**Readability rules:**
- Regular (400) weight for body text
- Medium (500) weight for labels and small headings
- Semibold (600) for headings
- Bold (700) rarely used; if used, apply only to single words or short phrases

**Avoid:** 300 weight; too light and hard to read.

### No Text Justification

Use `text-align: left` or `text-align: center` only. Justified text creates uneven spacing that is hard for dyslexic users to parse.

### Avoid Italics for Extended Text

Italic is harder to read for users with dyslexia. Use bold for emphasis in body text instead.

---

## Interaction & Touch Targets

### Minimum Touch Target Size

**Mobile:** 44px × 44px (recommended by Apple & Google)  
**Desktop:** 32px × 32px (smaller OK, but 44px preferred)

**Rule:** All buttons, checkboxes, radio buttons, and links must be at least 44×44px (touch).

### Spacing Between Targets

**Minimum:** 8px (0.5rem) of space between interactive elements  
**Recommended:** 16px (1rem) for dense UIs

**Reason:** Prevents accidental taps and reduces cognitive load.

### Focus Indicators

**Required:** Every interactive element must have a visible focus state.

```css
outline: 2px solid #4f46e5;      /* border.focus */
outline-offset: 2px;
```

**Rules:**
- Focus ring must be visible on all browsers
- No removing default focus indicator without a visible replacement
- Focus color must contrast 3:1 with adjacent colors
- Focus ring can be 2px or 3px (thicker is more visible)

### Keyboard Navigation

**Rules:**
- Tab order must be logical and match visual flow
- No keyboard traps (user must be able to tab away)
- Skip links for navigating past repetitive content
- Focus management in modals (trap focus inside modal until closed)

### No Time-Limited Interactions

**Avoid:** Auto-closing modals, expiring messages, countdown timers  
**If required:** Warn user in advance; extend time on request

---

## Semantic HTML

### Button vs. Link

**Use `<button>` for:**
- Submitting forms
- Triggering actions (delete, save, upload)
- Opening modals
- Toggling states

**Use `<a>` for:**
- Navigation to a page or external URL
- Linking to a document or resource

**Never use `<div onClick>` as a button.** This breaks keyboard navigation and screen readers.

### Form Accessibility

**Rules:**
- Every `<input>` must have a `<label>` with `htmlFor` attribute
- Fieldsets should group related inputs
- Error messages must be associated via `aria-describedby`
- Required fields: Use `required` attribute; avoid "*" alone

```jsx
<label htmlFor="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  aria-describedby="email-help"
  required
/>
<small id="email-help">We'll send a verification link here.</small>
```

### Headings

**Rules:**
- Use semantic `<h1>`, `<h2>`, `<h3>` tags (not divs styled as headings)
- One `<h1>` per page
- Headings must be in sequential order (no jumping from h2 to h4)
- Don't skip heading levels for styling

### Lists

**Use `<ul>` for unordered, `<ol>` for ordered lists:**

```jsx
<ul>
  <li>Upload a document</li>
  <li>Ask the AI assistant</li>
  <li>Chat with a lawyer</li>
</ul>
```

### Images & Icons

**Rules:**
- Decorative images: `alt=""` (empty string, screen readers skip)
- Informative images: `alt="Description of image"` (concise)
- Icons alone (no text): Must have `aria-label="Action name"` or `title="Action name"`

```jsx
<button aria-label="Close dialog">
  <X size={24} />
</button>
```

---

## Keyboard & Screen Reader Testing

### Essential Tests

**Keyboard Navigation:**
1. Tab through entire page
2. Focus order should match visual flow
3. All interactive elements must be keyboard accessible
4. No keyboard traps

**Screen Reader (NVDA, JAWS, VoiceOver):**
1. Turn on screen reader
2. Navigate by headings: Listen to page structure
3. Navigate by links: Ensure link text is descriptive
4. Test form submission
5. Test error messages

### Using ARIA

**Use ARIA only when native HTML isn't available.**

Common attributes:
- `aria-label="Action name"` – Label for icon buttons
- `aria-describedby="id"` – Link to description (e.g., error message)
- `aria-hidden="true"` – Hide decorative elements from screen readers
- `aria-live="polite"` – Announce dynamic content updates
- `role="alert"` – Announce errors immediately

**Avoid:**
- Overusing ARIA (native HTML is better)
- Generic ARIA labels like `aria-label="button"`
- ARIA on non-interactive elements (e.g., `role="button"` on `<div>`)

---

## Mobile Accessibility

### Orientation

**Rule:** Don't lock to portrait or landscape unless necessary (e.g., video recording app).

### Text Zoom

**Rule:** Content must remain readable and usable at 200% zoom (browser zoom, not mobile font size).

### Touch & Gestures

**Avoid:**
- Touch gestures more complex than tap, double-tap, long-press
- Swiping as the only way to navigate
- Hover-only affordances (not available on touch)

### Motion & Animation

**Rule:** Respect `prefers-reduced-motion` media query.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Color-Blind Friendly Design

### Don't Rely on Color Alone

**Bad:** Red button for delete, green for confirm  
**Good:** Red button with trash icon, green with checkmark

### Color Palette for Color-Blind Users

**Deuteranopia (red-green):** Use blue + yellow, blue + orange  
**Protanopia (red-green):** Use blue + yellow, blue + orange  
**Tritanopia (blue-yellow):** Use red + cyan, magenta + green

**Rule:** ellio's indigo + sky blue palette is safe for all three types.

### Checking Accessibility

- [Coblis Color Blind Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- VS Code: [Color Blindness Emulator](https://marketplace.visualstudio.com/items?itemName=f3rno.color-blindness-emulator)

---

## Dyslexia-Friendly Design

### Typography

- Use sans-serif fonts (ellio's system font stack is good)
- Avoid italics in body text; use bold for emphasis
- Increase line-height (ellio uses 1.5 for body)
- Adequate left-aligned text
- Avoid justified text (uneven spacing)

### Layout

- Use short paragraphs and sentences
- Clear, concise language
- Use lists instead of dense text
- Ample whitespace

### Color

- Avoid red text on dark backgrounds
- Avoid white text on bright backgrounds
- Use warm backgrounds (off-white) over pure white

---

## Testing Checklist

Before shipping:

- [ ] Contrast checker: All text 4.5:1 or higher
- [ ] Keyboard navigation: Tab through entire page
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Screen reader: Test with NVDA or VoiceOver
- [ ] Form labels: All inputs have labels
- [ ] Error messages: Associated with form fields
- [ ] Touch targets: 44×44px minimum
- [ ] Zoom test: 200% zoom is readable
- [ ] Color blindness: No critical info is color-only
- [ ] Motion: Respects `prefers-reduced-motion`
- [ ] Semantic HTML: Proper heading order, no divs as buttons
- [ ] Alt text: Images have descriptive alt (or alt="")

### Automated Tools

- [axe DevTools](https://www.deque.com/axe/devtools/) – Chrome/Firefox extension
- [WAVE](https://wave.webaim.org/) – Browser extension
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) – Built into Chrome DevTools
- [Pa11y](https://pa11y.org/) – Command-line tool

---

## Inclusive Language

### Avoid Ableist Language

| Avoid | Use |
|-------|-----|
| "Blind link" | "Link with vague text" |
| "Deaf to feedback" | "Unresponsive" |
| "Crippled" | "Limited" |
| "Lame" | "Weak" or "Poor" |

### Be Gender Neutral

- Use "they/their" if you don't know the person's pronouns
- Avoid "he/she"; use "you" when addressing the user

### Avoid Jargon Without Explanation

- Don't assume technical knowledge
- If you must use jargon, define it inline or in a tooltip

---

## Resources

- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** – Official standards
- **[WebAIM](https://webaim.org/)** – Practical guides and tools
- **[A11y Project Checklist](https://www.a11yproject.com/checklist/)** – Quick reference
- **[Accessible Color Palettes](https://accessible-colors.com/)**

---

## Version History

| Version | Date       | Changes |
|---------|------------|---------|
| 1.0.0   | 2026-01-26 | Initial accessibility guidelines |

---

**Last Reviewed:** January 26, 2026  
**Next Review:** Quarterly or as standards evolve
