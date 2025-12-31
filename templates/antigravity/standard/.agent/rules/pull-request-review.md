---
trigger: always_on
---

# Pull Request Standards and Review Guidelines

## PR Submission Requirements

### Must-Have Checklist

- [ ] PR form properly filled (checkmarks, labels, ticket number, description)
- [ ] Code coverage provided (previous vs current)
- [ ] Unit tests added/updated for all changed code
- [ ] Screenshots of new functionality included
- [ ] Team review completed before requesting merge
- [ ] All Jira tickets linked and valid
- [ ] No TODOs or incomplete work (create enabler if urgent)

### PR Form Structure

- **Ticket Number**: Link to Jira/Github issue
- **Description**: Clear explanation of changes and why
- **Testing Instructions**: How to manually verify changes
- **Coverage**: Previous and current test coverage percentage
- **Screenshots**: Before/after for UI changes
- **Team Review**: At least one peer approval
- **Release Notes**: User-facing changes documented

## Branching and Merging Strategy

### Branch Types

- **Feature/Epic Branches**: New functionality development
- **Pod Branches**: Maintenance or combined testing
- **Development Branch**: Integration branch for release candidates

### Merge Rules

- All PRs go to feature/epic/pod branch, NEVER directly to development
- One PR per user story
- Do NOT "Squash and merge" downstreams (difficult to solve issues)
- Upstream PRs require:
  - Intended release documented
  - List of all Jira/Github tickets
  - Git log command output: `git log --no-merges --format=oneline origin/development..origin/epicbranch`
  - eQA sign-off on ALL tickets
- Each change must relate to a ticket
- Global/semiglobal changes require architecture team review

### Release Readiness

- All user stories in epic/feature must have eQA sign-off
- Stories tested together in dev environment before merge
- Time allocated for code reviews, downstream and upstream merges
- Epic/feature scope properly defined in Jira/Github

## Code Review Standards

### Architecture and Structure

- [ ] Folder structure follows pod-based architecture
- [ ] No pod bubble breaches
- [ ] Component placed in correct directory
- [ ] Imports follow approved patterns
- [ ] No circular dependencies

### JavaScript Review

- [ ] No `window` object usage (unless approved)
- [ ] Lodash imports are scoped (not entire library)
- [ ] Keys in lists from data props, not index
- [ ] No eslint-disable-line without validation
- [ ] No `tabIndex > 0`
- [ ] Props drilling limited to 3 levels
- [ ] No console.log or debugger statements
- [ ] Conditional rendering uses boolean values only
- [ ] No code duplication
- [ ] String values moved to constants file
- [ ] Gremlins checked (invisible harmful characters)

### Component Review

- [ ] Functional components with hooks (not class components)
- [ ] PropTypes defined and accurate
- [ ] Required props marked with .isRequired
- [ ] Components under 200 lines
- [ ] No anonymous functions as event handlers
- [ ] Fragments used instead of empty divs
- [ ] useEffect dependencies correct
- [ ] No stale closures

### Styles Review

- [ ] Mobile-first approach used (avoid max-width)
- [ ] No `:global` styles (unless scoped and approved)
- [ ] Atmos utility classes used (atm-u, not atm-c)
- [ ] No CSS without parent class selector
- [ ] Color contrast meets 4.5:1 ratio

### Accessibility Review

- [ ] All interactive elements keyboard accessible
- [ ] Proper ARIA labels (not overused)
- [ ] role="alert" not misused
- [ ] External links have extDisclaimer for screen readers
- [ ] Color not sole information indicator
- [ ] Alt text provided for meaningful images
- [ ] Form fields have labels

### Testing Review

- [ ] Tests added for new functionality
- [ ] Tests updated for changed code
- [ ] Tests not using mock data excessively
- [ ] Shallow render preferred over mount (unless hooks require mount)
- [ ] External dependencies mocked
- [ ] beforeEach and afterAll for mock cleanup
- [ ] No setTimeout over 100ms
- [ ] Snapshots avoided (remove when possible)

### App-Specific Review

- [ ] Atmos components used (headers, buttons, form fields)
- [ ] `<TextPassage>` for paragraphs, not `<p>`
- [ ] `<Currency>` or getFormattedCurrency used, never type: currency
- [ ] pushRouteWithLocale for navigation
- [ ] cmsContainer for CMS content
- [ ] react-redux-form uses model, not state
- [ ] intl injected at container level only
- [ ] Variable messages validated before intl usage

### Data and Date Handling

- [ ] Service responses validated with null chain operator
- [ ] Mapper layer between services and store
- [ ] moment used instead of Date()
- [ ] Dates not mocked in future
- [ ] moment.now overridden in tests if needed

## Strongly Recommended Practices

### Review Process

- Ask for second review if uncertain about changes
- Involve previous developers/pod for context
- Check if data transformations can move to selectors
- Avoid mocked a11y implementations with aria-label
- Provide enabler option only for urgent blockers

### Code Quality

- Naming is critical: camelCase, PascalCase, UPPER_CASE used correctly
- Intermediate containers reduce prop drilling
- DRY principle: Save repeated data in defaulted constants
- PropTypes in external file for reusability
- Containers without JSX are easier to maintain
- Required props clearly marked

### Testing Quality

- Use shallow render when possible (less memory)
- Single component instance per test scope
- Avoid snapshots
- Mock external dependencies
- Quick timeouts (<100ms)

### Optimization

- isMobile/IsTablet in CSS preferred over JSX
- Use reduce loop instead of multiple loops
- Check `if(array.length)` instead of `if(array.length > 0)`
- No `!important` in CSS
- Direct children selector `>` avoided

## Auto-Merge Requirements

Auto-merge enabled when:

- [ ] Team reviewer approved PR
- [ ] Approver approved PR
- [ ] File owners approved (if applicable)
- [ ] No dismissals from updates (requires re-review)
- [ ] For release branch: Designated approver signed off

## What NOT to Merge

- Global/semiglobal changes without architect review
- PRs impacting multiple pages/flows without extensive review
- Missing eQA sign-offs on upstream PRs
- TODOs or incomplete work
- Failing tests or coverage decrease
- Security vulnerabilities
