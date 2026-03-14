const TECH_SKILLS = new Set<string>([
  "Angular",
  "Java",
  "NgRx",
  "RxJS",
  "Git",
  "Tests unitaires",
  "Test unitaire",
]);

export const isTechSkill = (tag: string): boolean => TECH_SKILLS.has(tag);
