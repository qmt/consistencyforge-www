# ConsistencyForge Landing — Architecture

## Tech Stack

- **HTML** — static, single page
- **CSS** — vanilla, no preprocessor
- **JavaScript** — vanilla + GSAP 3.12 (CDN)
- **Hosting** — Vercel (static deployment)
- **Domain** — consistencyforge.com

No build step. No framework. No dependencies to install.

## File Structure

```
landing/
├── index.html          # Single-page HTML (all 8 sections)
├── styles.css          # All styles + responsive breakpoints
├── script.js           # GSAP animations, particles, cursor, interactions
├── save-email.php      # Legacy email signup backend (not used in current version)
├── img/
│   ├── icon-checkin.png
│   ├── icon-contract.png
│   ├── icon-email-confirm.png
│   ├── icon-group.png
│   ├── icon-rank.png
│   ├── icon-ranks.png
│   ├── icon-schedule.png
│   ├── icon-stakes.png
│   └── icon-themes.png
└── docs/
    ├── ARCHITECTURE.md
    └── SECTIONS.md
```

## External Dependencies (CDN)

- `gsap.min.js` — core animation library
- `ScrollTrigger.min.js` — scroll-based animation triggers
- `Space Grotesk` — Google Fonts

## Page Systems

### Particle System
Canvas-based particle network rendered on `#particles`. 100 particles with connection lines between nearby particles. Runs on `requestAnimationFrame`.

### Custom Cursor
Two-element cursor (dot + follower ring) with smooth follow via `requestAnimationFrame`. Expands on hover over interactive elements. Hidden on mobile (≤768px).

### GSAP Animations
- **Hero**: Sequential timeline on page load (symbol → title → line → tagline → CTA → trust → scroll indicator)
- **Scroll sections**: Each section has a `ScrollTrigger` timeline that plays when entering viewport at 60% and reverses when leaving
- **Words**: Individual word animations with parallax based on `data-speed` attribute
- **Magnetic buttons**: All `.btn-primary` elements follow cursor position on hover

### Text Scramble
Hover effect on hero tagline — characters scramble through random glyphs before resolving to the original text.

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| ≤768px | Custom cursor hidden, nav links hidden (logo + Sign In only), grids stack to 1 column, CTA buttons stack |
| ≤480px | Reduced padding, smaller font sizes in pricing |

## Routing

All navigation is on-page via anchor links (`#how`, `#pricing`). External links point to `app.consistencyforge.com`. No client-side routing.
