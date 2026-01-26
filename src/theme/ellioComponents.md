# ellio Component Usage Guidelines

**Version:** 1.0.0  
**Last Updated:** January 26, 2026  

---

## Overview

This document provides implementation guidance for common UI components in ellio apps. Every component should use tokens from `ellioTokens.ts` and follow these rules.

---

## Buttons

### Primary Button (Indigo)

**Usage:** Main actions, primary CTAs, form submission

```jsx
<button className="bg-brand-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-indigo-700 focus:outline-2 focus:outline-brand-indigo-600 focus:outline-offset-2 transition-colors duration-220">
  Sign up
</button>
```

**CSS Variables (if not using Tailwind):**
```css
background: var(--color-brand-indigo-600);
color: var(--color-text-inverse);
padding: var(--space-4) var(--space-8);
border-radius: var(--radius-8);
font-weight: var(--font-weight-semibold);
border: none;
cursor: pointer;
transition: background-color var(--motion-normal) var(--motion-easing);
```

**Rules:**
- Background: `brand.indigo.600`
- Text: white (`text.inverse`)
- Hover: `brand.indigo.700`
- Padding: 12px × 24px (vertical × horizontal)
- Radius: `radius.8`
- Font weight: 600 (semibold)
- Focus: 2px solid outline in `border.focus`
- No shadow at rest

### Secondary Button (Indigo Border)

**Usage:** Alternative actions, less prominent CTAs

```jsx
<button className="border border-brand-indigo-600 text-brand-indigo-600 bg-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 focus:outline-2 focus:outline-brand-indigo-600 focus:outline-offset-2 transition-colors duration-220">
  Learn more
</button>
```

**Rules:**
- Background: transparent (or white for clarity)
- Border: 1px solid `brand.indigo.600`
- Text: `brand.indigo.600`
- Hover: Light indigo background (opacity wash)
- Focus: Same as primary

### Tertiary Button (Text Link)

**Usage:** Less important actions, optional flows

```jsx
<button className="text-brand-indigo-600 underline bg-none border-none p-0 cursor-pointer hover:text-brand-indigo-700 focus:outline-2 focus:outline-offset-2">
  Skip for now
</button>
```

**Rules:**
- Background: transparent
- Text: `text.link` (underlined)
- Hover: `brand.indigo.700`
- No padding or border

### Danger Button (Destructive)

**Usage:** Delete, remove, logout

```jsx
<button className="bg-semantic-danger text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 focus:outline-2 focus:outline-semantic-danger focus:outline-offset-2 transition-opacity duration-220">
  Delete account
</button>
```

