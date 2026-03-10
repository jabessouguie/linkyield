# Plan de Développement - Synapse B2B

Ce document suit les spécifications du rapport d'analyse systémique et les directives du `Contributing.md`.

## Phase 1 : Infrastructure de Base (DevOps & Backend)
- [ ] Initialiser le projet Node.js/TypeScript.
- [ ] Configurer ClickHouse et PostgreSQL (Docker Compose).
- [x] Implémenter le `core/limiter/leaky-bucket.ts` pour la gestion des quotas LinkedIn.
- [x] Créer le connecteur API de base avec gestion du header `Linkedin-Version`.

## Phase 2 : Collecte et Ingestion (Data Engineer)
- [x] Créer les schémas ClickHouse pour l'analyse de performance.
- [x] Développer le module d'ingestion des posts (Feed).
- [x] Implémenter les mocks d'API dans `tests/mocks/linkedin/`.

## Phase 3 : Analyse de Performance (Fonctionnalité 1)
- [x] Calcul du Score de Résonance (Pondération interactions).
- [x] Calcul du Taux d'Engagement ($ER$).
- [x] Détection automatique des contenus viraux (+200%).

## Phase 4 : Audience et Segmentation (Fonctionnalité 2)
- [x] Module d'anonymisation des PII.
- [x] Ingestion des statistiques firmographiques (Secteur, Taille, etc.).
- [x] Calcul de la croissance nette d'abonnés.

## Phase 5 : Benchmarking (Fonctionnalité 3)
- [x] Tracking des pages concurrentes (Social Listening).
- [x] Calcul de la Part de Voix (Share of Voice).

## Phase 6 : Interface et Visualisation (UX & Mobile)
- [x] Dashboard Principal (Heatmaps, Bubble Charts).
- [x] Application Mobile (iOS/Android) - (Layout Responsive).

## Phase 7 : Intelligence IA (Fonctionnalité 4)
- [x] Moteur de recommandation stratégique (`InsightGenerator`).
- [x] Templates de prompts personnalisés par secteur d'activité.

## Phase 8 : Résilience (Backend Avancé)
- [x] Gestionnaire de cache Redis (`core/cache/`).
- [x] Traitement asynchrone des Webhooks LinkedIn.

## Phase 9 : Revenus et ROI (CFO & BIZ_DEV)
- [x] Calcul de l'Attribution de Revenu (ROI estimé).
- [x] Pipeline d'ingestion des MQLs/SQLs (Simulé).
- [x] Dashboard financier (Cout par Engagement - CPE).

## Phase 10 : Automation et Reporting (PM & UX)
- [x] Générateur de rapports PDF/Email "Marque Blanche".
- [x] Système de planification d'exports automatiques.

## Phase 11 : Gouvernance et Légal (LEGAL & DATA)
- [x] Audit Log d'accès aux données PII.
- [x] Routine de suppression automatique (Droit à l'oubli).
- [x] Consent Manager (Simulé).

## Phase 12 : Intelligence Prédictive (DATA_ANALYST)
- [x] Détection d'anomalies (Chutes de portées inhabituelles).
- [x] Prédiction de la performance d'un post (Scoring pré-publication).

## Phase 13 : Multi-Ténance & SaaS Scaling (CFO / PO)
- [x] Isolation des données par Workspace ID (SQL & OLAP).
- [x] Système d'invitation et rôles d'équipe (Admin, Analyst, Viewer).

## Phase 14 : Intégration CRM (BIZ_DEV)
- [x] Synchronisation vers HubSpot/Salesforce.
- [x] Lead Scoring basé sur l'engagement LinkedIn.

## Phase 15 : Social Listening Sectoriel (DATA_ANALYST)
- [x] Analyse de sentiment sur les marchés cibles.
- [x] Pipeline de veille sur les thématiques Trending.

## Phase 16 : Dashboard Hybride (Personal Branding vs Corporate)
- [/] Unification des métriques RH / Dirigeants / Pages.
- [ ] Algorithme de synergie de marque (Cross-Promotion).
