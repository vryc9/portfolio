import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { skills } from "../data/skill";
import { slugify } from "../types/utils/slugify";
import "./SkillSection.css";
import SectionHeader from "./SectionHeader";
import { skillPath } from "../constants/routes";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const SkillsSection: React.FC = memo(() => {
  const { techSkills, softSkills } = useMemo(() => {
    const techSkills = skills.filter((s) => s.category === "tech");
    const softSkills = skills.filter((s) => s.category === "soft");
    return { techSkills, softSkills };
  }, []);

  return (
    <section id="skills">
      <SectionHeader eyebrow="Ce que je maitrise" title="Mes compétences" />
      <div className="skills-grid">
        <div className="skills-col">
          <div className="skills-col__head">
            <h3 className="skills-col__title">Techniques</h3>
          </div>

          <motion.div
            className="skills-list"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {techSkills.map((s) => {
              const to = skillPath(slugify(s.name));
              const Icon = s.icon;

              return (
                <motion.div key={s.name} variants={item}>
                  <Link to={to} className="skill-card skill-card--tech">
                    <div className="skill-card__left">
                      <div className="skill-card__icon" aria-hidden="true">
                        <Icon size={18} />
                      </div>
                      <div className="skill-card__name">{s.name}</div>
                    </div>

                    <div className="skill-card__chev" aria-hidden="true">
                      →
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="skills-col">
          <div className="skills-col__head">
            <h3 className="skills-col__title">Transverses</h3>
          </div>

          <motion.div
            className="skills-list"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {softSkills.map((s) => {
              const to = skillPath(slugify(s.name));
              const Icon = s.icon;
              return (
                <motion.div key={s.name} variants={item}>
                  <Link to={to} className="skill-card skill-card--soft">
                    <div className="skill-card__left">
                      <div className="skill-card__icon" aria-hidden="true">
                        <Icon size={18} />
                      </div>
                      <div className="skill-card__name">{s.name}</div>
                    </div>

                    <div className="skill-card__chev" aria-hidden="true">
                      →
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";
export default SkillsSection;
