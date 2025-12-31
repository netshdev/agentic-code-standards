---
trigger: always_on
---

# Accessibility Standards (A11y)

## Compliance Requirements

- Follow WCAG 2.1 Level AA standards (striving for 2.2)
- All functionality must be keyboard accessible
- Support screen readers (NVDA, JAWS, VoiceOver, TalkBack)
- Comply with DOT regulations for airline digital accessibility

## POUR Principles

- **Perceivable**: Everyone can "see" this (alt text, captions, sufficient contrast)
- **Operable**: Everyone can operate this (keyboard navigation, no time limits)
- **Understandable**: Everyone can understand this (readable text, predictable behavior)
- **Robust**: All devices can use this (compatible with assistive technologies)

## Implementation Requirements

### Screen Reader Support

- Use semantic HTML (header, nav, main, footer) for proper structure
- All interactive elements must have accessible names
- Use aria-label ONLY when text differs from visible content
- Do NOT overuse role attributes, especially role="alert" (breaks semantic order)
- Announce states properly: "selected", "expanded", "collapsed", "disabled"

### Semantic Order and Focus Management

- Maintain logical reading order matching visual layout
- Use proper heading hierarchy (h1 > h2 > h3, no skipping levels)
- Group related sections with proper ARIA landmarks
- Focus order must follow logical tab sequence
- TabIndex must NEVER be > 0

### Form Accessibility

- All form fields must have associated labels
- Use validateOn: 'change' instead of 'blur' (better for autofill)
- Provide clear error messages
- Indicate required fields
- Support keyboard navigation throughout forms

### Color and Contrast

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text/icons
- Never use color alone to convey information
- Add additional visual indicators: shapes, icons, text, spacing
- Use Color Contrast Analyzer (CCA) during design

### Images and Media

- Provide meaningful alt text for all informative images
- Use alt="" for decorative images
- Avoid image-based text when possible
- Provide captions and transcripts for video/audio
- Never rely solely on visual cues

### Interactive Elements

- Buttons minimum touch target: 24x24 CSS pixels
- Links must have descriptive text (avoid "click here", "learn more")
- External links should indicate new window with extDisclaimer
- All custom actions must be accessible via screen readers

### Mobile Accessibility

- iOS: Use UIAccessibilityCustomAction for custom gestures
- iOS: Announce "double tap to select" for form field buttons
- Android: Use contentDescription for ImageView, ImageButton, CheckBox
- Android: Hint speech already announces custom actions (built-in)
- Test with both VoiceOver (iOS) and TalkBack (Android)

## Testing Requirements

- Perform desk checks with accessibility tools before PR
- Test with keyboard navigation only (no mouse)
- Test with screen readers (VoiceOver, NVDA, JAWS, TalkBack)
- Use automated tools: Axe DevTools, Axe Basic, Lighthouse
- Conduct manual testing with assistive technologies
- Include accessibility acceptance criteria in all user stories

## Prohibited Practices

- Do NOT use flashing/blinking content
- Do NOT disable pinch-to-zoom
- Do NOT use inaccessible PDFs without proper tagging
- Do NOT create complex multi-column layouts
- Do NOT use eslint-disable-line for a11y rules without approval
- Do NOT mock screen reader implementations with aria-label

## Resources

- W3C WCAG Guidelines: https://www.w3.org/WAI/standards-guidelines/wcag/
- MagentaA11y Checklist: https://www.magentaa11y.com/web/
