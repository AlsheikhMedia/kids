# Roadmap — ركن الأطفال (Kids Corner)

Last updated: 2026-03-23

## Vision

A paid educational platform for Arab children under 5 with interactive games, parent dashboards, and an anonymous sponsorship model where affluent parents can buy annual seats for less fortunate kids.

---

## Phase 1 — Painting App ✅

**Status: SHIPPED** — kids.alsheikhmedia.com/paint

- [x] Free-draw painting canvas (finger + mouse, bezier smoothing)
- [x] 10 colors, 3 brush sizes, eraser, undo, double-tap clear
- [x] Save as PNG with Arabic filename
- [x] Auto-save to localStorage with recovery toast
- [x] Full-screen kiosk mode with parent math gate
- [x] Full Arabic RTL, self-hosted Baloo Bhaijaan 2 font
- [x] SEO landing page with game cards (Claymorphism design)
- [x] OpenMoji icons (self-hosted, CC BY-SA 4.0)
- [x] Cloudflare Pages deployment with CSP, HSTS, Permissions-Policy
- [x] Website audit: 94/100 Grade A
- [x] Security review: 0 vulnerabilities
- [x] UI/UX audit: all critical/high violations fixed

---

## Phase 2 — Game Suite

**Status: NOT STARTED** — routes exist as coming-soon placeholders

Build 4 educational games. Each game gets its own spec → plan → build cycle. Shared patterns: fullscreen + parent gate, auto-save progress, no text labels (icon-based UI), same design tokens.

### 2a. طابق الألوان (Color Matching)
- Show a target color, kid taps the matching one from a grid
- Teaches color recognition
- Age: 2-4 years
- Simplest game — buttons + state, no drag/drop
- Route: `/games/colors`

### 2b. رتب الأرقام (Number Ordering 1-10)
- Scrambled numbers, kid drags them into correct order
- Teaches counting in Arabic numerals (١-١٠)
- Age: 3-5 years
- Medium complexity — needs drag-and-drop (Pointer Events)
- Route: `/games/numbers`

### 2c. رتب الحروف (Arabic Alphabet Ordering)
- Same mechanic as number ordering but with أ-ي
- Teaches Arabic letter sequence
- Age: 3-5 years
- Reuses number ordering code/patterns
- Route: `/games/alphabet`

### 2d. الأحجية (Simple Puzzle)
- 2x2 or 3x3 image puzzles, drag pieces to correct position
- Visual/spatial skills
- Age: 3-5 years
- Most complex — image slicing + snap-to-grid logic
- Route: `/games/puzzle`

**Recommended build order:** Colors → Numbers → Alphabet → Puzzle (each builds on the previous, complexity increases gradually)

---

## Phase 3 — Painting App v2

Enhance the painting app based on real usage feedback.

- [ ] Guided painting templates (pre-drawn outlines kids color in)
- [ ] Stamps and stickers (animals, shapes, stars)
- [ ] Background colors/themes
- [ ] Color fill tool (tap to fill enclosed areas)
- [ ] Save/share gallery (view past paintings)
- [ ] Sound effects (splash, swoosh on drawing)

---

## Phase 4 — Parent Accounts + Dashboard

Transition from standalone to platform. Requires backend.

- [ ] Parent registration (email/password or social login)
- [ ] Add kids to account (name, DOB, age auto-calculated)
- [ ] Per-kid score/progress tracking across all games
- [ ] Painting gallery per kid (cloud-saved)
- [ ] Birthday tracking + automated wishes
- [ ] Gift sending integration (TBD — physical or digital)
- [ ] Supabase or similar for auth + database

---

## Phase 5 — Payment + Sponsorship

The business model.

- [ ] Stripe integration — annual subscription (low cost, ≤$10/year)
- [ ] Free tier with limited games, paid unlocks everything
- [ ] **Anonymous sponsorship:** rich parents buy extra annual seats
  - Seats go into a shared pool
  - Less fortunate parents apply for sponsored access
  - Platform assigns from pool — no direct connection between sponsor and recipient
  - Privacy-preserving, dignity-first design
- [ ] Sponsor dashboard: see how many kids you've helped (no names)
- [ ] Sponsored kid experience: identical to paid — no visible difference

---

## Phase 6 — Growth + Engagement

- [ ] More game types (shape recognition, animal sounds, simple words)
- [ ] Bilingual support (Arabic + English toggle)
- [ ] Progress badges and achievements for kids
- [ ] Parent notifications (weekly progress summaries)
- [ ] School/institution bulk accounts
- [ ] PWA support (installable, offline-capable)
- [ ] Push notifications for birthday wishes

---

## Technical Debt & Improvements

- [ ] E-E-A-T pages: about, contact, privacy policy (boosts SEO)
- [ ] og:image for social sharing (design needed)
- [ ] Automated CI/CD (GitHub Actions → build → deploy to Cloudflare)
- [ ] End-to-end tests (Playwright)
- [ ] Performance monitoring (Core Web Vitals)
- [ ] i18n infrastructure when English is added

---

## Architecture Evolution

| Phase | Stack | Hosting |
|-------|-------|---------|
| 1-3 (current) | SvelteKit static, no backend | Cloudflare Pages |
| 4+ | SvelteKit SSR + Supabase | Cloudflare Workers or similar |
| 5+ | + Stripe | Same |

The transition from static to SSR happens at Phase 4 when we need auth and a database. Until then, everything stays client-side and zero-cost to host.
