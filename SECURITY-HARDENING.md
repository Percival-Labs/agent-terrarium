# Security Hardening — Percival Labs Fork

Changes applied to the upstream Claw3D codebase for production use
with the Percival Labs agent infrastructure.

## Critical Fixes

### 1. Telemetry Removed
- `@vercel/otel` dependency removed from package.json
- `src/instrumentation.ts` replaced with no-op
- No data is sent to Vercel or any external telemetry service

### 2. Constant-Time Token Comparison
- `server/access-gate.js` now uses `crypto.timingSafeEqual()` for
  token validation, preventing timing attacks

### 3. Auth Rate Limiting
- In-memory rate limiter added to access gate (10 attempts per IP
  per 60 seconds)
- Prevents brute-force token guessing

### 4. WebSocket Frame Validation
- Maximum frame size: 256 KB (prevents resource exhaustion)
- Per-connection rate limit: 30 frames/second
- Connections closed on violation

### 5. Upstream URL Allowlist
- `UPSTREAM_ALLOWLIST` env var restricts which gateway hosts the
  WebSocket proxy can connect to
- Prevents DNS hijacking or SSRF through the proxy
- Required for production; empty allowlist permitted in dev only

## Remaining Items (Phase 2)

- Encrypt gateway tokens at rest
- Add Zod schema validation for all API inputs
- Reject symlinks in media file routes
- Add CSP headers to Next.js config
- Implement secure cookie flags (HttpOnly, Secure, SameSite)
- Sanitize error messages before sending to clients
