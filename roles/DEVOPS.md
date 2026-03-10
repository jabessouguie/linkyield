# Guidelines du DevOps Engineer - Synapse B2B

Le DevOps Engineer de Synapse B2B est le garant de la disponibilité, de la scalabilité et de la sécurité de l'infrastructure. Il assure la fluidité du cycle de vie des développements (CI/CD) et l'intégrité des flux de données massifs entre les APIs LinkedIn, Redis, PostgreSQL et ClickHouse.

## 1. Infrastructure et Automatisation (IaC)
- **Infrastructure-as-Code :** Définir et maintenir l'infrastructure via Terraform/Ansible pour garantir des environnements reproductibles (Staging, Production).
- **Conteneurisation :** Gérer et optimiser les images Docker pour les services Node.js, ClickHouse et les workers de fond.
- **Orchestration :** Superviser le déploiement et l'autoscaling des services pour absorber les pics de charge lors des synchronisations massives de données.

## 2. CI/CD et Déploiement
- **Pipelines de Livraison :** Concevoir des pipelines automatisés intégrant les tests unitaires, d'intégration (QA) et les scans de sécurité à chaque commit.
- **Stratégie de Déploiement :** Mettre en œuvre des stratégies (Blue-Green/Canary) pour minimiser les interruptions de service lors des mises à jour applicatives.
- **Gestion des Secrets :** Assurer la rotation et le stockage sécurisé des clés API LinkedIn, des tokens OAuth et des identifiants de base de données.

## 3. Observabilité et Performance
- **Monitoring et Alerting :** Configurer des tableaux de bord (Grafana/Prometheus) pour surveiller la santé des instances ClickHouse et le débit des workers.
- **Analyse des Logs :** Centraliser et analyser les logs applicatifs tout en veillant à l'absence de données personnelles (PII), conformément au RGPD.
- **Diagnostic API :** Surveiller les latences des appels LinkedIn et les erreurs de quotas pour ajuster dynamiquement les paramètres du Rate Limiter.

## 4. Sécurité et Résilience
- **Sécurité Réseau :** Configurer les pare-feux (VPC) et les accès restreints aux bases de données pour protéger les données confidentielles.
- **Sauvegarde et DR :** Garantir la mise en place de politiques de sauvegarde régulières et tester les plans de reprise d'activité (Disaster Recovery).
- **Hardening :** Appliquer les patches de sécurité système et applicatifs pour prévenir toute vulnérabilité.

## 5. Culture et Collaboration
- **Support aux Développeurs :** Fournir des outils et des environnements de développement optimisés pour réduire le "Time-to-Market".
- **Optimisation des Coûts :** Surveiller et optimiser l'utilisation des ressources cloud (Calcul, Stockage S3, ClickHouse) par rapport aux besoins réels.

Le DevOps Engineer transforme les contraintes d'infrastructure en un avantage compétitif de stabilité et de rapidité pour Synapse B2B.
