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
    text: "Passionné par les nouvelles technologies depuis mon enfance, j'ai assez vite eu envie d'en faire mon métier. Ce qui me plaît dans le développement, c'est qu'il évolue sans cesse : on apprend tous les jours, et aucun projet ne ressemble vraiment à un autre. C'est un domaine qui correspond bien à ma curiosité naturelle.",
  },
  {
    id: "formation",
    icon: "◉",
    label: "Formation",
    text: "Je suis aujourd'hui en 5ème année du cycle Ingénierie du Logiciel à l'ESIEA d'Agen, en alternance chez NumihFrance. Cette alternance est une vraie opportunité car j'ai pu travailler sur différents sujets et j'ai pu y gagner en autonomie assez rapidement. Mon objectif à la sortie de l'école est de continuer comme développeur fullstack, principalement sur l'écosystème Java/Spring Boot côté back et Angular côté front, avec l'envie d'évoluer plus tard vers des sujets d'architecture logicielle.",
  },
  {
    id: "humain",
    icon: "◎",
    label: "En parallèle du code",
    text: "Ce que je mobilise le plus au quotidien, c'est mon adaptabilité. Mon alternance m'a placé sur des projets très différents et j'ai pu y devenir autonome assez vite. Je suis aussi quelqu'un de curieux et positif, et j'ai naturellement le goût de l'entraide. Cette dernière qualité s'est concrétisée dans un projet associatif qui m'a marqué : la création d'une association pour parcourir 500 km à vélo entre Bordeaux et Sète afin de récolter des dons pour le service pédiatrique de l'hôpital de Sète. Au-delà du défi physique, ce projet m'a appris à porter un objectif collectif et à fédérer une équipe autour d'une cause.",
  },
  {
    id: "pro",
    icon: "◆",
    label: "Projet personnel et professionel",
    text: "Je me dirige vers un poste de développeur fullstack sur l'écosystème Java/Spring Boot et Angular, avec à terme l'envie de progresser vers des sujets d'architecture logicielle. Mon alternance chez NumihFrance est le centre de ce parcours. Grâce à cette expérence, j'ai pu voir la réalité d'une équipe en production et m'a permis de gagner rapidement en autonomie sur des projets variés.En parallèle, je développe un projet personnel, Planeo, sur une stack Angular + Spring Boot + MySQL. Ce projet me sert d'apprentissage pour aller plus loin sur des sujets que je veux maîtriser, comme l'architecture hexagonale côté backend ou les nouvelles fonctionnalités d'Angular côté frontend ainsi que l'infrastructure en micro-service."
  },
  {
    id: "veille",
    icon: "◇",
    label: "Veille",
    text: "Au quotidien, je passe beaucoup de temps à faire de la veille en lisant des articles sur Dev.to, Medium ou encore LinkedIn, et plus particulièrement dans le domaine du développement web qui me passionne. Ayant un profil fullstack, je m'amuse à créer de nouveaux projets afin de tester les nouvelles fonctionnalités des technologies qui m'intéressent.",
  },
];

const stats = [
  { value: "5", unit: "ans", label: "à l'ESIEA" },
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
