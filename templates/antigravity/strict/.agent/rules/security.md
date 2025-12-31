---
trigger: always_on
---

# Security Standards - STRICT (Zero Vulnerabilities)

## Security Philosophy - ZERO TOLERANCE

- Security is NOT optional
- NO security vulnerabilities accepted
- Security reviews REQUIRED for sensitive changes
- Compliance with OWASP Top 10 MANDATORY
- PCI/PII compliance STRICTLY enforced

## Input Validation - MANDATORY

### ALL User Inputs MUST Be Validated

- Schema validation REQUIRED (use Yup, Zod, or Joi)
- Client-side AND server-side validation (both required)
- Whitelist approach (define what's allowed, not what's blocked)
- Length limits enforced
- Type checking enforced
- Format validation enforced

### Validation Pattern - REQUIRED

```typescript
import * as Yup from "yup";

// Define schema
const userSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email required")
    .max(255, "Email too long"),
  password: Yup.string()
    .required("Password required")
    .min(12, "Password must be at least 12 characters")
    .matches(/[A-Z]/, "Must contain uppercase")
    .matches(/[a-z]/, "Must contain lowercase")
    .matches(/[0-9]/, "Must contain number")
    .matches(/[^A-Za-z0-9]/, "Must contain special character"),
  age: Yup.number()
    .positive("Must be positive")
    .integer("Must be integer")
    .min(18, "Must be 18+")
    .max(120, "Invalid age")
    .required("Age required"),
});

// Validate
try {
  await userSchema.validate(userData, { abortEarly: false });
} catch (error) {
  // Handle validation errors
}
```

### Prohibited Input Patterns - AUTOMATIC REJECTION

- NO unvalidated user input
- NO relying only on client-side validation
- NO blacklist approach
- NO regex without validation
- NO trusting ANY external data

## Output Sanitization - MANDATORY

### ALL Output MUST Be Sanitized

- HTML entities escaped
- SQL injection prevention
- XSS prevention
- LDAP injection prevention
- Command injection prevention

### Sanitization Libraries - REQUIRED

```typescript
import DOMPurify from 'dompurify';
import he from 'he';

// Sanitize HTML
const safeHTML = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href']
});

// Escape HTML entities
const safeText = he.encode(userInput);

// For React (automatic escaping)
<div>{userInput}</div> // Safe by default

// DANGEROUS - requires sanitization
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />
```

### Prohibited Output Patterns - AUTOMATIC REJECTION

- NO dangerouslySetInnerHTML without sanitization
- NO eval() or Function() constructor
- NO document.write()
- NO innerHTML without sanitization
- NO unescaped user content in HTML

## Authentication - STRICT REQUIREMENTS

### Password Requirements - MANDATORY

- Minimum length: 12 characters (not 8)
- Must contain: uppercase, lowercase, number, special character
- NO common passwords (check against list)
- Password strength meter REQUIRED
- bcrypt with salt rounds ≥12 for hashing

### Authentication Tokens - STRICT

- JWT tokens MUST expire (max 15 minutes for access tokens)
- Refresh tokens MUST expire (max 7 days)
- httpOnly cookies REQUIRED for tokens
- secure flag REQUIRED (HTTPS only)
- SameSite=Strict REQUIRED
- NO tokens in localStorage (use httpOnly cookies)
- NO tokens in URLs or query parameters

### Multi-Factor Authentication - REQUIRED

- MFA REQUIRED for:

  - Admin accounts (no exceptions)
  - Payment operations
  - PII access
  - Sensitive operations

- TOTP or SMS-based (TOTP preferred)
- Backup codes REQUIRED

## Authorization - ZERO TOLERANCE

### Access Control - MANDATORY

- Principle of least privilege ENFORCED
- Role-Based Access Control (RBAC) REQUIRED
- Authorization checks on EVERY endpoint
- Resource-level permissions ENFORCED
- NO client-side only authorization

### Authorization Pattern - REQUIRED

```typescript
// Server-side authorization check
const checkPermission = (
  user: User,
  resource: string,
  action: string
): boolean => {
  if (!user || !user.roles) return false;

  return user.roles.some((role) =>
    permissions[role]?.[resource]?.includes(action)
  );
};

// Middleware
const authorize = (resource: string, action: string) => {
  return (req, res, next) => {
    if (!checkPermission(req.user, resource, action)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};

// Usage
app.get("/users/:id", authorize("users", "read"), getUserHandler);
app.put("/users/:id", authorize("users", "update"), updateUserHandler);
```

### Prohibited Authorization Patterns - AUTOMATIC REJECTION

- NO authorization checks only in frontend
- NO role checks without permission checks
- NO assuming user is authorized
- NO exposing sensitive data without checks

## Data Protection - STRICT COMPLIANCE

### PII (Personally Identifiable Information) - MANDATORY

- PII MUST be encrypted at rest
- PII MUST be encrypted in transit (HTTPS)
- PII MUST be masked in logs
- PII MUST be masked in error messages
- PII MUST be masked in URLs
- PII access MUST be logged and audited

### PII Masking - REQUIRED

