/**
 * @file churn-detector.ts
 * @description Moteur de détection prédictive de la baisse d'engagement (Churn) des utilisateurs.
 * @version 1.0.0
 * @author Synapse B2B - Data Analyst & CS
 */

export interface EngagementTrend {
    workspaceId: string;
    historicalAverage: number;
    currentPeriodEngagement: number;
    lastActivityDate: Date;
}

export interface ChurnAlert {
    workspaceId: string;
    riskScore: number; // 0 à 100
    alertLevel: 'low' | 'medium' | 'high';
    suggestedAction: string;
}

/**
 * @class ChurnDetector
 * @description Analyse les tendances de données pour identifier les comptes à risque.
 */
export class ChurnDetector {
    /**
     * @method analyzeRisk
     * @description Évalue le risque de churn basé sur la comparaison de l'engagement actuel vs historique.
     */
    public analyzeRisk(trend: EngagementTrend): ChurnAlert {
        const dropRatio = (trend.historicalAverage - trend.currentPeriodEngagement) / trend.historicalAverage;

        // Risque élevé si baisse > 40% ou inactivité > 15 jours
        const daysSinceLastActivity = Math.floor((new Date().getTime() - trend.lastActivityDate.getTime()) / (1000 * 3600 * 24));

        let riskScore = Math.max(0, dropRatio * 100);
        if (daysSinceLastActivity > 7) riskScore += (daysSinceLastActivity - 7) * 5;

        riskScore = Math.min(100, Math.round(riskScore));

        let alertLevel: 'low' | 'medium' | 'high' = 'low';
        let suggestedAction = "RAS. Le compte est en bonne santé.";

        if (riskScore > 70) {
            alertLevel = 'high';
            suggestedAction = "Contact urgent requis. Proposer un meeting stratégique.";
        } else if (riskScore > 30) {
            alertLevel = 'medium';
            suggestedAction = "Envoyer une newsletter de meilleures pratiques ou un insight IA exclusif.";
        }

        return {
            workspaceId: trend.workspaceId,
            riskScore,
            alertLevel,
            suggestedAction
        };
    }
}
