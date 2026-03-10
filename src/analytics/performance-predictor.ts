/**
 * @file performance-predictor.ts
 * @description Simulateur de performance pré-publication utilisant des modèles heuristiques.
 * @version 1.0.0
 * @author Synapse B2B - Data Analyst
 */

export interface PostComposition {
    contentType: 'video' | 'image' | 'text' | 'carousel';
    length: number; // Nombre de caractères
    hasExternalLink: boolean;
    publishHour: number; // 0-23
}

/**
 * @class PerformancePredictor
 * @description Estime le succès potentiel d'un contenu avant sa mise en ligne.
 */
export class PerformancePredictor {
    /**
     * @method predictScore
     * @description Retourne un score de 0 à 100 basé sur les meilleures pratiques observées.
     */
    public static predictScore(composition: PostComposition): number {
        let score = 50;

        // Bonus pour le contenu visuel riche (Data-driven insight)
        if (composition.contentType === 'carousel') score += 20;
        if (composition.contentType === 'video') score += 15;

        // Malus pour les liens externes (Algorithme LinkedIn "Penalization")
        if (composition.hasExternalLink) score -= 15;

        // Bonus pour les heures de pointe B2B
        if (composition.publishHour >= 8 && composition.publishHour <= 10) score += 10;

        return Math.min(100, Math.max(0, score));
    }
}
