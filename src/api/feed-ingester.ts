/**
 * @file feed-ingester.ts
 * @description Ingestion et transformation des statistiques de posts LinkedIn (Feed) vers le format ClickHouse.
 * @version 1.0.0
 * @author Synapse B2B - Data Engineering
 */

import { LinkedInConnector } from './linkedin-connector';
import { PerformanceAnalyser } from './performance-analyser';

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
    resonance_score: number;
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

            // Transformation des données via PerformanceAnalyser
            const metrics: ClickHousePostMetric[] = rawData.elements.map(element => {
                const stats = element.shareStatistics;

                const raw = {
                    likes: stats.likeCount,
                    comments: stats.commentCount,
                    shares: stats.shareCount,
                    clicks: stats.clickCount,
                    impressions: stats.uniqueImpressionsCount
                };

                const analysis = PerformanceAnalyser.analyze(raw);

                return {
                    post_urn: element.share,
                    account_urn: element.organizationalEntity,
                    post_type: 'unknown',
                    published_date: new Date(),

                    impressions: stats.uniqueImpressionsCount,
                    reach: stats.uniqueImpressionsCount,

                    likes: stats.likeCount,
                    comments: stats.commentCount,
                    shares: stats.shareCount,
                    clicks: stats.clickCount,

                    engagement_rate: analysis.engagementRate,
                    resonance_score: analysis.resonanceScore
                };
            });

            return metrics;
        } catch (error) {
            console.error(`[FeedIngester] Échec de l'ingestion pour ${organizationUrn}`);
            throw error;
        }
    }
}
