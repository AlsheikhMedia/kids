# Landing Page + Game Shell — Design Spec

## Context

Phase 1 shipped a standalone painting app at `/paint`. Now we need an SEO-rich landing page at `/` that showcases all educational games as clickable cards. The landing page targets **parents and schools** searching for interactive kids' games in both Arabic and English. It also establishes the **game shell architecture** — shared routes, components, and a "coming soon" page for unbuilt games.

**Platform:** الشيخ ميديا — ركن الأطفال (Alsheikh Media Kids Corner)
**URL:** https://kids.alsheikhmedia.com
**Stack:** SvelteKit (existing project), static adapter, Cloudflare Pages

## Scope

### In Scope
- SEO-optimized landing page at `/` with 5 game cards
- Comic/playful Claymorphism design (chunky cards, rainbow gradients, rounded shapes)
- Bilingual SEO (Arabic primary, English secondary meta tags)
- JSON-LD structured data for each game
- "قريباً" (coming soon) page for unbuilt games
- Route structure for all 5 games
- Reusable `GameCard` component

### Out of Scope
- Building the 4 new games (separate spec per game)
- User accounts / authentication
- Payment / subscription
- Analytics / tracking

## Games Lineup

| Game | Arabic Title | Route | Status | Age |
|------|-------------|-------|--------|-----|
| Painting | لوحة الرسم الحرة | `/paint` | Built | ٢-٥ |
| Color Matching | طابق الألوان | `/games/colors` | Coming Soon | ٢-٤ |
| Number Ordering | رتب الأرقام | `/games/numbers` | Coming Soon | ٣-٥ |
| Arabic Alphabet | رتب الحروف | `/games/alphabet` | Coming Soon | ٣-٥ |
| Puzzle | الأحجية | `/games/puzzle` | Coming Soon | ٣-٥ |

## Landing Page Design

