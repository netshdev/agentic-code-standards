---
trigger: always_on
---

# Pull Request Standards - STRICT (Maximum Enforcement)

## PR Requirements - ALL MANDATORY

### Pre-PR Checklist - MUST BE COMPLETE

- [ ] ALL tests pass locally (100% pass rate)
- [ ] ZERO linting errors or warnings
- [ ] Coverage at 90%+ (component coverage 100%)
- [ ] Bundle size within budget (<200KB gzipped)
- [ ] Performance tests pass (Lighthouse >90)
- [ ] Security scan passes (zero vulnerabilities)
- [ ] Accessibility audit passes (Lighthouse 100)
- [ ] Type checking passes (zero TypeScript errors)
- [ ] Self-review completed with full checklist
- [ ] Documentation updated (README, JSDoc)
- [ ] CHANGELOG.md updated
- [ ] Migration guide written (if breaking changes)
- [ ] Desk check completed with accessibility tools
- [ ] Screen reader testing completed (for UI changes)

### PR Description - STRICT FORMAT REQUIRED

```markdown
## Description

[Clear explanation of changes and WHY, not just WHAT]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Related Issues

Fixes #[issue-number]
Relates to #[issue-number]

## Testing

### Test Coverage

- Previous: X%
- Current: Y%
- Change: +Z%

### Manual Testing

- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on Edge
- [ ] Tested on mobile (iOS)
- [ ] Tested on mobile (Android)
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (NVDA/VoiceOver)

### Testing Instructions

1. Step-by-step instructions to test the changes
2. Include specific test cases
3. Include edge cases tested

## Performance Impact

- Bundle size change: +X KB
- Lighthouse score: X/100
- Load time impact: +X ms
- Render time: X ms

## Accessibility Impact

- Lighthouse accessibility score: 100/100
- Keyboard navigation: Fully supported
- Screen reader: Tested with [NVDA/VoiceOver]
- Color contrast: All ratios >4.5:1

## Screenshots/Videos

[Include for ALL UI changes]

### Before

[Screenshot/video of old behavior]

### After

[Screenshot/video of new behavior]

## Breaking Changes

[If any, list them with migration instructions]

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Coverage maintained/increased
- [ ] Accessibility tested
- [ ] Performance tested
```
