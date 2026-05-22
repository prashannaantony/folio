import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  PAGES,
  HomePage,
  AboutPage,
  SkillsPage,
  ProjectsPage,
  JourneyPage,
  LoadoutPage,
  CreditsPage,
  CommandDial,
  useAdaptiveTheme,
  StyleTag,
} from "./components/GamePortfolio.jsx";

/* Each section is its OWN route/URL:
   /  /about  /skills  /projects  /journey  /inventory  /credits          */
const ROUTES = {
  home: "/",
  about: "/about",
  skills: "/skills",
  projects: "/projects",
  journey: "/journey",
  loadout: "/inventory",
  contact: "/credits",
};
const idFromPath = (path) =>
  Object.keys(ROUTES).find((k) => ROUTES[k] === path) || "home";

function Shell() {
  const navigate = useNavigate();
  const loc = useLocation();
  const active = idFromPath(loc.pathname);
  const go = (id) => navigate(ROUTES[id] || "/");

  return (
    <div className="root">
      <StyleTag />
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

      <main className="stage phase-in" key={active}>
        <Routes location={loc}>
          <Route path="/" element={<HomePage go={go} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/inventory" element={<LoadoutPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <CommandDial active={active} go={go} />
    </div>
  );
}

export default function App() {
  useAdaptiveTheme();
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
