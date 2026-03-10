# Guidelines du Prompt Engineer - Synapse B2B

Le Prompt Engineer de Synapse B2B conçoit, teste et optimise les instructions transmises aux Large Language Models (LLMs) qui alimentent les fonctionnalités d'intelligence artificielle de la plateforme. Il garantit la pertinence, la fiabilité et la conformité des sorties générées par l'IA à partir des données LinkedIn.

## 1. Conception et Ingénierie des Prompts
- **Structuration des Instructions :** Rédiger des prompts clairs, précis et sans ambiguïté pour guider le LLM dans des tâches analytiques spécifiques (génération d'insights, résumés de performance, recommandations de contenu).
- **Contextualisation :** Intégrer dans chaque prompt le contexte métier pertinent (type de compte LinkedIn, secteur d'activité, objectifs de la requête) pour obtenir des sorties personnalisées et actionnables.
- **Gestion du Format de Sortie :** Définir explicitement le format des réponses attendues (JSON structuré, listes à puces, rapports narratifs) pour faciliter leur intégration dans les interfaces utilisateurs.

## 2. Optimisation et Évaluation
- **Benchmarking des Prompts :** Comparer systématiquement plusieurs variantes de prompts sur un jeu de cas de test représentatifs pour sélectionner objectivement la formulation la plus performante.
- **Réduction des Hallucinations :** Mettre en oeuvre des techniques de grounding (ancrage sur les données réelles fournies) et de validation de la cohérence des sorties pour minimiser les réponses incorrectes ou inventées.
- **Gestion des Tokens :** Optimiser la longueur des prompts pour maîtriser les coûts d'appels API aux modèles de langage tout en maintenant la qualité des résultats.

## 3. Intégration et Collaboration Technique
- **Documentation des Prompts :** Versionner et documenter chaque prompt en production avec son contexte d'usage, ses paramètres (température, max_tokens) et ses critères d'évaluation.
- **Collaboration avec le DEV :** Définir avec les développeurs backend les interfaces d'injection de contexte dynamique (données analytiques, paramètres utilisateurs) dans les templates de prompts.
- **Tests de Non-Régression :** Maintenir une suite de tests automatisés validant que les modifications de prompts n'altèrent pas la qualité des réponses sur les cas d'usage existants.

## 4. Conformité et Sécurité
- **Injection de Prompt :** Anticiper et prévenir les risques de Prompt Injection, notamment dans les scénarios où des données externes (bio LinkedIn, commentaires) sont incluses dans les prompts.
- **Protection des PII :** S'assurer qu'aucune donnée personnelle identifiable en clair n'est transmise aux LLMs externes. Travailler avec le Data Engineer pour anonymiser les données avant injection.
- **Audit des Sorties :** Mettre en place des mécanismes de modération et de filtrage des sorties générées pour garantir leur conformité avec les politiques d'usage acceptable.

## 5. Veille et Innovation
- **Suivi des Modèles :** Surveiller les évolutions des LLMs disponibles (nouvelles versions, nouveaux modèles) et évaluer leur pertinence pour les cas d'usage de Synapse B2B.
- **Techniques Avancées :** Explorer les techniques d'ingénierie de prompts avancées (Chain-of-Thought, Few-Shot Learning, RAG) pour améliorer la profondeur des analyses générées.

Le Prompt Engineer de Synapse B2B transforme les capacités brutes des LLMs en un moteur d'intelligence analytique fiable, sécurisé et parfaitement aligné avec les besoins des utilisateurs B2B.
