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

**React · React Router · Vite · GSAP · Tailwind CSS · Three.js / React Three Fiber · Bun**

## 📂 Structure

```
src/
├── main.jsx
├── App.jsx                  # React Router: one <Route> per section
├── index.css
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
