# ellio Design System Governance

**Version**: 2.0  
**Effective**: January 26, 2025  
**Status**: Binding for all ellio applications

---

## Purpose

This governance document establishes the process for maintaining, updating, and enforcing the ellio design system across all current and future applications. The goal is to prevent drift, ensure consistency, and enable rapid development without sacrificing quality.

---

## Design System Ownership

**System Authority**: Design System Core Team  
**Approval**: Design Lead + Technical Lead  
**Emergency Override**: None (all changes require approval)

---

## Versioning Strategy

### Version Format

- Major: `2.0` (breaking changes, not allowed without org-wide coordination)
- Minor: `2.1`, `2.2` (new tokens, backward compatible)
- Patch: `2.0.1`, `2.0.2` (bug fixes, corrections)

### Current Version

**Canonical**: v2.0  
**Release Date**: January 26, 2025  
**Support**: All new features and apps must use v2.0

### Deprecation Policy

- Legacy theme (`v1.0`) remains available in `src/theme/legacy/` for 12 months
- No new development in legacy theme
- Migration to v2.0 required for all apps by Dec 31, 2025
- After 12 months, legacy theme removed entirely

---

## Change Process

### Category 1: Non-Breaking Additions (Fast Track)

**Examples**: New color, new font size, new spacing token, new component rule documentation

**Approval**: One reviewer (Design Lead or Technical Lead)  
**Process**:
1. Create PR with rationale and usage examples
2. Add to changelog (CHANGELOG.md)
3. Merge to main
4. Deploy documentation

**Timeline**: 1-3 days

### Category 2: Breaking Changes (Careful Track)

**Examples**: Color hex value change, font stack change, size scale change, component constraint change

**Approval**: Design Lead + Technical Lead + any affected app owner  
**Process**:
1. File issue with detailed rationale
2. Design and code review
3. Update all affected applications
4. Comprehensive testing
5. Coordination release plan
6. Merge to main with migration guide

**Timeline**: 1-2 weeks  
**Must Include**:
- Backward compatibility layer (if possible)
- Migration script or guide
- List of all affected applications
- Testing checklist

### Category 3: Emergency Corrections (Crisis Track)

**Examples**: Critical accessibility bug (WCAG violation), security issue, runtime error

**Approval**: One reviewer + stakeholder notification within 4 hours  
**Process**:
1. Create hotfix branch
2. Minimal change only
3. Test thoroughly
4. Merge directly to main
5. Notify all app teams immediately
6. Applications deploy within 24 hours

**Timeline**: Same day  
**Must Include**:
- Root cause analysis
- Verification that fix resolves issue
- Follow-up with full review process

---

## Proposal Template

```markdown
## Design System Change Proposal

### Title
[One-line description]

### Category
[ ] Non-Breaking Addition (Fast Track)
[ ] Breaking Change (Careful Track)
[ ] Emergency Correction (Crisis Track)

### Description
[Detailed explanation and rationale]

### Affected Areas
- [ ] Color tokens
- [ ] Typography tokens
- [ ] Spacing/radius tokens
- [ ] Component rules
- [ ] Voice and tone
- [ ] Accessibility rules

### Impact Assessment
- Apps affected: [List]
- WCAG compliance: [Impact on accessibility]
- Performance: [Any impact]
- Breaking changes: [Yes/No and list]

### Migration Plan (if breaking)
[Detailed steps for affected apps]

### Examples
[Before/after code or screenshots]

### Testing Checklist
- [ ] Color contrast verified (WCAG AA minimum)
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Mobile tap targets verified
- [ ] Responsive design tested
- [ ] No new console warnings

### Approval
- [ ] Design Lead review
- [ ] Technical Lead review
- [ ] Affected app owners sign-off (if breaking)
```

---

## Enforcement Mechanisms

### Automated Enforcement

**Theme Audit Script** (`scripts/theme_audit.sh`):
- Runs on every PR
- Detects hard-coded colors outside allowed files
- Detects arbitrary font sizes or weights
- Detects arbitrary spacing values
- Fails CI if violations found

**Linting Rules** (if configured):
- ESLint rule: no hard-coded colors
- ESLint rule: no arbitrary font values
- StyleLint rule (if using CSS): no inline colors

### Manual Enforcement

**Code Review Checklist** (all PRs):
1. Are all colors using tokens?
2. Are all font sizes using presets?
3. Are all spacing values using spacing scale?
4. Is copy consistent with voice rules?
5. Are focus indicators visible?
6. Are tap targets minimum 44x44?
7. Are semantic HTML elements used correctly?

**Design Review** (for any visual changes):
1. Do surfaces and colors match the palette?
2. Is typography hierarchy maintained?
3. Is spacing consistent with 8px scale?
4. Are buttons, inputs, cards using correct radius?
5. Is the overall aesthetic calm and harmonious?

---

## Documentation Requirements

### Tokens

