---
trigger: always_on
---

# React Component Standards - STRICT (Maximum Quality)

## Component Architecture - MANDATORY

### Separation of Concerns - STRICT

- **Containers**: Redux connection ONLY (no JSX, max 50 lines)
- **Components**: Pure presentational ONLY (no business logic)
- **Utils**: Pure functions ONLY (no side effects, fully testable)
- **Selectors**: Data transformation ONLY (no side effects, memoized)
- **Sagas**: Side effects ONLY (no direct state mutations)

### Component Design - ZERO TOLERANCE

- Components MUST be stateless when possible
- Single Responsibility Principle (ONE purpose ONLY)
- Maximum component size: 150 lines (not 200)
- NO dependencies outside props (complete isolation)
- NO side effects in render

## Functional Components - MANDATORY

### Requirements - ALL ENFORCED

- Functional components with hooks ONLY
- Class components = automatic PR rejection
- TypeScript REQUIRED with explicit types
- PropTypes AND TypeScript interfaces (both required)
- JSDoc comments REQUIRED

### Component Structure - STRICT ORDER

```typescript
/**
 * ComponentName description
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // 1. Hooks (in order: useState, useEffect, useCallback, useMemo, useRef)
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // side effects
    return () => cleanup();
  }, [dependencies]); // dependencies MUST be complete

  const handleEvent = useCallback(() => {
    // handler logic
  }, [dependencies]);

  const computedValue = useMemo(() => {
    return expensiveCalculation();
  }, [dependencies]);

  // 2. Early returns
  if (!prop1) return null;
  if (error) return <ErrorMessage />;

  // 3. Render
  return <div>{/* JSX */}</div>;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

## Hooks - STRICT ENFORCEMENT

### useState - STRICT RULES

- UI-only state (modals, toggles, focus)
- NO business logic in state
- NO API data in state (use Redux)
- Explicit types REQUIRED

```typescript
// CORRECT
const [isOpen, setIsOpen] = useState<boolean>(false);

// INCORRECT
const [isOpen, setIsOpen] = useState(false); // missing type
```

### useEffect - ZERO TOLERANCE

- Dependencies array REQUIRED (no empty array without justification)
- Cleanup function REQUIRED for subscriptions
- NO async functions directly (use async inside)
- exhaustive-deps ESLint rule MUST pass

```typescript
// CORRECT
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, [dependency1, dependency2]);

// INCORRECT - missing cleanup
useEffect(() => {
  subscribe();
}, [dependency]);
```

### useCallback - REQUIRED FOR ALL CALLBACKS

- ALL callback props MUST use useCallback
- ALL event handlers passed as props MUST use useCallback

```typescript
// CORRECT
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// INCORRECT - will cause re-renders
const handleClick = () => {
  doSomething(value);
};
```

### useMemo - REQUIRED FOR OBJECTS/ARRAYS AS PROPS

- ALL objects passed as props MUST use useMemo
- ALL arrays passed as props MUST use useMemo
- Expensive calculations MUST use useMemo

```typescript
// CORRECT
const user = useMemo(
  () => ({
    name,
    email,
  }),
  [name, email]
);

// INCORRECT - new object on every render
const user = { name, email };
```

### useRef - STRICT USAGE

- DOM access ONLY (no alternative state storage)
- Access in useEffect or event handlers ONLY (not in render)
- Cleanup in useEffect return REQUIRED

```typescript
// CORRECT
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

// INCORRECT - accessing in render
const value = inputRef.current?.value; // NO!
```

## Custom Hooks - MANDATORY PATTERNS

- Prefix with "use" (REQUIRED)
- Return array or object (consistent pattern)
- Document with JSDoc
- Test in isolation

```typescript
/**
 * Custom hook for form validation
 * @param {string} value - Value to validate
 * @returns {Object} Validation result
 */
const useFormValidation = (value: string): ValidationResult => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // validation logic
  }, [value]);

  return { isValid, error };
};
```

## Props - MAXIMUM ENFORCEMENT

### Props Requirements - ALL MANDATORY

- Destructure at function signature (REQUIRED)
- TypeScript interface REQUIRED
- PropTypes REQUIRED (in addition to TypeScript)
- Mark required props with .isRequired
- defaultProps for ALL optional props
- NO prop drilling beyond 2 levels (stricter than standard)

```typescript
// CORRECT - Full typing
interface Props {
  title: string;
  count?: number;
  onSubmit: () => void;
}

const Component: React.FC<Props> = ({ title, count = 0, onSubmit }) => {
  return (
    <div>
      {title}: {count}
    </div>
  );
};

Component.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

