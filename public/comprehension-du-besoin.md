# Définitions 
La compréhension du besoin, dans un contexte professionnel, c’est la **capacité à bien écouter, à poser les bonnes questions et à analyser les informations pour comprendre clairement ce qui est attendu, les objectifs et les contraintes d’un projet, d’une tâche ou d’une action**.

Dans le monde du travail, bien définir le besoin est très important pour réussir un projet. Pour cela, il faut comprendre ce que veulent les personnes concernées, repérer ce qui est vraiment essentiel, classer les priorités et proposer une solution qui répond correctement aux attentes.

# Réalisations
Sur l’ensemble des projets que j’ai mené, la compréhension du besoin a été très importante afin de bien **cerner les attentes** du projet et de rendre des livrables qui répondent à la demande du porteur du projet. Sur certains projets menés en école, la compréhension a été plus ou moins complexe, avec soit trop d’information qui perdait le groupe soit le peu d’information.

Travaillant dans la plupart du temps en agilité, nous avions des **réunions à chaque fin de sprint** avec le commanditaire afin de lui montrer l’état de notre avancée ou de redéfinir le besoin lorsque la compréhension n’était pas claire. 

Un premier projet dans lequel la compréhension du besoin a été déterminante est le **comparateur de fichiers XML**. Ce projet a été porté par les **product owners** de mon équipe. Leur besoin était de comparer des messages au format XML, générés par nos applications, afin de vérifier si les messages envoyés étaient identiques. 

Cependant, certaines balises n'étaient pas pertinentes pour la comparaison, et la solution existante ne permettait pas de les ignorer. Au départ, je n'avais pas bien compris le contexte du projet : je ne comprenais pas la logique des messages, et je ne comprenais pas pourquoi certaines balises devaient être exclues. J'ai donc **organisé des réunions avec les product owners**, qui m'ont expliqué le circuit des messages, leur rôle, et les critères qui rendaient une balise pertinente ou non. Grâce à ces échanges, j'ai pu **traduire le besoin en user stories priorisées**. Par exemple : "En tant que product owner, j'ai besoin d'exclure certaines balises de la comparaison afin de me concentrer uniquement sur les balises pertinentes." À partir de cette priorisation, j'ai structuré les sprints en intégrant en premier les fonctionnalités les plus importantes. 

Un second projet notable est la **gestion de scripts SQL**. Au sein de notre équipe, des développeurs désignés comme "référents BDD" sont responsables de l'exécution des scripts PostgreSQL et Oracle sur nos bases de données. Pour ce faire, ils utilisaient un script JavaScript qui récupérait les derniers scripts ajoutés à la branche principale du projet, puis ils extrayaient les URL GitLab associées avant de les soumettre à Jenkins pour exécution. 

Ce processus était long et peu pratique. L'objectif était de le simplifier en proposant un outil qui gère automatiquement le cycle de vie des scripts : par défaut, un script récupéré est classé comme "à traiter", puis passe à "traité" après une exécution réussie, ou à "anomalie" en cas de problème. C'est justement ce cas d'anomalie qui m'a posé des questions. J'ai organisé des réunions avec les référents BDD pour comprendre leur workflow réel lorsqu'un script échouait. 

Ces échanges m'ont permis de comprendre qu'en cas d'anomalie, le référent devait pouvoir ajouter une description explicative et que le développeur concerné devait ensuite corriger le script. J'ai traduit cela en user stories, par exemple : "En tant que référent BDD, j'ai besoin de signaler un script en anomalie et d'y ajouter une description afin que le développeur concerné puisse comprendre et corriger le problème." 


# Autocritique et évolutions
Pour un développeur, la compréhension du besoin est une chose car c’est ce qui permet de traduire la volonté du client en une solution. Grâce une bonne compréhension, on peut se **focaliser sur les choses les plus prioritaires** ce qui permet d’avancer un projet plus vite. Au départ, j’ai trouvé difficile de poser les bonnes questions afin de cerner correctement le besoin. Au fur et à mesure des projets, tout se processus s’est simplifié.

Aujourd’hui, je pense avoir un **niveau maitrisé** sur cette compétence. Pour l’évolution, ça serait de continuer à être proche des commanditaires pour livrer des livrables qui correspondent à leurs attentes. Si je devais donner un conseil, ça serait de se mettre à la place du client lorsqu’on pose des questions. Une bonne technique est de reformuler la demande avec vos propres mots. Cela permet de voir si vous avez bien compris et cela montre au client que vous avez bien compris le besoin. 

