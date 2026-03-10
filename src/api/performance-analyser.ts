/**
 * @file performance-analyser.ts
 * @description Calculateur de métriques de performance avancées (Score de Résonance, Viralité).
 * @version 1.0.0
 * @author Synapse B2B - Data Science
 */

export interface RawMetrics {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    impressions: number;
}

export interface PerformanceInsights {
    engagementRate: number;
    resonanceScore: number;
    isViral: boolean;
}

/**
 * @class PerformanceAnalyser
 * @description Centralise les algorithmes de calcul de performance pour le contenu LinkedIn.
 */
export class PerformanceAnalyser {
    // Pondérations définies par la stratégie produit (Phase 3)
    private static readonly WEIGHTS = {
        LIKE: 1,
        CLICK: 1,
        COMMENT: 3,  // Engagement plus profond
        SHARE: 5     // Engagement maximal (amplification)
    };

    /**
     * @method calculateEngagementRate
     * @description Calcule le taux d'engagement standard (ER).
     */
    public static calculateEngagementRate(metrics: RawMetrics): number {
        if (metrics.impressions === 0) return 0;
        const totalInteractions = metrics.likes + metrics.comments + metrics.shares + metrics.clicks;
        return (totalInteractions / metrics.impressions) * 100;
    }

    /**
     * @method calculateResonanceScore
     * @description Calcule un score pondéré reflétant la profondeur de l'engagement.
     */
    public static calculateResonanceScore(metrics: RawMetrics): number {
        const score = (metrics.likes * this.WEIGHTS.LIKE) +
            (metrics.clicks * this.WEIGHTS.CLICK) +
            (metrics.comments * this.WEIGHTS.COMMENT) +
            (metrics.shares * this.WEIGHTS.SHARE);
        return score;
    }

    /**
     * @method analyze
     * @description Analyse complète d'un post par rapport à une moyenne historique.
     * @param {RawMetrics} currentMetrics - Métriques du post actuel.
     * @param {number} averageEr - Taux d'engagement moyen du compte (benchmark).
     */
    public static analyze(currentMetrics: RawMetrics, averageEr: number = 0): PerformanceInsights {
        const er = this.calculateEngagementRate(currentMetrics);
        const resonance = this.calculateResonanceScore(currentMetrics);

        // Détection de viralité : +200% par rapport à la moyenne
        const isViral = averageEr > 0 && er >= (averageEr * 3); // x3 = +200% d'augmentation

        return {
            engagementRate: Math.round(er * 100) / 100,
            resonanceScore: resonance,
            isViral: isViral
        };
    }
}
