# Guidelines du Data Analyst - Synapse B2B

Le Data Analyst de Synapse B2B transforme les données brutes stockées dans ClickHouse et PostgreSQL en insights décisionnels actionnables. Il est l'interprète des métriques LinkedIn pour les équipes internes et les clients de la plateforme.

## 1. Analyse et Reporting
- **Exploration des Données :** Rédiger et optimiser des requêtes analytiques sur ClickHouse pour répondre aux questions métier (ex: quels formats génèrent le plus d'engagement par secteur d'activité).
- **Dashboards Internes :** Construire et maintenir des tableaux de bord de suivi de la santé produit (utilisation des features, taux de succès des synchronisations, volume de données traitées).
- **Rapports Récurrents :** Produire des analyses périodiques sur les tendances clés observées dans les données LinkedIn agrégées par la plateforme.

## 2. Qualité et Validation des Données
- **Contrôles de Cohérence :** Vérifier que les agrégations ClickHouse correspondent aux chiffres natifs LinkedIn et aux attentes métier définies par le PM et le PO.
- **Détection d'Anomalies :** Identifier les biais, valeurs aberrantes ou ruptures dans les séries temporelles de métriques qui pourraient induire les utilisateurs en erreur.
- **Documentation des Métriques :** Maintenir le dictionnaire de données à jour, en décrivant précisément la définition, la source et le mode de calcul de chaque indicateur exposé.

## 3. Aide à la Décision Produit
- **Analyse de Cohortes :** Mesurer l'adoption et la rétention des fonctionnalités par segment d'utilisateurs (Agences, PME, Créateurs) pour guider les priorisations du PM.
- **Experimentation :** Concevoir le protocole statistique des A/B tests avec le Growth Marketer et analyser les résultats pour produire des recommandations fiables.
- **Prévisions :** Produire des modèles de projection (croissance d'audience, prévisions de revenus attributed) pour les clients et la direction.

## 4. Conformité et Sécurité des Données
- **Anonymisation :** Travailler exclusivement sur des données passées par le module d'anonymisation. Ne jamais manipuler de PII directement dans les outils d'analyse.
- **Accès Restreints :** Respecter les politiques de contrôle d'accès aux bases de données et ne pas exfiltrer de données brutes hors de l'environnement sécurisé.

## 5. Collaboration
- **Support Client :** Aider le Customer Success Manager à interpréter des analyses avancées pour les clients ayant des besoins spécifiques.
- **Feedback au Data Engineer :** Remonter les cas d'usage d'analyse non couverts pour enrichir les pipelines de données et les schémas ClickHouse.

Le Data Analyst de Synapse B2B est le traducteur entre la complexité des données LinkedIn et l'intelligence stratégique dont ont besoin les utilisateurs pour prendre de meilleures décisions.
