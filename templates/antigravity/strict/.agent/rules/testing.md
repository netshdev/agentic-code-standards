---
trigger: always_on
---

---

# Testing Standards - STRICT (90% Coverage Minimum)

## Testing Philosophy - ZERO TOLERANCE

- 90% coverage MINIMUM (not 80%)
- ALL new code MUST have tests before PR
- Tests are NOT optional
- Coverage decrease = automatic PR rejection
- Flaky tests = automatic PR rejection
- Tests MUST catch real bugs

## Coverage Requirements - MANDATORY

### Minimum Coverage - HARD LIMITS

- Overall coverage: 90% (no exceptions)
- Statement coverage: 90%
- Branch coverage: 85%
- Function coverage: 90%
- Line coverage: 90%
- Components: 100% coverage REQUIRED

### Coverage Enforcement

- CI/CD blocks merge if coverage < 90%
- Coverage reports REQUIRED in every PR
- Coverage badge MUST be green
- Coverage decrease by >1% = automatic rejection

## Unit Testing - STRICT STANDARDS

### What MUST Be Tested - ALL REQUIRED

- ALL exported functions
- ALL components (100% coverage)
- ALL conditional logic paths
- ALL event handlers
- ALL hooks (custom and standard)
- ALL error states
- ALL loading states
- ALL edge cases

### What NOT to Test

- Third-party library internals ONLY
- Trivial getters/setters ONLY if truly trivial
- Constants (unless computed)

### Test Structure - MANDATORY FORMAT

```typescript
describe("ComponentName", () => {
  // Setup
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      // complete props with realistic values
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  // Tests grouped by functionality
  describe("rendering", () => {
    it("should render with required props only", () => {
      wrapper = shallow(<ComponentName {...props} />);
      expect(wrapper.exists()).toBe(true);
    });

    it("should display title when provided", () => {
      wrapper = shallow(<ComponentName {...props} title="Test" />);
      expect(wrapper.find(".title").text()).toBe("Test");
    });
  });

  describe("user interactions", () => {
    it("should call onClick handler when button clicked", () => {
      const mockOnClick = jest.fn();
      wrapper = shallow(<ComponentName {...props} onClick={mockOnClick} />);

      wrapper.find("button").simulate("click");

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(/* expected args */);
    });
  });

  describe("error handling", () => {
    it("should display error message when error prop provided", () => {
      wrapper = shallow(<ComponentName {...props} error="Error occurred" />);
      expect(wrapper.find(".error").text()).toBe("Error occurred");
    });
  });
});
```

### Test Naming - STRICT REQUIREMENTS

- Format: "should [expected behavior] when [condition]"
- Be SPECIFIC (no "works correctly", "renders", "is defined")
- Test names MUST describe user behavior

```typescript
// CORRECT
it("should disable submit button when form is invalid", () => {});
it("should display error message when API call fails", () => {});
it("should focus input when modal opens", () => {});

// INCORRECT - TOO VAGUE
it("works", () => {}); // REJECTED
it("renders correctly", () => {}); // REJECTED
it("handles errors", () => {}); // REJECTED
```

## Component Testing - 100% COVERAGE REQUIRED

### ALL These MUST Be Tested

- Rendering with all prop combinations
- All conditional rendering paths
- All event handlers
- All state changes
- All hooks and their effects
- All error boundaries
- All loading states
- Accessibility (keyboard, ARIA)

### Rendering Tests - MANDATORY

```typescript
// Test all prop combinations
it("should render with minimal props", () => {});
it("should render with all optional props", () => {});
it("should render in loading state", () => {});
it("should render in error state", () => {});
it("should render when data is empty", () => {});
it("should render when data is populated", () => {});
```

### Interaction Tests - ALL REQUIRED

```typescript
// Test ALL user interactions
it("should call onClick when button clicked", () => {});
it("should prevent default on form submit", () => {});
it("should update state when input changes", () => {});
it("should call onSubmit with form data", () => {});
it("should focus input on mount", () => {});
it("should trap focus in modal", () => {});
```

### Accessibility Tests - MANDATORY

```typescript
// Test keyboard navigation
it("should be focusable with Tab key", () => {});
it("should activate with Enter key", () => {});
it("should close with Escape key", () => {});

// Test ARIA attributes
it("should have correct aria-label", () => {});
it("should announce errors to screen readers", () => {});
it("should have proper role attribute", () => {});
```

## Hooks Testing - STRICT REQUIREMENTS

### Custom Hooks - 100% Coverage

```typescript
import { renderHook, act } from "@testing-library/react-hooks";

describe("useCustomHook", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(defaultValue);
  });

  it("should update value when action called", () => {
    const { result } = renderHook(() => useCustomHook());

    act(() => {
      result.current.updateValue(newValue);
    });

    expect(result.current.value).toBe(newValue);
  });

  it("should cleanup on unmount", () => {
    const cleanup = jest.fn();
    const { unmount } = renderHook(() => useCustomHook(cleanup));

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
```

## Mocking - STRICT STANDARDS

### MUST Mock These

- All external API calls
- ALL Redux store and actions
- ALL browser APIs (localStorage, window, document)
- ALL third-party libraries
- ALL time-dependent functions (Date, moment)
- ALL file system operations
- ALL network requests

### Mock Pattern - MANDATORY

```typescript
// Mock at top of file
jest.mock("../utils/api", () => ({
  fetchData: jest.fn(),
  postData: jest.fn(),
}));

// Use in tests
import { fetchData } from "../utils/api";

describe("Component", () => {
  beforeEach(() => {
    (fetchData as jest.Mock).mockResolvedValue({ data: "test" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
```

### What NOT to Mock

- Component's own functions (test real behavior)
- Simple utility functions (test actual implementation)
- React internals (useState, useEffect, etc.)
- PropTypes validation

## Test Quality - STRICT ENFORCEMENT

### Prohibited - AUTOMATIC REJECTION

- NO snapshot tests (explicit assertions ONLY)
- NO test.skip in committed code
- NO test.only in committed code
- NO fit or fdescribe
- NO flaky tests (must pass 100% of time)
- NO setTimeout > 100ms
- NO tests depending on execution order
- NO tests with side effects

### Required - ALL MANDATORY

- Descriptive test names
- Arrange-Act-Assert pattern
- Independent tests (no shared state)
- Fast tests (<100ms per test)
- Deterministic tests (same input = same output)
- Isolated tests (mock external dependencies)
