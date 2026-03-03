# Portfolio Développeur React + TypeScript

Un portfolio moderne avec design glassmorphism et animations interactives, entièrement typé avec TypeScript.

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Extraire le dossier ZIP**
   ```bash
   # Naviguez dans le dossier extrait
   cd portfolio-react
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   - L'application sera disponible sur `http://localhost:5173`

## 📦 Scripts disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Compiler TypeScript et créer le build de production
npm run preview  # Prévisualiser le build de production
npm run lint     # Linter le code TypeScript
```

## 🎨 Personnalisation

### Modifier votre nom
Dans `src/components/Hero.tsx`, ligne 7 :
```typescript
const fullText = 'Votre Nom' // Remplacez par votre nom
```

### Ajouter vos projets
Dans `src/components/Projects.tsx`, modifiez le tableau `projects` :
```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'Mon Projet',
    icon: '{}',
    description: 'Description du projet',
    tags: ['React', 'TypeScript']
  }
]
```

### Modifier votre stack technique
Dans `src/components/Skills.tsx`, modifiez le tableau `skillCategories`

### Changer les couleurs
Dans `src/index.css`, modifiez les variables CSS :
```css
:root {
  --accent-cyan: #00ffcc;
  --accent-purple: #a78bfa;
  /* ... */
}
```

## 📁 Structure du projet

```
portfolio-react/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── ParticleCanvas.tsx
│   │   └── CustomCursor.tsx
│   ├── types/
│   │   └── index.ts          # Définitions TypeScript
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json              # Configuration TypeScript
├── tsconfig.node.json
└── vite.config.ts
```

## 🔷 Types TypeScript

Le projet utilise TypeScript avec des types stricts. Voici les principaux types définis :

```typescript
// src/types/index.ts
interface Project {
  id: number;
  title: string;
  icon: string;
  description: string;
  tags: string[];
}

interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

type SectionId = 'hero' | 'projects' | 'skills' | 'contact';
```

## ✨ Fonctionnalités

- ✅ Design glassmorphism moderne
- ✅ Particules animées en arrière-plan
- ✅ Curseur personnalisé
- ✅ Navigation smooth scroll
- ✅ Animations au survol
- ✅ Effet de typing sur le nom
- ✅ Responsive mobile/tablette
- ✅ Formulaire de contact
- ✅ **100% TypeScript avec typage strict**
- ✅ **Composants React.FC typés**
- ✅ **Props et state typés**

## 🛠️ Technologies utilisées

- **React 18** - Framework UI
- **TypeScript 5.2** - Typage statique
- **Vite** - Build tool rapide
- **ESLint** - Linter pour TypeScript
- **CSS3** - Animations et glassmorphism
- **Canvas API** - Particules animées

## 📝 Bonnes pratiques TypeScript

Le projet suit les bonnes pratiques TypeScript :
- ✅ Mode strict activé
- ✅ Tous les composants sont typés avec `React.FC`
- ✅ Props et états fortement typés
- ✅ Events handlers typés correctement
- ✅ Interfaces et types séparés dans `/types`
- ✅ Pas de `any` dans le code

## 🚀 Déploiement

Pour déployer votre portfolio :

1. **Build de production**
   ```bash
   npm run build
   ```

2. **Les fichiers seront dans `/dist`**
   - Uploadez le contenu du dossier `dist/` sur votre hébergeur
   - Compatible avec Vercel, Netlify, GitHub Pages, etc.

## 📝 Licence

Libre d'utilisation pour votre portfolio personnel.
