---
trigger: always_on
---

# React Component Standards

## Component Architecture

### Separation of Concerns

- **Containers**: Connect to Redux, handle business logic, pass props to components
- **Components**: Pure presentational, receive data via props only
- **Utils**: Pure functions, no side effects, reusable across project
- **Selectors**: Data transformation and derivation from Redux state
- **Sagas**: Side effects and async operations

### Component Design Principles

- Keep components stateless whenever possible
- Single Responsibility Principle: One component, one purpose
- Composition over inheritance
- Allow containment through props.children
- No dependencies on rest of app outside props

## Functional vs Class Components

### Use Functional Components

- All new components must be functional with hooks
- Class components supported but not recommended
- Lifecycle methods replaced with useEffect
- Local state managed with useState

### Hooks Usage

#### Standard Hooks

- **useState**: Local UI state only
- **useEffect**: Side effects, subscriptions, API calls
  - Be explicit with dependency array
  - Return cleanup functions for subscriptions
  - Avoid infinite loops by managing dependencies carefully
- **useMemo**: Expensive calculations only (don't overuse)
- **useCallback**: Prevent unnecessary child re-renders
- **useRef**: DOM access, storing mutable values that don't trigger re-renders

#### Custom Hooks

- Declare in `/hooks` directory or component-level
- Prefix with "use" (e.g., useFormValidation)
- Extract reusable stateful logic
- Return values and functions for component use

## JSX Standards

### What TO Put in JSX

- Presentational markup and structure
- Props destructuring and usage
- Conditional rendering (boolean only)
- Event handler bindings
- Component composition
- Rendering logic from props

### What NOT TO Put in JSX

- Business logic - belongs in selectors or utils
- API calls - belongs in sagas or useEffect
- Complex data transformations - belongs in selectors
- Direct DOM manipulation - use refs sparingly
- State mutations - use setState or Redux actions

### JSX Best Practices

- Destructure props at function signature: `const Component = ({prop1, prop2}) => {}`
- Return early for null/loading states
- Extract complex conditional JSX to separate components
- Use ternary or && for simple conditionals only
- Avoid inline functions in render (use useCallback)
- Add comments for unclear rendering logic only

## Props Management

### Props Access and Destructuring

```javascript
// GOOD: Destructure at signature level
const Component = ({ title, onClick, children }) => {
  return <button onClick={onClick}>{title}</button>;
};

// BAD: Accessing props object
const Component = (props) => {
  return <button onClick={props.onClick}>{props.title}</button>;
};
```

### Prop Types

- Define PropTypes for ALL components
- Mark required props with .isRequired
- Use shape() for complex objects
- Extract shared PropTypes to shapes.js file
- Provide defaultProps for optional props

### Props Drilling

- Maximum 3 levels of prop drilling
- Beyong 3 levels: Create intermediate container
- Consider React Context for deep tree data
- Use Redux for truly global state

## Local State

### When to Use Local State

- UI-only concerns (modal open/closed, input focus)
- Temporary form data before submission
- Component-specific toggles and flags
- Animation states

### When NOT to Use Local State

- Data from API responses - use Redux
- Shared data between components - use Redux
- Form data managed by react-redux-form - use model
- Data that needs to persist across component unmounts

## Component Complexity

### When to Refactor

- Component exceeds well over 200 lines
- More than 10 props being passed
- Nested ternary operators (>2 levels)
- Duplicate logic across components
- Difficult to write tests for

### Refactoring Strategies

- Extract child components
- Create custom hooks for complex logic
- Move business logic to selectors
- Use composition with props.children
- Split container and presentational concerns

## DOM Access and Manipulation

### Avoid Direct DOM Manipulation

- Stay in React domain whenever possible
- Do NOT use document.querySelector
- Do NOT manipulate DOM with vanilla JS
- Use React refs only when necessary

### When to Use Refs

- Focus management
- Integration with third-party DOM libraries
- Measuring DOM nodes (scroll position, dimensions)
- Triggering imperative animations

### Ref Best Practices

- Use useRef hook in functional components
- Assign refs to DOM elements, not React components
- Access refs in useEffect or event handlers, not render
- Clean up refs in useEffect return function

## Methods Returning JSX

### Create Proper Components

```jsx
// GOOD: Separate component
const FeatureDisplay = ({ feature, value }) => (
  <div>
    {feature}: {value}
  </div>
);

const ParentComponent = ({ data }) => (
  <FeatureDisplay feature={data.name} value={data.value} />
);

// BAD: Method returning JSX
const ParentComponent = ({ data }) => {
  const renderFeature = (name, value) => (
    <div>
      {name}: {value}
    </div>
  );

  return renderFeature(data.name, data.value);
};
```

### Why Proper Components

- Clear component interface (props)
- Easier to test
- Avoids stale closures
- Enables reusability
- Better React DevTools visibility
