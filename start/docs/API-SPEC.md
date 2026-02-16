# QuizFunnel Onboard API Specification

## Endpoint

```
POST https://app.consistencyforge.com/api/landing/onboard
```

**Status:** NOT YET BUILT — scheduled for a future session in `consistencyforge-app`.

## Authentication

**Header:** `X-Landing-Secret: <LANDING_ONBOARD_SECRET>`

- Env variable: `LANDING_ONBOARD_SECRET`
- Generate: `openssl rand -hex 32`
- Add to `.env.example` + `.env.local` on dev & prod
- Auth pattern: same as `app/api/internal/check-ins/reply/route.ts:27-39`

**Middleware note:** `/api/landing/onboard` is NOT in `protectedRoutes` — passes through without auth middleware.

## CORS

Pattern from `app/api/ab/assign/route.ts:8-13`:

```typescript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://www.consistencyforge.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Landing-Secret, Authorization',
};
```

OPTIONS handler returns 204 with CORS headers.

## Request Body

```typescript
{
  email: string,                      // User's email address
  quizAnswers: Record<string, string>, // q1-q6 quiz answers
  commitmentName: string,              // e.g. "10 daily pushups"
  schedule: 'daily' | 'weekdays' | 'weekends' | '3x' | 'weekly' | 'monthly',
  why?: string,                        // Optional motivation text
  source: string                       // Always "quiz-v3" from this landing
}
```

## Response

### Success (200)
```json
{ "success": true }
```

### Errors
| Code | Body | When |
|------|------|------|
| 400 | `{ "error": "Email is required" }` | Missing/invalid fields |
| 401 | `{ "error": "Unauthorized" }` | Bad/missing secret |
| 429 | `{ "error": "Check your inbox for the link we already sent" }` | Rate limited (email) |
| 429 | `{ "error": "Too many requests" }` | Rate limited (IP) |
| 500 | `{ "error": "Something went wrong" }` | Server error |

## Rate Limiting

Using `lib/utils/rate-limiter.ts`:
- **20/hour per IP**
- **3/day per email** (if hit: return "Check your inbox for the link we already sent")

## Server-Side Logic (Sequential)

### 1. Authenticate
Verify `LANDING_ONBOARD_SECRET` header.

### 2. Rate limit
Check IP (20/hr) and email (3/day) limits.

### 3. Map schedule to config
```typescript
const SCHEDULE_MAP = {
  'daily':    { type: 'daily',   config: { time: '09:00' } },
  'weekdays': { type: 'weekly',  config: { time: '09:00', days: [1,2,3,4,5] } },
  'weekends': { type: 'weekly',  config: { time: '10:00', days: [0,6] } },
  '3x':       { type: 'weekly',  config: { time: '09:00', days: [1,3,5] } },
  'weekly':   { type: 'weekly',  config: { time: '09:00', days: [1] } },
  'monthly':  { type: 'monthly', config: { time: '09:00' } },
};
```

### 4. Find or create user
Pattern: `send-magic-link/route.ts:136-158`
- `findUserByEmail(email)` from `lib/user-emails.ts`
- If not found: create with `generateRandomString(16)`, `getNextPublicNumber()`, `generateRandomPublicName()`, `DEFAULT_RANK_SET`, `DEFAULT_THEME`

### 5. Create contract
Pattern: `contracts/route.ts:246-271`
- `generateULID()` for contractId
- `status: 'active'`
- `paymentStatus: 'paid'`
- `contractValue: 2500` (= $25.00)
- `title: commitmentName`
- `description: why || null`
- `scheduleType` + `scheduleConfig` from mapping
- `startDate: now`
- `endDate: null`
- `sendReminder: true`

### 6. Create initial check-in
Pattern: `contracts/route.ts:279-293`
- `getMidnightInTimezone(new Date(), 'UTC')`
- `getCheckInValidityHours(scheduleType, 'pending')`
- `confirmToken: generateULID() + generateRandomHex(16)`

### 7. Send magic link
`createAndSendMagicLink(email)` from `lib/auth/magic-link.ts:145`

### 8. Return success
`{ success: true }`

## Key Imports

```typescript
import { createAndSendMagicLink } from '@/lib/auth/magic-link';
import { findUserByEmail } from '@/lib/user-emails';
import { rateLimiter, getClientIp } from '@/lib/utils/rate-limiter';
import { generateRandomString } from '@/lib/utils/crypto';
import { generateULID, generateRandomHex } from '@/lib/utils/id';
import { getNextPublicNumber } from '@/lib/users/public-number';
import { generateRandomPublicName } from '@/lib/names/public-names';
import { DEFAULT_RANK_SET } from '@/lib/ranks/config';
import { DEFAULT_THEME } from '@/lib/themes/config';
import { getMidnightInTimezone } from '@/lib/check-ins/generator';
import { getCheckInValidityHours } from '@/lib/check-ins/config';
import { db } from '@/lib/db/client';
import { users, contracts, checkIns } from '@/lib/db/schema';
```

## Existing User Behavior

If user already exists: contract is created for existing userId, new magic link is sent. User sees new contract on dashboard alongside existing ones.

## Landing-Side Integration

In `start/script.js`, `submitCommitment()`:
- Sends POST with `X-Landing-Secret` header
- On success: shows thank-you page
- On error: re-enables button, shows inline error message
- Placeholder secret: `<LANDING_ONBOARD_SECRET>` (replace after API is built)

## Testing

### CORS preflight
```bash
curl -X OPTIONS https://dev.consistencyforge.com/api/landing/onboard -v
```

### Create account + contract
```bash
curl -X POST https://dev.consistencyforge.com/api/landing/onboard \
  -H 'Content-Type: application/json' \
  -H 'X-Landing-Secret: <secret>' \
  -d '{"email":"test@example.com","commitmentName":"10 pushups","schedule":"daily","quizAnswers":{"q1":"fitness"},"source":"quiz-v3"}'
```

### Verify in DB
Check: user created + contract (active, $25, paid) + check-in + magic link token

### E2E (Playwright)
Full flow from `/start/` hero -> quiz -> email -> commitment -> thank you -> verify API response 200.

---

*Spec version 1.0 | Created 2026-02-17*
