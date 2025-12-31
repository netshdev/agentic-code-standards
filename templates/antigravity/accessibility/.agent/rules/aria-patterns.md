---
trigger: always_on
---

# ARIA Patterns Agent Rules

## Core Directive: Semantic HTML First

**Your primary rule:** Use native HTML elements. Only add ARIA when semantic HTML cannot achieve the requirement.

**Decision flow:**

1. Can I use native HTML? (Usually YES) → Use it, no ARIA needed
2. Does native HTML need enhancement? → Add minimal ARIA
3. Is this a complex custom widget? → Use full ARIA pattern

## The First Rule of ARIA

**NO ARIA IS BETTER THAN BAD ARIA**

Never add ARIA "just in case." Each ARIA attribute must serve a specific, necessary purpose.

## Critical ARIA Attributes - When and How

### aria-label

**Use when:** No visible label exists (icon buttons, landmark regions)

```jsx
// ✅ GENERATE: Icon-only button
<button aria-label="Close dialog">
  <X aria-hidden="true" />
</button>

// ✅ GENERATE: Distinguish multiple nav landmarks
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>

// ❌ NEVER: Redundant with visible text
<button aria-label="Submit">Submit</button>
```

### aria-labelledby

**Use when:** Visible label exists elsewhere in DOM

```jsx
// ✅ GENERATE: Dialog with visible heading
<h2 id="dialog-title">Confirm Action</h2>
<div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
  {/* content */}
</div>

// ✅ GENERATE: Multiple labels (space-separated)
<div aria-labelledby="title subtitle">
  <h2 id="title">Warning</h2>
  <p id="subtitle">Cannot be undone</p>
</div>
```

**Rule:** Always generate unique IDs. Use this over `aria-label` when visible text exists.

### aria-describedby

**Use when:** Additional help text or error messages exist

```jsx
// ✅ GENERATE: Form help text
<label htmlFor="password">Password</label>
<input
  id="password"
  type="password"
  aria-describedby="password-help"
  aria-required="true"
/>
<p id="password-help">
  Must be 12+ characters with numbers and symbols
</p>

// ✅ GENERATE: Error message
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <p id="email-error" role="alert">
    Please enter valid email
  </p>
)}
```

### aria-hidden

**Use when:** Hiding purely decorative elements

```jsx
// ✅ GENERATE: Decorative icon
<button>
  Save
  <SaveIcon aria-hidden="true" />
</button>

// ❌ NEVER: On interactive elements
<button aria-hidden="true">Click</button>

// ❌ NEVER: On important content
<p aria-hidden="true">Error: Failed</p>
```

**CRITICAL:** Never hide interactive elements or important information.

### aria-live

**Use when:** Announcing dynamic content changes

```jsx
// ✅ GENERATE: Status (polite - most common)
<div role="status" aria-live="polite" aria-atomic="true">
  {isLoading ? 'Loading...' : `${count} results`}
</div>

// ✅ GENERATE: Critical error (assertive - rare)
<div role="alert" aria-live="assertive">
  Error: Payment failed
</div>
```

**Rules:**

- `polite` for status updates, non-critical notifications
- `assertive` ONLY for critical errors, urgent alerts
- Include `aria-atomic="true"` for complete announcements

### aria-expanded

**Use when:** Content is collapsible/expandable

```jsx
// ✅ GENERATE: Dropdown
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  aria-haspopup="true"
>
  Menu
</button>
<ul id="menu" hidden={!isOpen}>...</ul>
```

**Rules:** Always boolean, pair with `aria-controls`, sync with `hidden` attribute.

### aria-invalid & aria-required

**Use when:** Form validation

```jsx
// ✅ GENERATE: Both HTML and ARIA
<label htmlFor="email">
  Email <span aria-hidden="true">*</span>
</label>
<input
  id="email"
  required
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "error" : undefined}
/>
{hasError && (
  <p id="error" role="alert">Enter valid email</p>
)}
```

### aria-current

**Use when:** Indicating current item in navigation

```jsx
// ✅ GENERATE: Current page
<nav aria-label="Main navigation">
  <a href="/" aria-current={isHome ? "page" : undefined}>
    Home
  </a>
</nav>

// ✅ GENERATE: Current step
<li aria-current={step === 1 ? "step" : undefined}>
  Account Info
</li>
```

**Values:** `page`, `step`, `location`, `date`, `time`, `true`

## Common Widget Patterns

### Button (Use Native!)

```jsx
// ✅ ALWAYS GENERATE
<button onClick={handleClick}>Click Me</button>

// ✅ Icon button
<button aria-label="Delete">
  <TrashIcon aria-hidden="true" />
</button>

// ⚠️ ONLY IF ABSOLUTELY NECESSARY
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom Button
</div>
```

### Modal/Dialog

