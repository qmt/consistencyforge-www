# QuizFunnel Code Review — 2026-02-17

Reviewer: Gemini 2.5 Pro (via MCP), triaged by Claude Opus 4.6.

## Status: OPEN — fixes scheduled for next session

---

## P0 — Must Fix

### 1. API Secret Exposure

**File:** `script.js:149`
**Issue:** `X-Landing-Secret` header is sent from client-side JS. Even though the current value is a placeholder (`<LANDING_ONBOARD_SECRET>`), the real secret will be visible in browser DevTools once set.

**Options:**
- **A) Vercel serverless proxy (Recommended)** — Create `/api/quiz-submit` serverless function that receives form data, adds secret server-side, forwards to `app.consistencyforge.com/api/landing/onboard`. Landing JS calls `/api/quiz-submit` instead.
- **B) Accept the risk** — The API already has rate limiting (20/hr IP, 3/day email). The secret adds a layer but isn't the only protection. If abused, rotate the secret.

**Decision:** TBD next session.

### 2. User Zoom Disabled

**File:** `index.html:5`
**Issue:** `maximum-scale=1.0, user-scalable=no` blocks pinch-to-zoom. WCAG 1.4.4 failure — users with low vision cannot zoom.

**Fix:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## P1 — Should Fix

### 3. No Focus Indicators

**File:** `styles.css`
**Issue:** `.btn`, `.answer-btn`, `.progress-back` have no `:focus` styles. Keyboard users can't see which element is active.

**Fix:** Add to `styles.css`:
```css
.btn:focus-visible,
.answer-btn:focus-visible,
.progress-back:focus-visible {
    outline: 2px solid var(--orange-400);
    outline-offset: 2px;
}
```

### 4. Weak Email Validation

**File:** `script.js:119-121`
**Issue:** `!email.includes('@')` accepts `a@b`, `@`, `test@` etc.

**Fix:**
```javascript
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email || !emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return;
}
```

### 5. innerHTML XSS Surface

**File:** `script.js:63`
**Issue:** `personalizeResults()` uses `.innerHTML` with template literals. Current inputs are all hardcoded from `data-value` attributes (safe), but future changes could introduce XSS if user input flows in.

**Fix:** Replace `.innerHTML` with DOM construction:
```javascript
function personalizeResults() {
    var resultEl = document.getElementById('resultText');
    resultEl.textContent = '';

    // Build paragraphs with createElement + textContent
    // Use strong tags only via createElement('strong')
}
```

**Risk assessment:** Low — inputs are controlled. Fix is defensive.

### 6. No `prefers-reduced-motion` Support

**Files:** `styles.css`, `index.html`
**Issue:** Auto-playing videos and pulsing animations can cause issues for users with vestibular disorders.

**Fix:** Add to `styles.css`:
```css
@media (prefers-reduced-motion: reduce) {
    .video-bg video,
    .mascot {
        display: none;
    }
    .forge-quote {
        animation: none;
    }
    .page {
        animation: none;
    }
    .video-bg {
        background: #0a0a0a;
    }
}
```

---

## P2 — Nice to Have (Won't Fix)

### 7. Inline `style=""` in HTML

**Gemini flagged:** Inline style attributes violate strict CSP.
**Reality:** CSP has `style-src 'unsafe-inline'` — inline styles are explicitly allowed. **Not a bug.**

### 8. sessionStorage for Quiz State

**Suggestion:** Save answers to `sessionStorage` to survive page refresh.
**Decision:** Quiz takes ~2 minutes. Not worth the complexity.

### 9. "Other" Option Dead End (Q1)

**Suggestion:** Add a text input when "Something else" is selected.
**Decision:** API collects the value `other` — sufficient for analytics. No UX change needed.

### 10. Answer Click Double-Fire

**Suggestion:** User might click twice during 250ms delay.
**Decision:** Minor — second click just re-selects same answer. No harm done.

---

## Not Flagged But Noted

### 11. Semantic HTML for Quiz Questions

Consider wrapping each `.answers` div in `<fieldset>` with `<legend>` for screen readers. Low priority — quiz works without it.

### 12. Video Compression

`fire-bg.mp4` is 6.9MB, `mascot.mp4` is 3.3MB. Consider re-encoding at lower bitrate for mobile. Could use `<source>` with multiple resolutions.

---

## Fix Priority Order (Next Session)

1. Remove `user-scalable=no` from viewport meta (30 seconds)
2. Add `:focus-visible` styles (2 minutes)
3. Better email regex validation (1 minute)
4. Add `prefers-reduced-motion` media query (3 minutes)
5. Replace `innerHTML` with DOM construction (10 minutes)
6. Decide on API secret proxy vs accept-risk (architecture decision)

---

*Review date: 2026-02-17 | Source: Gemini 2.5 Pro code review + Claude Opus 4.6 triage*
