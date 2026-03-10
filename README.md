# Synapse B2B | LinkedIn Analytics High-Performance Platform

Synapse B2B est une plateforme d'analytique de pointe conçue pour extraire une valeur maximale de l'écosystème LinkedIn. Elle transforme les signaux sociaux complexes en intelligence d'entreprise exploitable pour les créateurs, les PME et les grandes entreprises B2B.

## Fonctionnalités Clés
- **Analyse de Résonance du Contenu :** Calcul du taux d'engagement ($ER$) pondéré et scoring de performance par format (carrousels, vidéos, documents).
- **Intelligence Firmographique :** Segmentation granulaire de l'audience par secteur, taille d'entreprise et niveau d'ancienneté (Privacy-by-Design).
- **Benchmarking Compétitif :** Analyse de la Part de Voix (Share of Voice) et détection de contenus viraux chez les concurrents.
- **Attribution de Revenus :** Connexion directe entre les interactions LinkedIn et le pipeline de ventes CRM (Salesforce/HubSpot).

## Architecture Technique
Le système est conçu pour la résilience et le traitement de données massives :
- **Moteur OLAP :** Utilisation de ClickHouse pour les agrégations ultra-rapides sur des millions de lignes de métriques.
- **Persistance :** PostgreSQL pour les métadonnées utilisateurs et S3 pour les fichiers JSON bruts.
- **Synchronisation Hybride :** Gestion intelligente via Webhooks et API Polling avec algorithme de Leaky Bucket pour le respect des quotas LinkedIn.
- **Mise en cache :** Couche Redis pour optimiser la latence des tableaux de bord.

## Gouvernance et Conformité
- **Minimisation des données :** Collecte limitée aux besoins analytiques stricts.
- **Anonymisation :** Hachage cryptographique des PII (données personnellement identifiables).
- **Cycle de Vie :** Politique de rétention stricte (24 mois pour les performances, suppression immédiate en fin de contrat).

## Prérequis API (Horizon 2025)
L'application nécessite l'approbation des produits suivants sur le portail développeur LinkedIn :
- Community Management API
- Organizational Entity Analytics
- Company Intelligence API (Accès 2025)

Ce projet est un rapport d'analyse systémique et de spécifications techniques pour le développement de solutions analytiques LinkedIn de nouvelle génération.