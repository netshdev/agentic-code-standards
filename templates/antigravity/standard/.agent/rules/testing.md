---
trigger: always_on
---

# Testing Standards and Requirements

## Testing Philosophy

- Tests ensure code quality and prevent regressions
- Unit tests must accompany all new code
- Tests are living documentation
- Coverage should increase or maintain, never decrease
- Write tests that would catch real bugs

## Coverage Requirements

- Maintain unit test threshold for modern codebases
- Aim for 80%+ coverage on new code
- Report previous and current coverage in PRs
- 100% coverage = previous not needed in PR
- Coverage decrease requires justification

## Unit Testing Standards

### What to Test

- All exported functions and utilities
- Component rendering with various props
- Conditional logic and edge cases
- Event handlers and user interactions
- State changes and Redux actions
- Error handling and boundary conditions
- PropTypes validation

### What NOT to Test

- Third-party library internals
- Trivial getters/setters
- Constant values
- External API implementations (mock these)

### Unit Test Best Practices

- **Shallow render preferred**: Use shallow unless hooks require mount
- **Single instance per scope**: Reuse component instance, update props/state
- **No long timeouts**: Keep setTimeout < 100ms if needed
- **Avoid snapshots**: Remove when possible, update reluctantly
- **Mock external dependencies**: APIs, Redux store, third-party libraries
- **Clean up mocks**: Use beforeEach and afterAll to reset

### Test Structure

```javascript
describe("ComponentName", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      // default props
    };
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with default props", () => {
    wrapper = shallow(<ComponentName {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should call onClick handler when button clicked", () => {
    const mockOnClick = jest.fn();
    wrapper = shallow(<ComponentName {...props} onClick={mockOnClick} />);
    wrapper.find("button").simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

### Dates in Tests

- Do NOT mock dates in the future
- Override moment.now in tests if current date used
- Use consistent date formats
- Test timezone handling

### Component Testing

- Test all user interactions
- Verify proper prop handling
- Test conditional rendering paths
- Verify event handlers fire correctly
- Test error states and loading states
- Accessibility: Test keyboard navigation, ARIA labels

### Integration Testing

- Test user journeys across multiple components
- Verify data flow through Redux
- Test routing and navigation
- Verify API integration with mocked responses

### Testing Tools

- Jest: Test runner and assertion library
- React Testing Library: Component testing (preferred)
- Enzyme: Shallow/mount rendering (legacy, minimize use)
- React Hooks Testing Library: For custom hooks
- Mock Service Worker (MSW): API mocking

### Test Naming Conventions

- Describe blocks: Component or function name
- It blocks: "should [expected behavior] when [condition]"
- Be specific and descriptive
- Avoid "works correctly" or "is defined"

```javascript
// GOOD
it("should display error message when form submission fails", () => {});
it("should disable submit button when form is invalid", () => {});

// BAD
it("works correctly", () => {});
it("handles errors", () => {});
```

## Mocking Best Practices

### When to Mock

- External API calls
- Redux store and actions
- Browser APIs (localStorage, window, document)
- Third-party libraries
- Time-dependent functions (Date, moment)
- File system operations

### How to Mock

```javascript
// Mock module
jest.mock("../utils/api", () => ({
  fetchData: jest.fn(),
}));

// Mock with implementation
const mockFn = jest.fn((a, b) => a + b);

// Restore after tests
afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});
```

### What NOT to Mock

- Component's own functions (test real behavior)
- Simple utility functions (test actual implementation)
- PropTypes validation
- React internals

## Testing Anti-Patterns

### Avoid These

- Testing implementation details instead of behavior
- Testing third-party library internals
- Snapshot tests without review
- Excessive mocking that doesn't reflect real usage
- Tests that pass regardless of code correctness
- setTimeout without cleanup
- Tests depending on execution order

### Do This Instead

- Test user-visible behavior
- Mock external dependencies only
- Explicit assertions over snapshots
- Realistic mocks reflecting actual API responses
- Assertions that would fail if code breaks
- Immediate assertions or controlled timing
- Independent, isolated tests

### Accessibility Testing

- Test keyboard navigation (Tab, Enter, Space, Escape)
- Verify ARIA labels and roles
- Test screen reader announcements
- Verify focus management
- Test with accessibility testing libraries
