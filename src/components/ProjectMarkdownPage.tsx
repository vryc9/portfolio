import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import CustomCursor from "./CustomCursor";
import { useMarkdown } from "../hooks/useSkillsMarkdown";
import { findProjectById } from "../data/project";
import { slugify } from "../types/utils/slugify";
import { isTechSkill } from "../utils/skills";
import { APP_ROUTES, projectPath, skillPath } from "../constants/routes";
import MarkdownLink from "./MarkdownLink";
import Navigation from "./Navigation";

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
      <CustomCursor />
      <Navigation />

      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <h1 className="skill-title">{project.title}</h1>
        </header>

        {isLoading && <p>Chargement du contenu...</p>}

        {error && (
          <div role="alert">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <article className="markdown-content">
            <ReactMarkdown components={{ a: MarkdownLink }}>
              {content}
            </ReactMarkdown>
          </article>
        )}
      </div>
      <div className="project-tags">
        {project.tags.map((tag, index) => (
          <Link
            key={`${project.id}-${tag}-${index}`}
            to={skillPath(slugify(tag))}
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
