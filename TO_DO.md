# Plan de Développement - Synapse B2B

Ce document suit les spécifications du rapport d'analyse systémique et les directives du `Contributing.md`.

## Phase 1 : Infrastructure de Base (DevOps & Backend)
- [ ] Initialiser le projet Node.js/TypeScript.
- [ ] Configurer ClickHouse et PostgreSQL (Docker Compose).
- [x] Implémenter le `core/limiter/leaky-bucket.ts` pour la gestion des quotas LinkedIn.
- [x] Créer le connecteur API de base avec gestion du header `Linkedin-Version`.

## Phase 2 : Collecte et Ingestion (Data Engineer)
- [ ] Créer les schémas ClickHouse pour l'analyse de performance.
- [ ] Développer le module d'ingestion des posts (Feed).
- [ ] Implémenter les mocks d'API dans `tests/mocks/linkedin/`.

## Phase 3 : Analyse de Performance (Fonctionnalité 1)
- [ ] Calcul du Score de Résonance (Pondération interactions).
- [ ] Calcul du Taux d'Engagement ($ER$).
- [ ] Détection automatique des contenus viraux (+200%).

## Phase 4 : Audience et Segmentation (Fonctionnalité 2)
- [ ] Module d'anonymisation des PII.
- [ ] Ingestion des statistiques firmographiques (Secteur, Taille, etc.).
- [ ] Calcul de la croissance nette d'abonnés.

## Phase 5 : Benchmarking (Fonctionnalité 3)
- [ ] Tracking des pages concurrentes (Social Listening).
- [ ] Calcul de la Part de Voix (Share of Voice).

## Phase 6 : Interface et Visualisation (UX & Mobile)
- [ ] Dashboard Principal (Heatmaps, Bubble Charts).
- [ ] Application Mobile (iOS/Android).
