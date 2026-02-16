# ConsistencyForge Landing

Landing page for [consistencyforge.com](https://consistencyforge.com) — a habit accountability platform where you sign contracts with yourself.

## Variants

| Path | Codename | Description |
|------|----------|-------------|
| `/` | Original | Friendly, zero-friction landing (8 sections) |
| `/go/` | SimonSays | Aggressive paid-ad landing (12 sections) |
| `/start/` | QuizFunnel | Interactive quiz funnel for social media ads (9 pages) |

See [docs/VARIANTS.md](docs/VARIANTS.md) for full details.

## Stack

Static HTML + CSS + JavaScript. No build step, no framework.

- **GSAP 3.12** — scroll-triggered animations (`/`, `/go/`)
- **Canvas** — particle network background (`/`)
- **Google Fonts** — Space Grotesk (`/`, `/go/`), Inter (`/start/`)
- **Video backgrounds** — fire-bg.mp4 (`/start/`), hero-video.mp4 (`/go/`)

## Local Development

```bash
python3 -m http.server 8080
```

Open [localhost:8080](http://localhost:8080).

## Deployment

Hosted on Vercel. Pushes to `main` deploy automatically.

Live URLs:
- https://www.consistencyforge.com/
- https://www.consistencyforge.com/go/
- https://www.consistencyforge.com/start/

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — tech stack, file structure, page systems
- [Sections](docs/SECTIONS.md) — detailed reference for all 8 root page sections
- [Variants](docs/VARIANTS.md) — all landing page variants and ad campaign usage
- [SimonSays Copy](go/docs/LANDING-COPY.md) — full copy framework for `/go/`
- [QuizFunnel Copy](start/docs/QUIZ-COPY.md) — full quiz copy and flow for `/start/`
- [QuizFunnel API Spec](start/docs/API-SPEC.md) — onboard API endpoint for `/start/`
