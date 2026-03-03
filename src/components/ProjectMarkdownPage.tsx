import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import { useMarkdown } from "../hooks/useSkillsMarkdown";

const ProjectMarkdownPage: React.FC = () => {
  const { projetName } = useParams<{ projetName: string }>();
  console.log(projetName);
  
  const skillSlug = projetName ?? null;

  const { content, isLoading, error } = useMarkdown(skillSlug);

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
    </main>
  );
};

export default ProjectMarkdownPage;
