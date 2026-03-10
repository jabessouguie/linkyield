/**
 * @file hybrid-analyser.ts
 * @description Analyseur de synergie entre Page Entreprise et Profil Personnel.
 * @version 1.0.0
 * @author Synapse B2B - Senior DEV / PM
 */

export interface BrandMetrics {
    reach: number;
    engagement: number;
    followerGrowth: number;
}

export interface HybridSynergyResult {
    totalCombinedReach: number;
    synergyScore: number; // 0 à 100 (Efficacité de la cross-promotion)
    recommendation: string;
}

/**
 * @class HybridAnalyser
 * @description Calcule l'impact cumulé des dirigeants et de l'entreprise.
 */
export class HybridAnalyser {
    /**
     * @method calculateSynergy
     * @description Évalue comment le personal branding booste la page corporate.
     */
    public static calculateSynergy(corporate: BrandMetrics, personal: BrandMetrics): HybridSynergyResult {
        const totalCombinedReach = corporate.reach + personal.reach;

        // La synergie est forte si l'engagement du profil perso dépasse celui de la page 
        // tout en ramenant des followers à la page (Simulé).
        const synergyScore = Math.min(100, (personal.engagement / corporate.engagement) * 50);

        let recommendation = "Maintenez la fréquence actuelle.";
        if (synergyScore < 40) {
            recommendation = "Encouragez vos dirigeants à repartager les posts corporate avec un commentaire personnalisé.";
        } else if (synergyScore > 80) {
            recommendation = "Excellent ! Votre stratégie d'Employee Advocacy est au sommet du secteur.";
        }

        return {
            totalCombinedReach,
            synergyScore: Math.round(synergyScore),
            recommendation
        };
    }
}
