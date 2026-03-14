import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { timelineEntries, type TimelineEntry } from "../../data/timeline";
import TimelineModal from "./TimelineModal";
import "./Timeline.css";
import { EsieaLogo, NumihLogo } from "./Logo";
import SectionHeader from "../SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const Logo: React.FC<{ which: TimelineEntry["logo"] }> = ({ which }) => {
  if (which === "numih")
    return <NumihLogo className="tl__logo tl__logo--numih" />;
  return <EsieaLogo className="tl__logo tl__logo--esiea" />;
};

const Timeline: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const travelerRef = useRef<HTMLDivElement | null>(null);

  const entries = useMemo(() => timelineEntries, []);
  const [selected, setSelected] = useState<TimelineEntry | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Animate the vertical line growing from top to bottom
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        },
      );

      // Traveler dot follows the line
      gsap.to(travelerRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });

      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );

        const ring = dot.querySelector(".tl__dotRing");
        if (ring) {
          gsap.fromTo(
            ring,
            { scale: 1, opacity: 0.7 },
            {
              scale: 2.6,
              opacity: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: dot,
                start: "top 70%",
                toggleActions: "play none none reset",
              },
            },
          );
        }
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { x: fromLeft ? -40 : 40, opacity: 0, filter: "blur(4px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="tl" ref={rootRef}>
      <SectionHeader eyebrow="parcours" title="Parcours" />
      <div className="tl__friseWrap">
        <div className="tl__track">
          <div className="tl__trackBg" />
          <div className="tl__line" ref={lineRef} />
          <div className="tl__traveler" ref={travelerRef}>
            <span className="tl__travelerCore" />
            <span className="tl__travelerGlow" />
          </div>
        </div>

        <div className="tl__entries">
          {entries.map((entry, index) => (
            <div key={entry.id} className="tl__row">
              <div
                className="tl__dot"
                ref={(el) => {
                  dotRefs.current[index] = el;
                }}
              >
                <span className="tl__dotCore" />
                <span className="tl__dotRing" />
              </div>

              <div
                className="tl__card"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => setSelected(entry)}
              >
                <div className="tl__cardInner">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(entry);
                        }}
                      >
                        Détails
                      </button>
                    </div>

                    <div className="tl__title">{entry.title}</div>

                    <div className="tl__meta">
                      <span className="tl__place">{entry.placeLabel}</span>
                      {entry.location ? (
                        <span className="tl__dotSep">•</span>
                      ) : null}
                      {entry.location ? (
                        <span className="tl__location">{entry.location}</span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="tl__connector" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <TimelineModal entry={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default Timeline;
