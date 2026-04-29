import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "./PageTopBar.css";

export interface TopBarItem {
  label: string;
  to: string;
  isActive: boolean;
  icon?: React.ReactNode;
}

interface PageTopBarProps {
  backTo: string;
  backState?: Record<string, unknown>;
  backLabel: string;
  title: string;
  dropdownLabel: string;
  items: TopBarItem[];
}

const PageTopBar: React.FC<PageTopBarProps> = ({
  backTo,
  backState,
  backLabel,
  dropdownLabel,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="page-top-bar">
      <Link to={backTo} state={backState} className="page-top-bar__back">
        ← {backLabel}
      </Link>

      <span className="page-top-bar__title">Enzo Volpato</span>

      <div className="page-top-bar__dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="page-top-bar__trigger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{dropdownLabel}</span>
          <ChevronDown
            size={13}
            className={`page-top-bar__chevron${isOpen ? " page-top-bar__chevron--open" : ""}`}
          />
        </button>
        {isOpen && (
          <ul
            className="page-top-bar__menu"
            role="listbox"
            aria-label={dropdownLabel}
          >
            {items.map((item) => (
              <li key={item.to} role="option" aria-selected={item.isActive}>
                <Link
                  to={item.to}
                  className={`page-top-bar__menu-item${item.isActive ? " page-top-bar__menu-item--active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && (
                    <span className="page-top-bar__menu-icon">{item.icon}</span>
                  )}
                  <span className="page-top-bar__menu-label">{item.label}</span>
                  {item.isActive && (
                    <span
                      className="page-top-bar__menu-active-dot"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default PageTopBar;
