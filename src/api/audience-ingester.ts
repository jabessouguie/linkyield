/**
 * @file audience-ingester.ts
 * @description Ingestion des statistiques firmographiques des abonnés LinkedIn.
 * @version 1.0.0
 * @author Synapse B2B - Data Engineering
 */

import { LinkedInConnector } from './linkedin-connector';

export interface FirmographicSegment {
    count: number;
    entry: string; // ex: Secteur d'activité, Taille, etc.
}

export interface AudienceStats {
    organizationUrn: string;
    workspaceId: string;
    totalFollowers: number;
    netGrowth: number;
    segments: {
        industry: FirmographicSegment[];
        companySize: FirmographicSegment[];
        seniority: FirmographicSegment[];
    };
}

export class AudienceIngester {
    private connector: LinkedInConnector;

    constructor(connector: LinkedInConnector) {
        this.connector = connector;
    }

    /**
     * @method fetchAudienceMetadata
     * @description Récupère et agrège les données d'audience pour un compte.
     */
    public async fetchAudienceMetadata(organizationUrn: string, workspaceId: string): Promise<AudienceStats> {
        const encodedUrn = encodeURIComponent(organizationUrn);
        const endpoint = `/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=${encodedUrn}`;

        try {
            const rawData = await this.connector.fetch(endpoint);

            // Note: Dans une version réelle, on appellerait plusieurs endpoints 
            // ou on parserait les facettes firmographiques retournées.
            // Ici, nous simulons l'abstraction des segments.

            const total = 5000; // Mock total
            const netGrowth = 120; // Mock croissance (Nouveaux - Désabonnés)

            return {
                organizationUrn,
                workspaceId,
                totalFollowers: total,
                netGrowth: netGrowth,
                segments: {
                    industry: [
                        { count: 1500, entry: 'Information Technology' },
                        { count: 800, entry: 'Marketing' }
                    ],
                    companySize: [
                        { count: 2000, entry: '11-50 employees' },
                        { count: 500, entry: '51-200 employees' }
                    ],
                    seniority: [
                        { count: 600, entry: 'Senior' },
                        { count: 300, entry: 'Manager' }
                    ]
                }
            };
        } catch (error) {
            console.error(`[AudienceIngester] Échec de la récupération pour ${organizationUrn}`);
            throw error;
        }
    }
}
