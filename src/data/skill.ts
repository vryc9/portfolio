
import { SiAngular, SiRedux, SiGit } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscBeaker } from "react-icons/vsc";  

import type React from "react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export type SkillIcon = IconType | LucideIcon | React.ComponentType<{ size?: number }>;

import {
  Lightbulb,
  UserCheck,
  ClipboardList,
  MessageCircle,
  Search,
} from "lucide-react";

export type SkillCategory = "tech" | "soft";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  icon: SkillIcon;
}

export const skills: SkillItem[] = [
  { name: "Angular", category: "tech", icon: SiAngular },
  { name: "Java", category: "tech", icon: FaJava },
  { name: "NgRx", category: "tech", icon: SiRedux },
  { name: "Git", category: "tech", icon: SiGit },
  { name: "Tests unitaires", category: "tech", icon: VscBeaker },

  { name: "Anticipation", category: "soft", icon: Lightbulb },
  { name: "Autonomie", category: "soft", icon: UserCheck },
  { name: "Gestion de projet", category: "soft", icon: ClipboardList },
  { name: "Communication orale", category: "soft", icon: MessageCircle },
  { name: "Compréhension du besoin", category: "soft", icon: Search },
];