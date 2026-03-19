import React, { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  {
    id: "passion",
    icon: "◈",
    label: "Motivation",
    text: "Passionné par les nouvelles technologies depuis mon enfance, j'ai décidé d'en faire mon métier. Au quotidien, je suis quelqu'un de soutient et positif. Je suis toujours prêt à aider, ce qui fait l'une de mes principales qualités. De nature curieuse, j'aime découvrir de nouvelles choses au quotidien, et le développement web étant un domaine qui évolue constamment, correspond donc parfaitement à mon tempérament.",
  },
  {
    id: "formation",
    icon: "◉",
    label: "Formation",
    text: "Actuellement en 4ème année d'Ingénierie du Logiciel à l'ESIEA (Agen), j'ai mené plusieurs projets techniques significatifs, comme l'élaboration d'une application web de suivi de commande ou le développement d'une application mobile pour la réservation de salles de cours. J'ai réalisé ces projets en utilisant diverses technologies telles que C#, Angular, JavaScript ou Java.",
  },
  {
    id: "humain",
    icon: "◎",
    label: "En parallèle du code",
    text: "En complément des projets informatiques, j'ai participé à des projets de formation humaine pour améliorer mes compétences transverses. L'un des projets les plus marquants a été la création d'une association afin de parcourir 500 km (Bordeaux–Sète) pour faire un don au service pédiatrique de l'hôpital de Sète grâce aux différentes récoltes que nous avons pu effectuer.",
  },
  {
    id: "pro",
    icon: "◆",
    label: "Professionnel",
    text: "L'une de mes principales qualités humaines est ma capacité à m'adapter rapidement dans un nouvel environnement. Durant mon alternance au sein de NumihFrance, j'ai su m'adapter à tout type de projet, ce qui m'a permis d'être assez autonome sur la plupart des missions.",
  },
  {
    id: "veille",
    icon: "◇",
    label: "Veille",
    text: "Au quotidien, je passe beaucoup de temps à faire de la veille en lisant des articles sur Dev.to, Medium ou encore LinkedIn, et plus particulièrement dans le domaine du développement web qui me passionne. Ayant un profil fullstack, je m'amuse à créer de nouveaux projets afin de tester les nouvelles fonctionnalités des technologies qui m'intéressent.",
  },
];

const stats = [
  { value: "4", unit: "ans", label: "à l'ESIEA" },
  { value: "500", unit: "km", label: "parcourus" },
  { value: "∞", unit: "", label: "curiosité" },
];

const ParagraphCard: React.FC<{
  item: (typeof paragraphs)[0];
  index: number;
}> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="about__block"
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.65,
        delay: 0.08 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="about__blockHead">
        <span className="about__icon">{item.icon}</span>
        <span className="about__label">{item.label}</span>
      </div>
      <p className="about__text">{item.text}</p>

      <motion.div
        className="about__accentBar"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.08 * index + 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
};

const About: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const original = title.textContent || "";
    title.innerHTML = original
      .split("")
      .map((ch) =>
        ch === " "
          ? `<span class="about__char" style="display:inline-block">&nbsp;</span>`
          : `<span class="about__char" style="display:inline-block">${ch}</span>`
      )
      .join("");

    const chars = title.querySelectorAll(".about__char");

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
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const statEls = statsRef.current?.querySelectorAll(".about__statValue");
      statEls?.forEach((el) => {
        const target = el.getAttribute("data-target");
        if (!target || isNaN(Number(target))) return;
        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: target,
            duration: 1.4,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={rootRef}>
      <div className="about__grid" aria-hidden="true" />

      <div className="about__inner">
        <div className="about__header">
          <div className="about__eyebrow">
            <span className="about__eyebrowLine" />
            <span className="about__eyebrowText">Qui je suis ?</span>
            <span className="about__eyebrowLine" />
          </div>

          <h2 className="about__title section-title" ref={titleRef}>
            À propos
          </h2>
        </div>

        <div className="about__stats" ref={statsRef}>
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="about__stat"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <div className="about__statNum">
                <span
                  className="about__statValue"
                  data-target={isNaN(Number(s.value)) ? undefined : s.value}
                >
                  {s.value}
                </span>
                {s.unit && <span className="about__statUnit">{s.unit}</span>}
              </div>
              <div className="about__statLabel">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="about__blocks">
          {paragraphs.map((item, i) => (
            <ParagraphCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
