# ConsistencyForge Landing — Architecture

## Tech Stack

- **HTML** — static, no build step
- **CSS** — vanilla, no preprocessor
- **JavaScript** — vanilla + GSAP 3.12 (CDN) for `/` and `/go/`
- **Hosting** — Vercel (static deployment, auto-deploy from `main`)
- **Domain** — consistencyforge.com (www canonical)
- **Security** — CSP, X-Frame-Options, HSTS via `vercel.json`

No build step. No framework. No dependencies to install.

## File Structure

```
consistencyforge-landing/
├── index.html              # Root landing page (Original, 8 sections)
├── styles.css              # Root styles + responsive breakpoints
├── script.js               # Root GSAP animations, particles, cursor
├── vercel.json             # Security headers, CSP policy
├── robots.txt              # Search engine directives
├── sitemap.xml             # Sitemap for SEO
│
├── favicon.svg             # SVG favicon
├── favicon.ico             # ICO fallback
├── favicon-16.png          # 16px PNG favicon
├── favicon-32.png          # 32px PNG favicon
├── favicon-192.png         # 192px PNG (Android)
├── logo-512.png            # 512px logo (PWA)
├── apple-touch-icon.png    # iOS home screen icon
├── safari-pinned-tab.svg   # Safari pinned tab
├── site.webmanifest        # PWA manifest
├── browserconfig.xml       # Microsoft tile config
├── ms-tile-150.png         # Microsoft 150px tile
├── ms-tile-310.png         # Microsoft 310px tile
├── og-image.png            # Open Graph share image (1200x630)
├── twitter-card.png        # Twitter card image
├── bimi.svg                # BIMI brand indicator
├── logo.svg                # SVG logo
│
├── img/                    # Root landing page icons
│   ├── icon-checkin.png
│   ├── icon-contract.png
│   ├── icon-email-confirm.png
│   ├── icon-group.png
│   ├── icon-rank.png
│   ├── icon-ranks.png
│   ├── icon-schedule.png
│   ├── icon-stakes.png
│   └── icon-themes.png
│
├── go/                     # SimonSays variant (/go/)
│   ├── index.html          # 12-section aggressive landing
│   ├── styles.css          # SimonSays styles
│   ├── script.js           # SimonSays animations + interactions
│   ├── favicon.svg         # Variant favicon
│   ├── (other favicons)    # Same set as root
│   ├── assets/
│   │   ├── hero/           # hero-bg.png, hero-video.mp4
│   │   ├── icons/          # feature-icons-2k.png, icon-set-*.png
│   │   ├── illustrations/  # avatar-wall-2k.png, rank-badges.png
│   │   ├── textures/       # metal.png, noise.png
│   │   └── og-image.png    # Variant OG image
│   └── docs/
│       └── LANDING-COPY.md # Full copy framework
│
├── start/                  # QuizFunnel variant (/start/)
│   ├── index.html          # 9-page quiz funnel
│   ├── styles.css          # Quiz styles (Inter + Exo 2 for branding)
│   ├── script.js           # Quiz logic + API integration
│   ├── assets/
│   │   ├── fire-bg.mp4     # Fire video background (6.9MB)
│   │   ├── mascot.mp4      # Animated hamster mascot (3.3MB)
│   │   ├── logo-white.svg  # White transparent brand icon (for CTA button)
│   │   ├── hamster-forge.png  # Static mascot fallback
│   │   └── fox.png         # Fox illustration
│   └── docs/
│       ├── QUIZ-COPY.md    # Full quiz copy reference (v4.0 Facebook-compliant)
│       ├── API-SPEC.md     # Onboard API endpoint spec
│       └── CHANGELOG-v4.md # v4.0 Facebook compliance changelog
│
├── start-google/           # QuizFunnel-Google variant (/start-google/)
│   ├── index.html          # 9-page quiz funnel (Google Ads-compliant copy + gtag.js)
│   ├── styles.css          # Quiz styles (copy of start/styles.css)
│   ├── script.js           # Quiz logic + gtag init + Consent Mode v2 + conversion event + phone normalization
│   ├── assets/
│   │   └── libphonenumber-js.min.js  # Self-hosted phone normalization (~183KB)
│   └── docs/
│       └── GOOGLE-ADS-COPY.md  # Full copy reference (Google variant v1.3)
│
├── start-v1/               # Backup: QuizFunnel v1 (initial)
├── start-v2/               # Backup: QuizFunnel v2 (pre-branding)
├── start-v3/               # Backup: QuizFunnel v3 (pre-Facebook-compliance)
│
└── docs/
    ├── ARCHITECTURE.md     # This file
    ├── SECTIONS.md         # Root landing section reference
    └── VARIANTS.md         # All variant comparison
```

