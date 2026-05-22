import React, { useState, useEffect, useRef, useCallback } from "react";
import gsapLib from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileData from "../data/profile.json";
import projectsData from "../data/projects.json";
import skillsData from "../data/skills.json";
import journeyData from "../data/journey.json";
if (typeof window !== "undefined") {
  gsapLib.registerPlugin(ScrollTrigger);
  window.gsap = gsapLib;
  window.ScrollTrigger = ScrollTrigger;
}

/* ============================================================================
   GSAP loaded from CDN for the standalone single-file artifact.
   (The downloadable Vite project imports gsap from npm — see README.)
   ========================================================================== */
function useGSAP() {
  return gsapLib;
}

/* ============================================================================
   DATA (JSON-driven). Standalone project imports /src/data/*.json.
   ========================================================================== */
const PROFILE = profileData;
const SKILLS = skillsData.categories;
const PROJECTS = projectsData.projects;
const JOURNEY = journeyData.timeline;
const LOADOUT = profileData.loadout;
export const PAGES = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "about", label: "About", glyph: "◈" },
  { id: "skills", label: "Skills", glyph: "✦" },
  { id: "projects", label: "Projects", glyph: "❖" },
  { id: "journey", label: "Journey", glyph: "⟿" },
  { id: "loadout", label: "Inventory", glyph: "⬡" },
  { id: "contact", label: "Credits", glyph: "✈" },
];

/* ============================================================================
   ICONS
   ========================================================================== */
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const paths = {
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </>
    ),

    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    ),

    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),

    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8.01" y2="8" />
        <path d="M12 16v-5" />
        <path d="M16 16v-3a2 2 0 0 0-4 0" />
      </>
    ),

    github: (
      <>
        <path d="M9 19c-5 1.5-5-2.5-7-3" />
        <path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6-1.5 6-7A5.4 5.4 0 0 0 18.5 5 5 5 0 0 0 18.4 1S17.2.7 15 2.3a13.4 13.4 0 0 0-6 0C6.8.7 5.6 1 5.6 1A5 5 0 0 0 5.5 5 5.4 5.4 0 0 0 4 8.5c0 5.5 3 6.7 6 7A3.4 3.4 0 0 0 9 18.1V22" />
      </>
    ),

    arrow: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),

    rocket: (
      <>
        <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0z" />
        <path d="M12 15l-3-3a22 22 0 0 1 8-10c2 1 4 3 5 5a22 22 0 0 1-10 8z" />
        <path d="M9 12H4s.5-3 2-4 5 0 5 0" />
        <path d="M12 15v5s3-.5 4-2 0-5 0-5" />
      </>
    ),

    left: <polyline points="15 18 9 12 15 6" />,
    right: <polyline points="9 18 15 12 9 6" />,
  };

  return <svg {...p}>{paths[name] || null}</svg>;
};
/* ============================================================================
   SHARED
   ========================================================================== */
