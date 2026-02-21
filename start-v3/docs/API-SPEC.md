# QuizFunnel Onboard API Specification

## Endpoint

```
POST https://app.consistencyforge.com/api/landing/onboard
```

**Status:** LIVE — deployed 2026-02-20 on both dev and production.

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
  email: string,                        // User's email address
  quizAnswers: {                        // q1-q6 quiz answers (Zod-validated)
    q1: 'fitness' | 'hobby' | 'learning' | 'health' | 'project' | 'other',
    q2: 'time' | 'tired' | 'kids' | 'someday' | 'perfect' | 'motivation',
    q3: 'weeks' | 'months' | 'year' | 'years' | 'decade',
    q4: '30sec' | '2-3min' | '5-10min' | '15-30min' | 'unsure',
    q5: 'respect' | 'health' | 'dreams' | 'regret' | 'all',
    q6: 'plan' | 'accountability' | 'motivation' | 'system',
  },
  source?: string,                      // Default: "quiz-v3"
  utm?: {                               // UTM attribution (optional)
    utm_source?: string,                // e.g. "facebook"
    utm_medium?: string,                // e.g. "paid"
    utm_campaign?: string,              // e.g. "quiz-feb-cold-traffic"
    utm_content?: string,               // e.g. "video-v1"
    utm_term?: string,                  // e.g. "habit-tracker" (Google Ads)
    fbclid?: string,                    // Facebook click ID (auto-added by Meta)
    gclid?: string,                     // Google click ID (auto-added by Google)
  }
}
```

**Note:** The commitment name and schedule are auto-generated server-side from quiz answers via `lib/landing/quiz-mapping.ts`. The landing page does NOT send `commitmentName` or `schedule`.

## Response

### Success (201)
```json
{ "loginUrl": "https://app.consistencyforge.com/auth/magic?token=...", "contractId": "01J..." }
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
- **10/hour per IP** (min interval 10s)
- **3/hour per email** (min interval 30s; if hit: return "Check your inbox for the link we already sent")

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
- `contractValue: 2900` (= $29.00)
- `title`: auto-generated from Q1 answer via `lib/landing/quiz-mapping.ts`
- `description`: auto-generated from Q2/Q3/Q5/Q6 answers (SimonSays style)
- `scheduleType: 'daily'`, `scheduleConfig: { time: '20:00' }`
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
`{ loginUrl: "https://app.consistencyforge.com/auth/magic?token=...", contractId: "..." }`

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

## Quiz Event Tracking

**Endpoint:** `POST https://app.consistencyforge.com/api/quiz/track`

Separate lightweight endpoint for quiz funnel analytics (not A/B test system).

```json
{ "event": "quiz_start", "visitorId": "cf-abc123", "page": "/start/", "eventData": {} }
```

- CORS: `*`
- No auth header required
- Rate limit: 30 req / 5 min per IP
- Respects GPC signal (`Sec-GPC: 1`)
- Valid events: `quiz_start`, `quiz_q1`-`quiz_q6`, `quiz_complete`, `quiz_email_submit`, `quiz_api_success`, `quiz_api_error`, `hero_cta_not_visible`
- Stored in `quiz_events` table (separate from `funnel_events`)

---

## Landing-Side Integration

In `start/script.js`, `submitCommitment()`:
- Sends POST with `X-Landing-Secret` header
- On success: redirects to loginUrl (auto-login to dashboard)
- On error: re-enables button, shows inline error message

Quiz event tracking via `trackEvent()`:
- Uses `navigator.sendBeacon()` to POST to `/api/quiz/track`
- Falls back to `fetch()` if sendBeacon unavailable
- Generates `visitorId` per session (stored in sessionStorage)

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
  -d '{"email":"test@example.com","quizAnswers":{"q1":"fitness","q2":"time","q3":"months","q4":"5-10min","q5":"all","q6":"system"},"source":"quiz-v3","utm":{"utm_source":"facebook","utm_campaign":"test"}}'
```

### Quiz event tracking
```bash
curl -X POST https://dev.consistencyforge.com/api/quiz/track \
  -H 'Content-Type: application/json' \
  -d '{"event":"quiz_start","visitorId":"test-123","page":"/start/"}'
```

### Verify in DB
Check: user created + contract (active, $29, paid) + check-in + magic link token + funnel_events with UTM + quiz_events

### E2E (Playwright)
Full flow from `/start/` hero -> quiz -> email -> commitment -> thank you -> verify API response 200.

---

*Spec version 2.0 | Created 2026-02-17 | Updated 2026-02-20 (API live, UTM support, quiz/track endpoint)*
