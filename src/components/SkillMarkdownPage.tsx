import { Link, useParams, Navigate } from "react-router-dom";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import { useMarkdown } from "../hooks/useSkillsMarkdown";
import { projects } from "../data/project";
import { Project } from "../types";
import { slugify } from "../types/utils/slugify";

const formatSkillTitle = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SkillMarkdownPage: React.FC = () => {
  const { skillName } = useParams<{ skillName: string }>();

  const skillTitle: string = useMemo<string>(
    () => (skillName ? formatSkillTitle(skillName) : ""),
    [skillName],
  );

  const { content, isLoading, error } = useMarkdown(skillName ?? "");
  const relatedProjects: Project[] = useMemo<Project[]>(
    () => projects.filter(({ tags }) => tags.some((tag) =>  slugify(tag) === skillName)),
    [skillName],
  );

  if (!skillName) return <Navigate to="/" replace />;

  return (
    <main className="project-markdown-page">
      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <Link to="/" className="back-link">
            ← Retour à l'accueil
          </Link>
          <h1>{skillTitle}</h1>
        </header>

        {isLoading && <p>Chargement du contenu...</p>}

        {error && (
          <div role="alert">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <article className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        )}

        {relatedProjects.length > 0 && (
          <div className="skill-projects">
            <div className="skill-projects__header">
              <span className="skill-projects__eyebrow">
                <span className="skill-projects__line" />
                projets associés
                <span className="skill-projects__line skill-projects__line--right" />
              </span>
            </div>

            <ul className="skill-projects__list">
              {relatedProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.id}`}
                    className="skill-projects__card"
                  >
                    <span className="skill-projects__cardIcon">◈</span>
                    <span className="skill-projects__cardTitle">
                      {project.title}
                    </span>
                    <span className="skill-projects__cardArrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default SkillMarkdownPage;
