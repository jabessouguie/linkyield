/**
 * @file roi-analyser.ts
 * @description Calculateur de retour sur investissement (ROI) et d'attribution de revenus.
 * @version 1.0.0
 * @author Synapse B2B - CFO & Business Intelligence
 */

export interface FinancialMetrics {
    engagementCount: number;
    estimatedCpe: number; // Cost Per Engagement (CPE)
    conversionRate: number; // Taux de conversion Engagement -> MQL (%)
    mqlValue: number; // Valeur monétaire d'un MQL (€)
}

export interface RoiInsights {
    totalEstimatedValue: number;
    costPerEngagement: number;
    roiPercentage: number;
}

/**
 * @class RoiAnalyser
 * @description Centralise les calculs financiers liés à la performance marketing.
 */
export class RoiAnalyser {
    /**
     * @method calculateEstimatedValue
     * @description Calcule la valeur monétaire générée estimée.
     */
    public static calculateEstimatedValue(metrics: FinancialMetrics): number {
        const totalConversions = (metrics.engagementCount * metrics.conversionRate) / 100;
        return totalConversions * metrics.mqlValue;
    }

    /**
     * @method calculateRoi
     * @description Calcule le ROI simple : ((Valeur - Coût) / Coût) * 100.
     * @param {number} generatedValue - Valeur générée calculée.
     * @param {number} spentAmount - Budget dépensé.
     */
    public static calculateRoi(generatedValue: number, spentAmount: number): number {
        if (spentAmount <= 0) return 0;
        return ((generatedValue - spentAmount) / spentAmount) * 100;
    }

    /**
     * @method analyze
     * @description Analyse financière complète d'une campagne ou d'une période.
     */
    public static analyze(metrics: FinancialMetrics, budget: number): RoiInsights {
        const value = this.calculateEstimatedValue(metrics);
        const roi = this.calculateRoi(value, budget);
        const cpe = budget > 0 ? budget / metrics.engagementCount : 0;

        return {
            totalEstimatedValue: Math.round(value * 100) / 100,
            costPerEngagement: Math.round(cpe * 100) / 100,
            roiPercentage: Math.round(roi * 100) / 100
        };
    }
}