function SectionHead({ kicker, title, center }) {
  return (
    <div className={"section-head " + (center ? "center" : "")}>
      <div className="kicker mono">
        <span className="kicker-dot" />
        {kicker}
      </div>
      <h2 className="display section-title">{title}</h2>
    </div>
  );
}
function AvatarPlaceholder({ avatar }) {
  return (
    <div className="ph-fill">
      <svg
        viewBox="0 0 400 400"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="ph-grad" cx="50%" cy="38%" r="72%">
            <stop offset="0" stopColor="var(--ph-1)" />
            <stop offset="1" stopColor="var(--ph-2)" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#ph-grad)" />
        <rect
          x="72"
          y="72"
          width="256"
          height="256"
          rx="20"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeDasharray="10 8"
          opacity="0.55"
        />
        <circle
          cx="200"
          cy="166"
          r="46"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2.4"
          opacity="0.8"
        />
        <path
          d="M132 300 Q200 230 268 300"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2.4"
          opacity="0.8"
        />
      </svg>
      <div className="ph-tag">
        <span className="ph-plus">+</span>
        <span className="ph-tag-text mono">{avatar.sub}</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- HERO PAGE */
export function HomePage({ go }) {
  const [idx, setIdx] = useState(0);
  const frameRef = useRef(null);
  const glareRef = useRef(null);
  const avatars = PROFILE.avatars;
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % avatars.length), 3800);
    return () => clearInterval(t);
  }, [avatars.length]);

  // cursor tilt
  const onMove = (e) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${py * -14}deg) rotateY(${px * 16}deg) scale(1.02)`;
    if (glareRef.current)
      glareRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.28), transparent 55%)`;
  };
  const onLeave = () => {
    if (frameRef.current)
      frameRef.current.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  const cur = avatars[idx];
  return (
    <div className="page hero-page">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="reveal eyebrow mono">
            ● AVAILABLE FOR HIRE — {PROFILE.availability}
          </div>
          <h1 className="reveal display hero-name">{PROFILE.name}</h1>
          <div className="reveal hero-roles">
            <span className="role-pill">{PROFILE.role}</span>
            <span className="role-pill ghost">{PROFILE.classTitle}</span>
          </div>
          <p className="reveal hero-tagline">{PROFILE.tagline}</p>
          <p className="reveal hero-sub mono">{PROFILE.heroSubtitle}</p>
          <div className="reveal hero-cta">
            <button className="btn-primary" onClick={() => go("projects")}>
              View Projects <Icon name="arrow" size={16} />
            </button>
            <button className="btn-ghost" onClick={() => go("contact")}>
              Get in touch
            </button>
          </div>
          <div className="reveal hero-meta mono">
            <Icon name="pin" size={13} /> {PROFILE.location}
          </div>
        </div>

        <div
          className="hero-frame-wrap reveal"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div className="hero-frame" ref={frameRef}>
            <span className="fc tl" />
            <span className="fc tr" />
            <span className="fc bl" />
            <span className="fc br" />
            <div className="hero-portrait" key={cur.id}>
              {cur.img ? (
                <img src={cur.img} alt={cur.label} className="hero-img" />
              ) : (
                <AvatarPlaceholder avatar={cur} />
              )}
            </div>
            <div className="hero-glare" ref={glareRef} />
            <div className="hero-plate">
              <span className="display">{cur.label}</span>
              <span className="mono">{cur.sub}</span>
            </div>
          </div>
          <div className="reel-dots">
            {avatars.map((a, n) => (
              <button
                key={a.id}
                className={"reel-dot " + (n === idx ? "on" : "")}
                onClick={() => setIdx(n)}
                aria-label={a.label}
              />
            ))}
          </div>
          <div className="tilt-hint mono">↗ MOVE CURSOR OVER CARD</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- ABOUT PAGE */
export function AboutPage() {
  return (
    <div className="page pad scroll-page">
      <SectionHead kicker="PLAYER PROFILE" title="About" />
      <div className="about-grid">
        <div className="reveal card about-main">
          <p className="about-summary">{PROFILE.summary}</p>
          <div className="chip-row">
            {PROFILE.traits.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="about-side">
          <div className="reveal card">
            <div className="mini-head mono">QUICK STATS</div>
            <div className="stat-grid">
              {PROFILE.stats.map((s) => (
                <div key={s.label} className="stat">
                  <div className="stat-v display">{s.value}</div>
                  <div className="stat-l mono">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal card">
            <div className="mini-head mono">LANGUAGES</div>
            <div className="chip-row">
              {PROFILE.languages.map((l) => (
                <span key={l} className="chip soft">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal card">
            <div className="mini-head mono">CURRENTLY LEARNING</div>
            <div className="chip-row">
              {PROFILE.learningFocus.map((l) => (
                <span key={l} className="chip soft">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- SKILLS PAGE (names only) */
export function SkillsPage() {
  return (
    <div className="page pad scroll-page">
      <SectionHead kicker="ABILITIES" title="Skills" />
      <div className="skills-grid">
        {SKILLS.map((cat) => (
          <div key={cat.id} className="reveal skill-cat card">
            <div className="skill-cat-name display">{cat.name}</div>
            <div className="tag-cloud">
              {cat.tags.map((t) => (
                <span key={t} className="skill-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- PROJECTS PAGE */
function ProjectArt({ id }) {
  const F = ({ children }) => (
    <svg
      viewBox="0 0 400 240"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={"pa-" + id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--art-1)" />
          <stop offset="1" stopColor="var(--art-2)" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={"url(#pa-" + id + ")"} />
      {children}
    </svg>
  );
  if (id === "platformer-2d")
    return (
      <F>
        <path
          d="M0 185 Q90 150 180 180 T400 170 V240 H0Z"
          fill="var(--brand)"
          opacity="0.16"
        />
        {[
          [60, 150, 70],
          [180, 112, 60],
          [286, 168, 80],
        ].map(([x, y, w], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height="13"
            rx="4"
            fill="var(--brand)"
            opacity="0.7"
          />
        ))}
        <g className="art-hop">
          <rect
            x="80"
            y="128"
            width="22"
            height="24"
            rx="6"
            fill="var(--brand)"
          />
        </g>
      </F>
    );
  if (id === "racing-3d")
    return (
      <F>
        <polygon
          points="160,92 240,92 360,240 40,240"
          fill="var(--art-3)"
          opacity="0.6"
        />
        <polygon
          points="160,92 240,92 360,240 40,240"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          opacity="0.5"
        />
        <g className="art-zoom" transform="translate(165 178)">
          <rect
            x="0"
            y="10"
            width="70"
            height="24"
            rx="8"
            fill="var(--brand)"
          />
          <rect
            x="14"
            y="0"
            width="42"
            height="16"
            rx="6"
            fill="var(--brand)"
            opacity="0.6"
          />
        </g>
      </F>
    );
  return (
    <F>
      <path
        d="M0 196 H400"
        stroke="var(--brand)"
        strokeWidth="3"
        opacity="0.6"
      />
      {[300, 360].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="162"
          width="24"
          height="34"
          rx="4"
          fill="var(--brand)"
          opacity="0.55"
          className="art-slide"
        />
      ))}
      <g className="art-run">
        <rect
          x="74"
          y="160"
          width="20"
          height="30"
          rx="7"
          fill="var(--brand)"
        />
      </g>
    </F>
  );
}
function ProjectCard({ project, onOpen }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5,
      py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${py * -7}deg) rotateY(${px * 9}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  };
  return (
    <div
      ref={ref}
      className="reveal proj-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(project)}
    >
      <div className="proj-cover">
        <ProjectArt id={project.id} />
        <div className="proj-shade" />
        <span className="proj-genre mono">{project.genre}</span>
        <span className="proj-diff mono">{project.difficulty}</span>
      </div>
      <div className="proj-body">
        <div className="proj-title-row">
          <h3 className="proj-title display">{project.title}</h3>
          <span className="proj-open mono">OPEN →</span>
        </div>
        <p className="proj-tag">{project.tagline}</p>
        <div className="proj-feats">
          {project.features.slice(0, 3).map((f) => (
            <span key={f} className="mini-feat">
              {f}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="mini-feat more">
              +{project.features.length - 3}
            </span>
          )}
        </div>
        <div className="proj-stack">
          {project.stack.map((s) => (
            <span key={s} className="stack-tag mono">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal anim-pop" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-cover">
          <ProjectArt id={project.id} />
          <div className="proj-shade strong" />
          <div className="modal-cover-text">
            <span className="proj-genre mono">{project.genre}</span>
            <h3 className="display modal-title">{project.title}</h3>
            <p className="modal-tagline">{project.tagline}</p>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-desc">{project.description}</p>
          <div className="modal-label mono">CORE SYSTEMS</div>
          <div className="feature-grid">
            {project.features.map((f) => (
              <span key={f} className="feature-tag">
                {f}
              </span>
            ))}
          </div>
          <div className="modal-label mono">HIGHLIGHTS</div>
          <ul className="hl-list">
            {project.highlights.map((h, i) => (
              <li key={i}>
                <span className="hl-b">▸</span>
                {h}
              </li>
            ))}
          </ul>
          <div className="modal-foot">
            <div className="proj-stack">
              {project.stack.map((s) => (
                <span key={s} className="stack-tag mono">
                  {s}
                </span>
              ))}
            </div>
            <span className="mono modal-engine">ENGINE · {project.engine}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ProjectsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="page pad scroll-page">
      <SectionHead kicker="LEVEL SELECT" title="Projects" />
      <p className="lead">
        Three shipped builds across genres. Tap a card for the full briefing.
      </p>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setOpen} />
        ))}
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
/* ---------------------------------------------------------------------------- JOURNEY PAGE
   Own page. Vertical wheel / drag / arrows drive a single `progress` (0..1),
   which smoothly translates the track horizontally AND walks the person.
   Self-contained — does not depend on the page being the window scroller, so
   it works in the sandbox AND the deployed site. */
export function JourneyPage() {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const dragRef = useRef(null);

  const maxScroll = () => {
    const t = trackRef.current,
      s = stageRef.current;
    if (!t || !s) return 1;
    return Math.max(1, t.scrollWidth - s.clientWidth);
  };

  // smooth follow loop (lerp current -> target)
  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      setProgress((cur) => {
        const next = cur + (targetRef.current - cur) * 0.12;
        return Math.abs(next - targetRef.current) < 0.0005
          ? targetRef.current
          : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const bump = (delta) => {
    targetRef.current = Math.min(1, Math.max(0, targetRef.current + delta));
  };

  // wheel: vertical scroll -> horizontal progress (gentler, clamped per event)
  const onWheel = (e) => {
    const raw = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    // clamp a single event's contribution so a fast fling can't skip the whole track
    const d = Math.max(-90, Math.min(90, raw));
    const before = targetRef.current;
    // larger divisor = lower sensitivity (track now needs many gentle scrolls)
    bump(d / (maxScroll() * 2.6 + 600));
    if (
      (before > 0 && before < 1) ||
      (before === 0 && d > 0) ||
      (before === 1 && d < 0)
    )
      e.preventDefault();
  };
  // touch / drag
  const onPointerDown = (e) => {
    dragRef.current = {
      x: e.clientX ?? e.touches?.[0]?.clientX,
      p: targetRef.current,
    };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    targetRef.current = Math.min(
      1,
      Math.max(0, dragRef.current.p - (x - dragRef.current.x) / maxScroll()),
    );
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };
  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") bump(0.25);
      if (e.key === "ArrowLeft") bump(-0.25);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const x = -progress * maxScroll();
  const stageW = stageRef.current ? stageRef.current.clientWidth : 1000;
  const walkerX = 16 + progress * (stageW - 80);
  const walking = Math.abs(targetRef.current - progress) > 0.002;

  return (
    <div className="page journey-page">
      <div className="jr-head">
        <SectionHead
          kicker="JOURNEY MAP — SCROLL / DRAG TO WALK"
          title="The Path So Far"
        />
      </div>

      <div
        className="jr-stage"
        ref={stageRef}
        onWheel={onWheel}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        <div
          className="jr-track"
          ref={trackRef}
          style={{ transform: `translate3d(${x}px,0,0)` }}
        >
          {JOURNEY.map((s, i) => (
            <div key={s.id} className="jr-stop">
              <div className="jr-node mono">0{i + 1}</div>
              <div
                className="jr-card card"
                style={{
                  transform: `translateY(${(i % 2 ? 1 : -1) * (1 - progress) * 14}px)`,
                }}
              >
                <div className="jr-year mono">{s.year}</div>
                <h3 className="jr-title display">{s.title}</h3>
                <div className="jr-org">{s.org}</div>
                <p className="jr-text">{s.text}</p>
                <div className="chip-row">
                  {s.tags.map((t) => (
                    <span key={t} className="chip soft">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="jr-rail" />
        <div className="walker" style={{ left: walkerX + "px" }}>
          <svg viewBox="0 0 40 48" width="34" height="40">
            <ellipse
              cx="20"
              cy="46"
              rx="11"
              ry="2.5"
              fill="var(--brand)"
              opacity="0.25"
            />
            <circle cx="20" cy="11" r="7" fill="var(--brand)" />
            <rect
              x="15"
              y="18"
              width="10"
              height="16"
              rx="4"
              fill="var(--brand)"
            />
            <g className={"leg leg-a " + (walking ? "go" : "")}>
              <rect
                x="16"
                y="32"
                width="4"
                height="12"
                rx="2"
                fill="var(--brand)"
              />
            </g>
            <g className={"leg leg-b " + (walking ? "go" : "")}>
              <rect
                x="20"
                y="32"
                width="4"
                height="12"
                rx="2"
                fill="var(--brand)"
              />
            </g>
            <g className={"arm " + (walking ? "go" : "")}>
              <rect
                x="12"
                y="20"
                width="4"
                height="11"
                rx="2"
                fill="var(--brand)"
                opacity="0.8"
              />
            </g>
          </svg>
          <span className="walker-tag mono">YOU ARE HERE</span>
        </div>
      </div>

      <div className="jr-controls">
        <button
          className="jr-ctrl"
          onClick={() => bump(-0.25)}
          aria-label="Back"
        >
          <Icon name="left" size={18} />
        </button>
        <div className="jr-prog-bar">
          <div
            className="jr-prog-fill"
            style={{ width: progress * 100 + "%" }}
          />
        </div>
        <button
          className="jr-ctrl"
          onClick={() => bump(0.25)}
          aria-label="Forward"
        >
          <Icon name="right" size={18} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- LOADOUT PAGE */
export function LoadoutPage() {
  return (
    <div className="page pad scroll-page">
      <SectionHead kicker="INVENTORY" title="Tools & Loadout" />
      <div className="inv-grid">
        {LOADOUT.map((t) => (
          <div key={t} className="reveal inv-slot">
            <span className="inv-name">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- CREDITS PAGE + PAPER ROCKET */
let rocketSeq = 0;
function launchRocket(originEl, variant) {
  const brand = "#e31c23";
  const r = originEl.getBoundingClientRect();
  const startX = r.left + r.width / 2,
    startY = r.top + r.height / 2;
  const wrap = document.createElement("div");
  wrap.className = "rocket-fly";
  wrap.style.left = startX + "px";
  wrap.style.top = startY + "px";
  const cfg = {
    open: { dx: 130, dy: -260, rot: 22, dur: 1100, trail: 7, spin: 0 },
    copy: { dx: -100, dy: -300, rot: -28, dur: 1250, trail: 9, spin: -360 },
    click: { dx: 210, dy: -200, rot: 38, dur: 1000, trail: 6, spin: 180 },
  }[variant] || { dx: 130, dy: -240, rot: 20, dur: 1100, trail: 6, spin: 0 };
  wrap.innerHTML = `<div class="rk-body" style="--rot:${cfg.rot}deg"><svg viewBox="0 0 48 48" width="40" height="40"><path d="M6 42 L24 10 L42 42 L24 34 Z" fill="${brand}" stroke="rgba(0,0,0,0.18)" stroke-width="1"/><path d="M24 10 L24 34 L42 42 Z" fill="rgba(0,0,0,0.16)"/><path d="M6 42 L24 34 L24 46 Z" fill="${brand}" opacity="0.85"/></svg></div>`;
  document.body.appendChild(wrap);
  for (let i = 0; i < cfg.trail; i++) {
    const puff = document.createElement("span");
    puff.className = "rk-puff";
    wrap.appendChild(puff);
    if (window.gsap)
      window.gsap.fromTo(
        puff,
        { x: 0, y: 0, opacity: 0.5, scale: 0.6 },
        {
          x: -cfg.dx * (0.2 + i * 0.06),
          y: -cfg.dy * 0.04 + i * 6,
          opacity: 0,
          scale: 1.6,
          duration: (cfg.dur / 1000) * 0.8,
          delay: i * 0.04,
          ease: "power1.out",
        },
      );
  }
  const finish = () => wrap.remove();
  if (window.gsap) {
    const tl = window.gsap.timeline({ onComplete: finish });
    tl.to(wrap, {
      x: cfg.dx * 0.4,
      y: cfg.dy * 0.45,
      duration: (cfg.dur / 1000) * 0.45,
      ease: "power2.out",
    })
      .to(
        wrap,
        {
          x: cfg.dx,
          y: cfg.dy,
          duration: (cfg.dur / 1000) * 0.55,
          ease: "power1.in",
        },
        ">-0.05",
      )
      .to(wrap, { opacity: 0, duration: 0.3 }, "<0.4");
    window.gsap.to(wrap.querySelector(".rk-body"), {
      rotation: cfg.spin,
      duration: cfg.dur / 1000,
      ease: "none",
    });
    window.gsap.to(wrap, {
      rotation: cfg.rot * 0.4,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
    });
  } else {
    wrap.style.transition = `transform ${cfg.dur}ms ease, opacity ${cfg.dur}ms ease`;
    requestAnimationFrame(() => {
      wrap.style.transform = `translate(${cfg.dx}px,${cfg.dy}px)`;
      wrap.style.opacity = "0";
    });
    setTimeout(finish, cfg.dur);
  }
}
export function CreditsPage() {
  const [copied, setCopied] = useState("");
  const onOpen = (e) => launchRocket(e.currentTarget, "open");
  const onCopy = (e, val, key) => {
    e.preventDefault();
    if (navigator.clipboard) navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
    launchRocket(e.currentTarget, "copy");
  };
  const onPlay = (e) => launchRocket(e.currentTarget, "click");
  const links = [
    {
      key: "email",
      icon: "mail",
      label: "Email",
      value: PROFILE.email,
      href: "mailto:" + PROFILE.email,
    },
    {
      key: "phone",
      icon: "phone",
      label: "Phone",
      value: PROFILE.phone,
      href: "tel:" + PROFILE.phone.replace(/\s/g, ""),
    },
    {
      key: "loc",
      icon: "pin",
      label: "Based in",
      value: PROFILE.location,
      href: null,
    },
    {
      key: "linkedin",
      icon: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/prashanna-a",
      href: PROFILE.linkedin,
    },

    {
      key: "github",
      icon: "github",
      label: "GitHub",
      value: "github.com/prashanna-a",
      href: PROFILE.github,
    },
  ];
  return (
    <div className="page pad scroll-page credits">
      <div className="credits-inner">
        <SectionHead
          kicker="END SCREEN · CREDITS"
          title="Let's Build Something"
          center
        />
        <p className="reveal cr-lead">
          Looking for a junior gameplay programmer who sweats the details? Fire
          a message my way — literally.
        </p>
        <div className="cr-grid">
          {links.map((l) => (
            <div key={l.key} className="reveal cr-card">
              <span className="cr-icon">
                <Icon name={l.icon} size={20} color="var(--brand)" />
              </span>
              <div className="cr-meta">
                <div className="cr-label mono">{l.label}</div>
                <div className="cr-value">{l.value}</div>
              </div>
              <div className="cr-actions">
                {l.href && (
                  <a
                    className="cr-btn"
                    href={l.href}
                    onClick={onOpen}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                  </a>
                )}
                <button
                  className="cr-btn ghost"
                  onClick={(e) => onCopy(e, l.value, l.key)}
                >
                  {copied === l.key ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="reveal launch-btn" onClick={onPlay}>
          <Icon name="rocket" size={18} /> Launch a paper rocket
        </button>
        <div className="reveal target-row">
          <span className="mono">TARGET PLATFORMS</span>
          {PROFILE.targetPlatforms.map((p) => (
            <span key={p} className="chip soft">
              {p}
            </span>
          ))}
        </div>
        <div className="reveal thanks display">THANKS FOR PLAYING ✈</div>
        <div className="reveal game-over mono">
          — {PROFILE.name} · {PROFILE.role} —
        </div>
      </div>
    </div>
  );
}
/* ---------------------------------------------------------------------------- CIRCULAR COMMAND DIAL
   Rotates smoothly: the highlighted page sits at the top; switching pages
   eases the ring to the new angle (no lag). Scroll wheel over the dial also
   rotates/cycles pages. */
export function CommandDial({ active, go }) {
  const [open, setOpen] = useState(false);
  const ringRef = useRef(null);
  const rotRef = useRef(0);
  const rafRef = useRef(0);
  const wheelLockRef = useRef(0);
  const wheelAccRef = useRef(0);
  const activeIdx = PAGES.findIndex((p) => p.id === active);
  const N = PAGES.length;
  const step = 360 / N;
  const targetRot = -activeIdx * step; // bring active node to top

  // smooth ease the ring rotation toward target whenever active page changes
  useEffect(() => {
    let mounted = true;
    const animate = () => {
      if (!mounted) return;
      const cur = rotRef.current;
      // shortest-path wrap
      let diff = targetRot - cur;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      const next = cur + diff * 0.18;
      rotRef.current = Math.abs(diff) < 0.1 ? targetRot : next;
      if (ringRef.current)
        ringRef.current.style.transform = `rotate(${rotRef.current}deg)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [targetRot]);

  const cycle = (dir) => {
    const ni = (activeIdx + dir + N) % N;
    go(PAGES[ni].id);
  };
  // Lower sensitivity: require accumulated wheel distance to cross a threshold,
  // then enforce a cooldown so one scroll gesture advances exactly one page.
  const onWheel = (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - wheelLockRef.current < 480) return; // cooldown between page changes
    wheelAccRef.current += e.deltaY;
    if (Math.abs(wheelAccRef.current) < 60) return; // need a deliberate scroll
    cycle(wheelAccRef.current > 0 ? 1 : -1);
    wheelAccRef.current = 0;
    wheelLockRef.current = now;
  };

  const R = 112;
  return (
    <div className={"dial " + (open ? "open" : "")}>
      {open && <div className="dial-scrim" onClick={() => setOpen(false)} />}
      {open && (
        <div className="dial-panel">
          <div className="dial-ring" ref={ringRef} onWheel={onWheel}>
            <div className="dial-ring-bg" />
            {PAGES.map((p, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(a) * R,
                y = Math.sin(a) * R;
              return (
                <button
                  key={p.id}
                  className={"dial-node " + (active === p.id ? "active" : "")}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%,-50%) rotate(${-rotRef.current}deg)`,
                  }}
                  onClick={() => {
                    go(p.id);
                  }}
                >
                  <span className="dn-glyph">{p.glyph}</span>
                  <span className="dn-label mono">{p.label}</span>
                </button>
              );
            })}
          </div>
          <div className="dial-center">
            <div className="dc-title display">
              {PAGES[activeIdx] && PAGES[activeIdx].label}
            </div>
            <div className="dc-sub mono">
              {String(activeIdx + 1).padStart(2, "0")}/
              {String(N).padStart(2, "0")}
            </div>
          </div>
          <button
            className="dial-arrow left"
            onClick={() => cycle(-1)}
            aria-label="Prev"
          >
            <Icon name="left" size={16} />
          </button>
          <button
            className="dial-arrow right"
            onClick={() => cycle(1)}
            aria-label="Next"
          >
            <Icon name="right" size={16} />
          </button>
        </div>
      )}
      <button
        className="dial-orb"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
        onWheel={onWheel}
      >
        <span className="orb-prog" />
        <span className="orb-glyph display">
          {open ? "✕" : PAGES[activeIdx] && PAGES[activeIdx].glyph}
        </span>
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------------- ADAPTIVE THEME (auto only, no toggle) */
export function useAdaptiveTheme() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.setAttribute(
        "data-theme",
        mq.matches ? "dark" : "light",
      );
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
}

/* ============================================================================
   ROOT — page router (one page per screen, animated transitions)
   ========================================================================== */
const PAGE_MAP = {
  home: HomePage,
  about: AboutPage,
  skills: SkillsPage,
  projects: ProjectsPage,
  journey: JourneyPage,
  loadout: LoadoutPage,
  contact: CreditsPage,
};

export default function App() {
  const gsap = useGSAP();
  useAdaptiveTheme();
  const [active, setActive] = useState("home");
  const [displayed, setDisplayed] = useState("home");
  const [phase, setPhase] = useState("in"); // in | out
  const [booting, setBooting] = useState(true);
  const Page = PAGE_MAP[displayed] || HomePage;

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const go = useCallback(
    (id) => {
      if (id === active) {
        setActive(id);
        return;
      }
      setActive(id);
      setPhase("out");
      setTimeout(() => {
        setDisplayed(id);
        setPhase("in");
        window.scrollTo(0, 0);
      }, 280);
    },
    [active],
  );

  // reveal-on-enter for the displayed page
  useEffect(() => {
    const els = document.querySelectorAll(".page .reveal");
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      const t = setTimeout(
        () => {
          el.style.transition =
            "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        60 + i * 70,
      );
      el._revT = t;
    });
    return () => els.forEach((el) => clearTimeout(el._revT));
  }, [displayed]);

  return (
    <div className="root">
      <StyleTag />
      {booting && (
        <div className="boot">
          <div className="boot-logo display">PA</div>
          <div className="boot-bar">
            <div className="boot-fill" />
          </div>
        </div>
      )}

      <header className="topbar">
        <div className="brand-mark">
          <span className="bm-dot" />
          <span className="display">PRASHANNA A</span>
          <span className="bm-role mono">GAME DEV</span>
        </div>
        <nav className="top-tabs">
          {PAGES.map((p) => (
            <button
              key={p.id}
              className={"top-tab " + (active === p.id ? "on" : "")}
              onClick={() => go(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={"stage phase-" + phase}>
        <Page go={go} gsap={gsap} />
      </main>

      <CommandDial active={active} go={go} />
    </div>
  );
}
/* ============================================================================
   STYLES — red system (#e31c23) on warm white, adaptive light/dark, page-based layout
   ========================================================================== */
export function StyleTag() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

:root{
  --brand:#e31c23; --brand-50:#fcf3f3; --brand-100:#f8e2e3; --brand-200:#f4bec0;
  --brand-300:#ef8084; --brand-400:#eb474d; --brand-600:#bf1d22; --brand-700:#961d21; --brand-800:#6e1c1e;
}
:root,[data-theme="light"]{
  --bg:#fcfafa; --bg-soft:#f8f3f2; --card:#fffefe; --card-2:#fbf8f8;
  --ink:#312627; --ink-soft:#6d5557; --muted:#9a7e81; --line:rgba(49,38,39,0.10);
  --shadow:0 14px 40px rgba(120,20,25,0.10); --shadow-sm:0 6px 20px rgba(120,20,25,0.07);
  --art-1:#fbe6e7; --art-2:#f3c0c2; --art-3:#fdf2f2; --ph-1:#fbe6e7; --ph-2:#f5cccd;
  --chip-bg:rgba(227,28,35,0.08); --chip-bd:rgba(227,28,35,0.26); --chip-ink:#961d21; --on-brand:#fffefe;
}
[data-theme="dark"]{
  --bg:#160e0f; --bg-soft:#1f1415; --card:#241718; --card-2:#2d1d1e;
  --ink:#f3e7e7; --ink-soft:#cdb6b7; --muted:#a08688; --line:rgba(255,150,155,0.12);
  --shadow:0 18px 50px rgba(0,0,0,0.55); --shadow-sm:0 8px 26px rgba(0,0,0,0.42);
  --art-1:#3a1f21; --art-2:#4a2426; --art-3:#2a1819; --ph-1:#321b1d; --ph-2:#1d1314;
  --chip-bg:rgba(235,71,77,0.13); --chip-bd:rgba(235,71,77,0.34); --chip-ink:#f4a0a3; --on-brand:#fffefe;
}
*{box-sizing:border-box}
html,body{margin:0; height:100%; overflow:hidden;}
.root{background:var(--bg); color:var(--ink); font-family:'Inter',system-ui,sans-serif; height:100vh; overflow:hidden; transition:background .4s,color .4s;}
.display{font-family:'Sora',sans-serif; letter-spacing:-0.01em;}
.mono{font-family:'Space Mono',monospace;}

.boot{position:fixed; inset:0; z-index:300; background:var(--bg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; animation:bootout .5s ease 0.7s forwards;}
@keyframes bootout{to{opacity:0; visibility:hidden;}}
.boot-logo{font-size:54px; font-weight:800; color:var(--brand);}
.boot-bar{width:180px; height:4px; background:var(--line); border-radius:4px; overflow:hidden;}
.boot-fill{height:100%; width:0; background:var(--brand); border-radius:4px; animation:bootfill .9s ease forwards;}
@keyframes bootfill{to{width:100%}}

.topbar{position:fixed; top:0; left:0; right:0; z-index:90; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px clamp(16px,4vw,46px); background:color-mix(in srgb,var(--bg) 80%,transparent); backdrop-filter:blur(12px); border-bottom:1px solid var(--line);}
.brand-mark{display:flex; align-items:center; gap:10px; font-size:15px; font-weight:700; flex-shrink:0;}
.bm-dot{width:10px; height:10px; border-radius:50%; background:var(--brand); box-shadow:0 0 12px var(--brand);}
.bm-role{font-size:9px; color:var(--muted); letter-spacing:0.2em; padding:3px 7px; border:1px solid var(--line); border-radius:20px;}
.top-tabs{display:flex; gap:4px; flex-wrap:wrap; justify-content:flex-end;}
.top-tab{font-size:12.5px; font-weight:600; padding:7px 13px; border-radius:9px; border:0; background:transparent; color:var(--muted); cursor:pointer; transition:.2s;}
.top-tab:hover{color:var(--ink); background:var(--bg-soft);}
.top-tab.on{color:var(--on-brand); background:var(--brand);}

/* PAGE STAGE + transitions */
.stage{position:absolute; top:60px; left:0; right:0; bottom:0; overflow:hidden;}
.stage.phase-in .page{animation:pageIn .45s cubic-bezier(.22,1,.36,1);}
.stage.phase-out{opacity:0; transform:scale(.985) translateY(8px); transition:opacity .28s ease, transform .28s ease;}
@keyframes pageIn{from{opacity:0; transform:scale(1.02) translateY(10px)}to{opacity:1; transform:none}}
.page{height:100%; overflow:hidden;}
/* content-dense screens may scroll INTERNALLY on short viewports only */
.scroll-page{overflow-y:auto; overflow-x:hidden;}
.scroll-page::-webkit-scrollbar{width:7px;} .scroll-page::-webkit-scrollbar-thumb{background:var(--line); border-radius:7px;}
.pad{padding:40px clamp(20px,5vw,80px); display:flex; flex-direction:column; justify-content:center; min-height:100%;}
.lead{color:var(--muted); margin:-6px 0 26px; font-size:15px;}

.section-head{margin-bottom:30px;}
.section-head.center{text-align:center;} .section-head.center .kicker{justify-content:center;}
.kicker{display:inline-flex; align-items:center; gap:9px; font-size:11px; letter-spacing:0.28em; color:var(--brand-700); margin-bottom:10px;}
[data-theme="dark"] .kicker{color:var(--brand-300);}
.kicker-dot{width:7px; height:7px; border-radius:50%; background:var(--brand);}
.section-title{font-size:clamp(30px,5vw,52px); font-weight:800; margin:0; line-height:1;}

.card{background:var(--card); border:1px solid var(--line); border-radius:18px; padding:24px; box-shadow:var(--shadow-sm);}
.chip-row{display:flex; flex-wrap:wrap; gap:8px;}
.chip{font-size:12.5px; padding:6px 13px; border-radius:30px; background:var(--chip-bg); border:1px solid var(--chip-bd); color:var(--chip-ink); font-weight:500;}
.chip.soft{background:var(--bg-soft); border-color:var(--line); color:var(--ink-soft);}
.mini-head{font-size:10px; color:var(--muted); letter-spacing:0.22em; margin-bottom:14px;}

/* HERO */
.hero-page{height:100%; display:flex; align-items:center; padding:40px clamp(20px,5vw,80px);}
.hero-grid{display:grid; grid-template-columns:1.1fr 0.9fr; gap:50px; align-items:center; max-width:1240px; margin:0 auto; width:100%;}
.hero-copy{display:flex; flex-direction:column; gap:15px;}
.eyebrow{font-size:11px; letter-spacing:0.16em; color:var(--brand-700); display:flex; align-items:center; gap:7px;}
[data-theme="dark"] .eyebrow{color:var(--brand-300);}
.hero-name{font-size:clamp(42px,7vw,84px); font-weight:800; margin:0; line-height:0.98; background:linear-gradient(120deg,var(--ink),var(--brand-700)); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;}
[data-theme="dark"] .hero-name{background:linear-gradient(120deg,#fff,var(--brand-300)); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;}
.hero-roles{display:flex; gap:10px; flex-wrap:wrap;}
.role-pill{font-size:13px; font-weight:600; padding:6px 15px; border-radius:30px; background:var(--brand); color:var(--on-brand);}
.role-pill.ghost{background:transparent; border:1px solid var(--brand); color:var(--brand-700);}
[data-theme="dark"] .role-pill.ghost{color:var(--brand-300);}
.hero-tagline{font-size:clamp(17px,2.3vw,22px); color:var(--ink-soft); margin:5px 0 0; max-width:440px; line-height:1.4;}
.hero-sub{font-size:11px; color:var(--muted); letter-spacing:0.18em;}
.hero-cta{display:flex; gap:12px; flex-wrap:wrap; margin-top:12px;}
.btn-primary{display:inline-flex; align-items:center; gap:8px; font-family:'Sora',sans-serif; font-weight:700; font-size:14px; padding:14px 26px; border:0; border-radius:13px; cursor:pointer; color:var(--on-brand); background:var(--brand); box-shadow:0 10px 30px rgba(227,28,35,0.35); transition:transform .2s,box-shadow .2s;}
.btn-primary:hover{transform:translateY(-3px); box-shadow:0 16px 40px rgba(227,28,35,0.5);}
.btn-ghost{font-family:'Space Mono',monospace; font-size:12px; padding:14px 22px; border-radius:13px; border:1px solid var(--line); background:transparent; color:var(--ink); cursor:pointer; transition:.2s;}
.btn-ghost:hover{border-color:var(--brand);}
.hero-meta{display:flex; align-items:center; gap:6px; font-size:11px; color:var(--muted); margin-top:6px;}
.hero-frame-wrap{display:flex; flex-direction:column; align-items:center; gap:14px; perspective:1100px;}
.hero-frame{position:relative; width:min(360px,76vw); aspect-ratio:1/1; border-radius:24px; overflow:hidden; background:var(--card-2); border:1px solid var(--line); box-shadow:var(--shadow); transition:transform .15s ease-out; transform-style:preserve-3d; will-change:transform;}
.fc{position:absolute; width:22px; height:22px; border-color:var(--brand); z-index:3;}
.fc.tl{top:10px;left:10px;border-top:2.5px solid;border-left:2.5px solid;}
.fc.tr{top:10px;right:10px;border-top:2.5px solid;border-right:2.5px solid;}
.fc.bl{bottom:10px;left:10px;border-bottom:2.5px solid;border-left:2.5px solid;}
.fc.br{bottom:10px;right:10px;border-bottom:2.5px solid;border-right:2.5px solid;}
.hero-portrait{position:absolute; inset:0; animation:fadeup .5s ease;}
@keyframes fadeup{from{opacity:0; transform:scale(1.03)}to{opacity:1; transform:scale(1)}}
.hero-img{width:100%; height:100%; object-fit:cover;}
.hero-glare{position:absolute; inset:0; pointer-events:none; z-index:2; mix-blend-mode:overlay; transition:background .1s;}
.ph-fill{position:absolute; inset:0;}
.ph-tag{position:absolute; left:50%; top:55%; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; gap:8px;}
.ph-plus{width:34px; height:34px; border-radius:10px; border:1px dashed var(--brand); display:grid; place-items:center; font-size:20px; color:var(--brand-700);}
[data-theme="dark"] .ph-plus{color:var(--brand-300);}
.ph-tag-text{font-size:9px; color:var(--muted); letter-spacing:0.18em;}
.hero-plate{position:absolute; left:0; right:0; bottom:0; padding:16px 18px; display:flex; flex-direction:column; gap:2px; background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--card) 92%,transparent)); z-index:2;}
.hero-plate .display{font-size:16px; font-weight:700;} .hero-plate .mono{font-size:9px; color:var(--muted); letter-spacing:0.18em;}
.reel-dots{display:flex; gap:10px;}
.reel-dot{width:34px; height:6px; border-radius:6px; border:0; background:var(--line); cursor:pointer; transition:.25s;}
.reel-dot.on{background:var(--brand); width:46px;}
.tilt-hint{font-size:9px; color:var(--muted); letter-spacing:0.2em;}

/* ABOUT */
.about-grid{display:grid; grid-template-columns:1.25fr 1fr; gap:22px; align-items:start; max-width:1180px;}
.about-main{display:flex; flex-direction:column; gap:18px;}
.about-summary{font-size:17px; line-height:1.7; color:var(--ink-soft); margin:0;}
.about-side{display:flex; flex-direction:column; gap:16px;}
.stat-grid{display:grid; grid-template-columns:1fr 1fr; gap:14px;}
.stat-v{font-size:24px; font-weight:800; color:var(--brand-700);}
[data-theme="dark"] .stat-v{color:var(--brand-300);}
.stat-l{font-size:9px; color:var(--muted); letter-spacing:0.1em; margin-top:3px;}

/* SKILLS */
.skills-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:20px; max-width:1100px;}
.skill-cat-name{font-size:18px; font-weight:700; margin-bottom:16px;}
.tag-cloud{display:flex; flex-wrap:wrap; gap:9px;}
.skill-tag{font-size:13.5px; padding:8px 15px; border-radius:11px; background:var(--bg-soft); border:1px solid var(--line); color:var(--ink); font-weight:500; transition:.2s; cursor:default;}
.skill-tag:hover{border-color:var(--brand); color:var(--brand-700); transform:translateY(-2px); background:var(--chip-bg);}
[data-theme="dark"] .skill-tag:hover{color:var(--brand-300);}

/* PROJECTS */
.proj-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:26px; max-width:1240px;}
.proj-card{background:var(--card); border:1px solid var(--line); border-radius:20px; overflow:hidden; cursor:pointer; box-shadow:var(--shadow-sm); transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s,border-color .3s; transform-style:preserve-3d;}
.proj-card:hover{box-shadow:var(--shadow); border-color:var(--brand);}
.proj-cover{position:relative; height:180px; overflow:hidden;}
.proj-shade{position:absolute; inset:0; background:linear-gradient(180deg,transparent 45%,var(--card) 100%);}
.proj-shade.strong{background:linear-gradient(180deg,transparent 30%,color-mix(in srgb,var(--card) 92%,transparent) 100%);}
.proj-genre{position:absolute; top:12px; left:12px; font-size:9px; letter-spacing:0.14em; padding:5px 11px; border-radius:20px; background:var(--brand); color:var(--on-brand); font-weight:700;}
.proj-diff{position:absolute; top:12px; right:12px; font-size:9px; letter-spacing:0.1em; padding:5px 11px; border-radius:20px; background:color-mix(in srgb,var(--card) 70%,transparent); color:var(--muted); backdrop-filter:blur(4px);}
.proj-body{padding:20px;}
.proj-title-row{display:flex; justify-content:space-between; align-items:baseline; gap:10px;}
.proj-title{font-size:21px; font-weight:700;}
.proj-open{font-size:10px; letter-spacing:0.1em; color:var(--brand-700); opacity:0; transform:translateX(-6px); transition:.3s;}
[data-theme="dark"] .proj-open{color:var(--brand-300);}
.proj-card:hover .proj-open{opacity:1; transform:translateX(0);}
.proj-tag{color:var(--muted); font-size:13.5px; margin:7px 0 15px; line-height:1.5;}
.proj-feats{display:flex; flex-wrap:wrap; gap:7px; margin-bottom:15px;}
.mini-feat{font-size:11px; padding:4px 10px; border-radius:8px; background:var(--bg-soft); border:1px solid var(--line); color:var(--ink-soft);}
.mini-feat.more{color:var(--brand-700); border-color:var(--chip-bd);}
[data-theme="dark"] .mini-feat.more{color:var(--brand-300);}
.proj-stack{display:flex; gap:7px; flex-wrap:wrap;}
.stack-tag{font-size:10px; letter-spacing:0.06em; padding:3px 9px; border-radius:6px; background:var(--chip-bg); border:1px solid var(--chip-bd); color:var(--chip-ink);}
.art-hop{animation:hop 1.4s ease-in-out infinite;} @keyframes hop{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.art-zoom{animation:zoomx 2.4s ease-in-out infinite;} @keyframes zoomx{0%,100%{transform:translate(165px,178px)}50%{transform:translate(182px,176px)}}
.art-run{animation:runb 1.1s ease-in-out infinite;} @keyframes runb{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
.art-slide{animation:slidex 3s linear infinite;} @keyframes slidex{from{transform:translateX(0)}to{transform:translateX(-380px)}}

/* MODAL */
.modal-backdrop{position:fixed; inset:0; z-index:200; background:rgba(20,14,2,0.55); backdrop-filter:blur(7px); display:grid; place-items:center; padding:20px; animation:fadein .25s ease;}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.modal{width:min(640px,100%); max-height:90vh; overflow-y:auto; background:var(--card); border:1px solid var(--brand); border-radius:22px; box-shadow:var(--shadow); position:relative;}
.anim-pop{animation:pop .4s cubic-bezier(.22,1,.36,1);}
@keyframes pop{from{opacity:0; transform:scale(.92) translateY(20px)}to{opacity:1; transform:scale(1) translateY(0)}}
.modal-close{position:absolute; top:14px; right:14px; z-index:5; width:34px; height:34px; border-radius:10px; background:var(--card-2); border:1px solid var(--line); color:var(--ink); cursor:pointer; font-size:14px; transition:.2s;}
.modal-close:hover{border-color:var(--brand); color:var(--brand);}
.modal-cover{position:relative; height:200px; overflow:hidden;}
.modal-cover-text{position:absolute; bottom:16px; left:24px; right:24px;}
.modal-title{font-size:30px; font-weight:800; margin:8px 0 4px;}
.modal-tagline{color:var(--ink-soft); font-size:14px;}
.modal-body{padding:26px;}
.modal-desc{color:var(--ink-soft); line-height:1.7; font-size:15px; margin:0 0 22px;}
.modal-label{font-size:11px; letter-spacing:0.18em; color:var(--brand-700); margin:0 0 12px;}
[data-theme="dark"] .modal-label{color:var(--brand-300);}
.feature-grid{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px;}
.feature-tag{font-size:13px; padding:7px 13px; border-radius:9px; background:var(--bg-soft); border:1px solid var(--line); color:var(--ink-soft);}
.hl-list{list-style:none; margin:0 0 22px; padding:0; display:flex; flex-direction:column; gap:11px;}
.hl-list li{display:flex; gap:10px; font-size:14px; color:var(--ink-soft); line-height:1.55;}
.hl-b{color:var(--brand); font-weight:700; flex-shrink:0;}
.modal-foot{display:flex; justify-content:space-between; align-items:center; padding-top:16px; border-top:1px solid var(--line); gap:12px; flex-wrap:wrap;}
.modal-engine{font-size:10px; color:var(--muted); letter-spacing:0.14em;}

/* JOURNEY (own page; internal horizontal scroll) */
.journey-page{height:100%; display:flex; flex-direction:column; position:relative; overflow:hidden; background:var(--bg-soft);}
.jr-head{padding:40px clamp(20px,5vw,80px) 0;}
.jr-stage{position:relative; flex:1; overflow:hidden; cursor:grab;}
.jr-stage:active{cursor:grabbing;}
.jr-track{display:flex; gap:40px; align-items:center; height:100%; padding:0 clamp(30px,8vw,120px); width:max-content; will-change:transform;}
.jr-stop{position:relative; width:min(420px,82vw); flex-shrink:0;}
.jr-node{position:absolute; top:-44px; left:0; font-size:34px; font-weight:700; color:var(--brand); opacity:0.5;}
.jr-card{padding:28px; transition:transform .1s linear;}
.jr-year{font-size:11px; letter-spacing:0.16em; color:var(--brand-700); margin-bottom:8px;}
[data-theme="dark"] .jr-year{color:var(--brand-300);}
.jr-title{font-size:22px; font-weight:700; margin:0 0 4px;}
.jr-org{font-size:13px; color:var(--muted); margin-bottom:12px;}
.jr-text{font-size:14px; line-height:1.6; color:var(--ink-soft); margin:0 0 14px;}
.jr-rail{position:absolute; left:0; right:0; bottom:58px; height:2px; background:linear-gradient(90deg,transparent,var(--brand) 8%,var(--brand) 92%,transparent); opacity:0.3;}
.walker{position:absolute; bottom:48px; z-index:4; display:flex; flex-direction:column; align-items:center; gap:4px; pointer-events:none; will-change:left;}
.walker-tag{font-size:8px; letter-spacing:0.14em; color:var(--brand-700); background:var(--card); padding:2px 6px; border-radius:10px; border:1px solid var(--chip-bd); white-space:nowrap;}
[data-theme="dark"] .walker-tag{color:var(--brand-300);}
.leg-a{transform-origin:18px 32px;} .leg-b{transform-origin:22px 32px;} .arm{transform-origin:14px 20px;}
.leg-a.go{animation:walkA .45s ease-in-out infinite;} .leg-b.go{animation:walkB .45s ease-in-out infinite;} .arm.go{animation:walkB .45s ease-in-out infinite;}
@keyframes walkA{0%,100%{transform:rotate(22deg)}50%{transform:rotate(-22deg)}}
@keyframes walkB{0%,100%{transform:rotate(-22deg)}50%{transform:rotate(22deg)}}
.jr-controls{display:flex; align-items:center; gap:16px; padding:14px clamp(20px,5vw,80px) 20px; max-width:600px; margin:0 auto; width:100%;}
.jr-ctrl{width:42px; height:42px; border-radius:12px; border:1px solid var(--line); background:var(--card); color:var(--ink); cursor:pointer; display:grid; place-items:center; transition:.2s; flex-shrink:0;}
.jr-ctrl:hover{border-color:var(--brand); color:var(--brand);}
.jr-prog-bar{flex:1; height:6px; background:var(--line); border-radius:6px; overflow:hidden;}
.jr-prog-fill{height:100%; background:var(--brand); border-radius:6px; transition:width .1s linear;}

/* LOADOUT */
.inv-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:14px; max-width:1100px;}
.inv-slot{background:var(--card); border:1px solid var(--line); border-radius:14px; padding:20px 16px; text-align:center; box-shadow:var(--shadow-sm); transition:transform .25s,box-shadow .25s,border-color .25s; cursor:default;}
.inv-slot:hover{transform:translateY(-5px); border-color:var(--brand); box-shadow:var(--shadow);}
.inv-name{font-size:14px; font-weight:600; color:var(--ink);}

/* CREDITS */
.credits{background:var(--bg-soft);}
.credits-inner{max-width:640px; margin:0 auto; width:100%; text-align:center; display:flex; flex-direction:column; align-items:center;}
.cr-lead{color:var(--ink-soft); font-size:17px; line-height:1.6; margin:0 0 30px; max-width:520px;}
.cr-grid{display:flex; flex-direction:column; gap:12px; width:100%; margin-bottom:24px;}
.cr-card{display:flex; align-items:center; gap:15px; background:var(--card); border:1px solid var(--line); border-radius:15px; padding:16px 18px; text-align:left; box-shadow:var(--shadow-sm);}
.cr-icon{width:46px; height:46px; border-radius:12px; display:grid; place-items:center; flex-shrink:0; background:var(--chip-bg);}
.cr-meta{flex:1; min-width:0;}
.cr-label{font-size:9px; color:var(--muted); letter-spacing:0.18em;}
.cr-value{font-size:15px; font-weight:600; word-break:break-all;}
.cr-actions{display:flex; gap:8px; flex-shrink:0;}
.cr-btn{font-family:'Space Mono',monospace; font-size:11px; padding:9px 15px; border-radius:9px; border:1px solid var(--brand); background:var(--brand); color:var(--on-brand); cursor:pointer; text-decoration:none; transition:.2s;}
.cr-btn:hover{filter:brightness(1.05); transform:translateY(-2px);}
.cr-btn.ghost{background:transparent; color:var(--ink); border-color:var(--line);}
.launch-btn{display:inline-flex; align-items:center; gap:9px; font-family:'Sora',sans-serif; font-weight:700; font-size:14px; padding:14px 26px; border-radius:13px; border:1px dashed var(--brand); background:var(--chip-bg); color:var(--brand-700); cursor:pointer; margin-bottom:26px; transition:.2s;}
[data-theme="dark"] .launch-btn{color:var(--brand-300);}
.launch-btn:hover{transform:translateY(-3px); background:var(--brand); color:var(--on-brand);}
.target-row{display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:30px; font-size:10px; color:var(--muted); letter-spacing:0.18em;}
.thanks{font-size:clamp(24px,4vw,36px); font-weight:800; color:var(--brand-700); margin-bottom:8px;}
[data-theme="dark"] .thanks{color:var(--brand-300);}
.game-over{font-size:11px; color:var(--muted); letter-spacing:0.22em;}

/* PAPER ROCKET */
.rocket-fly{position:fixed; z-index:400; pointer-events:none; transform:translate(-50%,-50%); will-change:transform,opacity;}
.rk-body{transform:rotate(var(--rot,20deg)); filter:drop-shadow(0 6px 10px rgba(120,80,0,0.3));}
.rk-puff{position:absolute; left:0; top:8px; width:8px; height:8px; border-radius:50%; background:var(--brand); opacity:0.4;}

/* COMMAND DIAL */
.dial{position:fixed; right:26px; bottom:26px; z-index:120;}
.dial-scrim{position:fixed; inset:0; z-index:-1; background:rgba(20,14,2,0.4); backdrop-filter:blur(2px);}
.dial-orb{position:relative; width:66px; height:66px; border-radius:50%; border:0; cursor:pointer; background:var(--brand); box-shadow:0 8px 28px rgba(227,28,35,0.5); display:grid; place-items:center; color:var(--on-brand);}
.orb-prog{position:absolute; inset:-5px; border-radius:50%; border:2px solid transparent; border-top-color:var(--on-brand); opacity:0.4; animation:spin 8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
.orb-glyph{font-size:24px; font-weight:800;}
.dial-panel{position:fixed; right:-44px; bottom:-44px; width:320px; height:320px; animation:ringin .35s cubic-bezier(.22,1,.36,1);}
@keyframes ringin{from{opacity:0; transform:scale(.6)}to{opacity:1; transform:scale(1)}}
.dial-ring{position:absolute; inset:0; will-change:transform;}
.dial-ring-bg{position:absolute; inset:50px; border-radius:50%; border:1px solid var(--line); background:var(--card); box-shadow:var(--shadow);}
.dial-node{position:absolute; width:60px; height:60px; border-radius:14px; border:1px solid var(--line); background:var(--card); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; color:var(--muted); box-shadow:var(--shadow-sm); transition:border-color .2s,color .2s,background .2s;}
.dial-node:hover{border-color:var(--brand); color:var(--brand-700);}
[data-theme="dark"] .dial-node:hover{color:var(--brand-300);}
.dial-node.active{border-color:var(--brand); background:var(--brand); color:var(--on-brand);}
.dn-glyph{font-size:16px;} .dn-label{font-size:7px; letter-spacing:0.08em;}
.dial-center{position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; pointer-events:none;}
.dc-title{font-size:14px; font-weight:700;}
.dc-sub{font-size:9px; color:var(--muted); letter-spacing:0.14em; margin-top:2px;}
.dial-arrow{position:absolute; top:calc(50% - 18px); width:30px; height:36px; border-radius:9px; border:1px solid var(--line); background:var(--card); color:var(--ink); cursor:pointer; display:grid; place-items:center; box-shadow:var(--shadow-sm);}
.dial-arrow.left{left:8px;} .dial-arrow.right{right:8px;}
.dial-arrow:hover{border-color:var(--brand); color:var(--brand);}

/* RESPONSIVE */
@media (max-width:1024px){
  .hero-grid{grid-template-columns:1fr; gap:32px; text-align:center;}
  .hero-copy{align-items:center;} .hero-roles,.hero-cta,.hero-meta{justify-content:center;}
  .hero-tagline{max-width:560px;}
  .about-grid{grid-template-columns:1fr;} .skills-grid{grid-template-columns:1fr;}
  .top-tabs{display:none;}
  /* stacked layouts may exceed the viewport: let the screen scroll internally */
  .page, .hero-page{overflow-y:auto; overflow-x:hidden;}
  .pad{justify-content:flex-start; padding-top:30px;}
  .hero-page{align-items:flex-start; padding-top:30px;}
}
@media (max-width:768px){
  .pad{padding:40px 18px 110px;}
  .dial{right:16px; bottom:16px;}
  .dial-orb{width:60px; height:60px;}
  .dial-panel{right:-54px; bottom:-54px; width:280px; height:280px;}
  .cr-card{flex-wrap:wrap;}
}
@media (max-width:420px){
  .hero-cta{flex-direction:column; width:100%;} .btn-primary,.btn-ghost{width:100%; justify-content:center;}
  .stat-grid{grid-template-columns:1fr 1fr;} .inv-grid{grid-template-columns:repeat(2,1fr);}
}
@media (prefers-reduced-motion:reduce){ *{animation-duration:.001s !important; transition-duration:.001s !important;} }
`}</style>
  );
}
