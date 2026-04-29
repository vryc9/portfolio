import { Link, Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "./ProjectMarkdownPage.css";
import CustomCursor from "./CustomCursor";
import { useMarkdown } from "../hooks/useSkillsMarkdown";
import { projects } from "../data/project";
import type { Project } from "../types";
import { slugify } from "../types/utils/slugify";
import { APP_ROUTES, projectPath, skillPath } from "../constants/routes";
import MarkdownLink from "./MarkdownLink";
import PageTopBar from "./PageTopBar";
import { skills } from "../data/skill";

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

  const skillItems = useMemo(
    () =>
      skills.map((skill) => {
        const slug = slugify(skill.name);
        const Icon = skill.icon;
        return {
          label: skill.name,
          to: skillPath(slug),
          isActive: slug === normalizedSkillName,
          icon: <Icon size={15} />,
        };
      }),
    [normalizedSkillName],
  );

  if (!skillName) {
    return <Navigate to={APP_ROUTES.home} replace />;
  }

  return (
    <main className="project-markdown-page">
      <CustomCursor />
      <PageTopBar
        backTo={APP_ROUTES.home}
        backState={{ scrollTo: "skills" }}
        backLabel="Compétences"
        title={skillTitle}
        dropdownLabel="Compétences"
        items={skillItems}
      />

      <div className="project-markdown-container">
        <header className="project-markdown-header">
          <h1 className="skill-title">{skillTitle}</h1>
        </header>

        {isLoading && <p>Chargement du contenu...</p>}

        {error && (
          <div role="alert">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <article className="markdown-content">
            <ReactMarkdown components={{ a: MarkdownLink }}>{content}</ReactMarkdown>
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