### Visual Style
- **Claymorphism / Comic:** Chunky rounded cards (28px radius), thick borders (4px), text shadows, warm background (#FFF8F0)
- **Rainbow hero gradient:** red → orange → yellow → green (`#FF6B6B` → `#FF8E53` → `#FFC75F` → `#55E6C1`)
- **Each game = unique color gradient:** Kids identify games by color
- **Big touch targets:** Cards are full-width or half-width grid, minimum 200px height
- **Font:** Baloo Bhaijaan 2 (already self-hosted)

### Page Structure

```
┌─────────────────────────────────────────────┐
│ HERO                                        │
│ ركن الأطفال                                 │
│ ألعاب تعليمية ممتعة!                         │
│ (English subtitle)                          │
│ [مجاني] [بدون إعلانات] [آمن ١٠٠٪]           │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ GAMES GRID                                  │
│ ┌─────────────────────────────────────────┐ │
│ │ ★ لوحة الرسم الحرة (FEATURED, full)    │ │
│ └─────────────────────────────────────────┘ │
│ ┌──────────────┐ ┌──────────────┐          │
│ │ طابق الألوان │ │ رتب الأرقام  │          │
│ └──────────────┘ └──────────────┘          │
│ ┌──────────────┐ ┌──────────────┐          │
│ │ رتب الحروف  │ │ الأحجية      │          │
│ └──────────────┘ └──────────────┘          │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ WHY US — 4 feature cards in grid            │
│ آمن ١٠٠٪ | ابدأ فوراً | تعليمي | كل الأجهزة │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ FOOTER — bilingual copyright                │
└─────────────────────────────────────────────┘
```

### Game Card Component

Props:
```typescript
interface GameCardProps {
  title: string;          // Arabic game title
  description: string;    // Short Arabic description
  href: string;           // Route path
  gradient: string;       // CSS gradient
  borderColor: string;    // Border color
  icon: Snippet;          // SVG icon as Svelte 5 snippet
  ageRange: string;       // e.g. "٣ - ٥ سنوات"
  featured?: boolean;     // Full-width card
  comingSoon?: boolean;   // Shows "قريباً" badge, still links to coming soon page
}
```

Cards with `comingSoon: true` link to `/games/coming-soon` and show a subtle "قريباً" badge overlay.

### Card Gradients

| Game | Gradient |
|------|----------|
| Paint | `linear-gradient(135deg, #FF6B6B, #EE5A24)` |
| Colors | `linear-gradient(135deg, #FDCB6E, #E17055)` |
| Numbers | `linear-gradient(135deg, #55EFC4, #00B894)` |
| Alphabet | `linear-gradient(135deg, #74B9FF, #0984E3)` |
| Puzzle | `linear-gradient(135deg, #A29BFE, #6C5CE7)` |

## SEO Strategy

### Meta Tags
```html
<title>ركن الأطفال — ألعاب تعليمية تفاعلية للأطفال | Alsheikh Media Kids Corner</title>
<meta name="description" content="ألعاب تعليمية آمنة ومجانية للأطفال تحت ٥ سنوات. تعلم الألوان والأرقام والحروف العربية. Free educational games for kids under 5." />
<meta name="keywords" content="ألعاب أطفال, ألعاب تعليمية, تعلم الحروف العربية, kids games, educational games, Arabic learning" />
```

### Open Graph
```html
<meta property="og:title" content="ركن الأطفال — ألعاب تعليمية للأطفال" />
<meta property="og:description" content="ألعاب آمنة ومجانية للأطفال تحت ٥ سنوات" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://kids.alsheikhmedia.com" />
<meta property="og:locale" content="ar_AE" />
<meta property="og:locale:alternate" content="en_US" />
```

### JSON-LD Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ركن الأطفال — الشيخ ميديا",
  "alternateName": "Alsheikh Media Kids Corner",
  "url": "https://kids.alsheikhmedia.com",
  "applicationCategory": "EducationalApplication",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "suggestedMinAge": 2,
    "suggestedMaxAge": 5
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AED"
  },
  "inLanguage": ["ar", "en"],
  "hasPart": [
    {
      "@type": "WebApplication",
      "name": "لوحة الرسم الحرة",
      "url": "https://kids.alsheikhmedia.com/paint"
    }
  ]
}
```

### Semantic HTML
- `<main>` wrapping page content
- `<section>` with proper `aria-label` for each section
- `<h1>` for site name (hero), `<h2>` for section titles
- `<article>` for each game card

## Coming Soon Page

Route: `/games/coming-soon`

Simple, friendly page:
- Same warm background and font
- Large SVG illustration (construction/rocket/stars)
- "قريباً!" (Coming soon!) in big text
- "نعمل على تحضير هذه اللعبة" (We're preparing this game)
- Button: "العودة للألعاب" (Back to games) → links to `/`
- English subtitle: "This game is coming soon!"

## Route Structure

```
src/routes/
├── +page.svelte                    # Landing page (NEW)
├── +layout.svelte                  # Root layout (EXISTS)
├── +layout.ts                      # Prerender config (EXISTS)
├── paint/+page.svelte              # Painting app (EXISTS)
└── games/
    ├── coming-soon/+page.svelte    # Coming soon page (NEW)
    ├── colors/+page.svelte         # Redirects to coming-soon (NEW, placeholder)
    ├── numbers/+page.svelte        # Redirects to coming-soon (NEW, placeholder)
    ├── alphabet/+page.svelte       # Redirects to coming-soon (NEW, placeholder)
    └── puzzle/+page.svelte         # Redirects to coming-soon (NEW, placeholder)
```

Placeholder game pages redirect to `/games/coming-soon` so the routes exist for SEO and linking. When a game is built, replace the redirect with the actual game.

## New Components

```
src/lib/components/landing/
├── Hero.svelte              # Rainbow gradient hero with title + badges
├── GameCard.svelte          # Reusable game card
├── Features.svelte          # "Why us" section with 4 feature items
└── GameGrid.svelte          # Grid layout + game data
```

## Games Data

Centralized in `src/lib/games.ts`:
```typescript
interface GameInfo {
  id: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
  borderColor: string;
  ageRange: string;
  comingSoon: boolean;
}

export const GAMES: GameInfo[] = [...];
```

This array drives both the landing page cards and the JSON-LD structured data.

## Verification

1. `npm run build` succeeds (all routes prerender)
2. Landing page at `/` renders with all 5 game cards
3. Painting card links to `/paint` (works)
4. Other 4 cards link to `/games/coming-soon`
5. View source: proper `<title>`, `<meta>`, JSON-LD present
6. Google Rich Results Test passes on structured data
7. Mobile responsive: cards stack on small screens
8. All touch targets ≥ 48px
9. `prefers-reduced-motion` respected
10. Deploy to Cloudflare Pages, verify at kids.alsheikhmedia.com
