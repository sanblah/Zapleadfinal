# Security Baseline (Production)

Last updated: 2026-02-14

This project is aligned to the following standards:

- OWASP ASVS 5.0.0 (primary verification baseline)
- OWASP Top 10:2025
- OWASP Cheat Sheet Series
- NIST SSDF (SP 800-218 v1.1; migration-aware for SP 800-218 Rev.1 draft v1.2)
- CIS Benchmarks (deployment hardening baseline for OS/container/runtime)
- OAuth/OIDC guidance (RFC 6749, RFC 8252, OAuth 2.1 direction)

## Implemented Secure-by-Default Controls

- Strict HTTP security headers and CSP on all routes in `next.config.ts`.
- `x-powered-by` disabled in `next.config.ts`.
- Server-side input validation and sanitization for chat and contact processing in:
  - `app/api/chat/route.ts`
  - `app/contact/actions.ts`
  - `lib/security/input.ts`
- Origin allowlisting and cross-site request checks for mutating endpoints in:
  - `lib/security/request.ts`
  - `app/api/chat/route.ts`
  - `app/contact/actions.ts`
- Per-IP anti-automation/rate limiting for high-cost paths in:
  - `lib/security/rate-limit.ts`
  - `app/api/chat/route.ts`
  - `app/contact/actions.ts`
- Bot-honeypot on contact form in `components/contact-form.tsx`.
- Sensitive error minimization and reduced PII logging in:
  - `app/api/chat/route.ts`
  - `app/contact/actions.ts`
- No-store API responses for dynamic/sensitive endpoints in `app/api/chat/route.ts`.
- CI security checks (dependency review, lint, typecheck, npm audit) in `.github/workflows/security.yml`.

## OWASP ASVS 5.0.0 Mapping

Primary mappings for implemented controls:

- V1 Encoding and Sanitization:
  - Input sanitization and canonicalization gates (`sanitizeText`) and bounded field lengths.
- V2 Validation and Business Logic:
  - Strict schema-like validation for request payloads and form inputs.
  - Anti-automation control via request rate limiting.
- V3 Web Frontend Security:
  - Browser security headers (`CSP`, `X-Content-Type-Options`, `X-Frame-Options`, `HSTS`, `Permissions-Policy`, `Referrer-Policy`).
  - Defensive handling of cross-site browser requests.
- V12 Secure Communication:
  - HTTPS enforcement support via HSTS in production and secure transport assumptions for deployment.
- V13 Configuration:
  - Secret material pulled from environment variables, not hardcoded.
  - Reduced information leakage in error paths.
- V14 Data Protection:
  - Sensitive response caching minimized (`Cache-Control: no-store` for API responses).
  - PII-minimized logging policy in server handlers.
- V15 Secure Coding and Architecture:
  - Dependency risk controls and update checks in CI.
- V16 Security Logging and Error Handling:
  - Controlled operational logging with reduced sensitive data exposure.
  - Fail-closed and generic user-facing error behavior.

## OWASP Top 10:2025 Coverage

- A01 Broken Access Control:
  - Origin policy checks on state-changing endpoints.
- A02 Cryptographic Failures:
  - TLS-first deployment posture with HSTS in production.
- A03 Injection:
  - Server-side validation/sanitization and strict payload bounds.
- A04 Insecure Design:
  - Threat model documented in `docs/security/threat-model.md`.
- A05 Security Misconfiguration:
  - Hardened default headers and disabled technology disclosure.
- A06 Vulnerable and Outdated Components:
  - Dependency review and `npm audit` in CI.
- A07 Identification and Authentication Failures:
  - No end-user auth in current scope; see OAuth/OIDC section below for future state.
- A08 Software and Data Integrity Failures:
  - Locked dependency graph plus dependency checks in CI.
- A09 Security Logging and Monitoring Failures:
  - Structured, minimal, security-relevant logging.
- A10 Server-Side Request Forgery (SSRF):
  - Outbound destination is fixed to Anthropic API endpoint with no user-controlled target URL.

## OWASP Cheat Sheet Alignment

Patterns implemented from OWASP Cheat Sheet Series include:

- Input Validation
- XSS Prevention (defense-in-depth through validation + CSP)
- CSRF Prevention (origin checks and cross-site request blocking)
- SSRF Prevention principles (strict outbound target in chat API and allowlist-oriented guidance)
- Logging
- Secure Headers
- Error Handling
- Authentication/OAuth cheat-sheet guidance reserved for future auth rollout

## NIST SSDF Integration (Secure SDLC)

This repository enforces core SSDF outcomes through process and automation:

- Define security requirements:
  - This baseline (`SECURITY.md`) and threat model (`docs/security/threat-model.md`).
- Protect software:
  - Secret handling via environment variables, no hardcoded secrets.
- Produce well-secured software:
  - Linting, type checks, dependency review, and vulnerability audit in CI.
- Respond to vulnerabilities:
  - Dependency audit pipeline and documented patch workflow expectations.

## CIS Benchmark Deployment Baseline (Where Applicable)

At deployment time, harden the host/container/platform using relevant CIS Benchmarks (example targets):

- OS benchmark (for your distro and version, e.g. Ubuntu LTS benchmark).
- Container runtime benchmark (e.g. Docker benchmark) if containers are used.
- Cloud benchmark (AWS/Azure/GCP foundation benchmark) where hosted.
- Kubernetes benchmark if orchestrated.

Minimum expected hardening outcomes:

- Least privilege runtime user and file permissions.
- Minimal open ports and restricted outbound egress.
- Secure logging and time sync.
- Patch/vulnerability management SLAs.
- Secrets from vault/KMS, never image-baked.

## OAuth 2.1 / OIDC and RFC Guidance

Current state:

- This application does not yet expose user-authenticated APIs or user sessions requiring OAuth/OIDC.

Mandatory future state (if auth/API is introduced):

- Use Authorization Code + PKCE as baseline flow.
- Do not use implicit flow.
- Prefer sender-constrained tokens where possible.
- Validate issuer/audience/nonce and token lifetimes rigorously.
- Follow RFC 6749 and RFC 8252, plus current OAuth security BCP guidance.
- If implementing identity, use OpenID Connect Core 1.0 (current errata set).

## Residual Risks / Next Hardening Steps

- In-memory rate limiting is per-instance. For horizontally scaled deployments, use centralized storage (Redis or API gateway limits).
- Add WAF/bot management if public traffic volume is high.
- Add SIEM integration and alert thresholds for abuse patterns.
- Add SAST/secret scanning and SBOM generation to CI pipeline.
