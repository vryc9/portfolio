import { useEffect, useState } from "react";

interface UseSkillMarkdownResult {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export const useSkillMarkdown = (
  skillSlug: string | null
): UseSkillMarkdownResult => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!skillSlug) {
      setContent("");
      setError("Compétence invalide.");
      return;
    }

    const controller = new AbortController();

    const loadMarkdown = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/${skillSlug}.md`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Impossible de charger le contenu de la compétence.");
        }

        const markdown = await response.text();
        setContent(markdown);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadMarkdown();

    return () => controller.abort();
  }, [skillSlug]);

  return { content, isLoading, error };
};