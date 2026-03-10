/**
 * @file feed-ingester.ts
 * @description Ingestion et transformation des statistiques de posts LinkedIn (Feed) vers le format ClickHouse.
 * @version 1.0.0
 * @author Synapse B2B - Data Engineering
 */

import { LinkedInConnector } from './linkedin-connector';

// Types d'entrée (Basés sur la réponse de l'API LinkedIn)
export interface LinkedInShareStatistic {
    shareCount: number;
    engagement: number;
    clickCount: number;
    likeCount: number;
    uniqueImpressionsCount: number;
    commentCount: number;
}

export interface LinkedInShareElement {
    organizationalEntity: string;
    share: string;
    shareStatistics: LinkedInShareStatistic;
}

export interface LinkedInShareResponse {
    elements: LinkedInShareElement[];
    paging: {
        count: number;
        start: number;
    };
}

// Type de sortie (Aligné avec le schéma ClickHouse post_metrics)
export interface ClickHousePostMetric {
    post_urn: string;
    account_urn: string;
    post_type: string;
    published_date: Date; // A enrichir plus tard avec un autre appel API (UGC)

    impressions: number;
    reach: number;

    likes: number;
    comments: number;
    shares: number;
    clicks: number;

    engagement_rate: number;
}

export class FeedIngester {
    private connector: LinkedInConnector;

    constructor(connector: LinkedInConnector) {
        this.connector = connector;
    }

    /**
     * @method fetchAndTransform
     * @description Récupère les métriques depuis LinkedIn et les transforme.
     * @param {string} organizationUrn - L'URN de l'organisation LinkedIn
     * @returns {Promise<ClickHousePostMetric[]>}
     */
    public async fetchAndTransform(organizationUrn: string): Promise<ClickHousePostMetric[]> {
        // Encodage de l'URN obligatoire pour l'API LinkedIn
        const encodedUrn = encodeURIComponent(organizationUrn);
        const endpoint = `/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${encodedUrn}`;

        try {
            // Récupération des données brutes
            const rawData: LinkedInShareResponse = await this.connector.fetch(endpoint);

            // Transformation des données (ELT : Extraction, Chargement, Transformation)
            const metrics: ClickHousePostMetric[] = rawData.elements.map(element => {
                const stats = element.shareStatistics;

                // Recalcul de l'Engagement Rate (Synapse Custom Formula vs LinkedIn native)
                // Formule standard: ((Likes + Comments + Shares + Clicks) / Impressions) * 100
                const interactions = stats.likeCount + stats.commentCount + stats.shareCount + stats.clickCount;
                const calculatedEr = stats.uniqueImpressionsCount > 0
                    ? (interactions / stats.uniqueImpressionsCount) * 100
                    : 0;

                return {
                    post_urn: element.share,
                    account_urn: element.organizationalEntity,
                    post_type: 'unknown', // Reste "unknown" jusqu'à enrichissement via UGC API
                    published_date: new Date(), // Temporaire en attendant la metadata

                    impressions: stats.uniqueImpressionsCount, // LinkedIn confond souvent portée et impression dans cet endpoint
                    reach: stats.uniqueImpressionsCount,

                    likes: stats.likeCount,
                    comments: stats.commentCount,
                    shares: stats.shareCount,
                    clicks: stats.clickCount,

                    engagement_rate: Math.round(calculatedEr * 100) / 100 // Arrondi 2 décimales
                };
            });

            return metrics;
        } catch (error) {
            console.error(`[FeedIngester] Échec de l'ingestion pour ${organizationUrn}`);
            throw error;
        }
    }
}