```typescript
// Email masking
const maskEmail = (email: string): string => {
  const [user, domain] = email.split("@");
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
};
// Example: john@example.com → j***n@example.com

// Phone masking
const maskPhone = (phone: string): string => {
  return phone.replace(/\d(?=\d{4})/g, "*");
};
// Example: 1234567890 → ******7890

// Credit card masking
const maskCard = (card: string): string => {
  return card.replace(/\d(?=\d{4})/g, "*");
};
// Example: 1234567890123456 → **3456
```

### PCI (Payment Card Industry) - STRICT COMPLIANCE

- Credit cards MUST show last 4 digits ONLY
- Full card numbers NEVER stored
- CVV NEVER stored
- Use payment gateway (Stripe, PayPal) - NO direct handling
- PCI DSS compliance REQUIRED

### Prohibited PII/PCI Patterns - AUTOMATIC REJECTION

- NO PII in logs
- NO PII in URLs or query parameters
- NO PII in error messages
- NO PII in analytics
- NO credit card data stored
- NO CVV stored
- NO unencrypted PII

## Secrets Management - ZERO TOLERANCE

### API Keys and Secrets - MANDATORY

- NO secrets in code (automatic rejection)
- NO secrets in version control
- Environment variables REQUIRED
- Secrets rotation policy ENFORCED
- AWS Secrets Manager / HashiCorp Vault REQUIRED

### Environment Variables - REQUIRED

```typescript
// .env file (NOT committed)
API_KEY=your_api_key_here
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret_here

// Usage
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY not configured');
}
```

### Prohibited Secrets Patterns - AUTOMATIC REJECTION

```typescript
// NEVER DO THIS
const API_KEY = 'abc123def456'; // REJECTED!
const password = 'mypassword'; // REJECTED!
const token = 'ghp_xxxxxxxxxxx'; // REJECTED!

// Git pre-commit hooks check for:
- API keys
- AWS keys
- Private keys
- Passwords
- Tokens
- Database URLs with credentials
```

## HTTPS and Transport Security - MANDATORY

### HTTPS Requirements - ALL ENVIRONMENTS

- HTTPS REQUIRED everywhere (no HTTP)
- TLS 1.2 minimum (TLS 1.3 preferred)
- Strong cipher suites ONLY
- HSTS header REQUIRED (max-age=31536000)
- Certificate pinning for mobile apps

## Security Headers - ALL REQUIRED

```typescript
// Express middleware
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");

  // Prevent MIME sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Strict transport security
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  // Content security policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'"
  );

  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=()");

  next();
});
```

## CORS - STRICT CONFIGURATION

### CORS Policy - MANDATORY

```typescript
import cors from "cors";

// Whitelist approach ONLY
const allowedOrigins = ["https://yourdomain.com", "https://app.yourdomain.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

### Prohibited CORS Patterns - AUTOMATIC REJECTION

```typescript
// NEVER DO THIS
app.use(cors()); // Allows all origins - REJECTED!
app.use(cors({ origin: "*" })); // Allows all origins - REJECTED!
```

## Dependency Security - MANDATORY

### Dependency Management - REQUIRED

- npm audit run BEFORE every release
- Snyk or similar scan REQUIRED in CI/CD
- NO dependencies with known vulnerabilities
- Dependency updates within 7 days of security advisory
- Minimal dependencies (audit all new additions)

### Dependency Scanning - AUTOMATED

```typescript
# Run before every commit
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check for updates
npm outdated

# Snyk scan
snyk test
```

### Prohibited Dependency Patterns - AUTOMATIC REJECTION

- Dependencies with HIGH/CRITICAL vulnerabilities
- Unmaintained dependencies (no updates >2 years)
- Dependencies from untrusted sources
- Unnecessary dependencies

## SQL Injection Prevention - MANDATORY

### Parameterized Queries - REQUIRED

```typescript
// CORRECT - Parameterized query
const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

// INCORRECT - String concatenation
const user = await db.query(
  `SELECT * FROM users WHERE email = '${email}'` // REJECTED!
);
```

### ORM Usage - RECOMMENDED

```typescript
// Using an ORM (Prisma, TypeORM, Sequelize)
const user = await prisma.user.findUnique({
  where: { email: email },
});
```

## XSS Prevention - MANDATORY

### React Default Protection - USE IT

```typescript
// Safe by default (React escapes automatically)
<div>{userInput}</div>

// DANGEROUS - requires sanitization
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
```

### Content Security Policy - REQUIRED

```typescript
// Strict CSP
"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.yourdomain.com;";
```

## CSRF Prevention - MANDATORY

### CSRF Token - REQUIRED

```typescript
import csrf from "csurf";

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

app.post("/api/data", csrfProtection, (req, res) => {
  // Token automatically validated
});

// Send token to client
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

## Rate Limiting - MANDATORY

### API Rate Limiting - REQUIRED

```typescript
import rateLimit from "express-rate-limit";

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});

// Login rate limit (stricter)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true,
});

// Apply to routes
app.use("/api/", apiLimiter);
app.post("/api/login", loginLimiter, loginHandler);
```