Every token must have:
- Hex value (or CSS value)
- Semantic name (what it's for)
- Usage example
- Accessibility notes (if applicable)

### Component Rules

Every component rule must have:
- Minimum/maximum dimensions
- Padding and spacing rules
- Focus and hover states
- Accessibility constraints
- Code example

### Voice Rules

Every voice rule must have:
- Do and don't examples
- Tone description
- Copy templates for common cases

---

## Breaking Change Examples

### Example 1: Color Value Adjustment (Breaking)

**Scenario**: Primary indigo (#4f46e5) is adjusted to #4f46e8 for slight branding tweak

**Why Breaking**: Any app hard-coding #4f46e5 will now be inconsistent

**Approval Required**: Design Lead + Technical Lead  

**Process**:
1. Update `tokens.colors.ts`
2. Grep all apps for hard-coded #4f46e5
3. Update all found occurrences
4. Add to migration guide
5. Coordinate with app teams
6. Merge with note in commit message

### Example 2: New Spacing Token (Non-Breaking)

**Scenario**: Add spacing.18 (18px) for additional gap option

**Why Non-Breaking**: Only an addition; existing code unaffected

**Approval Required**: One reviewer  

**Process**:
1. Add to `tokens.layout.ts`
2. Document usage
3. Merge to main
4. Update documentation

---

## Rollback Policy

### Rollback Timeline

- **0-1 hour after merge**: Revert immediately
- **1-24 hours after merge**: Create fix branch, merge fix
- **>24 hours after merge**: Create fix branch, comprehensive testing before merge

### Rollback Checklist

- [ ] Identify root cause
- [ ] Create issue with details
- [ ] Revert or fix on branch
- [ ] Test thoroughly
- [ ] Notify all app teams
- [ ] Merge with clear commit message

---

## Design System Health Checks

**Quarterly Review** (every 3 months):
- [ ] All apps using v2.0 (or planned migration date met)
- [ ] No critical accessibility violations
- [ ] No hard-coded values in app code
- [ ] Theme audit script passes on all apps
- [ ] Documentation is accurate and complete

**Annual Review** (every 12 months):
- [ ] Design system still aligned with brand promise ("Not all at once")
- [ ] All WCAG AA requirements met or exceeded
- [ ] Performance impact assessed
- [ ] Designer and developer feedback collected
- [ ] Plan major releases or deprecations

---

## Communication Plan

### When Proposing Changes

1. **Slack**: Announce proposal in #design-system channel
2. **Issue**: Create GitHub issue with proposal template
3. **Review**: 3-business-day review window minimum
4. **Decision**: Design Lead + Technical Lead decision by day 3

### When Merging Changes

1. **Changelog**: Add entry to CHANGELOG.md
2. **Slack**: Announce merge in #design-system and #engineering
3. **Docs**: Update relevant documentation
4. **Apps**: If breaking, notify app owners within 24 hours

### When Emergency Correction

1. **Slack**: Immediate notification in #design-system
2. **Email**: Urgent notification to all app owners
3. **PR**: Link to PR in notifications
4. **Verification**: Confirm affected apps can deploy fix within 24 hours

---

## Token Stability Guarantees

### Guaranteed Stable (100% backward compatible)

- Hex values of colors (never change without 2-week notice)
- Font sizes (never remove; can add new sizes)
- Spacing values (never remove; can add new values)
- Component accessibility rules (only increase strictness with migration plan)

### May Change with Notice

- Component constraints (with 2-week deprecation notice)
- Recommended usage (guidance only; backward compatible)
- Examples and best practices (no code impact)

### Never Changed Without 4-Week Notice + Migration Plan

- Color palette (breaking change)
- Font stack (breaking change)
- Spacing scale (breaking change)
- Core component rules (breaking change)

---

## FAQ

**Q: Can I hard-code a color if I think the token is wrong?**  
A: No. Raise an issue or PR to correct the token. Never hard-code.

**Q: Can I add a new token without approval?**  
A: Non-breaking additions only (Fast Track). File PR, one review, merge.

**Q: What if I disagree with a design decision?**  
A: Raise an issue with detailed rationale and evidence. Design Lead will review.

**Q: How do I migrate an app from v1.0 to v2.0?**  
A: See migration guide in src/theme/ellio-v2.0/MIGRATION.md (TBD).

**Q: Can I extend the design system for my app?**  
A: Only if generally applicable. App-specific styles go in app code, not system.

**Q: What if an app needs something the system doesn't provide?**  
A: File an issue. If broadly useful, add to system (Fast Track). If app-only, add to app code.

---

## Contacts

- **Design System Lead**: [TBD]
- **Technical Lead**: [TBD]
- **Slack Channel**: #design-system
- **Issue Template**: See .github/ISSUE_TEMPLATE/design-system-change.md

---

"Not all at once." - and that includes changes to the design system. Careful, measured governance ensures consistency without stagnation.

✨
