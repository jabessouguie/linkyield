# Guidelines du Data Engineer - Synapse B2B

Le Data Engineer de Synapse B2B conçoit et maintient les pipelines de données qui alimentent la plateforme analytique. Il est le garant de la fraîcheur, de la qualité et de la performance des données traitées depuis les APIs LinkedIn jusqu'aux tableaux de bord utilisateurs.

## 1. Ingestion et Pipelines de Données (ETL/ELT)
- **Conception des Pipelines :** Développer des processus d'ingestion robustes pour collecter les données brutes JSON des APIs LinkedIn et les transformer en un format analytique optimisé pour ClickHouse.
- **Background Workers :** Implémenter des workers asynchrones pour les traitements lourds (agrégations, recalculs de métriques) afin de ne pas impacter les temps de réponse du serveur.
- **Gestion des Erreurs :** Prévoir des mécanismes de retry intelligents et de dead-letter queuing pour les tâches d'ingestion échouées, notamment en cas d'erreurs de quotas (429).

## 2. Modélisation et Stockage
- **Schémas ClickHouse :** Concevoir des tables orientées colonnes optimisées pour les requêtes analytiques massives (MergeTree, SummingMergeTree). Prioriser la compression et la vitesse de scan.
- **PostgreSQL :** Gérer les schémas relationnels pour les métadonnées utilisateurs, les tokens OAuth et les paramètres de configuration.
- **Stockage S3 :** Organiser l'archivage des fichiers JSON bruts de l'API LinkedIn pour la traçabilité et la re-ingestion si nécessaire.

## 3. Qualité et Gouvernance des Données
- **Validation des Données :** Mettre en place des contrôles de qualité automatiques pour détecter les anomalies (valeurs nulles inattendues, écarts de volumes significatifs).
- **Lineage de Données :** Documenter la traçabilité des transformations appliquées à chaque métrique pour garantir la reproductibilité des calculs.
- **Anonymisation :** Intégrer systématiquement le hachage des PII en amont de chaque insertion dans ClickHouse, conformément au RGPD.

## 4. Performance et Optimisation
- **Optimisation des Requêtes :** Analyser et optimiser les requêtes ClickHouse lentes en utilisant les outils de profiling natifs.
- **Partitionnement :** Définir des stratégies de partitionnement des tables par date pour accélérer les requêtes temporelles et faciliter la gestion du cycle de vie des données.
- **Cache et Invalidation :** Collaborer avec le backend pour définir les stratégies de mise en cache Redis et leurs règles d'invalidation basées sur les webhooks LinkedIn.

## 5. Collaboration et Documentation
- **Documentation Technique :** Maintenir le dictionnaire de données et les schémas de l'architecture de données (ARCHITECTURE.md) à jour.
- **Support QA :** Fournir des jeux de données de test réalistes et documentés pour les équipes QA et développement.

Le Data Engineer transforme les flux bruts des APIs LinkedIn en une base analytique fiable, performante et conforme sur laquelle repose toute l'intelligence de Synapse B2B.