**Rules:**
- Background: `semantic.danger` (#ef4444)
- Text: white
- Hover: Slightly reduced opacity (90%)
- Focus: 2px solid outline in danger color
- Consider: Confirmation modal before action

### Button States

#### Disabled

```jsx
<button disabled className="bg-neutral-200 text-neutral-500 cursor-not-allowed">
  Sign up
</button>
```

**Rules:**
- Background: `surface.disabled` (neutral.100)
- Text: `text.disabled` (neutral.300)
- Cursor: `not-allowed`
- No hover effect

#### Loading

```jsx
<button disabled className="bg-brand-indigo-600 text-white opacity-70">
  <span className="inline-flex items-center gap-2">
    <Loader size={18} className="animate-spin" />
    Saving...
  </span>
</button>
```

**Rules:**
- Disabled state
- Show spinner or skeleton
- Update label to indicate action (e.g., "Saving...")

---

## Cards

### Standard Card

**Usage:** Content containers, list items, dashboard panels

```jsx
<div className="bg-surface-raised border border-border-default rounded-lg p-6 shadow-soft hover:shadow-medium transition-shadow duration-220">
  <h3 className="text-lg font-semibold text-text-primary mb-2">
    Card title
  </h3>
  <p className="text-base text-text-secondary">
    Card content goes here.
  </p>
</div>
```

**CSS:**
```css
background: var(--color-surface-raised);
border: 1px solid var(--color-border-default);
border-radius: var(--radius-12);
padding: var(--space-6);
box-shadow: var(--elevation-soft);
transition: box-shadow var(--motion-normal) var(--motion-easing);
```

**Rules:**
- Background: `surface.raised` (white)
- Border: 1px solid `border.default`
- Radius: `radius.12`
- Padding: 24px
- Shadow: `elevation.soft`
- Hover: `elevation.medium`
- Never use hard borders; whitespace is better

### Highlighted Card

**Usage:** Important content, promotions, CTAs

```jsx
<div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-brand-sky-300 rounded-lg p-6 shadow-soft">
  <h3 className="text-lg font-semibold text-text-primary mb-2">
    Upgrade to Pro
  </h3>
  <p className="text-base text-text-secondary mb-4">
    Unlimited questions, priority support.
  </p>
  <button className="bg-brand-indigo-600 text-white px-6 py-2 rounded-lg font-semibold">
    Upgrade
  </button>
</div>
```

**Rules:**
- Background: Subtle gradient (sky.50 to indigo.50)
- Border: 1px solid `brand.sky.300`
- No heavy shadow (soft only)

---

## Form Controls

### Text Input

**Usage:** Email, name, search, etc.

```jsx
<div className="mb-4">
  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
    Email address
  </label>
  <input
    id="email"
    type="email"
    className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-2 focus:outline-border-focus focus:outline-offset-1 bg-surface-raised text-text-primary placeholder-text-tertiary transition-colors duration-220"
    placeholder="your@email.com"
    aria-describedby="email-help"
  />
  <small id="email-help" className="block mt-1 text-xs text-text-tertiary">
    We'll send a verification link.
  </small>
</div>
```

**CSS:**
```css
border: 1px solid var(--color-border-default);
border-radius: var(--radius-8);
padding: var(--space-3) var(--space-4);
background: var(--color-surface-raised);
color: var(--color-text-primary);
font-size: var(--font-size-16);
```

**Rules:**
- Padding: 12px × 16px
- Radius: `radius.8`
- Border: 1px solid `border.default`
- Focus: 2px solid outline in `border.focus`, offset 1px
- Background: `surface.raised`
- Text: `text.primary`
- Placeholder: `text.tertiary`

### Checkbox & Radio

**Usage:** Options, toggles, selections

```jsx
<div className="flex items-center gap-3 mb-4">
  <input
    id="accept"
    type="checkbox"
    className="w-5 h-5 accent-brand-indigo-600 rounded focus:outline-2 focus:outline-border-focus"
  />
  <label htmlFor="accept" className="text-base text-text-primary">
    I agree to the terms
  </label>
</div>
```

**Rules:**
- Size: 20px × 20px minimum
- Accent color: `brand.indigo.600`
- Must have associated label

### Toggle Switch

**Usage:** Enable/disable settings, feature flags

```jsx
<div className="flex items-center justify-between mb-4">
  <label htmlFor="notifications" className="text-base font-medium text-text-primary">
    Email notifications
  </label>
  <input
    id="notifications"
    type="checkbox"
    className="w-11 h-6 accent-brand-indigo-600 rounded-full"
  />
</div>
```

**Rules:**
- Size: 44px × 24px (width × height)
- Radius: `radius.full`
- Accent: `brand.indigo.600`

### Select Dropdown

**Usage:** Options, filters

```jsx
<select className="w-full px-4 py-3 border border-border-default rounded-lg focus:outline-2 focus:outline-border-focus bg-surface-raised text-text-primary">
  <option value="">Choose an option</option>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
</select>
```

**Rules:**
- Same styling as text input
- Include a placeholder option
- Avoid long option lists (consider combobox)

### Form Error

**Usage:** Validation feedback

```jsx
<div className="mb-4">
  <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
    Password
  </label>
  <input
    id="password"
    type="password"
    className="w-full px-4 py-3 border-2 border-semantic-danger rounded-lg bg-surface-raised text-text-primary"
    aria-describedby="password-error"
  />
  <small id="password-error" className="block mt-2 text-sm text-semantic-danger flex items-center gap-1">
    <AlertCircle size={16} />
    Password must be at least 6 characters.
  </small>
</div>
```

**Rules:**
- Border: 2px solid `semantic.danger`
- Error message in small red text below field
- Associated via `aria-describedby`
- Include icon if space permits

---

## Navigation

### Tab Navigation

**Usage:** Switching between content sections

```jsx
<div className="border-b border-border-default mb-6">
  <nav className="flex gap-0 -mb-px">
    <button className="px-4 py-3 border-b-2 border-brand-indigo-600 text-text-primary font-medium">
      Overview
    </button>
    <button className="px-4 py-3 border-b-2 border-transparent text-text-secondary font-medium hover:text-text-primary">
      Settings
    </button>
  </nav>
</div>
```

**Rules:**
- Selected: `brand.indigo.600` underline, `text.primary`
- Unselected: `text.secondary`, transparent underline
- Hover: `text.primary`
- Smooth transition
- No background color (keep clean)

### Breadcrumbs

**Usage:** Navigation hierarchy, location awareness

```jsx
<nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
  <a href="/dashboard" className="text-brand-indigo-600 underline hover:text-brand-indigo-700">
    Dashboard
  </a>
  <span>/</span>
  <a href="/dashboard/documents" className="text-brand-indigo-600 underline hover:text-brand-indigo-700">
    Documents
  </a>
  <span>/</span>
  <span className="text-text-primary">Contract.pdf</span>
</nav>
```

**Rules:**
- Size: 14px
- Links are underlined in indigo
- Separators: `/` or `>` in neutral gray
- Current page: `text.primary`, not a link

---

## Modals & Overlays

### Modal Container

**Usage:** Confirmations, forms, information

```jsx
<div className="fixed inset-0 bg-surface-overlay flex items-center justify-center p-4 z-50">
  <div className="bg-surface-raised rounded-lg p-8 shadow-large max-w-md w-full">
    <h2 className="text-lg font-semibold text-text-primary mb-4">
      Confirm action
    </h2>
    <p className="text-base text-text-secondary mb-6">
      Are you sure? This action can't be undone.
    </p>
    <div className="flex gap-3">
      <button className="flex-1 px-4 py-2 bg-neutral-100 text-text-primary rounded-lg font-semibold hover:bg-neutral-200">
        Cancel
      </button>
      <button className="flex-1 px-4 py-2 bg-semantic-danger text-white rounded-lg font-semibold hover:opacity-90">
        Delete
      </button>
    </div>
  </div>
</div>
```

**Rules:**
- Overlay: `surface.overlay` (semi-transparent dark)
- Card: `surface.raised`, radius `radius.16`, shadow `elevation.large`
- Padding: 32px
- Focus trap inside modal
- Close button (X) in top right or on Escape key

---

## Empty States

**Usage:** No data, no results, starting point

```jsx
<div className="text-center py-12 px-6">
  <FileText size={48} className="text-text-tertiary mx-auto mb-4" />
  <h2 className="text-xl font-semibold text-text-primary mb-2">
    No documents yet
  </h2>
  <p className="text-base text-text-secondary mb-6">
    Upload your first document or ask the AI assistant.
  </p>
  <button className="bg-brand-indigo-600 text-white px-6 py-3 rounded-lg font-semibold inline-block">
    Upload document
  </button>
</div>
```

**Rules:**
- Icon: Large (48px), `text.tertiary` color
- Heading: `text.primary`, title size (20px)
- Description: `text.secondary`, body size
- CTA: Primary button
- Padding: 48px vertical

---

## Error States

**Usage:** Failed actions, system errors

```jsx
<div className="bg-semantic-danger bg-opacity-10 border border-semantic-danger rounded-lg p-6 mb-6">
  <div className="flex gap-4">
    <AlertCircle size={24} className="text-semantic-danger flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-semibold text-text-primary mb-1">
        Something went wrong
      </h3>
      <p className="text-sm text-text-secondary mb-4">
        We couldn't save your changes. Check your internet and try again.
      </p>
      <button className="text-sm text-semantic-danger font-semibold hover:underline">
        Try again
      </button>
    </div>
  </div>
</div>
```

**Rules:**
- Background: `semantic.danger` at 10% opacity
- Border: 1px solid `semantic.danger`
- Icon: `semantic.danger`, left-aligned
- Text: `text.primary` for title, `text.secondary` for description
- CTA: Link in danger color
- Padding: 24px

---

## Loading & Skeleton States

**Usage:** Data fetching, delays

```jsx
<div className="space-y-4">
  <div className="h-12 bg-neutral-200 rounded-lg animate-pulse" />
  <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
  <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2" />
</div>
```

**Rules:**
- Background: `neutral.200`
- Radius: Match expected element
- Animation: Gentle pulse (not flashing)
- Keep layout stable (reserve space)

---

## Lists

### Simple List

```jsx
<ul className="space-y-2">
  <li className="flex items-center gap-3 text-base text-text-primary">
    <Check size={20} className="text-semantic-success flex-shrink-0" />
    Item one
  </li>
  <li className="flex items-center gap-3 text-base text-text-primary">
    <Check size={20} className="text-semantic-success flex-shrink-0" />
    Item two
  </li>
</ul>
```

### List with Separators

```jsx
<div className="divide-y divide-border-default">
  <div className="py-4 px-0">Item one</div>
  <div className="py-4 px-0">Item two</div>
  <div className="py-4 px-0">Item three</div>
</div>
```

**Rules:**
- Spacing between items: 8px (0.5rem)
- Icons left-aligned, smaller (18–20px)
- Text: `text.primary` for labels

---

## Implementation Notes

### Tailwind Classes

ellio apps use Tailwind CSS v4. Key utility classes:

```css
/* Spacing */
px-4 py-3      /* Padding: 16px horizontal, 12px vertical */
gap-4          /* Gap between flex/grid items: 16px */
mb-6           /* Margin bottom: 24px */

/* Colors */
bg-brand-indigo-600    /* Background */
text-text-primary      /* Text color */
border-border-default  /* Border */

/* Shadows */
shadow-soft            /* Subtle shadow */
shadow-medium          /* Medium shadow */

/* Radius */
rounded-lg   /* radius.8 (8px) */
rounded-xl   /* radius.12 (12px) */
rounded-2xl  /* radius.16 (16px) */

/* Transitions */
transition-colors duration-220   /* Color change, 220ms */
```

### CSS Variables (Fallback)

If not using Tailwind, define as CSS variables:

```css
:root {
  /* Colors */
  --color-brand-indigo-600: #4f46e5;
  --color-text-primary: #0f172a;
  /* ... etc */

  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Motion */
  --motion-normal: 220ms;
  --motion-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

**For more details, see [ELLIO_THEME.md](../ELLIO_THEME.md)**
