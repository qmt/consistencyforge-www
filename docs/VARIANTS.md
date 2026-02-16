# Landing Page Variants

ConsistencyForge runs multiple landing page variants for audience-targeted ad campaigns.
Both variants are live simultaneously — traffic is directed via ad campaign URLs.

## Active Variants

| Path | Codename | Tone | Sections | Target Audience |
|------|----------|------|----------|-----------------|
| `/` | Original | Friendly, zero-friction | 8 | Broad / organic / SEO |
| `/go/` | SimonSays | Aggressive, accountability-first | 12 | Paid ads, high-intent, loss-aversion audiences |

## URL Structure

- **Original**: `https://www.consistencyforge.com/`
- **SimonSays**: `https://www.consistencyforge.com/go/`

The `/go/` path follows industry standard for campaign landing pages (short, memorable, action-oriented).

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

## Ad Campaign Usage

Use variant URLs in ad platforms:
- **Google Ads / Meta**: Direct high-intent keywords to `/go/`
- **Organic / SEO**: Root `/` handles broad discovery
- **Retargeting**: Consider `/go/` for users who bounced from `/`

## Tech Notes

- Both variants are static HTML/CSS/JS — no build step
- Deployed on Vercel via auto-deploy from `main` branch
- Security headers (CSP, X-Frame, etc.) apply to all paths via `vercel.json`
- Each variant has its own SEO metadata (canonical, OG, structured data)
