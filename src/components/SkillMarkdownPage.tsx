import { Link, Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import Navigation from "./Navigation";
import { useMarkdown } from "../hooks/useSkillsMarkdown";
import { projects } from "../data/project";
import type { Project } from "../types";
import { slugify } from "../types/utils/slugify";
import { APP_ROUTES, projectPath } from "../constants/routes";

const formatSkillTitle = (slug: string): string =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const SkillMarkdownPage: React.FC = () => {
  const { skillName } = useParams<{ skillName: string }>();

  const normalizedSkillName = skillName ?? "";
  const skillTitle = formatSkillTitle(normalizedSkillName);
  const { content, isLoading, error } = useMarkdown(normalizedSkillName);

  const relatedProjects: Project[] = useMemo(
    () => projects.filter(({ tags }) => tags.some((tag) => slugify(tag) === normalizedSkillName)),
    [normalizedSkillName],
  );

  if (!skillName) {
    return <Navigate to={APP_ROUTES.home} replace />;
  }

  return (
    <main className="project-markdown-page">
      <Navigation />
      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <Link
            to={APP_ROUTES.home}
            state={{ scrollTo: "skills" }}
            className="back-link"
          >
            ← Retour aux compétences
          </Link>
          <h1 className="skill-title" >{skillTitle}</h1>

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
                  <Link to={projectPath(project.id)} className="skill-projects__card">
                    <span className="skill-projects__cardIcon">◈</span>
                    <span className="skill-projects__cardTitle">{project.title}</span>
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
