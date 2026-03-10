/**
 * @file benchmarking-service.ts
 * @description Service de comparaison des performances du workspace avec les standards du marché.
 * @version 1.0.0
 * @author Synapse B2B - Data Analyst & PM
 */

export interface IndustryBenchmarks {
    industry: string;
    avgEngagementRate: number;
    avgReachPerPost: number;
    topPerformersGrowth: number;
}

/**
 * @class BenchmarkingService
 * @description Analyse le décalage entre les performances réelles et les moyennes sectorielles.
 */
export class BenchmarkingService {
    /**
     * @method comparePerformance
     * @description Compare les métriques actuelles d'un workspace avec son secteur de référence.
     */
    public async comparePerformance(workspaceId: string, currentRate: number, industry: string): Promise<{ percentDiff: number; recommendation: string }> {
        console.log(`[Benchmarking] Analyse comparative pour ${workspaceId} dans le secteur ${industry}...`);

        // Simulation de récupération des benchmarks sectoriels (via ClickHouse Aggregations)
        const industryAverage = 3.5; // Exemple : 3.5% de taux d'engagement moyen

        const diff = ((currentRate - industryAverage) / industryAverage) * 100;

        let recommendation = "Vos performances sont alignées sur la moyenne du secteur.";
        if (diff > 15) recommendation = "Exceptionnel ! Vous surperformez la moyenne sectorielle.";
        if (diff < -15) recommendation = "Opportunité d'optimisation : Vos contenus sous-performent par rapport au secteur.";

        return {
            percentDiff: parseFloat(diff.toFixed(2)),
            recommendation
        };
    }
}