```jsx
// ✅ COMPLETE PATTERN
const Modal = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      ref={dialogRef}
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <h2 id="dialog-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close">
        <X aria-hidden="true" />
      </button>
    </div>
  );
};
```

**Required:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus management, Escape key.

### Tabs

```jsx
// ✅ FULL PATTERN WITH KEYBOARD NAV
const Tabs = ({ tabs }) => {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    let newIndex = index;
    if (e.key === "ArrowRight") newIndex = (index + 1) % tabs.length;
    if (e.key === "ArrowLeft")
      newIndex = (index - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") newIndex = 0;
    if (e.key === "End") newIndex = tabs.length - 1;

    if (newIndex !== index) {
      e.preventDefault();
      setSelected(newIndex);
      tabRefs.current[newIndex]?.focus();
    }
  };

  return (
    <>
      <div role="tablist" aria-label="Content tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            role="tab"
            aria-selected={selected === i}
            aria-controls={`panel-${i}`}
            id={`tab-${i}`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`panel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={selected !== i}
        >
          {tab.content}
        </div>
      ))}
    </>
  );
};
```

**Required:** Arrow navigation, Home/End keys, roving tabindex.

### Accordion

```jsx
// ✅ GENERATE THIS
const Accordion = ({ title, content, isOpen, onToggle }) => {
  const headingId = `heading-${useId()}`;
  const panelId = `panel-${useId()}`;

  return (
    <div>
      <h3 id={headingId}>
        <button
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {title}
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
      >
        {content}
      </div>
    </div>
  );
};
```

### Combobox (Autocomplete)

```jsx
// ✅ SEARCHABLE DROPDOWN
const Combobox = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      onChange(options[activeIndex]);
      setIsOpen(false);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <>
      <input
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="listbox"
        aria-activedescendant={
          activeIndex >= 0 ? `option-${activeIndex}` : undefined
        }
        aria-autocomplete="list"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <ul id="listbox" role="listbox">
          {options.map((opt, i) => (
            <li
              key={i}
              id={`option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
```

### Alerts & Status

```jsx
// ✅ Success (polite)
<div role="status" aria-live="polite">
  <CheckIcon aria-hidden="true" />
  Saved successfully
</div>

// ✅ Error (assertive)
<div role="alert" aria-live="assertive">
  <ErrorIcon aria-hidden="true" />
  Payment failed
</div>

// ✅ Loading
<div role="status" aria-live="polite" aria-busy="true">
  <Spinner aria-hidden="true" />
  Loading...
</div>

// ✅ Progress
<div
  role="progressbar"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
>
  50% complete
</div>
```

### Breadcrumbs

```jsx
// ✅ NAVIGATION BREADCRUMBS
<nav aria-label="Breadcrumb">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/products">Products</a>
    </li>
    <li aria-current="page">Laptop</li>
  </ol>
</nav>
```

### Tooltip

```jsx
// ✅ ACCESSIBLE TOOLTIP
const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  const id = useId();

  return (
    <>
      <button
        aria-describedby={show ? id : undefined}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        {children}
      </button>
      {show && (
        <div id={id} role="tooltip">
          {text}
        </div>
      )}
    </>
  );
};
```

## Critical Mistakes - Never Generate

```jsx
// ❌ FORBIDDEN: Redundant roles
<button role="button">Click</button>
<nav role="navigation">...</nav>

// ❌ FORBIDDEN: aria-label with visible text
<button aria-label="Submit">Submit</button>

// ❌ FORBIDDEN: Hiding interactive elements
<button aria-hidden="true">Click</button>

// ❌ FORBIDDEN: Role without keyboard support
<div role="button" onClick={handleClick}>Bad</div>

// ❌ FORBIDDEN: Positive tabIndex
<button tabIndex={1}>Bad</button>

// ❌ FORBIDDEN: Empty labels
<button aria-label="">Click</button>
<img alt="image" />
```

## Always Generate These Instead

```jsx
// ✅ Native elements (no role needed)
<button>Click</button>
<nav>...</nav>

// ✅ No aria-label when text visible
<button>Submit</button>

// ✅ Hide decorative only
<button>
  Save <SaveIcon aria-hidden="true" />
</button>

// ✅ Full keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Good
</div>

// ✅ Natural tab order
<button>First</button>
<button>Second</button>

// ✅ Descriptive labels
<button aria-label="Close menu">×</button>
<img alt="Company logo" />
```

## Validation Checklist

Before finalizing code, verify:

- [ ] Native HTML used when possible
- [ ] No redundant roles on native elements
- [ ] All IDs referenced by ARIA exist and are unique
- [ ] `aria-hidden` never on interactive elements
- [ ] Boolean ARIA uses `true`/`false`, not strings
- [ ] All interactive elements keyboard accessible
- [ ] No positive tabIndex values
- [ ] Dynamic content has live regions
- [ ] Form fields have labels
