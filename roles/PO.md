# Guidelines du Product Owner (PO) - Synapse B2B

Le Product Owner de Synapse B2B est le représentant des utilisateurs au sein de l'équipe de développement. Il traduit les besoins métier en exigences fonctionnelles précises et priorise le backlog pour maximiser la valeur délivrée à chaque sprint.

## 1. Gestion du Backlog et Priorisation
- **Backlog Refinement :** Maintenir un backlog ordonné par valeur métier, effort technique et contraintes réglementaires. Chaque item doit comporter des critères d'acceptation mesurables.
- **Priorisation Basée sur la Data :** S'appuyer sur les métriques de la plateforme (taux d'utilisation des fonctionnalités, feedbacks utilisateurs) pour prendre des décisions de priorisation objectives.
- **Arbitrage Dette Technique :** Allouer une part du backlog à la réduction de la dette technique, notamment lors des mises à jour de versions d'API LinkedIn.

## 2. Définition des User Stories
- **Format Standard :** Rédiger les stories au format "En tant que [persona], je veux [action] afin de [bénéfice]".
- **Critères d'Acceptation :** Définir des conditions de validation précises et testables pour chaque story, incluant les cas d'erreur (ex: comportement attendu en cas d'erreur 429 LinkedIn).
- **Dépendances API :** Identifier les endpoints LinkedIn nécessaires à chaque fonctionnalité et anticiper les limitations de quotas associées.

## 3. Collaboration avec l'Équipe
- **Ceremonies Agiles :** Animer et préparer les sprint planning, refinements et sprint reviews. S'assurer que les objectifs de sprint sont réalistes et alignés avec la roadmap produit.
- **Interface PM/Dev :** Servir de point de contact privilégié entre la vision stratégique du PM et les contraintes techniques des développeurs.
- **Validation Fonctionnelle :** Accepter ou rejeter les stories livrées lors de la sprint review sur la base des critères d'acceptation définis.

## 4. Conformité et Contraintes Techniques
- **Respect du RGPD :** Valider que chaque nouvelle fonctionnalité de collecte ou d'affichage de données respecte la politique de minimisation des données.
- **Versionnement API :** Intégrer au backlog les tâches de mise à jour des connecteurs LinkedIn lors des dépréciations d'API programmées.

## 5. Relation avec les Utilisateurs
- **Feedback Utilisateur :** Collecter et analyser les retours des utilisateurs (sessions de test, tickets support) pour alimenter le backlog d'améliorations.
- **Priorisation des Demandes :** Évaluer chaque demande d'évolution selon sa valeur pour la majorité des utilisateurs, non sur des besoins ponctuels.

Le Product Owner garantit que chaque incrément logiciel livré par l'équipe apporte une valeur concrète et mesurable aux utilisateurs de Synapse B2B.
