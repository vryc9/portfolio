import React, { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  {
    id: "valeurs",
    icon: "⬢",
    label: "Mes valeurs",
    text: "En tant que futur ingénieur, j’accorde une importance particulière à la responsabilité, à la qualité du travail et à l’impact de ce que je développe. Pour moi, écrire du code ne se limite pas à une fonctionnalité : il s’agit de concevoir des solutions fiables, maintenables et utiles pour les utilisateurs. J’essaie donc toujours d’adopter une démarche rigoureuse, en prenant en compte les contraintes techniques mais aussi les enjeux métier. Le travail en équipe est également central dans ma manière de fonctionner : partager, écouter et progresser collectivement fait partie intégrante de ma vision du développement logiciel.",
  },

  {
    id: "pro",
    icon: "◆",
    label: "Projet professionnel et personnel",
    text: "Mon objectif est de devenir développeur fullstack spécialisé dans l’écosystème Java / Spring Boot et Angular. À court terme, je souhaite consolider mes compétences en développement logiciel au sein d’équipes produit, en comprenant mieux les enjeux de qualité, de performance et de maintenabilité. À moyen terme, j’aimerais évoluer vers des sujets d’architecture logicielle afin de participer à la conception de systèmes plus complexes et scalables. Mon alternance chez Numih France a un rôle important car elle m’a permis de travailler sur des projets concrets en production, de monter en autonomie et de comprendre les réalités d’une organisation technique. En parallèle, je développe le projet personnel Planeo, une application construite avec Angular, Spring Boot et MySQL. Ce projet me permet d’explorer des sujets avancés comme l’architecture hexagonale, les microservices et les bonnes pratiques de conception logicielle.",
  },

  {
    id: "humain",
    icon: "◎",
    label: "Mes principales qualités humaines",
    text: "L’adaptabilité est la qualité que j’ai le plus développée au cours de mon alternance. J’ai été confronté à des projets très différents, avec des contextes techniques et fonctionnels variés, ce qui m’a appris à m’intégrer rapidement et à devenir autonome efficacement. La curiosité est également importante car elle m'a permis de comprendre en profondeur les technologies que j’utilise et à expérimenter régulièrement de nouveaux outils. Enfin, l’entraide est une valeur essentielle dans ma manière de travailler. Cela s’est notamment illustré dans un projet associatif que j’ai co-organisé : un parcours de 500 km à vélo entre Bordeaux et Sète pour récolter des dons au profit du service pédiatrique de l’hôpital de Sète. Cette expérience m’a appris à travailler en équipe autour d’un objectif commun, à maintenir une dynamique collective et à m’impliquer dans un projet à fort impact humain.",
  },

  {
    id: "passion",
    icon: "◈",
    label: "Centres d’intérêt",
    text: "Passionné par les nouvelles technologies depuis longtemps, j’ai rapidement orienté mon parcours vers le développement logiciel. Ce qui me motive dans ce domaine, c’est sa constante évolution : chaque projet est différent et permet d’apprendre en continu. J’apprécie particulièrement le fait de pouvoir expérimenter et construire des applications concrètes, ce qui nourrit ma curiosité et mon envie de progresser.",
  },

  {
    id: "veille",
    icon: "◇",
    label: "Veille",
    text: "Je consacre une partie importante de mon temps à la veille technologique, notamment via des articles sur Dev.to, Medium et LinkedIn. Cela me permet de rester à jour sur les évolutions du développement web, aussi bien côté backend que frontend. En parallèle, je réalise régulièrement des projets personnels afin de tester de nouvelles fonctionnalités et d’approfondir mes connaissances sur les technologies que j’utilise au quotidien.",
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