## External Dependencies (CDN)

Used by `/` and `/go/`:
- `gsap.min.js` — core animation library
- `ScrollTrigger.min.js` — scroll-based animation triggers

Used by all:
- `Space Grotesk` — Google Fonts (`/`, `/go/`)
- `Inter` — Google Fonts (`/start/` body text)
- `Exo 2` — Google Fonts (`/start/` brand wordmark + tagline)

## Page Systems

### Root (`/`) — Original

#### Particle System
Canvas-based particle network rendered on `#particles`. 100 particles with connection lines between nearby particles. Runs on `requestAnimationFrame`.

#### Custom Cursor
Two-element cursor (dot + follower ring) with smooth follow via `requestAnimationFrame`. Expands on hover over interactive elements. Hidden on mobile (<=768px).

#### GSAP Animations
- **Hero**: Sequential timeline on page load (symbol -> title -> line -> tagline -> CTA -> trust -> scroll indicator)
- **Scroll sections**: Each section has a `ScrollTrigger` timeline that plays when entering viewport at 60% and reverses when leaving
- **Words**: Individual word animations with parallax based on `data-speed` attribute
- **Magnetic buttons**: All `.btn-primary` elements follow cursor position on hover

#### Text Scramble
Hover effect on hero tagline — characters scramble through random glyphs before resolving to the original text.

### SimonSays (`/go/`)

#### Hero Video
Looping MP4 background with overlay gradient. Counter animation for staked amount.

#### GSAP Animations
Similar scroll-triggered system to root, plus:
- Staked amount counter animation
- Testimonial carousel
- FAQ accordion

### QuizFunnel (`/start/`)

#### Quiz Flow
9-page sequential flow managed by `showPage()`:
1. **Hero** — brand header (logo + CONSISTENCY FORGE wordmark) + "OWN YOUR TIME" tagline + hook + CTA to start quiz
2. **Q1-Q6** — single-answer questions with visual feedback
3. **Results** — personalized text based on quiz answers + email collection
4. **Commitment** — name, schedule, why fields
5. **Thank You** — confirmation + magic link messaging

#### Progress Bar
Fixed top bar showing quiz completion percentage. Appears after hero, includes back button.

#### Video Background
Fixed fire-bg.mp4 with dark gradient overlay. Mascot.mp4 displayed as circular avatar throughout.

#### API Integration
`submitCommitment()` sends POST to `app.consistencyforge.com/api/landing/onboard` with quiz answers, commitment details, and email. API creates account + $25 contract + sends magic link.

#### Personalization
`personalizeResults()` maps Q1 (activity) and Q2 (barrier) answers to generate customized result text.

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| <=768px | Custom cursor hidden (root), nav links hidden, grids stack to 1 column |
| <=480px | Reduced padding, smaller font sizes, quiz mascot shrinks to 50px |

## Routing

- `/` — anchor links (`#how`, `#pricing`), external links to `app.consistencyforge.com`
- `/go/` — same anchor pattern, aggressive CTA links to app
- `/start/` — internal quiz flow via JS `showPage()`, API call on submit

## Security (vercel.json)

Applied to all paths via `/(.*)`-pattern:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- CSP: `script-src 'self' cdnjs.cloudflare.com connect.facebook.net googletagmanager.com`, `style-src 'self' fonts.googleapis.com 'unsafe-inline'`, `img-src 'self' data: facebook.com googleads.g.doubleclick.net google.com googletagmanager.com`, `connect-src 'self' app.consistencyforge.com facebook.com google-analytics.com googleads.g.doubleclick.net google.com googletagmanager.com analytics.google.com`, `media-src 'self'`
