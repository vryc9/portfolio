import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import { useMarkdown } from "../hooks/useSkillsMarkdown";
import { findProjectById } from "../data/project";
import { slugify } from "../types/utils/slugify";
import { isTechSkill } from "../utils/skills";
import { APP_ROUTES, skillPath } from "../constants/routes";

const ProjectMarkdownPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const project = id ? findProjectById(id) : undefined;
  const titleSlug = project ? slugify(project.title) : "";
  const { content, isLoading, error } = useMarkdown(titleSlug);

  if (!id || !project) {
    return <Navigate to={APP_ROUTES.home} replace />;
  }

  return (
    <main className="project-markdown-page">
      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <Link to={APP_ROUTES.home} className="back-link">
            ← Retour aux projets
          </Link>
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
      </div>

      <div className="project-tags">
        {project.tags.map((tag, index) => (
          <Link key={`${project.id}-${tag}-${index}`} to={skillPath(slugify(tag))}>
            <span
              className={`tag ${isTechSkill(tag) ? "tag--tech" : "tag--soft"}`}
            >
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProjectMarkdownPage;
