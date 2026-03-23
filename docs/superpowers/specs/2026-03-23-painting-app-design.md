# الشيخ ميديا - ركن الأطفال: Painting App (Phase 1)

## Context

This is Phase 1 of a kids' educational platform targeting Arab children under 5. The platform will eventually include interactive games, parent dashboards, sponsored seat subscriptions, and birthday/gift tracking. Phase 1 focuses exclusively on shipping a **standalone painting/drawing app** — no auth, no payment, no backend. The goal is to get a delightful, kid-safe drawing experience in front of real families and learn from their usage.

**Platform name:** الشيخ ميديا - ركن الأطفال (Alsheikh Media Kids Corner)

## Scope

### In Scope (Phase 1)
- Free-draw painting canvas (finger + mouse)
- 10 kid-friendly colors, 3 brush sizes, eraser
- Undo (stroke-level), clear (with confirm)
- Full-screen mode with parent lock (math problem gate)
- Save drawing as PNG (client-side download)
- Auto-save stroke history to localStorage
- Full Arabic RTL UI, no English
- Responsive: tablet and desktop equally

### Out of Scope (Future Phases)
- User accounts / authentication
- Parent dashboard (kid profiles, DOB, scores)
- Payment / Stripe subscription
- Anonymous seat sponsorship
- Birthday wishes / gift tracking
- Guided painting templates / stamps / stickers
- Backend / database
- English language support

## Tech Stack

- **Framework:** SvelteKit (latest, Svelte 5 runes)
- **Drawing:** HTML5 Canvas API + Pointer Events API
- **Styling:** Plain CSS (no framework — keeps bundle tiny)
- **Font:** Baloo Bhaijaan 2 (self-hosted, kid-friendly rounded Arabic)
- **Language:** TypeScript (strict)
- **Build:** Vite (via SvelteKit)

## Architecture

### Drawing Engine

**Stroke-based model:**
```typescript
interface Point {
  x: number;  // 0-1 ratio (normalized to canvas width)
  y: number;  // 0-1 ratio (normalized to canvas height)
  pressure: number;
}

interface Stroke {
  points: Point[];
  color: string;
  size: number;
  tool: 'brush' | 'eraser';
}
```

- Each finger/mouse drag creates one `Stroke` with an array of `Point`s
- `strokes[]` array = the full drawing history
- Undo = pop last stroke from array
- Clear = empty the array (with double-tap confirm)
- Eraser = stroke drawn in background color (`#fffdf9`)

**Rendering pipeline:**
1. On each change → clear canvas
2. Redraw all strokes from `strokes[]` history
3. Draw current in-progress stroke
4. Use quadratic bezier interpolation for smooth lines:
   ```
   for each pair of points (p1, p2):
     midpoint = (p1 + p2) / 2
     ctx.quadraticCurveTo(p1.x, p1.y, midpoint.x, midpoint.y)
   ```

**Input handling:**
- Pointer Events API (`pointerdown`, `pointermove`, `pointerup`)
- `touch-action: none` on canvas to prevent scroll interference
- Capture pressure data from stylus (gracefully ignored for finger/mouse)

### UI Layout

**Full-screen canvas with floating toolbar:**

The canvas occupies the entire viewport. A slim floating toolbar sits at the bottom with:

- **10 color circles** (48px each): red, orange, yellow, green, blue, purple, pink, black, white, brown
- **3 size buttons** (small/medium/large dots): 14px, 24px, 38px
- **Eraser toggle** (🧽): switches to eraser mode
- **Undo** (↩️): removes last stroke
- **Clear** (🗑️): double-tap to confirm — first tap shows ✅, second tap within 2s clears
- **Save** (💾): downloads PNG

The toolbar is collapsible via a drag handle — maximizes canvas space.

**Top corners:**
- 🔒 Parent gate trigger (top-left, subtle)
- ⛶ Fullscreen toggle (top-right)

### Parent Lock (Kiosk Mode)

Critical for kids under 5 who tap everything:

