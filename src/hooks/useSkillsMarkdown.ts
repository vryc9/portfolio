import { useEffect, useState } from "react";

interface UseMarkdownResult {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export const useMarkdown = (
  slug: string | null
): UseMarkdownResult => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setContent("");
      setError("Fichier invalide.");
      return;
    }

    const controller = new AbortController();

    const loadMarkdown = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.BASE_URL}${slug}.md`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Impossible de charger le contenu.");
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
  }, [slug]);

  return { content, isLoading, error };
};