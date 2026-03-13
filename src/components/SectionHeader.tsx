import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SectionHeader.css";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    titleEl.innerHTML = title
      .split("")
      .map((ch) =>
        ch === " "
          ? `<span class="sh__char" aria-hidden="true">&nbsp;</span>`
          : `<span class="sh__char" aria-hidden="true">${ch}</span>`
      )
      .join("");

    titleEl.setAttribute("aria-label", title);
    const chars = titleEl.querySelectorAll(".sh__char");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { y: 40, opacity: 0, rotateX: -60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [title]);

  return (
    <div className={`sh ${align === "center" ? "sh--center" : ""} ${className}`}>
      <div className="sh__eyebrow">
        <span className="sh__eyebrowLine" />
        <span className="sh__eyebrowText">{eyebrow}</span>
        <span className="sh__eyebrowLine sh__eyebrowLine--right" />
      </div>
      <h2 className="sh__title section-title" ref={titleRef} aria-label={title} />
      {subtitle && <p className="sh__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
