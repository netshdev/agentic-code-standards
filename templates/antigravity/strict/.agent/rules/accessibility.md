---
trigger: always_on
---

# Accessibility Standards - STRICT (Zero Tolerance)

## Compliance Requirements - MANDATORY

- WCAG 2.1 Level AA MINIMUM (AAA when possible)
- 100% keyboard accessibility (no exceptions)
- ALL features tested with screen readers before PR approval
- Automated accessibility tests REQUIRED in CI/CD
- Manual accessibility testing MANDATORY for all UI changes

## POUR Principles - Strict Enforcement

### Perceivable - MUST BE ACCESSIBLE

- ALL images MUST have alt text (or alt="" if decorative) - NO EXCEPTIONS
- ALL videos MUST have captions
- ALL audio MUST have transcripts
- Color contrast MUST be 4.5:1 minimum (7:1 for AAA preferred)
- NEVER use color alone to convey information
- Text MUST be resizable up to 200% without loss of content

### Operable - MUST WORK WITH KEYBOARD

- ALL functionality MUST work with keyboard only
- Visible focus indicators REQUIRED (minimum 2px outline)
- Focus order MUST be logical
- NO keyboard traps (zero tolerance)
- NEVER use `tabIndex > 0` (PR rejection if found)
- NO time limits unless user can control them

### Understandable - MUST BE CLEAR

- Proper heading hierarchy (h1 > h2 > h3, NO skipping)
- Semantic HTML MANDATORY (header, nav, main, footer, button)
- Form labels REQUIRED for ALL inputs
- Error messages MUST be clear and actionable
- Language attribute MUST be set on all pages

### Robust - MUST WORK EVERYWHERE

- Valid HTML (pass W3C validator)
- Test with NVDA, JAWS, VoiceOver, TalkBack (ALL required)
- Works with assistive technologies
- Compatible with all major browsers + screen readers

## Implementation Requirements - STRICT

### Screen Reader Support - MANDATORY

- Use semantic HTML FIRST (button, not div with onClick)
- ARIA ONLY when semantic HTML insufficient
- role="alert" MUST be used sparingly (overuse = PR rejection)
- Announce ALL state changes (loading, success, error)
- Test EVERY feature with screen reader before PR

### Form Accessibility - ZERO TOLERANCE

- ALL form fields MUST have associated labels (no visual-only labels)
- Required fields MUST be indicated programmatically
- Error messages MUST be associated with inputs (aria-describedby)
- Form validation MUST happen on blur or submit (not on every keystroke)
- Success confirmations MUST be announced to screen readers

### Interactive Elements - STRICT REQUIREMENTS

- Buttons MINIMUM size: 44x44 CSS pixels (WCAG AAA)
- Links MUST have descriptive text (no "click here", "read more")
- External links MUST indicate new window/tab
- Custom controls MUST have proper ARIA attributes
- ALL custom actions MUST be keyboard accessible

### Mobile Accessibility - MANDATORY

- Touch targets MINIMUM 44x44 pixels
- Pinch-to-zoom MUST be enabled (no viewport user-scalable=no)
- Test with VoiceOver (iOS) AND TalkBack (Android)
- Orientation changes MUST be supported
- Touch gestures MUST have keyboard alternatives

## Testing Requirements - MANDATORY

### Automated Testing - REQUIRED

- axe-core or jest-axe in ALL unit tests
- Lighthouse accessibility score MUST be 100
- pa11y in CI/CD pipeline (build fails on errors)
- ESLint jsx-a11y plugin with ALL rules enabled
- NO eslint-disable for a11y rules without architect approval

### Manual Testing - REQUIRED BEFORE PR

- Keyboard navigation test (Tab, Shift+Tab, Enter, Space, Escape)
- Screen reader test with NVDA (Windows) OR VoiceOver (Mac)
- Color contrast analyzer (ALL text and UI elements)
- Zoom to 200% test (content must remain readable)
- Test with CSS disabled (content must be understandable)

### Testing Checklist - ALL REQUIRED

- [ ] Keyboard navigation works for ALL functionality
- [ ] Visible focus indicators present
- [ ] Focus order is logical
- [ ] Screen reader announces content correctly
- [ ] Color contrast passes 4.5:1 (7:1 preferred)
- [ ] Alt text provided for ALL meaningful images
- [ ] Form labels properly associated
- [ ] Error messages clear and associated
- [ ] NO automatic timeouts
- [ ] NO flashing content
- [ ] Semantic HTML used throughout
- [ ] Zoom to 200% tested and working
- [ ] Mobile touch targets 44x44px minimum

## Prohibited Practices - IMMEDIATE PR REJECTION

### NEVER DO THESE

- NEVER use `tabIndex > 0`
- NEVER use color alone to convey information
- NEVER disable zoom (viewport user-scalable=no)
- NEVER use flashing/blinking content
- NEVER create keyboard traps
- NEVER use non-semantic HTML for interactive elements
- NEVER skip heading levels (h1 to h3)
- NEVER use `role="presentation"` on interactive elements
- NEVER use placeholder as label
- NEVER auto-play audio/video
- NEVER mock screen reader implementations with aria-label hacks

## ARIA - Use ONLY When Necessary

### First Rule of ARIA: Don't Use ARIA

- Use semantic HTML FIRST
- ARIA only when semantic HTML insufficient
- NEVER change semantic meaning with ARIA
- ALL ARIA controls MUST be keyboard accessible

### Allowed ARIA Patterns (Only These)

- `aria-label`: When visual label not present
- `aria-labelledby`: Associate existing label
- `aria-describedby`: Additional description
- `aria-live`: Dynamic content announcements (polite or assertive only)
- `aria-expanded`: Collapsible content state
- `aria-hidden="true"`: Hide decorative elements ONLY
- `aria-invalid`: Form validation errors

### ARIA Violations = PR Rejection

- Incorrect role usage
- Missing required ARIA attributes
- ARIA on non-interactive elements
- Conflicting ARIA and HTML semantics

## Color Contrast - STRICT REQUIREMENTS

### Minimum Ratios (AAA Preferred)

- Normal text: 4.5:1 minimum (7:1 for AAA)
- Large text (18pt+ or 14pt+ bold): 3:1 minimum (4.5:1 for AAA)
- UI components: 3:1 minimum
- Icons: 3:1 minimum
- States (hover, focus, active): 3:1 minimum

### Testing Required

- Use Color Contrast Analyzer tool
- Test ALL color combinations
- Test hover/focus/active states
- Test with grayscale view
- Test with color blindness simulators

## Enforcement

### PR Review Requirements

- Accessibility checklist MUST be completed
- Screen reader testing video/screenshots required for UI changes
- Automated tests MUST pass (100 Lighthouse score)
- Manual testing MUST be documented
- Architect review REQUIRED for custom ARIA usage

### Build Pipeline

- Builds FAIL on accessibility violations
- axe-core violations block merge
- Lighthouse score < 100 blocks merge
- ESLint a11y errors block merge

## Resources - MANDATORY READING

- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WebAIM: https://webaim.org/
