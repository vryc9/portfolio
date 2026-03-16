import type { Project } from "../types";

export const projects: ReadonlyArray<Project> = [
    {
        id: 1,
        title: "Gestion de script SQL",
        icon: "{}",
        description:
            "Application permettant la gestion de script SQL avec une automatisation pour la récupération des scripts directement depuis Gitlab ",
        tags: [
            "Angular",
            "Java",
            "Anticipation",
            "Git",
            "Tests unitaires",
            "Compréhension du besoin",
        ],
    },
    {
        id: 2,
        title: "Comparateur XML",
        icon: "[]",
        description: "Application permettant la comparaison de deux fichier XML",
        tags: [
            "Angular",
            "Java",
            "Gestion de projet",
            "Tests unitaires",
            "Anticipation",
            "Autonomie",
        ],
    },
    {
        id: 3,
        title: "Traçabilité",
        icon: "<>",
        description: "La traçabilité est une fonctionnalité qui permet d’enregistrer les actions réalisées par l’utilisateur sur les différents écrans de l’application.",
        tags: ["Angular", "Java", "NgRx", "Autonomie"],
    },
    {
        id: 4,
        title: "BtoS",
        icon: "()",
        description: "lorem",
        tags: ["Anticipation", "Communication orale", "Autonomie", "Gestion de projet"],
    },
    {
        id: 5,
        title: "DH",
        icon: "()",
        description: "lorem",
        tags: ["Angular", "Java", "NgRx", 'Git', "Compréhension du besoin", "Communication orale"],
    },
];


export function findProjectById(idProject: string): Project | undefined {
    const numericId = Number(idProject);

    if (Number.isNaN(numericId)) {
        return undefined;
    }

    return projects.find(({ id }) => id === numericId);
}
