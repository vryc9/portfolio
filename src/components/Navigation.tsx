import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import type { SectionId } from "../types";
import { APP_ROUTES, projectPath, skillPath } from "../constants/routes";
import { projects } from "../data/project";
import { skills } from "../data/skill";
import { slugify } from "../types/utils/slugify";
import "./Navigation.css";

interface NavigationProps {
  activeSection?: SectionId;
  setActiveSection?: Dispatch<SetStateAction<SectionId>>;
}

interface SimpleNavItem {
  id: SectionId;
  label: string;
}

const SIMPLE_ITEMS: SimpleNavItem[] = [
  { id: "hero", label: "Accueil" },
  { id: "timeline", label: "Parcours" },
  { id: "about", label: "À propos" },
  { id: "contact", label: "Contact" },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"projects" | "skills" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = (sectionId: SectionId): void => {
    setMobileOpen(false);
    setOpenDropdown(null);
    if (location.pathname !== APP_ROUTES.home) {
      navigate(APP_ROUTES.home, { state: { scrollTo: sectionId } });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection?.(sectionId);
  };

  const openMenu = (key: "projects" | "skills"): void => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  };

  const scheduleClose = (): void => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <header className="main-nav">
      <nav className="main-nav__inner" aria-label="Navigation principale">
        {/* Logo */}
        <button
          type="button"
          className="main-nav__logo"
          onClick={() => scrollTo("hero")}
        >
          Enzo Volpato<span className="main-nav__logo-accent">.</span>
        </button>

        {/* Desktop links */}
        <ul className="main-nav__list">
          {SIMPLE_ITEMS.slice(0, 2).map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`main-nav__item${activeSection === id ? " main-nav__item--active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}

          {/* Réalisations dropdown */}
          <li
            className="main-nav__dropdown-wrapper"
            onMouseEnter={() => openMenu("projects")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`main-nav__item main-nav__item--dropdown${activeSection === "projects" ? " main-nav__item--active" : ""}`}
              onClick={() => scrollTo("projects")}
              aria-expanded={openDropdown === "projects"}
            >
              Réalisations
              <ChevronDown
                size={13}
                className={`main-nav__chevron${openDropdown === "projects" ? " main-nav__chevron--open" : ""}`}
              />
            </button>

            {openDropdown === "projects" && (
              <ul
                className="main-nav__dropdown"
                onMouseEnter={() => openMenu("projects")}
                onMouseLeave={scheduleClose}
                role="menu"
              >
                {projects.map((p) => (
                  <li key={p.id} role="none">
                    <Link
                      to={projectPath(p.id)}
                      className="main-nav__dropdown-item"
                      role="menuitem"
                    >
                      <span className="main-nav__dropdown-icon">{p.icon}</span>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Compétences dropdown */}
          <li
            className="main-nav__dropdown-wrapper"
            onMouseEnter={() => openMenu("skills")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`main-nav__item main-nav__item--dropdown${activeSection === "skills" ? " main-nav__item--active" : ""}`}
              onClick={() => scrollTo("skills")}
              aria-expanded={openDropdown === "skills"}
            >
              Compétences
              <ChevronDown
                size={13}
                className={`main-nav__chevron${openDropdown === "skills" ? " main-nav__chevron--open" : ""}`}
              />
            </button>

            {openDropdown === "skills" && (
              <ul
                className="main-nav__dropdown"
                onMouseEnter={() => openMenu("skills")}
                onMouseLeave={scheduleClose}
                role="menu"
              >
                {skills.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.name} role="none">
                      <Link
                        to={skillPath(slugify(s.name))}
                        className="main-nav__dropdown-item"
                        role="menuitem"
                      >
                        <span className="main-nav__dropdown-icon">
                          <Icon size={14} />
                        </span>
                        {s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {SIMPLE_ITEMS.slice(2).map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                className={`main-nav__item${activeSection === id ? " main-nav__item--active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="main-nav__hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="main-nav__mobile">
          {SIMPLE_ITEMS.slice(0, 2).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`main-nav__mobile-item${activeSection === id ? " main-nav__mobile-item--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            className={`main-nav__mobile-item${activeSection === "projects" ? " main-nav__mobile-item--active" : ""}`}
            onClick={() => scrollTo("projects")}
          >
            Réalisations
          </button>
          {projects.map((p) => (
            <Link
              key={p.id}
              to={projectPath(p.id)}
              className="main-nav__mobile-sub"
              onClick={() => setMobileOpen(false)}
            >
              <span>{p.icon}</span>
              {p.title}
            </Link>
          ))}

          <button
            type="button"
            className={`main-nav__mobile-item${activeSection === "skills" ? " main-nav__mobile-item--active" : ""}`}
            onClick={() => scrollTo("skills")}
          >
            Compétences
          </button>
          {skills.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.name}
                to={skillPath(slugify(s.name))}
                className="main-nav__mobile-sub"
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={13} />
                {s.name}
              </Link>
            );
          })}

          {SIMPLE_ITEMS.slice(2).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`main-nav__mobile-item${activeSection === id ? " main-nav__mobile-item--active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navigation;
