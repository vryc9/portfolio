import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { timelineEntries, type TimelineEntry } from "../../data/timeline";
import TimelineModal from "./TimelineModal";
import "./Timeline.css";
import { EsieaLogo, NumihLogo } from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const Logo: React.FC<{ which: TimelineEntry["logo"] }> = ({ which }) => {
  if (which === "numih") return <NumihLogo className="tl__logo tl__logo--numih" />;
  return <EsieaLogo className="tl__logo tl__logo--esiea" />;
};

const Timeline: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const entries = useMemo(() => timelineEntries, []);
  const [selected, setSelected] = useState<TimelineEntry | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { y: 26, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="tl" ref={rootRef}>
      <h2 className="section-title">Parcours</h2>

      <div className="tl__grid">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className="tl__card"
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            <div className="tl__left">
              <div className="tl__logoWrap">
                <Logo which={entry.logo} />
              </div>

              <div className="tl__kind">
                {entry.kind === "experience" ? "Expérience" : "Formation"}
              </div>
            </div>

            <div className="tl__content">
              <div className="tl__top">
                <div className="tl__period">{entry.period}</div>
                <button
                  type="button"
                  className="tl__open"
                  onClick={() => setSelected(entry)}
                >
                  Détails
                </button>
              </div>

              <div className="tl__title">{entry.title}</div>

              <div className="tl__meta">
                <span className="tl__place">{entry.placeLabel}</span>
                {entry.location ? <span className="tl__dotSep">•</span> : null}
                {entry.location ? <span className="tl__location">{entry.location}</span> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <TimelineModal entry={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default Timeline;