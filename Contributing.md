# Guide de Contribution - Synapse B2B

Merci de l'intérêt que vous portez à Synapse B2B. Pour maintenir la qualité du code et la fiabilité des analyses de données, nous vous prions de suivre ces directives.

## Code de Conduite
En participant à ce projet, vous vous engagez à maintenir un environnement professionnel, inclusif et respectueux de la confidentialité des données traitées.

## Environnement de Développement
**Stack Technique :**
- Backend : Node.js (TypeScript) ou Python (FastAPI).
- Data : ClickHouse (Analytique) & PostgreSQL (Relationnel).
- Cache : Redis.

**Standard de Code :**
- Utilisez TypeScript pour tout nouveau module backend afin de garantir la sécurité des types.
- Documentation JSDoc/Docstrings obligatoire pour chaque fonction exportée.

## Workflow Git
Nous utilisons le modèle Git Flow :
- main : Branche stable de production.
- develop : Branche d'intégration pour les fonctionnalités en cours.
- feature/nom-de-la-feature : Pour les nouveaux développements.

**Processus de Pull Request (PR)**
- Créez une branche à partir de develop.
- Assurez-vous que vos tests unitaires passent.
- Décrivez précisément les changements et l'impact sur les quotas d'API.
- Une revue par au moins un mainteneur est nécessaire avant la fusion.

## Règles Spécifiques aux APIs LinkedIn
Toute modification touchant aux connecteurs LinkedIn doit respecter les règles suivantes :

### 1. Versionnement
Chaque appel doit explicitement inclure l'en-tête Linkedin-Version.
Exemple : `Linkedin-Version: 202502`

### 2. Gestion des Quotas (Rate Limiting)
Ne faites jamais d'appels API en boucle sans implémenter l'algorithme de Leaky Bucket fourni dans le module `/core/limiter`.
Utilisez systématiquement la couche de cache Redis pour les données récupérées il y a moins de 15 minutes.

### 3. Respect du RGPD
Ne loguez jamais de données personnelles (PII) dans la console ou dans les fichiers de log.
Toute nouvelle métrique collectée doit passer par le module d'anonymisation avant d'être persistée dans ClickHouse.

## Tests
Les tests de performance sont requis pour toute nouvelle requête complexe sur ClickHouse.
Les mocks d'API doivent être mis à jour dans le dossier `/tests/mocks/linkedin`.

## Sécurité
Si vous découvrez une faille de sécurité, merci de ne pas ouvrir de ticket public. Envoyez un rapport détaillé à security@synapse-b2b.io.

Ce document évolue avec le projet. N'hésitez pas à suggérer des améliorations.