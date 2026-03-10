/**
 * @file competitor-tracker.ts
 * @description Analyseur de performance comparative et calcul de la Part de Voix (SOV).
 * @version 1.0.0
 * @author Synapse B2B - Market Intelligence
 */

import { LinkedInConnector } from './linkedin-connector';

export interface CompetitorStats {
    competitorUrn: string;
    totalPublicEngagements: number;
}

export interface ShareOfVoiceResult {
    myShare: number;
    competitors: { urn: string; share: number }[];
}

export class CompetitorTracker {
    private connector: LinkedInConnector;

    constructor(connector: LinkedInConnector) {
        this.connector = connector;
    }

    /**
     * @method calculateShareOfVoice
     * @description Calcule la part d'engagement relatif au sein d'un groupe de référence.
     * @param {number} myEngagements - Engagements totaux de ma page.
     * @param {CompetitorStats[]} competitors - Statistiques des concurrents.
     */
    public static calculateShareOfVoice(myEngagements: number, competitors: CompetitorStats[]): ShareOfVoiceResult {
        const totalMarketEngagement = myEngagements + competitors.reduce((sum, c) => sum + c.totalPublicEngagements, 0);

        if (totalMarketEngagement === 0) return { myShare: 0, competitors: [] };

        const myShare = (myEngagements / totalMarketEngagement) * 100;
        const competitorShares = competitors.map(c => ({
            urn: c.competitorUrn,
            share: (c.totalPublicEngagements / totalMarketEngagement) * 100
        }));

        return {
            myShare: Math.round(myShare * 100) / 100,
            competitors: competitorShares.map(c => ({ ...c, share: Math.round(c.share * 100) / 100 }))
        };
    }

    /**
     * @method fetchCompetitorEngagements
     * @description Récupère les métriques publiques (simulé via API).
     */
    public async fetchCompetitorEngagements(competitorUrns: string[]): Promise<CompetitorStats[]> {
        // En 2025, LinkedIn restreint l'accès aux pages tiers via l'API "Company Intelligence"
        // Nous simulons ici la récupération agrégée.
        return competitorUrns.map(urn => ({
            competitorUrn: urn,
            totalPublicEngagements: Math.floor(Math.random() * 1000)
        }));
    }
}
