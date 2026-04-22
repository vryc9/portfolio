## Contexte
Au sein de notre équipe, les différents **Product Owners** doivent comparer des messages au format **XML**, générés par nos applications, afin de vérifier si les messages envoyés sont identiques. Cependant, certaines balises ne sont pas pertinentes pour la comparaison, et la solution en place ne permettait pas de les ignorer. Pour répondre à cette problématique, j’ai conçu et développé un outil permettant de comparer deux fichiers XML tout en excluant les balises non souhaitées. L’objectif était d’obtenir une comparaison fiable et exploitable pour les différents tests réalisés.

## Conception
Avant de démarrer le développement, j’ai réalisé des maquettes sur **Figma** afin d’obtenir un premier visuel de l’interface. J’ai mené des recherches sur le design pour proposer une interface la plus claire et agréable possible. Pour chaque fonctionnalité, j’ai créé des parcours utilisateurs (séquences d’actions) correspondant aux différents cas d’usage, ce qui m’a permis de visualiser rapidement les écrans attendus. Le retour des utilisateurs étant essentiel, j’ai partagé un lien vers la maquette Figma afin de recueillir leurs retours et d’ajuster les éléments à améliorer. La solution devait inclure les fonctionnalités suivantes :

- déposer les fichiers à comparer ;
- accepter uniquement les fichiers XML ;
- proposer une prévisualisation des fichiers ;
- permettre de sélectionner les lignes/blocs à ignorer lors de la comparaison ;
- afficher clairement les différences lorsque les fichiers ne sont pas identiques.
L'outil repose sur une architecture classique : un frontend Angular (avec PrimeNG et RxJS) qui communique avec une API REST Spring Boot exposant principalement un endpoint de comparaison. La logique XML côté backend s'appuie sur JAXB pour la désérialisation et sur la réflexion Java pour l'extraction dynamique des valeurs.

## Étapes de réalisation
Pour mener à bien ce projet, j’ai commencé par implémenter la logique de comparaison. Le principe était de récupérer le contenu de deux fichiers XML, puis de le transformer en objets Java afin de comparer leurs attributs et d’identifier les valeurs différentes.
Pour la réception et la comparaison des fichiers XML, j'ai configuré un endpoint de type POST dans le contrôleur, qui prendra deux paramètres de type MultipartFile. Chaque paramètre correspond à un fichier à récupérer. De plus, j'ai utilisé l'annotation @RequestParam pour extraire les fichiers du form-data. Une fois les fichiers récupérés, j’ai appelé un service de nettoyage, avec les deux fichiers en tant que paramètres. Enfin, le endpoint renvoie le résultat de la comparaison. 

Avant d'entamer la comparaison des fichiers, je les prépare en les nettoyant. Pour ce faire, j'ai d'abord converti les fichiers, qui sont de type MultipartFile, en objets Document. Cette conversion facilite la manipulation des fichiers. C'est à ce stade que toute la logique de nettoyage est mise en place. J’ai créé une méthode qui supprime les balises vides et indésirables même sur les balises enfants. Une fois toutes les étapes effectuées, je suis passé à la désérialisation. Pour mettre en place cette logique, j’ai développé un service qui transforme le contenu du fichier en objet Java via **JAXB** (API permettant de sérialiser/désérialiser XML ↔ objets Java). Ensuite, j’ai créé un second service capable d’extraire dynamiquement les valeurs des attributs grâce à la réflexion, puis de stocker les différences détectées.

Côté interface, j’ai développé une fonctionnalité permettant de sélectionner les blocs ou lignes à ignorer. Cette partie m’a fait progresser sur la synchronisation des données et la manipulation de fichiers : les modifications appliquées à un fichier devaient être répercutées sur l’autre, ce qui constituait l’une des principales complexités du projet.

Pour la zone de dépôt, j'ai développé une directive Angular personnalisée. Cette directive écoutait trois événements DOM via des @HostListener : dragover (pour autoriser le dépôt et afficher un retour visuel via une classe CSS), dragleave (pour retirer ce retour visuel), et drop (pour capturer le fichier et stopper la propagation par défaut du navigateur).

Une fois le fichier capturé, la directive émettait un événement @Output() vers le composant parent, qui se chargeait de valider l'extension .xml avant de déclencher le traitement. Ce découpage m'a permis de réutiliser la directive sur les deux zones de dépôt (une par fichier) sans dupliquer la logique.

