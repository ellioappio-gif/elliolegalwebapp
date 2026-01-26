# ellio Component Rules

**Version**: 2.0  
**Status**: Canonical constraints for all components  
**Reference**: src/theme/ellio-v2.0/tokens.rules.ts

---

## Button Component

### Rules

- **Minimum height**: 44px (iOS tap target standard)
- **Padding**: 12px vertical x 24px horizontal
- **Border radius**: 8px (radius.8)
- **Font**: body preset (16px, 400 weight) or label preset (14px, 500 weight)
- **Case**: Always sentence case. NEVER all-caps.
- **Focus ring**: 2px border, brand.indigo.600, offset 1px, visible on all browsers
- **Maximum characters**: 30 (including spaces)
- **Loading state**: Show spinner, disable interaction, show loading text optional

### States

| State | Background | Border | Text | Cursor |
|-------|-----------|--------|------|--------|
| Default (Primary) | brand.indigo.600 | none | neutral.0 | pointer |
| Hover | brand.indigo.600 | none | neutral.0 | pointer |
| Pressed | state.pressed overlay | none | neutral.0 | pointer |
| Disabled | neutral.200 | none | text.tertiary | not-allowed |
| Focused | brand.indigo.600 | border.focus 2px | neutral.0 | pointer |

### Secondary Variant

| State | Background | Border | Text | Notes |
|-------|-----------|--------|------|-------|
| Default | none | border.default 1px | text.primary | Outline only |
| Hover | state.hover overlay | border.default 1px | text.primary | Subtle fill |
| Pressed | state.pressed overlay | border.default 1px | text.primary | Stronger fill |
| Disabled | none | border.default 1px (40% opacity) | text.tertiary | Muted |
| Focused | none | border.focus 2px | text.primary | Focus ring |

### Tertiary Variant (Text-Only)

| State | Background | Border | Text | Notes |
|-------|-----------|--------|------|-------|
| Default | none | none | text.link | Text only |
| Hover | state.hover overlay | none | text.link | Light fill |
| Pressed | state.pressed overlay | none | text.link | Stronger fill |
| Disabled | none | none | text.tertiary | Muted |
| Focused | none | border.focus 2px | text.link | Focus ring |

### Destructive Variant (Use Sparingly)

Only for confirmatory actions (are you sure?). NEVER for casual interactions.

| State | Background | Border | Text | Notes |
|-------|-----------|--------|------|-------|
| Default | semantic.danger | none | neutral.0 | Clear red, not alarming |
| Hover | semantic.danger | none | neutral.0 | Slightly darker |
| Pressed | state.pressed overlay | none | neutral.0 | Visual feedback |
| Disabled | neutral.200 | none | text.tertiary | Muted |
| Focused | semantic.danger | border.focus 2px | neutral.0 | Focus ring |

### Accessibility

- Minimum tap target: 44x44 on all platforms
- Focus ring must be visible without browser defaults
- Label must be meaningful (not "Click me" or "Submit")
- ARIA label optional if label is visible text
- Disabled buttons must not be in tab order

### Do and Don't

**Do**:
- Use sentence case: "Save document"
- Provide clear, action-oriented labels
- Show loading state during async operations
- Make disabled state visually distinct
- Test focus ring on multiple browsers

**Don't**:
- All-caps: "SAVE DOCUMENT"
- Vague labels: "Submit", "OK"
- Change layout on state (padding/height must stay same)
- Remove focus outline (style it instead)
- Use red for non-destructive actions

---

## Input Component

### Rules

