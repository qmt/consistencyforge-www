# Landing Page Variants

ConsistencyForge runs multiple landing page variants for audience-targeted ad campaigns.
All variants are live simultaneously — traffic is directed via ad campaign URLs.

## Active Variants

| Path | Codename | Tone | Format | Target Audience |
|------|----------|------|--------|-----------------|
| `/` | Original | Friendly, zero-friction | 8 sections | Broad / organic / SEO |
| `/go/` | SimonSays | Aggressive, accountability-first | 12 sections | Paid ads, high-intent, loss-aversion audiences |
| `/start/` | QuizFunnel | Guiding, supportive, aspirational | 9-page quiz | Social media ads (Facebook-compliant) |
| `/start-google/` | QuizFunnel-Google | Guiding, supportive, aspirational | 9-page quiz | Google Ads (Google Ads-compliant) |

## URL Structure

- **Original**: `https://www.consistencyforge.com/`
- **SimonSays**: `https://www.consistencyforge.com/go/`
- **QuizFunnel**: `https://www.consistencyforge.com/start/`
- **QuizFunnel-Google**: `https://www.consistencyforge.com/start-google/`

The `/go/` path follows industry standard for campaign landing pages (short, memorable, action-oriented).
The `/start/` path is designed for social media ad campaigns with a quiz-based engagement funnel.

## Variant Details

### `/` — Original (8 sections)
- Hero, How It Works, Features, Words, The Promise, Pricing, Final CTA, Footer
- Friendly messaging: "email-first, no app login"
- Trust-forward: emphasizes free tier and simplicity

### `/go/` — SimonSays (12 sections)
- Adds: The Problem ("The Mirror"), The Dare ("Skin in the Game"), Social Proof ("The Evidence"), FAQ ("Still Hesitating?")
- Aggressive copy: "STOP LYING TO YOURSELF"
- Loss aversion psychology: $2.8M staked counter, 2x multiplier messaging
- AI-generated assets: hero video (Veo 2), textures, illustrations (Imagen 4)
- Full copy framework in `go/docs/LANDING-COPY.md`

### `/start/` — QuizFunnel (9-page quiz)
- Pages: Hero, Q1-Q6, Results + Email, Commitment Form, Thank You
- **Branding**: Logo + "CONSISTENCY FORGE" wordmark (Exo 2) on hero page; white logo icon in "I Commit" CTA button
- "OWN YOUR TIME" tagline on hero (Exo 2, orange, uppercase)
- **Copy v4.0 (Facebook-compliant)**: Guiding/supportive/aspirational tone (Sinek empathy + Goggins directness, compliance-safe). Rewritten 2026-02-21 to pass Meta Advertising Standards.
- 6-question reflective quiz flow with personalized results
- Collects email + commitment details, sends to onboard API
- API creates account + $29 contract + sends magic link email
- Fire video background, animated mascot, pulsing motivational quotes
- Inter font for body (vs Space Grotesk on other variants); Exo 2 for brand elements
- Assets in `start/assets/` (fire-bg.mp4, mascot.mp4, logo-white.svg)
- Full changelog: `start/docs/CHANGELOG-v4.md`

### `/start-google/` — QuizFunnel-Google (9-page quiz)
- Fork of `/start/` with Google Ads policy compliance fixes (P0 + P1 + P2)
- **Copy v1.2 (Google Ads-compliant)**: Softened claims, depersonalized results, disclaimers, clarified $29 accountability goal
- Key differences from `/start/`: toned-down headline ("Discover Your Path to Better Habits"), depersonalized results ("Based on your answers:"), results disclaimer, health disclaimer, neutral consent checkbox, cookie Decline button + Privacy link, thank-you navigation
- **Google Ads tag:** `AW-17968071912` with Consent Mode v2 (EU/GDPR compliant)
- **Conversion tracking:** fires on successful account creation
- Shares assets from `start/assets/` via relative paths (no duplication)
- API source: `quiz-v3-google` (vs `quiz-v3` for Facebook)
- **Policy audit:** ~90% approval (Gemini 85% + Grok 95%, 0 FAILs)
- Full copy reference: `start-google/docs/GOOGLE-ADS-COPY.md`

## Ad Campaign Usage

Use variant URLs in ad platforms:
- **Google Ads**: Use `/start-google/` quiz funnel (policy-compliant, gtag + Consent Mode v2 installed) or `/go/` for high-intent keywords
- **Social Media (Meta, TikTok, Instagram)**: Use `/start/` quiz funnel for engagement
- **Organic / SEO**: Root `/` handles broad discovery
- **Retargeting**: Consider `/go/` for users who bounced from `/`

## Tech Notes

- All variants are static HTML/CSS/JS — no build step
- Deployed on Vercel via auto-deploy from `main` branch
- Security headers (CSP, X-Frame, etc.) apply to all paths via `vercel.json`
- Each variant has its own SEO metadata (canonical, OG, structured data)
- `/start/` connects to `app.consistencyforge.com/api/landing/onboard` for account creation
