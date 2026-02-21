# ConsistencyForge Quiz Funnel Copy — Google Ads Variant
## "QuizFunnel-Google" Conversion Copy -- v1.0 (Google Ads-Compliant)

**Brand:** ConsistencyForge
**Voice:** Empathetic guide meets motivational coach (Sinek empathy + Goggins directness, compliance-safe)
**Palette:** Orange (#f97316 / #F08C2E brand) on Dark (#0a0a0a) with fire video background
**Fonts:** Inter (400-800) for body; Exo 2 (700-800) for brand wordmark
**Rule:** Every question builds emotional investment through supportive self-reflection. By the time they reach email, they're already committed.

**Base:** Forked from `/start/` QuizFunnel v4.0 (Facebook-compliant). This variant adds Google Ads-specific compliance fixes (P0 + P1) for Misrepresentation, Unreliable Claims, Financial Services, Health, and Personal Attributes policies.

**Source:** `quiz-v3-google` (distinguishes Google traffic from Facebook `quiz-v3` in API analytics)

**Assets:** Shared from `../start/assets/` — no duplication of fire-bg.mp4, mascot.mp4, logo-white.svg.

---

## CHANGES FROM `/start/` (Facebook variant)

### P0 — Must Fix (Misrepresentation, Unreliable Claims, Financial)

| # | Element | Facebook (`/start/`) | Google (`/start-google/`) |
|---|---------|---------------------|--------------------------|
| 1 | Headline h1 | "It's Time to Unlock Your True Potential." | "Discover Your Path to Better Habits." |
| 2 | Subhead | "You know the goals that matter most. You've felt them for years." | "Many people have goals they've been thinking about for years. A 2-minute quiz can help you get clear — and start moving forward." |
| 3 | Feature 1 | "works in just 30 seconds a day" | "designed to fit into just 30 seconds a day" |
| 4 | Feature 3 | "Build habits that stick, with gentle reminders and real progress tracking" | "A habit-tracking tool with gentle reminders and real progress tracking" |
| 5 | Results header | "You Have Everything You Need to Succeed." | "You Have What It Takes to Start." |
| 6 | Results body: "change everything" | "Maybe 30 minutes that change everything." | "Maybe 30 minutes that make a real difference." |
| 7 | Results body: "That's all it takes." | "That's all it takes." | "That's how real consistency is built." |
| 8 | Incentive box text | "Get $29 motivational stake for habit accountability — no payment required!" | "Your free commitment contract includes a $29 motivational stake. The app is 100% free — no payment required, ever. The stake is a self-motivation tool you control." |
| 9 | Results disclaimer | (none) | "Individual results vary. ConsistencyForge is a habit-tracking tool, not a guarantee of outcomes." |

### P1 — Should Fix (Health, Consent, Personal Attributes)

| # | Element | Facebook | Google |
|---|---------|---------|--------|
| 10 | Health disclaimer | (none) | "ConsistencyForge is a habit accountability tool, not a medical or health service. Consult a healthcare professional for medical advice." |
| 11 | Consent checkbox | "**I'm ready to commit.** I agree to create my free ConsistencyForge account. Terms · Privacy" | "I agree to create a free ConsistencyForge account and accept the Terms and Privacy Policy." |
| 12 | Q5 option "health" | "Better health and energy" | "More energy and motivation" |
| 13 | Q5 option "regret" | "Peace of mind and fulfillment" | "A sense of accomplishment" |
| 14 | Navigation link | (none) | "Back to ConsistencyForge" link at top of hero |

### Script Changes

| # | Change | Detail |
|---|--------|--------|
| 15 | `source` field | `'quiz-v3'` -> `'quiz-v3-google'` |
| 16 | Tracking page | `'/start/'` -> `'/start-google/'` |
| 17 | Results personalization | Same softening as HTML defaults |
| 18 | Asset paths | `assets/` -> `../start/assets/` |

---

## PAGE 1: HERO — "The Hook"

### Navigation Link (top of hero)
Back to ConsistencyForge
- Links to `https://www.consistencyforge.com/`
- `font-size: 13px; color: rgba(255,255,255,0.5)`

### Brand Header (top of hero)
- Logo: `/logo.svg` (orange hexagon+flame, 36px / 28px mobile)
- Text: **CONSISTENCY** (white, Exo 2 700) **FORGE** (orange #F08C2E, Exo 2 800)
- Layout: inline flex, centered, 2px letter-spacing

### Kicker
Start Strong

### Headline
Discover Your Path to
**Better Habits.**

### Subheadline
Many people have goals they've been thinking about for years. A 2-minute quiz can help you get clear — and start moving forward.

### Tagline
**OWN YOUR TIME**

### Feature bullets
- No time? We've got you — designed to fit into just 30 seconds a day
- Personalized plans that fit your real life
- A habit-tracking tool with gentle reminders and real progress tracking

### Primary CTA
**Uncover Your Path ->**

### Micro-copy
(we'll guide you every step)

### Legal Footer
Terms · Privacy · ConsistencyForge by qmediat.io

---

## PAGE 2: QUESTION 1 — "The Focus"

*Identical to `/start/`*

### Question
What would you like to focus on?

### Answers
| Icon | Answer | Value |
|------|--------|-------|
| Runner | Exercise & fitness | `fitness` |
| Art | Creative hobby (music, art, crafts...) | `hobby` |
| Books | Learning & self-improvement | `learning` |
| Yoga | Health & mindfulness | `health` |
| Briefcase | Side project or business | `project` |
| Sparkles | Something else | `other` |

---

## PAGE 3: QUESTION 2 — "The Barrier"

*Identical to `/start/`*

### Question
What story do you tell yourself about why it's hard?

---

## PAGE 4: QUESTION 3 — "The Duration"

*Identical to `/start/`*

### Question
How long has this barrier been in your way?

---

## PAGE 5: QUESTION 4 — "The Commitment"

*Identical to `/start/`*

### Question
How much time can you ACTUALLY commit? Be honest.

---

## PAGE 6: QUESTION 5 — "The Gains" (MODIFIED)

### Question
What could you gain by overcoming this?

### Answers
| Icon | Answer | Value |
|------|--------|-------|
| Flex | Greater self-confidence | `respect` |
| Green heart | **More energy and motivation** | `health` |
| Star | Finally pursuing my dreams | `dreams` |
| Smile | **A sense of accomplishment** | `regret` |
| Fire | All of it. Everything. | `all` |

---

## PAGE 7: QUESTION 6 — "The Blocker"

*Identical to `/start/`*

### Question
What's actually stopping you? Pick one.

---

## PAGE 8: RESULTS + EMAIL — "The Reveal" (MODIFIED)

### Result Card Title
You Have What It Takes to Start.

### Result Text (personalized)

> You've been thinking about **{activity}** — and **{barrier}** keeps getting in the way.
>
> [If Q3 = years or decade:] It's been a long road. But every moment is a chance to begin anew.
>
> But here's the truth: **You DO have time.** Today it can be 30 seconds. Tomorrow, 3 minutes. Next week? Maybe 30 minutes that make a real difference.
>
> You don't need hours. **Consistency beats intensity.** A small step every day. That's how real consistency is built.
>
> Even 30 seconds a day counts. Not hours — just 30 seconds, but **EVERY DAY.** That's how real consistency is built. The hardest part? Starting. But once you do, the rest follows.

### Results Disclaimer (NEW)
*Individual results vary. ConsistencyForge is a habit-tracking tool, not a guarantee of outcomes.*

### Incentive Box
**Free Commitment Contract**
Your free commitment contract includes a $29 motivational stake. The app is 100% free — no payment required, ever. The stake is a self-motivation tool you control.

### Consent Checkbox (MODIFIED)
I agree to create a free ConsistencyForge account and accept the Terms and Privacy Policy.

### Health Disclaimer (NEW — below CTA)
ConsistencyForge is a habit accountability tool, not a medical or health service. Consult a healthcare professional for medical advice.

---

## PAGE 9A: COMMITMENT FORM — "The Contract"

*Identical to `/start/`*

---

## PAGE 9B: THANK YOU — "The Seal"

*Identical to `/start/`*

---

## API PAYLOAD

```json
{
  "email": "user@example.com",
  "quizAnswers": { "q1": "fitness", "q2": "time", "q3": "years", "q4": "5-10min", "q5": "all", "q6": "system" },
  "source": "quiz-v3-google",
  "utm": { "utm_source": "google", "utm_campaign": "search-feb" }
}
```

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-02-21 | Initial Google Ads variant — P0+P1 compliance fixes from `/start/` v4.0 |

---

*Copy version 1.0 (Google Ads-Compliant) | QuizFunnel-Google Framework | Created 2026-02-21*
