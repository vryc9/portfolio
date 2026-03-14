import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import "./Projects.css";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/project";



const TECH_SKILLS = new Set<string>([
  "Angular",
  "Java",
  "NgRx",
  "RxJS",
  "Git",
  "Tests unitaires",
  "Test unitaire",
]);

export const isTechSkill = (tag: string): boolean => TECH_SKILLS.has(tag);

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const goToProject = useCallback(
    ({id}: Project) => {
      navigate(`/projects/${id}`);
    },
    [navigate],
  );

  const onCardKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, project: Project) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goToProject(project);
      }
    },
    [goToProject],
  );

  return (
    <section id="projects">
      <SectionHeader
        eyebrow="Qu'est ce que j'ai réalisé ?"
        title="Mes réalisations"
      />
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card"
            role="link"
            tabIndex={0}
            aria-label={`Ouvrir le projet ${project.title}`}
            onClick={() => goToProject(project)}
            onKeyDown={(e) => onCardKeyDown(e, project)}
          >
            <div className="project-header">
              <div>
                <h3 className="project-title">{project.title}</h3>
              </div>
              <div className="project-icon" aria-hidden="true">
                {project.icon}
              </div>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-tags">
              {project.tags.map((tag, index) => {
                const variant = isTechSkill(tag) ? "tag--tech" : "tag--soft";
                return (
                  <span
                    key={`${project.id}-${tag}-${index}`}
                    className={`tag ${variant}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
