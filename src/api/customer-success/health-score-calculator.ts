/**
 * @file health-score-calculator.ts
 * @description Calculateur de score de santé client basé sur l'activité et l'engagement.
 * @version 1.0.0
 * @author Synapse B2B - Customer Success & Data Analyst
 */

export interface UserActivityMetrics {
    lastLoginDays: number;
    dashboardsViewed: number;
    exportsGenerated: number;
    sentimentScore: number; // 0 à 100 (via Gemini)
}

/**
 * @class HealthScoreCalculator
 * @description Évalue la probabilité de rétention d'un espace de travail.
 */
export class HealthScoreCalculator {
    /**
     * @method calculateScore
     * @description Retourne un score de 0 à 100. < 30 = Risque de churn élevé.
     */
    public calculateScore(metrics: UserActivityMetrics): number {
        console.log(`[CS Algo] Analyse de la santé pour l'utilisateur...`);

        let score = 50; // Base

        // Bonus/Malus Activité
        if (metrics.lastLoginDays <= 2) score += 20;
        if (metrics.lastLoginDays > 7) score -= 30;

        score += Math.min(20, metrics.dashboardsViewed * 2);
        score += Math.min(10, metrics.exportsGenerated * 5);

        // Pondération Sentiment
        score = (score * 0.7) + (metrics.sentimentScore * 0.3);

        return Math.max(0, Math.min(100, Math.round(score)));
    }
}
