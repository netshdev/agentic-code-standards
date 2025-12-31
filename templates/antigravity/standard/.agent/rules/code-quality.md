---
trigger: always_on
---

# Code Quality and Standards

## Why Code Quality Matters

- Prevents production defects and reduces technical debt
- Ensures maintainable and debuggable code
- Enables predictable enhancements without side effects
- Reduces legal, security, and brand risks
- Improves developer experience and team efficiency

## Folder Structure and Architecture

- Follow strict pod-based architecture
- Structure: `<podName>/<flowName>/container/<containerName>`
- Structure: `<podName>/<flowName>/component/<componentName>`
- Structure: `<podName>/<flowName>/feature/<featureName>`
- Structure: `<podName>/common/utils|constants|feature`
- Structure: `/common/<domainName>/utils|constants|feature`
- Do NOT breach pod boundaries without architecture approval

## Naming Conventions

- **Variables**: camelCase (thisIsAVariable)
- **Functions**: camelCase (thisIsAFunction)
- **Constants**: UPPER_SNAKE_CASE (THIS_IS_A_CONSTANT)
- **Acronyms**: UPPER_CASE (TIA = "This Is an Acronym")
- **Components**: PascalCase (ThisIsAComponent)
- **Object Props**: camelCase ({amount: 1, currency: 'USD'})
- **URLs**: lowercase with "-" or "/" separators
- Use descriptive names, avoid abbreviations (shouldDisplayTravelWaiverMessage NOT shouldDsplyTrvlWavrMsg)

## JavaScript Best Practices

### General Rules

- Use ES6+ syntax (arrow functions, destructuring, template literals)
- Prefer `const` over `let`, avoid `var` completely
- Avoid `let` whenever possible - seek immutability
- No anonymous functions as event handlers - declare named functions
- Remove all console.log and debugger statements before PR
- No eslint-disable-line without architecture team approval

### Prohibited or Restricted Patterns

- Do NOT use `window` object (except with arch team clearance)
- Do NOT import entire lodash library: `import get from 'lodash/get'` (allowed but discouraged)
- Do NOT use `Date()` - use moment instead
- Do NOT use `forEach` - use map, filter, reduce, or for...of
- Do NOT use "will" lifecycle methods except componentWillUnmount
- Do NOT trust BFF responses - always validate and set defaults
- Do NOT use `tabIndex > 0`

### Props and State Management

- Destructure props at function signature level
- Avoid prop drilling beyond 3 levels - use intermediate containers
- Use Redux for global state, local state only for UI-specific concerns
- Required props: Mark functions and data needed for functionality as required
- PropTypes: Define in external file at wrapper level for reusability
- Use null chain operator for service responses with mapper layer

### Pure Functions and Complexity

- Write pure functions whenever possible (no side effects)
- Functions should do one thing well
- Maximum function length: 50 lines
- Remove dormant (dead) code immediately
- Refactor when components exceed 200 lines
- Extract complex logic to utility functions or selectors

### Data Handling

- Always validate service responses with null checks
- Create mappers between services and store
- Use selectors for all data transformations
- Move data processing from render to selectors
- Use constants file for string values and configuration

## Component Standards

### Component Types

- Prefer functional components with hooks over class components
- Use PureComponent ONLY if props are immutable (primitives or ImmutableJS)
- Stateless pure presentational components preferred
- Return `false` instead of `null` to keep children linked to tree

### React Hooks

- **useEffect**: Stay reactive, be mindful of dependencies array
- **useMemo**: Use for expensive calculations only
- **useCallback**: Use to prevent unnecessary re-renders
- **useRef**: Bridge between JS DOM and React context
- Custom hooks: Declare at component level or in hooks directory

### Component Requirements

- All components must have PropTypes defined
- Provide defaultProps for optional props
- Use fragments `<></>` instead of empty divs
- Keys must come from data props, NOT array index or random IDs
- Conditional rendering: All conditionals must be boolean (non-boolean values render)
- Avoid prop drilling: Use intermediate containers beyond 3 levels

### JSX Best Practices

- Presentational components should receive data via props only
- No business logic in JSX components - use selectors
- Extract methods returning JSX as separate components
- Use memoization for expensive rendering logic
- Keep components small and reusable (<200 lines)
- One responsibility per component

## Styling

### CSS/SCSS Standards

- Use mobile-first approach (avoid max-width)
- Do NOT use `:global` without architecture approval
- Use `atm-u` utility classes, NOT `atm-c` component classes
- All CSS must have parent class selector (no global impact)
- Use Atmos components and design system
- Maintain 4.5:1 contrast ratio for text, 3:1 for UI elements

### Emotion/CSS-in-JS

- Follow Atmos styling patterns
- Use JSON theme values when available
- Avoid inline styles unless absolutely necessary

## Redux and State Management

### Redux Patterns

- Use Redux Toolkit for all new state management
- Local state for UI-only concerns (modals, tooltips)
- Global state for shared data and server responses
- Do NOT use react-redux-form state - use model instead
- Define actions and reducers in feature folders

### Sagas

- Follow saga implementation patterns
- Handle async operations in sagas, not components
- Use try-catch for error handling
- Implement request/response cycle properly
- Maintain immutability with "Current" record pattern

## Internationalization (i18n)

- Use `<FormattedMessage>` instead of `intl.formatMessage` in JSX
- Extract messages after every change (provide screenshot for context)
- Verify scope and ID match file location
- Do NOT send variable messages to intl - validate existence with defaults
- Inject intl at container level only once

## Security and PII

- Mask credit cards: First 12 digits as asterisks/bullets, last 4 visible
- Follow PII masking guidelines for all personal data
- No PCI/PII data in logs or monitoring
- Validate and sanitize all user inputs
