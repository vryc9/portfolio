import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import type { TimelineEntry } from "../../data/timeline";
import { slugify } from "../../utils/slugify";
import "./Timeline.css";

interface TimelineModalProps {
  entry: TimelineEntry;
  onClose: () => void;
}

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a className="tlm__link" href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

const TimelineModal: React.FC<TimelineModalProps> = ({ entry, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="tlm" role="dialog" aria-modal="true" aria-label="Détails">
      <button
        type="button"
        className="tlm__backdrop"
        aria-label="Fermer"
        onClick={onClose}
      />

      <div className="tlm__panel" role="document">
        <div className="tlm__header">
          <div className="tlm__headLeft">
            <div className="tlm__period">{entry.period}</div>
            <div className="tlm__title">{entry.title}</div>
            <div className="tlm__place">
              <span className="tlm__placeName">{entry.placeLabel}</span>
              {entry.location ? (
                <span className="tlm__sep">•</span>
              ) : null}
              {entry.location ? <span className="tlm__location">{entry.location}</span> : null}
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="tlm__close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {(entry.responsibility || entry.status) && (
          <div className="tlm__chips">
            {entry.responsibility && (
              <span className="tlm__chip">
                <span className="tlm__chipK">Rôle</span>
                <span className="tlm__chipV">{entry.responsibility}</span>
              </span>
            )}
            {entry.status && (
              <span className="tlm__chip">
                <span className="tlm__chipK">Statut</span>
                <span className="tlm__chipV">{entry.status}</span>
              </span>
            )}
          </div>
        )}

        {entry.details?.length ? (
          <div className="tlm__section">
            <div className="tlm__sectionTitle">{entry.kind === 'experience' ? 'Missions / Positionnement' : 'Présentation'}</div>
            <ul className="tlm__bullets">
              {entry.details.map((d, i) => (
                <li key={`${entry.id}-d-${i}`}>{d}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {(entry.links?.length || entry.skills?.length || entry.placeUrl) && (
          <div className="tlm__section">
            <div className="tlm__sectionTitle">Liens</div>

            <div className="tlm__links">
              {entry.links?.map((l) =>
                l.external ? (
                  <ExternalLink key={l.to} href={l.to}>
                    {l.label}
                  </ExternalLink>
                ) : (
                  <Link key={l.to} to={l.to} className="tlm__link">
                    {l.label}
                  </Link>
                )
              )}
            </div>

            {entry.skills?.length ? (
              <div className="tlm__skills">
                {entry.skills.map((s) => (
                  <Link key={`${entry.id}-skill-${s}`} to={`/skills/${slugify(s)}`} className="tlm__pill">
                    {s}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default TimelineModal;