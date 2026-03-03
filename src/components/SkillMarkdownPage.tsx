import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import { useMarkdown } from "../hooks/useSkillsMarkdown";

const formatSkillTitle = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SkillMarkdownPage: React.FC = () => {
  const { skillName } = useParams<{ skillName: string }>();
  const skillSlug = skillName ?? null;

  const { content, isLoading, error } = useMarkdown(skillSlug);

  return (
    <main className="project-markdown-page">
      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <Link to="/" className="back-link">
            ← Retour à l'accueil
          </Link>

          {skillSlug && <h1>{formatSkillTitle(skillSlug)}</h1>}
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
    </main>
  );
};

export default SkillMarkdownPage;
