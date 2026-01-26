# ellio Voice & Tone Guide

**Version:** 1.0.0  
**Status:** Canonical language system  
**Last Updated:** January 26, 2026  

---

## Overview

The ellio voice is **calm, supportive, transparent, and non-urgent.** Every word we write reflects our core promise: **"Not all at once."**

Users come to ellio with complex legal questions and anxiety. Our job is to meet them with clarity, reassurance, and human-centered guidance—never rushing them, never making them feel inadequate.

---

## Voice Pillars

### 1. **Calm**
We speak in a measured, unhurried tone. No exclamation marks. No urgency. No hype.

**Instead of:**
- "Act now!"
- "Don't miss out!"
- "Everything will be fine!"

**We say:**
- "When you're ready."
- "You can save this for later."
- "Let's take this one step at a time."

### 2. **Supportive**
We are the user's advocate, not the system. We acknowledge their concerns, celebrate small wins, and never judge.

**Instead of:**
- "Invalid input."
- "You must update your profile."
- "Error: Field required."

**We say:**
- "We need a bit more info here."
- "Let's add your location when you have a moment."
- "A phone number helps us reach you. Skip for now if you prefer."

### 3. **Transparent**
We explain what's happening and why. No jargon without definition. No surprise actions.

**Instead of:**
- "Processing..."
- "Saving changes." (to where? for what?)
- "Verification pending."

**We say:**
- "Checking your information (this may take a moment)."
- "Saving your profile to your account."
- "We've sent a link to confirm your email. Check your inbox."

### 4. **Non-Urgent**
We respect the user's pace. Legal matters don't need to be resolved today. We create space for thoughtful decisions.

**Instead of:**
- "Complete your profile immediately."
- "Add payment information now."
- "Verify your identity today."

**We say:**
- "You can complete your profile anytime."
- "Payment information is only needed if you upgrade."
- "We'll ask you to verify when you first chat with a lawyer."

### 5. **Non-Judgmental**
We never make users feel small, foolish, or behind. We acknowledge that legal processes are complex.

**Instead of:**
- "You should have..."
- "Why haven't you..."
- "This is a common mistake."

**We say:**
- "It's worth understanding this before proceeding."
- "Here are a few things to consider."
- "Let us help clarify this."

---

## Language Rules

### Grammar & Style

| Rule | Example |
|------|---------|
| **Sentence case, never all-caps** | "Sign up" not "SIGN UP" |
| **Oxford comma** | "clarity, warmth, and action" |
| **No exclamation marks** | "You're all set." not "You're all set!" |
| **No emoji** | Text only; let whitespace breathe |
| **Active voice preferred** | "You can save documents" not "Documents can be saved" |
| **Second person (you/your)** | "Your documents" not "User documents" |
| **Contractions are OK** | "You're" is warmer than "You are" |
| **Short words, short sentences** | Max 15 words per sentence for UI copy |

### Tone Across Contexts

#### Onboarding / Welcome

**Goal:** Make the user feel supported, not tested.

**Do:**
- "Let's get you started."
- "A few quick questions, and you're good to go."
- "Tell us about yourself at your own pace."

**Don't:**
- "Complete all required fields."
- "You need to provide..."
- "The following information is mandatory."

#### Success States

**Goal:** Celebrate progress, however small.

**Do:**
- "You're all set."
- "Your email is confirmed. Welcome."
- "Your profile is ready. You can add more details later."

**Don't:**
- "Success."
- "Operation completed."
- "Profile updated." (show what changed)

#### Error States

**Goal:** Apologize briefly, explain clearly, offer a path forward.

**Do:**
- "We couldn't save that. Email might already be in use. Want to sign in instead?"
- "Looks like the password was too short. We need at least 6 characters."
- "That link expired. We can send you a new one."

**Don't:**
- "Error 422."
- "Invalid request."
- "Password must contain at least one uppercase letter, one number, and one special character." (list rules separately)

#### Loading States

**Goal:** Reassure the user that something is happening.

**Do:**
- "Checking your information..."
- "Sending you a verification email..."
- "Loading your documents..."

**Don't:**
- "Loading" (with no context)
- "Processing request" (too technical)
- "Please wait." (patronizing)

#### Empty States

**Goal:** Guide the user toward their next action.

**Do:**
- "No documents yet. Upload your first one or ask the AI assistant."
- "No saved lawyers. Browse our network or let the AI recommend someone."
- "No messages yet. Start a conversation or ask a question."

**Don't:**
- "No data."
- "The list is empty."
- "You don't have anything here." (guilt)

#### Disabled / Unavailable

**Goal:** Explain why and when.

**Do:**
- "Payment information required to upgrade. Add payment when ready."
- "2FA setup is available after you verify your email."
- "This feature is coming soon." (or: "We're still building this.")

**Don't:**
- "Not available."
- "Disabled."
- "This feature is not yet available." (clunky)

#### Confirmations / Destructive Actions

**Goal:** Clear consequences, one-step-at-a-time.

**Do:**
- "Delete this saved lawyer? You can add them back anytime."
- "Sign out of all devices? You'll need to log in again on each one."
- "Clear all notifications? This can't be undone."

**Don't:**
- "Are you sure?"
- "Confirm action."
- "This action is permanent." (too forceful)

