export const APP_BASENAME = "/portfolio";

export const APP_ROUTES = {
  home: "/",
  projectDetails: "/projects/:id",
  skillDetails: "/skills/:skillName",
} as const;

export const projectPath = (id: number): string => `/projects/${id}`;
export const skillPath = (skillSlug: string): string => `/skills/${skillSlug}`;
