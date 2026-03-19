export type TimelineKind = "experience" | "education";

export interface TimelineLink {
  label: string;
  to: string;
  external?: boolean;
}

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;

  period: string;
  title: string;
  placeLabel: string;
  location?: string;
  placeUrl?: string;
  logo: "numih" | "esiea";


  responsibility?: string;
  status?: string;
  details?: string[];
  links?: TimelineLink[];
  skills?: string[];
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "edu-esiea",

    kind: "education",
    period: " Septembre 2021 — Aujourd’hui",
    title: "Programme Expert (Bac +5)",
    placeLabel: "ESIEA",
    location: "Agen",
    placeUrl: "https://www.esiea.fr/",
    logo: "esiea",
    responsibility: "Étudiant",
    details: [
      "Formation d’ingénieur / expert.",
      "L'école ESIEA une école de formation supérieur d'informatique. Elle compte plus de 10 000 diplomés avec 2 200 étudiants ou apprentis ainsi que 800 entreprises partenaires",
      "Diplome d'Ingénieur",
    ],
    links: [
      { label: "Site ESIEA", to: "https://www.esiea.fr/", external: true },
    ],
  },
  {
    id: "exp-numih",

    kind: "experience",
    period: "Septembre 2023 — Aujourd’hui",
    title: "Développeur (Alternance)",
    placeLabel: "Numih France",
    logo: "numih",
    location: "Toulouse",
    responsibility: "Alternant",
    status: "Alternance",
    details: [
      "Maintenance et création de fonctionnalités sur l'offre de la gestion administrative du patient",
      "Ecrire des tests cases dans le respect des critères d'acceptance",
      "Demander des revues de code",
      "Faire des revues de code d’autres développeurs",
      "Participer aux cérémonies SCRUM adaptées pour l'alternance",
      "Faire des démonstrations des développements effectués",
    ],
    links: [
      { label: "Projet : DH", to: "/projects/5" },
    ],
    skills: ["Angular", "Java", "NgRx", "Compréhension du besoin"],
  },
];