import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import "./Projects.css";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/project";
import { projectPath } from "../constants/routes";
import { isTechSkill } from "../utils/skills";

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const goToProject = useCallback(
    ({ id }: Project) => {
      navigate(projectPath(id));
    },
    [navigate],
  );

  const onCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>, project: Project) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
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
            onKeyDown={(event) => onCardKeyDown(event, project)}
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
