# Threat Model (Current Scope)

Last updated: 2026-02-14

## Assets

- Public website availability and integrity.
- Anthropic API key and budget protection for chat endpoint.
- Contact lead data (name, email, company, optional details).
- Deployment secrets and environment configuration.

## Entry Points

- `POST /api/chat` (`app/api/chat/route.ts`)
- Contact server action (`app/contact/actions.ts`)
- Browser delivery path (`next.config.ts` header policy)

## Trust Boundaries

- Internet client -> Next.js server runtime
- Next.js server -> Anthropic external API
- CI runner -> dependency registry and repository

## Key Threats and Mitigations

1. API abuse/cost exhaustion on chat endpoint
- Mitigations:
  - Per-IP rate limiting
  - Origin checks and cross-site browser request rejection
  - Upstream timeout and bounded retries

2. Injection and malformed input handling
- Mitigations:
  - Strict server-side payload validation
  - Input sanitization and hard max lengths
  - Generic error responses

3. Bot spam and low-quality contact submissions
- Mitigations:
  - Honeypot field
  - Per-IP rate limiting
  - Required-field and enum validation

4. Sensitive data leakage through logs/errors
- Mitigations:
  - Reduced PII logging
  - Generic client-facing errors
  - No-store API responses

5. Browser-based attack surface (clickjacking, mixed content, MIME sniffing)
- Mitigations:
  - Security header baseline (CSP, HSTS in prod, frame deny, nosniff, referrer policy)

## Abuse Cases To Re-Test Each Release

- High-rate `POST /api/chat` from rotating IPs.
- Cross-site form/API POST attempts with forged origins.
- Oversized payloads and invalid JSON.
- CSP/header regressions after frontend changes.
- Dependency vulnerability drift (CI audit/dependency review failures).