1. Parent taps 🔒 → overlay appears with a **math problem** (e.g., ١٧ + ٢٤ = ؟)
2. Kids can't solve it; parents enter the answer
3. **Phase 1:** Unlocks exit fullscreen only. Future phases add settings, save gallery, kid profile switching.
4. Combined with **Fullscreen API** = full kiosk mode
5. Random math problems on each open (2-digit addition/subtraction)

### Saving & Storage

**Client-side only (Phase 1):**
- **Manual save:** `canvas.toDataURL('image/png')` → downloads as `ركن-الأطفال-رسمة-{timestamp}.png`
- **Auto-save:** Stroke history serialized to `localStorage` every 30 seconds. If serialized data exceeds 4MB, drop the oldest auto-save silently (known limitation for Phase 1).
- **Recovery:** On page load, check localStorage for saved strokes and offer to restore

**Canvas resize handling:** Canvas dimensions are set on initial load. On viewport resize (e.g., tablet rotation), the canvas re-renders at the new size and strokes are scaled proportionally (coordinates stored as 0-1 ratios, not absolute pixels).

### Design Principles

- **All touch targets ≥ 48px** (56px for primary actions)
- **No text labels** — icons only for kid-facing UI
- **Full RTL** — all layout direction is right-to-left
- **Paper texture background** — subtle dot grid for natural feel
- **Vibrant, high-contrast colors** — accessible and appealing to young children
- **Double-tap to clear** — prevents accidental loss of artwork
- **Auto-save** — kids don't think about saving

## Project Structure

```
kids/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte              # RTL wrapper, font loading, global styles
│   │   ├── +page.svelte                # Splash → redirects to /paint
│   │   └── paint/
│   │       └── +page.svelte            # Painting app page
│   ├── lib/
│   │   ├── components/
│   │   │   ├── PaintingCanvas.svelte   # Canvas element + drawing engine
│   │   │   ├── Toolbar.svelte          # Colors, sizes, tools bar
│   │   │   ├── ParentGate.svelte       # Lock overlay + math problem
│   │   │   └── FullscreenToggle.svelte # Fullscreen button
│   │   ├── stores/
│   │   │   └── drawing.svelte.ts       # Drawing state (Svelte 5 $state runes)
│   │   └── utils/
│   │       ├── canvas-renderer.ts      # Pure stroke rendering functions
│   │       └── storage.ts              # localStorage save/load helpers
│   └── app.css                         # Global styles, CSS custom properties
├── static/
│   └── fonts/
│       └── BalooBhaijaan2-*.woff2      # Self-hosted Arabic font
├── svelte.config.js
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## Color Palette

| Color | Hex | Arabic Name |
|-------|-----|-------------|
| Red | `#e74c3c` | أحمر |
| Orange | `#f39c12` | برتقالي |
| Yellow | `#f1c40f` | أصفر |
| Green | `#27ae60` | أخضر |
| Blue | `#3498db` | أزرق |
| Purple | `#8e44ad` | بنفسجي |
| Pink | `#e91e8f` | وردي |
| Brown | `#795548` | بني |
| Black | `#2c3e50` | أسود |
| White | `#ecf0f1` | أبيض |

**Canvas background:** `#fffdf9` (warm off-white)
**App background:** `#f8f4f0` (warm light gray)

## Verification Plan

1. **Scaffold SvelteKit project** → `npm create svelte@latest`
2. **Run dev server** → `npm run dev` → verify blank page loads
3. **Add canvas component** → verify drawing with mouse works
4. **Test touch** → open on tablet/phone, verify finger drawing works
5. **Test RTL** → verify all UI flows right-to-left
6. **Test parent gate** → verify math problem blocks, correct answer unlocks
7. **Test fullscreen** → verify Fullscreen API works on supported browsers
8. **Test save** → verify PNG downloads with Arabic filename
9. **Test auto-save** → draw, refresh, verify stroke restoration prompt
10. **Test undo/clear** → verify stroke removal and double-tap clear
11. **Cross-browser** → Safari (primary for iPad), Chrome, Firefox
