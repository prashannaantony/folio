# 💼 Developer Portfolio — Prashanna A

> A premium, **route-based developer portfolio** with a custom circular "command-dial" navigation, GSAP animations, adaptive light/dark theming, and an optional WebGL 3D accent. Built to present my game-development work like a product, not a résumé.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)

<p align="center">
  <a href="https://prashannadev.vercel.app"><b>🔴 Live Demo → prashannadev.vercel.app</b></a>
</p>

---

## 📖 Overview

This is my personal portfolio, designed around a **game-UI aesthetic**. Each section is its own route (not a single long scroll), navigated through a rotating circular dial inspired by in-game radial menus. The whole site is **data-driven** — projects, skills, and milestones are defined in JSON, so content updates never touch component code.

## ✨ Highlights

- **Route-per-section architecture** — `/`, `/about`, `/skills`, `/projects`, `/journey`, `/inventory`, `/credits` via React Router; one section renders at a time.
- **Circular command dial** — a custom radial navigation that eases the active page to the top; scroll-wheel and arrow-key driven.
- **Adaptive theming** — follows the OS light/dark preference live; both themes hand-tuned for contrast and brand consistency (brand `#FFAB00`).
- **Custom "Journey" page** — a single eased progress value drives a horizontal track *and* walks an animated character along a rail (limbs animate only while moving).
- **3D hero tilt** — the profile card tilts in 3D toward the cursor with a moving glare; optional React Three Fiber amber crystal kept opt-in so three.js doesn't affect first paint.
- **Data-driven content** — add a project/skill/milestone by editing JSON.

## 🛠️ Tech Stack

**React · React Router · Vite · GSAP · Tailwind CSS · Three.js / React Three Fiber · Bun · Vercel Analytics**

## 📂 Structure

```
src/
├── main.jsx
├── App.jsx                  # React Router + Analytics / Speed Insights mount
├── index.css
├── lib/
│   └── analytics.js         # safe track() wrapper + beforeSend scrubber
├── components/
│   ├── GamePortfolio.jsx    # pages + dial + theme + styles
│   └── ThreeAccent.jsx      # optional WebGL amber crystal
└── data/
    └── profile.json  skills.json  projects.json  journey.json
```

## 🚀 Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build
npm run preview
```

> **SPA hosting:** deep links like `/projects` only resolve if the host rewrites unknown paths to `index.html` — this is *not* automatic on Vercel for a static Vite build. `vercel.json` configures it (along with asset caching); `public/_redirects` covers Netlify.

## 📊 Analytics

[Vercel Web Analytics](https://vercel.com/docs/analytics) and [Speed Insights](https://vercel.com/docs/speed-insights) are mounted in `src/App.jsx`. Both must also be **enabled once in the Vercel dashboard** (Project → Analytics / Speed Insights → Enable) — the client scripts are served by the platform at `/_vercel/*`, so nothing is collected until they are switched on.

Because this is an SPA, the catch-all rewrite in `vercel.json` deliberately excludes `_vercel/` — without that exclusion the tracking script and its beacons are rewritten to `index.html` and every metric silently reads zero.

Pageviews follow React Router history changes automatically. Custom events fired by the UI:

| Event | Properties | Fired when |
| --- | --- | --- |
| `resume_view` | `variant` | Résumé viewer is opened |
| `resume_open` | `source` | Résumé opened as a raw PDF tab |
| `resume_download` | `source` | Résumé is downloaded |
| `project_open` | `project`, `engine` | A project briefing is opened |
| `project_video_play` | `project` | Gameplay capture is played in the modal |
| `project_repo_click` | `project` | Source link is followed |
| `contact_click` | `channel` | An email / phone / social link is opened |
| `contact_copy` | `channel` | A contact value is copied |

`src/lib/analytics.js` wraps every call: values are trimmed to the length cap Vercel enforces, credential-ish query params (`token`, `email`, `session`, …) are stripped in `beforeSend`, and a thrown or blocked tracker can never break a render. In `npm run dev` events are logged to the console instead of being sent.

## 🖼️ Screenshots

> 📸 _Add a screenshot/GIF of the command dial and a couple of pages here._

## 🎯 What I Built / Learned

- A **non-trivial custom navigation component** (radial dial) with smooth easing.
- **Animation choreography** with GSAP tied to a single progress value.
- **Data-driven, themeable** front-end architecture.
- Production deployment with **SPA routing** on Vercel.

---

## 📫 Contact

**Prashanna A** — [Portfolio](https://prashannadev.vercel.app) · [LinkedIn](https://www.linkedin.com/in/prashanna-a-3176102b0) · prashanna876@gmail.com

> _Keywords: React, React Router, Vite, GSAP, Tailwind CSS, Three.js, React Three Fiber, front-end, web development, animation, responsive design, portfolio._
