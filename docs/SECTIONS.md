# ConsistencyForge Landing — Section Reference

## Section 1: Hero

**Purpose:** First impression, primary CTA.

- Animated hammer icon with glow pulse
- Title: CONSISTENCY / FORGE (gradient)
- Tagline: "Sign a contract with yourself. Keep it. Become."
- CTA: "Start Forging →" (links to app)
- Ghost link: "See how it works" (scrolls to #how)
- Trust indicators: "Free to start · No credit card · 2 min setup"
- Scroll indicator at bottom

**Animation:** Sequential timeline on page load with parallax fade on scroll.

---

## Section 2: How it Works

**ID:** `#how` (nav anchor target)

**Purpose:** Explain the 3-step flow.

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 01 | icon-contract.png | Forge a Contract | Write a Soul Contract — a specific, time-bound promise to yourself about the habit you'll build. |
| 02 | icon-checkin.png | Confirm via Email | We send you a daily email. Click a link to confirm — done. No app login needed, no friction. |
| 03 | icon-rank.png | Rise in Rank | Build streaks, earn ranks, unlock new visual themes. Your consistency becomes visible proof. |

**Layout:** 3-column grid, stacks to 1 column on mobile.

---

## Section 3: Features

**Purpose:** Feature showcase in a 2×3 grid.

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | icon-schedule.png | Flexible Schedules | Daily, weekly, monthly, or pick custom days. Your rhythm, your rules. |
| 2 | icon-email-confirm.png | Zero-Friction Check-Ins | Get a daily email, click a link to confirm. No app login needed. |
| 3 | icon-stakes.png | Financial Stakes | Optional. Put $1 to $1,000 on the line. Your money becomes your motivation. |
| 4 | icon-group.png | Group Contracts | Create shared contracts. Hold each other accountable. Miss once — everyone knows. |
| 5 | icon-ranks.png | 20 Rank Themes | Roman legions, samurai clans, pirate crews. Choose your progression fantasy. |
| 6 | icon-themes.png | 14 Visual Themes | From minimal frost to imperial gold. Unlock new looks as you rank up. |

**Layout:** 2-column grid with border cards, stacks to 1 column on mobile.

---

## Section 4: Words

**Purpose:** Atmospheric/mood section.

Words displayed as outlined text with fill-on-hover: Commitment, Discipline, Resolve, Purpose, Intention.

Each word has a parallax scroll speed via `data-speed` attribute.

---

## Section 5: The Promise

**Purpose:** Emotional anchor.

Quote in large brackets: "Some promises are made to be **unbreakable.**"

Brackets hidden on mobile, text stagger-reveals on scroll.

---

## Section 6: Pricing

**ID:** `#pricing` (nav anchor target)

**Purpose:** Explain the free + staked model.

Two cards side by side:

### The Free Forge ($0 / always)
- Unlimited contracts
- All schedules
- Email check-ins
- Streaks & ranks
- All 20 rank sets
- All themes
- Achievements

*"Your word is your only stake."*

### The Staked Forge (you set the amount)
Everything free, plus:
- Financial accountability
- Higher point earnings
- Faster rank progression
- Optional recurring billing
- Reactivation after failure

*"Put your money where your mouth is."*

**Footnote:** "The platform is free forever. You only pay yourself — if you want the extra accountability."

---

## Section 7: Final CTA

**Purpose:** Closing conversion push.

- Label: "Your word awaits"
- Title: "Ready to forge your first contract?"
- Body: "It starts with a single promise. Make it to yourself. Keep it. Watch who you become."
- CTA: "Start Forging →"
- Trust indicators (repeated from hero)

---

## Section 8: Footer

- Logo (⚒) + CONSISTENCYFORGE
- Links: Terms, Privacy, Contact
- Year: 2026

---

## Icons

All icons are 1024×1024px, minimalist white line-art on black background. Displayed at 64px (How it Works) or 48px (Features) with `filter: brightness(0.85)` default, `brightness(1)` on hover.

---

## Key Messaging Theme

The landing page consistently reinforces the **email-first, zero-friction** experience:
- How it Works step 2: "No app login needed, no friction"
- Features card 2: "No app login needed"
- Trust indicators: "2 min setup"

The pricing model is positioned as **not a subscription** but a **commitment** — the platform is free, financial stakes are optional self-accountability.
