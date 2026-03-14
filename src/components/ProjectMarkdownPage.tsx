import { Link, useParams, Navigate } from "react-router-dom";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import { useMarkdown } from "../hooks/useSkillsMarkdown";
import { findProjectById } from "../data/project";
import { slugify } from "../types/utils/slugify";
import { isTechSkill } from "./Projects";

const ProjectMarkdownPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = findProjectById(id ?? "");
  const titleSlug = useMemo(() => slugify(project.title), [project.title]);
  const { content, isLoading, error } = useMarkdown(titleSlug);
  if (!project) return <Navigate to="/" replace />;

  return (
    <main className="project-markdown-page">
      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <Link to="/" className="back-link">
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
          <Link
            key={`${project.id}-${tag}-${index}`}
            to={`/skills/${slugify(tag)}`}
          >
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