- **Minimum height**: 40px (44px with padding)
- **Padding**: 10px vertical x 12px horizontal
- **Border**: 1px, border.default; 2px on focus
- **Border radius**: 8px (radius.8)
- **Font**: body preset (16px, 400 weight)
- **Placeholder color**: text.placeholder (#94a3b8), not gray
- **Label required**: All inputs must have associated `<label htmlFor="input-id">`

### States

| State | Border | Border Color | Background | Text Color | Notes |
|-------|--------|--------------|-----------|-----------|-------|
| Default | 1px | border.default | surface.card | text.primary | Idle state |
| Hover | 1px | border.default | surface.card | text.primary | No visual change |
| Focused | 2px | border.focus | surface.card | text.primary | Strong focus ring |
| Error | 2px | semantic.danger | surface.card | text.primary | Error indicator |
| Disabled | 1px | border.default (40% opacity) | surface.subtle | text.tertiary | Read-only |
| Filled | 1px | border.default | surface.card | text.primary | Content present |

### Error Handling

- Error state: 2px border semantic.danger
- Error message below input: semantic.danger text, 12px, label preset
- Error icon optional: semantic.danger on left of message
- Error must explain issue and suggest fix
- Never blame: "Email is invalid" not "You entered wrong email"

### Focus Requirements

- Focus ring: 2px, brand.indigo.600 (#4f46e5)
- Offset: 1px from input edge
- Visible on all browsers (Firefox, Chrome, Safari, Edge)
- Never remove; style if needed

### Accessibility

- Label with `htmlFor` attribute (not placeholder)
- Placeholder: gray, not black, clearly distinguished from value
- Clear focus indicator (2px ring)
- Error messages associated with input (aria-describedby or inline)
- Support autocomplete and password managers
- Support browser autofill styling
- Minimum font size: 14px (prevents zoom on iOS)

### Do and Don't

**Do**:
- Use `<label>` with `htmlFor`
- Show error immediately on blur or form submission
- Provide helpful error messages
- Support copy/paste
- Auto-select on focus (optional but helpful)

**Don't**:
- Hide labels (accessibility fail)
- Use placeholder as label
- Blame user in error messages
- Disable spellcheck without reason
- Use `<input type="text">` for emails/numbers (use `type="email"`, `type="number"`)

---

## Card Component

### Rules

- **Padding**: 24px (spacing.24)
- **Border radius**: 12px (radius.12)
- **Background**: surface.card (#ffffff)
- **Border**: 1px, border.default (optional)
- **Shadow**: shadow.soft (default) or shadow.medium (on hover)
- **Minimum width**: 280px (readable content)
- **Spacing between cards**: 16px (spacing.16)

### Content Rules

- **Title**: h3 preset (24px, 600 weight)
- **Body**: body preset (16px, 400 weight)
- **Spacing inside card**: 24px padding, 16px between sections

### States

| State | Shadow | Border | Background | Notes |
|-------|--------|--------|-----------|-------|
| Default | shadow.soft | border.default 1px | surface.card | At rest |
| Hover | shadow.medium | border.default 1px | surface.card | Subtle lift |
| Pressed | shadow.soft | border.default 1px | state.pressed overlay | Interaction |
| Disabled | shadow.soft | border.default 1px (40% opacity) | surface.subtle | Muted |

### Do and Don't

**Do**:
- Use consistent padding (24px)
- Add title and description for clarity
- Use subtle shadows (soft or medium)
- Stack cards with consistent spacing
- Use consistent border styling

**Don't**:
- Heavy shadows (use soft or medium only)
- Mix borders and shadows
- Padding less than 24px (too cramped)
- Nested cards (use list structure instead)
- Multiple shadows layered

---

## Navigation Component

### Rules

- **Tab height**: 44px minimum
- **Padding**: 12px vertical x 16px horizontal
- **Font**: label preset (14px, 500 weight)
- **Border radius**: 8px (radius.8) if background
- **Selected indicator**: Bottom border or background fill (not both)

### States

| State | Background | Border | Text | Notes |
|-------|-----------|--------|------|-------|
| Default | none | none | text.primary | Inactive tab |
| Hover | state.hover overlay | none | text.primary | Subtle fill |
| Selected | none | border-bottom 2px brand.indigo.600 | text.primary | Underline style (preferred) |
| Disabled | none | none | text.tertiary | Read-only |
| Focused | none | border.focus 2px | text.primary | Keyboard focus |

### Keyboard Navigation

- **Tab**: Move to next tab
- **Shift+Tab**: Move to previous tab
- **Arrow Right/Down**: Move to next tab (if managed focus)
- **Arrow Left/Up**: Move to previous tab (if managed focus)
- **Home**: First tab
- **End**: Last tab
- **Enter**: Activate (if not auto-activating)

### Accessibility

- Semantic `<nav>` element or role="tablist"
- ARIA role="tab", aria-selected="true/false", aria-controls
- Focus visible on keyboard navigation
- No keyboard traps
- Labels must be clear (not "Tab 1", use "Documents")

### Do and Don't

**Do**:
- Use semantic HTML (`<nav>`, roles)
- Support keyboard navigation
- Make selected state clear
- Use text labels
- Underline for selected (preferred over background)

**Don't**:
- Mix underline and background fill
- Use emoji in tabs
- Hide selected state
- Create keyboard traps
- Use only color to indicate selection (add underline/icon)

---

## Form Validation Messages

### Rules

- **Position**: Below or adjacent to input
- **Color**: semantic.danger for errors
- **Font**: caption preset (12px, 400 weight)
- **Icon**: Optional, semantic.danger icon
- **Tone**: Blame-free, helpful, clear

### Error Message Template

```
[Icon] What went wrong in plain language. [One suggestion or next step.]
```

### Examples

**Good**:
- "Email address looks incorrect. Check spelling and try again."
- "Password must be at least 8 characters."
- "This email is already registered. Try signing in instead."

**Bad**:
- "ERROR"
- "Invalid input"
- "You entered wrong email"
- "FAILED TO VALIDATE"

### Success Message (Optional)

- Color: semantic.success
- Font: caption preset
- Icon: semantic.success icon
- Tone: Brief, quiet confirmation ("All set" or "Saved")

---

## Empty State Component

### Rules

- **Icon**: Optional, 48-64px, text.tertiary color
- **Heading**: h3 preset (24px, 600 weight), text.primary
- **Description**: body preset (16px, 400 weight), text.secondary
- **Action**: One primary button below description
- **Spacing**: 48px between sections

### Copy Rules

- Explain what is missing (not "No data")
- Suggest next action
- Never use urgency language
- Be supportive and calm

### Example Structure

```
[Icon (optional)]
Heading: "No documents yet"
Description: "You haven't uploaded any documents. Upload your first document to get started."
[Primary Button: "Upload document"]
```

---

## Error State Component

### Rules

- **Background**: semantic.dangerBg (#fef2f2)
- **Border**: 1px semantic.danger (optional)
- **Icon**: semantic.danger, 24px
- **Heading**: h3 preset, semantic.danger color
- **Description**: body preset, text.primary
- **Suggested action**: One button (primary or secondary)
- **Spacing**: 24px padding

### Tone Rules

- Explain what happened (not just "Error")
- Suggest the fix or next step
- Never blame the user
- Be clear and direct

### Example

```
[Error Icon]
Heading: "Could not save document"
Description: "The file was too large. Try a file smaller than 10 MB."
[Button: "Try another file"]
```

---

## Loading State Component

### Rules

- **Indicator**: Spinner (24px), text.tertiary color
- **Message**: Optional, body preset, text.secondary
- **Duration**: Show progress or time estimate if >2 seconds
- **Never**: Countdown, timeout warnings, urgency language

### Example Structure

```
[Spinner]
"Processing your request..."
```

---

## Summary: Component Compliance

Every component MUST:
1. Use tokens for colors, spacing, typography
2. Minimum tap target 44x44 (mobile)
3. Visible focus ring (2px, brand.indigo.600)
4. Semantic HTML (`<button>`, `<input>`, `<label>`)
5. Support keyboard navigation
6. Accessible for screen readers
7. Maintain calm, harmonious aesthetic
8. Use sentence case (no all-caps)
9. No emoji
10. Blame-free error messaging

---

"Not all at once." - Consistent components make this promise real.

✨
