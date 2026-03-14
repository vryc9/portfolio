export interface Project {
  id: number;
  title: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Position {
  x: number;
  y: number;
}

export type SectionId = 'hero' | "timeline" | 'projects' | 'skills' | 'contact' | 'about';
