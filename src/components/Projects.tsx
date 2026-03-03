import { Link } from "react-router-dom";
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
    tags: ["Angular", "Java", "Ngrx", "Compréhension du besoin"],
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects">
      <h2 className="section-title">Projets récents</h2>

      <div className="projects-grid">
        {projects.map((project) => {
          return (
            <Link
              key={project.id}
              to={`/projects/${slugify(project.title)}`}
              className="project-card-link"
              aria-label={`Voir le détail du projet ${project.title}`}
            >
              <article className="project-card">
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
                    const skillSlug = slugify(tag);
                    return (
                      <Link
                        key={`${project.id}-${tag}-${index}`}
                        to={`/skills/${skillSlug}`}
                        className="tag tag-link"
                      >
                        {tag}
                      </Link>
                    );
                  })}
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
