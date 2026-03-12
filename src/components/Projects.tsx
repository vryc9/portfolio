import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import "./Projects.css";
import { slugify } from "../utils/slugify";

export const projects: Project[] = [
  {
    id: 1,
    title: "Gestion de script SQL",
    icon: "{}",
    description:
      "Application permettant la gestion de script SQL avec une automatisation pour la récupération des scripts directement depuis Gitlab ",
    tags: [
      "Angular",
      "Java",
      "Anticipation",
      "Git",
      "Tests unitaires",
      "Compréhension du besoin",
    ],
  },
  {
    id: 2,
    title: "Comparateur XML",
    icon: "[]",
    description: "Application permettant la comparaison de deux fichier XML",
    tags: [
      "Angular",
      "Java",
      "Gestion de projet",
      "Test unitaire",
      "Anticipation",
      "Autonomie",
      "Gestion de projet",
    ],
  },
  {
    id: 3,
    title: "Planéo",
    icon: "<>",
    description: "lorem",
    tags: ["Angular", "Java", "NgRx", "Autonomie"],
  },
  {
    id: 4,
    title: "BtoS",
    icon: "()",
    description: "lorem",
    tags: ["Anticipation", "Communication orale", "Autonomie"],
  },
  {
    id: 5,
    title: "DH",
    icon: "()",
    description: "lorem",
    tags: ["Angular", "Java", "NgRx", "Compréhension du besoin"],
  },
];

const TECH_SKILLS = new Set<string>([
  "Angular",
  "Java",
  "NgRx",
  "RxJS",
  "Git",
  "Tests unitaires",
  "Test unitaire",
]);

const isTechSkill = (tag: string): boolean => TECH_SKILLS.has(tag);

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const goToProject = useCallback(
    (project: Project) => {
      navigate(`/projects/${slugify(project.title)}`);
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
      <h2 className="section-title">Projets récents</h2>

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