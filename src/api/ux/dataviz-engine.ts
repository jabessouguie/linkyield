/**
 * @file dataviz-engine.ts
 * @description Moteur de rendu des graphiques avancés "Data-to-Action".
 * @version 1.0.0
 * @author Synapse B2B - UX & Data Analyst
 */

export interface ChartDataPoint {
    label: string;
    value: number;
    trend: number; // Pourcentage vs N-1
}

/**
 * @class DataVizEngine
 * @description Transforme les métriques brutes en récits visuels exploitables.
 */
export class DataVizEngine {
    /**
     * @method renderHeatmap
     * @description Prépare les données pour une heatmap d'engagement (Heure vs Jour).
     */
    public renderEngagementHeatmap(data: any[]): string {
        console.log(`[DataViz] Génération de la Heatmap d'engagement...`);
        // Logique de transformation pour librairie type Chart.js / D3
        return 'heatmap_config_json';
    }

    /**
     * @method applyRuleOf30s
     * @description Extrait l'insight principal sous forme textuelle pour lecture en <30s.
     */
    public async extractQuickInsight(metrics: ChartDataPoint[]): Promise<string> {
        const top = metrics.reduce((prev, current) => (prev.value > current.value) ? prev : current);
        const totalTrend = metrics.reduce((acc, curr) => acc + curr.trend, 0) / metrics.length;

        const trendLabel = totalTrend >= 0 ? 'croissance' : 'baisse';

        return `Insight 30s : Votre format "${top.label}" est le moteur de votre ${trendLabel} (+${Math.abs(totalTrend)}% d'engagement moyen).`;
    }
}
