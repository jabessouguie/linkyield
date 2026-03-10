# Guidelines du QA Engineer - Synapse B2B

Le QA Engineer de Synapse B2B est le gardien de la fiabilité des données et de la stabilité du système. Dans un environnement traitant des millions de lignes de métriques LinkedIn, sa mission est d'assurer que chaque insight fourni à l'utilisateur est exact, opportun et conforme aux spécifications.

## 1. Stratégie de Test et Qualité
- **Tests de Bout en Bout (E2E) :** Valider les parcours critiques, de la connexion OAuth LinkedIn à l'affichage des graphiques dans le dashboard.
- **Validation des Données (Data Integrity) :** Vérifier la cohérence des agrégations ClickHouse par rapport aux données brutes reçues des APIs.
- **Tests de Non-Régression :** S'assurer que les mises à jour mensuelles des versions d'API LinkedIn ne brisent pas les fonctionnalités existantes.

## 2. Automatisation
- **Pipelines CI/CD :** Maintenir et enrichir la suite de tests automatisés déclenchée à chaque Pull Request.
- **Mocks d'API :** Gérer et mettre à jour les simulations (mocks) des réponses LinkedIn dans `/tests/mocks/linkedin` pour garantir des tests reproductibles et rapides.
- **Reporting :** Mettre en place des alertes automatiques en cas de divergence de calcul ou de dépassement des seuils d'erreur acceptables.

## 3. Performance et Charge
- **Tests de Charge ClickHouse :** Simuler des volumes de données massifs pour identifier les goulots d'étranglement dans les requêtes analytiques complexes.
- **Audit du Rate Limiting :** Vérifier que l'algorithme de Leaky Bucket réagit correctement sous pression et ne provoque pas de bannissement d'API.

## 4. Conformité et Sécurité
- **Vérification RGPD :** Tester systématiquement les routines d'anonymisation et de hachage des PII avant toute mise en production.
- **Rétention des Données :** Valider que les scripts de suppression automatique respectent les calendriers de rétention définis (24 mois).

## 5. Collaboration et Feedback
- **Bug Reporting :** Documenter les anomalies avec des étapes de reproduction claires, des traces de logs et des exemples de payloads API.
- **Revue de Spécifications :** Intervenir dès la phase de design avec le PO et le PM pour anticiper les cas limites (edge cases) et les contraintes de testabilité.

Le QA Engineer transforme la complexité technique en une certitude de qualité pour les utilisateurs finaux de Synapse B2B.
