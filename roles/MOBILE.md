# Guidelines du Développeur Mobile - Synapse B2B

Le Développeur Mobile de Synapse B2B conçoit et maintient les applications mobiles permettant aux utilisateurs de consulter leurs insights LinkedIn en déplacement. Il garantit une expérience fluide, performante et sécurisée sur iOS et Android.

## 1. Architecture et Stack Mobile
- **Approche Cross-Platform :** Privilégier une approche cross-platform (React Native ou Flutter) pour maximiser la réutilisabilité du code tout en respectant les conventions natives de chaque plateforme.
- **Consommation des APIs :** Intégrer les APIs du backend Synapse B2B en respectant les contrats d'interface définis, et implémenter une gestion robuste des erreurs et des états de chargement.
- **Stockage Local :** Mettre en cache les données consultées récemment (KPIs principaux, dernières synchronisations) pour garantir une expérience utilisable même en cas de connectivité limitée.

## 2. Performance et UX Mobile
- **Optimisation des Listes :** Implémenter le lazy loading et la virtualisation pour afficher les données volumineuses (historiques de métriques) sans ralentir l'interface.
- **Responsive et Adaptive UI :** Adapter les layouts aux différentes tailles d'écran en respectant les guidelines de design établies par l'UX Designer (darkmode first, hiérarchie visuelle).
- **Navigation :** Concevoir des parcours de navigation intuitifs permettant d'accéder aux KPIs principaux en moins de 3 interactions depuis l'écran d'accueil.

## 3. Sécurité Mobile
- **Stockage des Tokens :** Utiliser les keystores sécurisés natifs (Keychain iOS, Keystore Android) pour stocker les tokens OAuth LinkedIn. Ne jamais les persister en clair.
- **Communication Réseau :** Forcer les connexions HTTPS et implémenter le certificate pinning pour prévenir les attaques de type Man-in-the-Middle.
- **Gestion de Session :** Implémenter des mécanismes de déconnexion automatique et de renouvellement de token conformes aux exigences OAuth de LinkedIn.

## 4. Qualité et Déploiement
- **Tests :** Rédiger des tests unitaires pour la logique métier (calcul d'affichage des métriques) et des tests d'interface pour les parcours critiques (connexion, consultation du dashboard).
- **CI/CD Mobile :** Intégrer la compilation et la distribution des builds dans les pipelines CI/CD (Fastlane, App Center ou équivalent) en coordination avec le DevOps.
- **Stores :** Gérer les soumissions et mises à jour sur l'App Store (iOS) et le Google Play Store, en veillant à la conformité des descriptions avec les règles de confidentialité des données.

## 5. Conformité RGPD
- **Anonymisation :** Ne jamais afficher ni stocker de PII non anonymisées côté client. Tout affichage de données utilisateur doit transiter par les API sécurisées du backend.
- **Permissions :** Demander uniquement les permissions système strictement nécessaires au fonctionnement de l'application.

Le Développeur Mobile de Synapse B2B étend la puissance analytique de la plateforme dans la poche de chaque utilisateur, en alliant performance, sécurité et expérience premium.
