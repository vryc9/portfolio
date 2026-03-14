import type { SectionId } from "../types";
import { FolderKanban, GraduationCap, House, Layers3, Mail, PersonStanding } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./Navigation.css";

interface NavigationProps {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

interface NavigationItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavigationItem[] = [
  { id: "hero", label: "Accueil", icon: House },
  { id: "timeline", label: "Parcours", icon: GraduationCap },
  { id: "projects", label: "Projets", icon: FolderKanban },
  { id: "skills", label: "Compétence", icon: Layers3 },
  { id: "about", label: "Ma présentation", icon: PersonStanding },
  { id: "contact", label: "Contact", icon: Mail },
];

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const handleNavClick = (sectionId: SectionId): void => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(sectionId);
  };

  return (
    <nav className="floating-nav" aria-label="Navigation principale">
      <ul className="floating-nav__list">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;

          return (
            <li key={id} className="floating-nav__item">
              <button
                type="button"
                className={`floating-nav__button ${
                  isActive ? "floating-nav__button--active" : ""
                }`}
                onClick={() => handleNavClick(id)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="floating-nav__tooltip">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;