Une autre fonctionnalité demandée était la visualisation du contenu des fichiers, pour permettre aux utilisateurs de sélectionner précisément les lignes ou blocs à exclure. Pour cela, j’ai créé un service Angular regroupant la logique d’extraction et d’affichage du contenu. J'ai structuré cette partie autour de deux BehaviorSubject RxJS, un par fichier, qui maintenaient en permanence l'état courant du contenu affiché (contenu brut + liste des chemins de balises exclues). Un troisième Observable, issu du combineLatest des deux premiers, déclenchait automatiquement la mise à jour visuelle dès qu'un des deux états changeait. Cette étape m’a permis d’approfondir **RxJS**, car il fallait gérer plusieurs flux asynchrones liés au chargement, à l’édition et à la synchronisation du contenu.

Pour faciliter les manipulations, j’ai ajouté une toolbar permettant de supprimer les lignes/blocs sélectionnés, ainsi qu’une barre de recherche pour retrouver rapidement une balise spécifique, avec un scroll automatique et une surbrillance vers le résultat. L’une des difficultés a été de gérer la recherche de manière cohérente sur les deux fichiers.

Pour envoyer les fichiers et recevoir le résultat de la comparaison, j’ai créé un service Angular qui va servir à effectuer des appels vers mon api. J’ai ensuite défini une méthode « compare », qui va permettre d’envoyer les fichiers à comparer, et de récupérer le résultat de la comparaison. La méthode va prendre en paramètre les deux fichiers et les mettre dans un FormData. Pour envoyer les fichiers, je commence par instancier un FormData. Ensuite je vais appeler la méthode « append() », qui va prendre en premier paramètre un nom qui va servir à récupérer le fichier depuis le FormData. Le second va être le fichier à envoyer. Je vais ensuite utiliser HttpClient, que j’ai injecté dans mon constructeur pour pouvoir l’utiliser. Cette dépendance dispose de méthodes, permettant d’effectuer des appels à des api, en indiquant l’url, et en lui passant un body. J’appelle donc la méthode « post() » en lui passant l’url ciblant vers mon api, et le FormData précédemment créé.  

Pour afficher le résultat de la comparaison, un toast est affiché pour informer que les fichiers sont identiques. Sinon, une modale va afficher les différences. Sur cette modale, il y a un tableau à trois colonnes : le nom de l'attribut, sa valeur dans le fichier original, et sa valeur dans le fichier comparé. Sur chaque ligne du tableau l’attribut ainsi que les valeurs du fichier original et comparé sont affichés. J’ai mis en place une surbrillance sur les caractères qui diffèrent. Pour ce faire j’ai créé un pipe qui va retourner une chaîne HTML où chaque caractère différent est entouré d'une balise portant une classe CSS dédiée

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

## Résultats et lendemains
À la fin du développement, l'outil a été adopté par les Product Owners de l'équipe, qui l'ont intégré dans leur processus de validation des messages XML. Il remplaçait une comparaison manuelle en apportant trois bénéfices concrets : une mise en évidence automatique des différences via le tableau récapitulatif et la surbrillance caractère par caractère, la possibilité d'exclure les balises non pertinentes (ce que la solution précédente ne permettait pas), et une prévisualisation directe des fichiers dans l'interface. Les retours récoltés lors des démonstrations aux PO et aux développeurs de l'équipe ont été positifs.

Pour moi, ce projet a été particulièrement formateur sur plusieurs plans. Sur le plan technique, j'ai découvert Spring Boot côté backend, la manipulation de XML via JAXB et la réflexion Java pour l'extraction dynamique des valeurs, et j'ai renforcé mes compétences Angular en particulier sur RxJS avec les BehaviorSubject et combineLatest pour la synchronisation des flux entre les deux fichiers. Dans l'immédiat suivant la livraison, l'outil a été utilisé par les PO. À distance, après quelques semaines, les usages ont commencé à s'espacer. Aujourd'hui, l'outil n'est plus utilisé activement par l'équipe, ce qui constitue mon principal regret sur ce projet.

Mon principal regret est que l'outil ne soit plus utilisé aujourd'hui. En analysant cette perte d'usage, j'identifie deux causes principale : 
La première est un manque de retours utilisateurs. Une fois la livraison faite, je n'ai pas mis en place de mécanisme pour collecter les problèmes rencontrés par les PO au fil de leurs utilisations. Sans ces retours, je n'avais pas de levier pour faire évoluer l'outil et maintenir son utilité perçue.

La seconde est que peu de temps après la livraison, j'ai rejoint le développement du produit principal de l'équipe, et les Product Owners ont été sollicités en priorité sur mes nouvelles user stories. 
Avec du recul, j'aurais dû anticiper cette transition en prévoyant, une phase d'accompagnement explicite avec des points de suivi réguliers avec les PO sur les premières semaines d'utilisation 