// INCORRECT - Missing types or destructuring
const Component = (props) => {
  // NO!
  return <div>{props.title}</div>;
};
```

## Props Validation - STRICT

- Validate ALL props (PropTypes + TypeScript)
- NO any type for props
- NO optional props without defaults
- Complex objects MUST have shape definitions

## JSX - ZERO TOLERANCE

### MANDATORY Rules - ALL ENFORCED

- NO anonymous functions (declare all handlers)
- NO inline styles (styled-components ONLY)
- NO array index as key
- NO non-boolean conditional rendering
- NO nested ternaries (max depth: 1)
- NO complex logic (extract to functions)
- Semantic HTML REQUIRED

```typescript
// CORRECT
const handleClick = useCallback(() => {
  doSomething();
}, []);

return (
  <button onClick={handleClick}>{isLoading ? <Spinner /> : "Submit"}</button>
);

// INCORRECT - multiple violations
return (
  <div onClick={() => doSomething()}>
    {" "}
    {/* anonymous function */}
    {count && <Display />} {/* non-boolean */}
    {a ? (b ? c : d) : e} {/* nested ternary */}
  </div>
);
```

### Conditional Rendering - STRICT

```typescript
// CORRECT - Boolean condition
{
  isLoggedIn && <Dashboard />;
}
{
  isLoading ? <Spinner /> : <Content />;
}

// INCORRECT - Can render "0"
{
  count && <Display />;
} // NO! Use count > 0

// INCORRECT - Nested ternary
{
  a ? (b ? c : d) : e;
} // NO! Extract to function
```

### Lists - STRICT REQUIREMENTS

```typescript
// CORRECT - Key from data
{
  users.map((user) => <UserCard key={user.id} {...user} />);
}

// INCORRECT - Index as key
{
  users.map((user, index) => (
    <UserCard key={index} {...user} /> // REJECTED!
  ));
}
```

## Component Complexity - STRICT LIMITS

### When to Refactor - MANDATORY

- Component exceeds 150 lines (HARD LIMIT)
- More than 8 props (HARD LIMIT)
- More than 5 hooks (HARD LIMIT)
- Cyclomatic complexity > 10
- Any nested ternaries
- Duplicate logic

### Refactoring - REQUIRED

- Extract child components immediately
- Create custom hooks for complex logic
- Move business logic to selectors
- Use composition pattern
- Split container and component

## DOM Access - SEVERELY RESTRICTED

### Prohibited - AUTOMATIC REJECTION

- NO document.querySelector
- NO document.getElementById
- NO direct DOM manipulation
- NO window object access
- NO document object access

### Allowed - ONLY WITH JUSTIFICATION

- useRef for focus management
- useRef for third-party library integration
- useRef for measuring (with cleanup)

## Performance - STRICT REQUIREMENTS

### Optimization - ALL REQUIRED

- React.memo for ALL pure components
- useCallback for ALL callback props
- useMemo for ALL object/array props
- useMemo for expensive calculations (>10ms)
- List virtualization for >50 items
- Code splitting for >100KB components

### Performance Monitoring - MANDATORY

- React DevTools Profiler analysis REQUIRED
- Performance budget: <100ms render time
- Re-render count < 3 per user action
- Bundle size per component: <50KB

## Testing - STRICT REQUIREMENTS

### Test Coverage - MANDATORY

- 100% coverage for components (not 90%)
- ALL props combinations tested
- ALL event handlers tested
- ALL conditional renders tested
- ALL hooks tested
- ALL error states tested

### Test Quality - ZERO TOLERANCE

- NO snapshot tests (explicit assertions ONLY)
- Descriptive test names REQUIRED
- Test user behavior, not implementation
- Mock ALL external dependencies
- Clean up ALL mocks

```typescript
// CORRECT
describe("UserProfile", () => {
  it("should display user name when provided", () => {
    const { getByText } = render(<UserProfile name="John" />);
    expect(getByText("John")).toBeInTheDocument();
  });

  it("should call onEdit when edit button clicked", () => {
    const onEdit = jest.fn();
    const { getByRole } = render(<UserProfile onEdit={onEdit} />);
    fireEvent.click(getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});

// INCORRECT
it("works", () => {
  // NO! Not descriptive
  expect(wrapper).toMatchSnapshot(); // NO! No snapshots
});
```

## Enforcement - AUTOMATIC REJECTION

### These Cause Immediate PR Rejection

- Class components
- Anonymous functions in JSX
- Array index as key
- Missing TypeScript types
- Missing PropTypes
- Props drilling > 2 levels
- Components > 150 lines
- Missing tests
- Coverage < 100% for components
- Performance budget exceeded
