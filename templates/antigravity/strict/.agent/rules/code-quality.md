---
trigger: always_on
---

# Code Quality Standards - STRICT (Maximum Enforcement)

## Why Maximum Quality Matters

- ZERO tolerance for technical debt
- Production defects are unacceptable
- Code MUST be maintainable by any team member
- Every line of code is reviewed for quality
- Quality metrics MUST be met before merge

### File Organization - ZERO TOLERANCE

- One component per file (no exceptions)
- Maximum file size: 300 lines (includes comments)
- Related files grouped in directories
- Import order MUST be: React, third-party, local (enforced by ESLint)

## Naming Conventions - STRICT ENFORCEMENT

### MUST Follow These Rules

- **Variables**: camelCase, min 3 chars, max 30 chars (isUserAuthenticated)
- **Functions**: camelCase, verb-based (getUserData, not user)
- **Components**: PascalCase, noun-based (UserProfile, not Profile)
- **Constants**: UPPER_SNAKE_CASE (MAX_RETRY_ATTEMPTS)
- **Booleans**: is/has/should prefix (isLoading, hasError, shouldDisplay)
- **Event handlers**: handle prefix (handleClick, handleSubmit)
- **Files**: kebab-case (user-profile.jsx, not UserProfile.jsx)

### Naming Violations = PR Rejection

- Abbreviations (use full words)
- Generic names (data, info, temp, result)
- Single letter variables (except i, j in loops)
- Unclear names (doStuff, process, handle)

## TypeScript - MANDATORY

### Type Safety - STRICT

- TypeScript REQUIRED for ALL new code
- Strict mode enabled in tsconfig.json
- NO `any` type (use `unknown` if needed, with validation)
- NO `@ts-ignore` without written approval
- NO implicit returns
- ALL functions MUST have explicit return types
- ALL props MUST be typed (interfaces, not types)

### Type Violations = PR Rejection

- Any use of `any` type
- Missing type annotations
- Implicit any
- Type assertions without justification

## JavaScript/TypeScript - ZERO TOLERANCE

### Prohibited Patterns - IMMEDIATE REJECTION

- NO `var` declarations (use const/let)
- NO `console.log`, `console.warn`, `console.error` (use logging utility)
- NO `debugger` statements
- NO `==` or `!=` (use `===` and `!==`)
- NO `eval()` or `Function()` constructor
- NO `with` statements
- NO `for...in` loops (use Object.keys(), Object.entries())
- NO `forEach` (use map, filter, reduce, for...of)
- NO anonymous functions as event handlers
- NO `window` or `document` access (use approved utilities)
- NO `Date()` constructor (use moment or date-fns)
- NO mutations of props or state
- NO eslint-disable without architect approval

### Code Metrics - MANDATORY LIMITS

- Maximum function length: 40 lines
- Maximum file length: 300 lines
- Maximum cyclomatic complexity: 10
- Maximum function parameters: 4
- Maximum nesting depth: 3
- Minimum test coverage: 90%

### Function Requirements - STRICT

- Functions MUST be pure when possible (no side effects)
- Functions MUST do ONE thing only
- Functions MUST have explicit return types (TypeScript)
- Functions MUST be documented with JSDoc
- Complex functions MUST include examples in JSDoc

## Component Standards - MAXIMUM ENFORCEMENT

### Component Requirements - ALL MANDATORY

- Functional components with hooks ONLY (no class components)
- Maximum component size: 150 lines (not 200)
- PropTypes AND TypeScript interfaces REQUIRED
- JSDoc comments REQUIRED for all exported components
- Performance budget: <100ms render time
- ALL components MUST be testable (no untestable code)

### Props - STRICT RULES

- Destructure props at function signature (MANDATORY)
- PropTypes marked .isRequired for ALL required props
- defaultProps provided for ALL optional props
- NO prop drilling beyond 2 levels (not 3 - stricter)
- Props MUST be immutable (no mutations)

### Hooks - ZERO TOLERANCE

- useEffect dependencies MUST be complete (exhaustive-deps enforced)
- Cleanup functions REQUIRED for ALL subscriptions
- NO hooks in loops, conditions, or nested functions
- Custom hooks MUST start with "use" prefix
- useCallback REQUIRED for ALL callback props
- useMemo REQUIRED for objects/arrays passed as props

## JSX - STRICT ENFORCEMENT

### MANDATORY Rules

