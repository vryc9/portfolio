## Contexte

Au sein de notre équipe, les différents **Product Owners** doivent comparer des messages au format **XML**, générés par nos applications, afin de vérifier si les messages envoyés sont identiques. Cependant, certaines balises ne sont pas pertinentes pour la comparaison, et la solution en place ne permettait pas de les ignorer. Pour répondre à cette problématique, j’ai conçu et développé un outil permettant de comparer deux fichiers XML tout en excluant les balises non souhaitées. L’objectif était d’obtenir une comparaison fiable et exploitable pour les différents tests réalisés.

## Conception

Avant de démarrer le développement, j’ai réalisé des maquettes sur **Figma** afin d’obtenir un premier visuel de l’interface. J’ai mené des recherches sur le design pour proposer une interface la plus claire et agréable possible. Pour chaque fonctionnalité, j’ai créé des parcours utilisateurs (séquences d’actions) correspondant aux différents cas d’usage, ce qui m’a permis de visualiser rapidement les écrans attendus. Le retour des utilisateurs étant essentiel, j’ai partagé un lien vers la maquette Figma afin de recueillir leurs retours et d’ajuster les éléments à améliorer. La solution devait inclure les fonctionnalités suivantes :

- déposer les fichiers à comparer ;
- accepter uniquement les fichiers XML ;
- proposer une prévisualisation des fichiers ;
- permettre de sélectionner les lignes/blocs à ignorer lors de la comparaison ;
- afficher clairement les différences lorsque les fichiers ne sont pas identiques.

## Étapes de réalisation

Pour mener à bien ce projet, j’ai commencé par implémenter la logique de comparaison. Le principe était de récupérer le contenu de deux fichiers XML, puis de le transformer en objets Java afin de comparer leurs attributs et d’identifier les valeurs différentes.

Pour mettre en place cette logique, j’ai d’abord développé un service qui transforme le contenu du fichier en objet Java via **JAXB** (API permettant de sérialiser/désérialiser XML ↔ objets Java). Ensuite, j’ai créé un second service capable d’extraire dynamiquement les valeurs des attributs grâce à la réflexion, puis de stocker les différences détectées.

Côté interface, j’ai développé une fonctionnalité permettant de sélectionner les blocs ou lignes à ignorer. Cette partie m’a fait progresser sur la synchronisation des données et la manipulation de fichiers : les modifications appliquées à un fichier devaient être répercutées sur l’autre, ce qui constituait l’une des principales complexités du projet.

J’ai également développé la zone de dépôt des fichiers. Pour faciliter la gestion, j’ai utilisé des composants **PrimeNG** et mis en place le **drag and drop** via une directive personnalisée, afin d’écouter les événements de dépôt et de déclencher le traitement du fichier.

Une autre fonctionnalité demandée était la visualisation du contenu des fichiers, pour permettre aux utilisateurs de sélectionner précisément les lignes ou blocs à exclure. Pour cela, j’ai créé un service Angular regroupant la logique d’extraction et d’affichage du contenu. Cette étape m’a permis d’approfondir **RxJS**, car il fallait gérer plusieurs flux asynchrones liés au chargement, à l’édition et à la synchronisation du contenu.

Pour faciliter les manipulations, j’ai ajouté une toolbar permettant de supprimer les lignes/blocs sélectionnés, ainsi qu’une barre de recherche pour retrouver rapidement une balise spécifique, avec un scroll automatique vers le résultat. L’une des difficultés a été de gérer la recherche de manière cohérente sur les deux fichiers.

## Risques identifiés

Dans ce projet, plusieurs risques ont été identifiés dès le départ.

### Risques pour le client / l’entreprise

- **Risque de faux résultats de comparaison** : si l’outil ignore une balise importante ou si la sélection des balises à exclure est mal utilisée, la comparaison peut conclure à tort que deux messages sont identiques. Cela peut entraîner une mauvaise validation et laisser passer des anomalies.
- **Risque de perte de confiance dans l’outil** : si l’affichage des différences n’est pas clair, ou si le comportement varie selon les cas, les utilisateurs peuvent revenir à une comparaison manuelle.

### Risques pour moi

- **Complexité de la synchronisation des modifications** : le fait de modifier un fichier (suppression de lignes/blocs) et de répercuter correctement ces changements sur l’autre fichier pouvait introduire des décalages ou des incohérences. C’était un risque majeur de bugs.

## Acteurs et collaboration

Plusieurs acteurs ont été clés dans ce projet, notamment les **Product Owners**, principaux utilisateurs de l’outil. J’ai organisé plusieurs points avec eux pour présenter l’avancement et intégrer leurs retours.
J’ai également présenté le projet aux développeurs de l’équipe lors de démonstrations, ce qui a été très enrichissant car leurs retours m’ont permis d’améliorer l’ergonomie et certains choix techniques.

## Apports et apprentissages

Ce projet m’a permis de monter en compétences sur plusieurs technologies que je n’avais pas encore utilisées.

- Côté back, j’ai découvert **Spring Boot**.
- J’ai aussi appris à manipuler des fichiers **XML**.
- Enfin, j’ai renforcé mes compétences **Angular**, en particulier sur **RxJS**, notamment pour la partie synchronisation et gestion des flux liés aux fichiers.

## Regard critique

Mon principal regret est que l’outil ne soit plus utilisé aujourd’hui par les Product Owners. Avec du recul, j’aurais aimé prévoir davantage la conduite du changement afin de maximiser l’adoption et l’ancrage de l’outil dans les pratiques.