---

## Copy Patterns

### Button Labels

**Verb + Noun when possible:**
- "Add payment"
- "Save profile"
- "Send message"
- "Delete account"

**Single verb OK when clear:**
- "Next" (in wizard flow)
- "Skip" (optional steps)
- "Cancel" (when action is clear)

**Avoid:**
- "Yes" / "No" (use specific action)
- "OK" (too generic)
- "Submit" (say what you're submitting)

### Form Labels

**Short, clear, no colons:**
- "Your name"
- "Email address"
- "Phone number (optional)"

**Help text below:**
- "We'll use this to send you updates."
- "Just in case you forget your password."

**Avoid:**
- "Input Name Here"
- "Enter your email address to proceed"
- "Required *" (mark optional fields instead; assume required)

### Hints & Microcopy

**Micro-moments of reassurance:**
- "You can change this anytime."
- "Only you can see this."
- "We'll keep this secure."
- "No spam, ever."

### Notification Copy

**Pattern: [What happened] [When relevant, why] [What's next if action needed]**

- "Your email is confirmed. Enjoy full access."
- "Sarah replied to your message. Read it."
- "Your password was changed. Sign in again if on another device."

---

## Special Cases

### Legal / Compliance Language

Necessary legal disclaimers are unavoidable. But they don't have to sound frightening.

**Do:**
- Use a smaller font size and lighter color for legal text
- Lead with user benefit: "We protect your privacy. See our policy."
- Put full policies in separate docs; only essential info inline

**Don't:**
- Mix legal tone with conversational tone (jarring)
- Bury consent in long paragraphs
- Use LEGAL ALL-CAPS

### Technical Language

Never assume the user understands:
- "API"
- "Token"
- "SSL"
- "Webhook"
- "Verification code"
- "Session"

**Define or avoid:**
- Don't: "Your session expired."
- Do: "You were signed out for security. Sign in again to continue."

### Numbers & Dates

- Use words for 1–10: "You have three unsaved changes."
- Use numerals for 11+: "You have 24 messages."
- Dates: "January 26, 2026" or "Today at 2:30 PM" (relative is better)
- Times: "220 milliseconds" or "less than a second" (avoid technical units in copy)

### Pluralization

Be precise; don't hide counts:
- "You have 1 document."
- "You have 2 documents."
- Not: "You have 1 document(s)."

---

## Voice in Context

### Settings / Preferences

**Goal:** Empower, not prescribe.

**Do:**
- "Get notified when someone replies." (checkbox)
- "Email me a weekly summary." (optional)
- "Save my activity." (off by default, privacy-first)

**Don't:**
- "Subscribe to notifications." (too corporate)
- "Allow ellio to collect data." (phrased as a favor from user)

### Help Text / FAQs

**Goal:** Anticipate confusion, answer once, clearly.

**Do:**
- "Q: Why did you ask for my location?"
- "A: We match you with lawyers in your state for accurate local advice."

**Don't:**
- "Q: Location?"
- "A: Required field." (unhelpful)

### Error Recovery

**Goal:** One clear next step, no guilt.

**Do:**
- "Can't connect right now. Check your internet, then try again."
- "Oops, that email is already in use. Sign in or reset your password."

**Don't:**
- "Network error."
- "Email already exists."
- "Please try again later." (too passive)

---

## Writing Checklist

Before shipping any copy, ask:

- [ ] Is it sentence case (not all-caps)?
- [ ] Is it 15 words or fewer (for UI copy)?
- [ ] Does it say what happens next?
- [ ] Is it from the user's perspective ("You", "Your")?
- [ ] Would a non-technical person understand it?
- [ ] Did I avoid "must", "required", "must not"?
- [ ] Did I use positive language over negative?
- [ ] Is there an encouraging tone, even in errors?
- [ ] Did I remove redundant words?
- [ ] Does it fit with other ellio copy?

---

## Examples: Before & After

### Onboarding

**Before:**
```
Welcome to ellio. Complete the following required fields to create your account:
1. Full Name (required)
2. Email Address (required)
3. Password (min. 8 characters, 1 uppercase, 1 number, 1 special char) (required)
...
```

**After:**
```
Welcome. Let's set up your account.

Your name
Email address
Password (at least 8 characters)
...
```

### Error

**Before:**
```
Error 422: Unprocessable Entity. Invalid email format.
```

**After:**
```
That email doesn't look right. Check for typos and try again.
```

### Success

**Before:**
```
Document uploaded successfully. Processing...
```

**After:**
```
Document uploaded. We'll analyze it in a moment.
```

### Loading

**Before:**
```
Loading... Please wait.
```

**After:**
```
Finding the right lawyer for you...
```

---

## Related Documents

- **[ELLIO_THEME.md](ELLIO_THEME.md)** – Visual design and token system
- **[ELLIO_ACCESSIBILITY.md](ELLIO_ACCESSIBILITY.md)** – Readability and inclusive language

---

## Version History

| Version | Date       | Changes |
|---------|------------|---------|
| 1.0.0   | 2026-01-26 | Initial voice and tone system |

---

**Last Reviewed:** January 26, 2026  
**Next Review:** Quarterly or as product strategy evolves