- NO anonymous functions in JSX
- NO inline styles (styled-components or CSS modules ONLY)
- NO array index as key (data-based keys ONLY)
- NO non-boolean conditional rendering
- NO nested ternaries (extract to variables or functions)
- NO complex logic in JSX (extract to functions)
- Fragments `<></>` instead of divs (when no styling needed)

## State Management - STRICT

### Redux - MANDATORY PATTERNS

- Redux Toolkit REQUIRED for ALL state management
- NO Redux Thunk (use Redux Saga only)
- Immutability MUST be maintained (no mutations)
- State MUST be normalized (no nested structures)
- Selectors REQUIRED for ALL state access
- NO direct state access in components

### Local State - STRICT LIMITS

- Local state ONLY for UI (modals, toggles, focus)
- NO business logic in local state
- NO API data in local state (use Redux)
- NO shared state in local state (use Redux)

## Styling - STRICT REQUIREMENTS

### CSS/SCSS - MANDATORY

- Mobile-first approach ONLY (no max-width queries)
- NO `:global` styles (automatic PR rejection)
- Atmos utility classes ONLY (atm-u, not atm-c)
- ALL CSS MUST have parent class selector
- NO `!important` (find proper solution)
- Color contrast MUST meet 4.5:1 (tested with analyzer)

### Performance - MANDATORY

- Critical CSS must be inline
- Non-critical CSS must be deferred
- CSS bundle < 50KB gzipped
- NO unused CSS (purge in build)

## Security - ZERO TOLERANCE

### Mandatory Security Practices

- ALL user inputs MUST be validated with schemas
- ALL data MUST be sanitized before rendering
- ALL API responses MUST be validated
- NO `dangerouslySetInnerHTML` without sanitization
- NO inline event handlers in HTML
- NO sensitive data in localStorage (use secure alternatives)
- NO API keys in code (environment variables ONLY)

### PII/PCI - STRICT COMPLIANCE

- Credit cards MUST show only last 4 digits
- PII MUST be masked in ALL logs
- Passwords MUST NEVER be logged
- Session tokens MUST use httpOnly cookies
- NO PII/PCI data in Redux DevTools

## Testing - 90% COVERAGE MINIMUM

### Coverage Requirements - MANDATORY

- Overall coverage: 90% minimum (not 80%)
- Statement coverage: 90%
- Branch coverage: 85%
- Function coverage: 90%
- Line coverage: 90%
- Coverage decrease = automatic PR rejection

### Test Quality - STRICT

- NO snapshot tests (explicit assertions ONLY)
- NO `test.skip` or `test.only` in committed code
- NO flaky tests (must pass 100% of time)
- Mock ALL external dependencies
- Cleanup ALL mocks with afterEach
- Test names MUST be descriptive

## Performance - STRICT BUDGETS

### Performance Budgets - MANDATORY

- Initial bundle size: <200KB gzipped
- Time to Interactive: <3s on 3G
- Lighthouse performance score: >90
- Largest Contentful Paint: <2.5s
- First Input Delay: <100ms
- Cumulative Layout Shift: <0.1

### Optimization - REQUIRED

- Code splitting REQUIRED for ALL routes
- Lazy loading REQUIRED for images
- Tree shaking REQUIRED
- Bundle analysis REQUIRED before release
- List virtualization REQUIRED for >50 items

## Documentation - MANDATORY

### Required Documentation

- JSDoc for ALL exported functions
- JSDoc for ALL components
- README updates for new features
- CHANGELOG entry for ALL changes
- Architecture Decision Records for major changes
- Migration guides for breaking changes

## PR Requirements - STRICT ENFORCEMENT

### Pre-PR Checklist - ALL REQUIRED

- [ ] ALL tests pass (no exceptions)
- [ ] ZERO linting errors or warnings
- [ ] Coverage at 90%+ (not decreased)
- [ ] Bundle size within budget
- [ ] Performance tests pass
- [ ] Security scan passes (no vulnerabilities)
- [ ] Accessibility audit passes (Lighthouse 100)
- [ ] Self-review completed with checklist
- [ ] Documentation updated

## Enforcement - AUTOMATIC REJECTION

### These Cause Immediate PR Rejection

- Extreme use of `any` type in TypeScript
- console.log statements
- Failing tests
- Coverage below 90%
- Linting errors
- Accessibility score < 100
- Security vulnerabilities
- Bundle size over budget
- Missing documentation
- Incomplete checklist
