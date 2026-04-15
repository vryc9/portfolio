## Définition

NgRx est une bibliothèque de gestion d’état pour les applications Angular, basée sur le pattern Redux, qui permet de centraliser l’état de l’application dans un store.Pour faire évoluer l’état du store, NgRx embarque :

- les **actions** qui décrivent les événements ;
- les **reducers** qui calculent le nouvel état ;
- le **store** qui conserve l’état global ;
- les **selectors** qui exposent l’état aux composants ;
- les **effects** qui gèrent les effets de bord (appels HTTP, logique asynchrone).

Aujourd’hui, NgRx a évolué avec l’arrivée du **SignalStore**, qui est basé sur les signaux introduits dans la version 16 d’Angular. Les signaux permettent de gérer la réactivité beaucoup plus simplement et améliorent les performances, car Angular sait exactement quelles parties du template dépendent du signal Cependant, le SignalStore ne reprend pas directement le pattern Redux. Il existe néanmoins l’API **Events** pour le SignalStore, qui permet d’utiliser le pattern Redux au sein du SignalStore.

## Réalisations

J’ai découvert NgRx durant mon alternance en travaillant d’abord sur de petits sujets afin de prendre en main la technologie, que je n’avais jamais utilisée auparavant. Puis je suis monté en compétence en élaborant un tableau de bord pour les admissionnistes dans les CHU. NgRx m’a permis de gérer l’état global de ce tableau de bord, qui centralise plusieurs fonctionnalités.

Le tableau de bord intègre notamment un système d’alertes, permettant de notifier les admissionnistes lors d’une mise à jour de l’application ou lorsqu’un webservice est indisponible, ainsi qu’un système de mémos, comparable à des post-it, directement intégré à l’interface. Lors de la mise en place de la logique applicative, j’ai conçu l’ensemble du flux NgRx. J’ai commencé par dispatcher des actions depuis l’application, que j’ai fait écouter par des effects afin de déclencher les appels à l’API. Une fois la réponse reçue, j’ai déclenché une action de succès contenant les données retournées par l’API. Cette action est ensuite traitée par un reducer que j’ai implémenté, chargé de mettre à jour le store.

Enfin, j’ai créé des selectors pour exposer les états aux composants afin de les exploiter dans l’interface utilisateur. La mise en place du store NgRx pour la gestion des alertes a permis de concevoir une fonctionnalité réutilisable à l’échelle de l’application. Grâce à cette centralisation de l’état, le système d’alertes peut être intégré très simplement dans d’autres écrans ou modules, sans duplication de logique métier.

## Autocritique et évolutions
Je suis monté progressivement en compétence sur cette technologie. Au début, j’ai trouvé cela assez abstrait, mais à force de pratiquer, j’ai atteint un niveau avancé qui me permet d’être autonome sur les patterns fondamentaux de NgRx (Action, Reducer, Selector, Effect). Ma principale marge de progression est l’apprentissage et l’utilisation des signals stores, concept que j’ai expérimenté rapidement sur un cas simple. 

Pour moi, cette compétence est un vrai plus pour un développeur qui connaît très bien, ou qui souhaite approfondir, l’environnement Angular. Avec l’expérience que j’ai acquise, je conseille de pratiquer sur de petits projets pour se familiariser avec la technologie et monter en compétence. Cette compétence est très importante car je souhaite me spécialiser dans le développement Angular, et NgRx fait partie de son environnement. 

Pour continuer à progresser, je suis en train de développer un projet personnel de gestion et de suivi financier dans lequel j’utilise le SignalStore avec l’API Events, qui est une fonctionnalité expérimentale de NgRx. De plus, je mène une veille quotidienne sur LinkedIn et je suis abonné à la newsletter EasyAngularKit et suis la chaine Youtube Ng-conf qui poste des vidéos sur les dernières nouveautés Angular et NgRx.
