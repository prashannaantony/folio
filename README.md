# Prashanna A — Game-Developer Portfolio (v4, multi-page)

Premium, page-based portfolio. **Each section is its own page/route** via React Router,
animated with GSAP, adaptive light/dark, brand color **#FFAB00**.

## What changed in this version
- **Separate page per section** — real routes: `/`, `/about`, `/skills`, `/projects`,
  `/journey`, `/inventory`, `/credits`. One section renders at a time (not one long scroll).
- **Circular command dial** — rotates smoothly so the active page sits at the top; switching
  pages eases the ring with no lag. Scroll-wheel over the dial cycles pages; arrows + center
  readout included. Sits safely above the bottom edge, responsive.
- **Adaptive theme only** — no manual light/dark switch. Follows the OS theme and updates live;
  both themes are hand-tuned for contrast and brand consistency.
- **All section content restored** — About (summary, traits, stats, languages, learning),
  Skills (names/tags only), Projects (cards + full modal briefings), Inventory, Credits.
- **Journey = its own page with working smooth scroll** — vertical wheel / drag / arrow keys
  drive a single eased progress value that moves the track horizontally AND walks the person
  along the rail (legs/arms animate only while moving). Self-contained, so it works reliably.
- **Hero image cursor tilt** — the profile card tilts in 3D toward the cursor with a moving glare.

## Quick start
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # verified production build
npm run preview
```

## Structure
```
src/
  main.jsx
  App.jsx                      # React Router: one <Route> per section
  index.css
  components/
    GamePortfolio.jsx          # exports each page + the dial + theme + styles
    ThreeAccent.jsx            # optional React Three Fiber amber crystal
  data/
    profile.json  skills.json  projects.json  journey.json
```

## Routes → sections
`/` Home · `/about` · `/skills` · `/projects` · `/journey` · `/inventory` · `/credits`

> For production hosting, configure SPA fallback (serve `index.html` for unknown paths) so deep
> links like `/projects` resolve. On Netlify add a `_redirects` file with `/* /index.html 200`;
> on Vercel it's automatic; for `vite preview` it already falls back correctly.

## Profile photos (hero only)
Edit `src/data/profile.json → avatars[]`, set `img` to e.g. `/avatars/me1.jpg` (files in
`public/avatars/`, square crops). `null` shows a labeled placeholder. Images are hero-only by design.

## Data-driven
Add a project → `projects.json`. Add a skill tag → `skills.json`. Add a milestone → `journey.json`.
Re-theme everything → change `--brand` in the `:root` block of `GamePortfolio.jsx`.

## Optional 3D
Import `ThreeAccent.jsx` and drop `<ThreeAccent />` into the hero frame for a live WebGL amber
crystal (kept opt-in so three.js doesn't affect first paint).
