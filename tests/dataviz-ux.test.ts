import { DataVizEngine, ChartDataPoint } from '../src/api/ux/dataviz-engine';

describe('Immersive DataViz (Phase 29)', () => {
    let engine: DataVizEngine;

    beforeEach(() => {
        engine = new DataVizEngine();
    });

    it('devrait extraire un insight stratégique en moins de 30 secondes (Règle Métier)', async () => {
        const mockMetrics: ChartDataPoint[] = [
            { label: 'Video', value: 1200, trend: 15 },
            { label: 'Carousel', value: 2500, trend: 20 },
            { label: 'Article', value: 500, trend: -5 }
        ];

        const insight = await engine.extractQuickInsight(mockMetrics);

        expect(insight).toContain('Carousel');
        expect(insight).toContain('croissance');
        expect(insight).toContain('+10%'); // Moyenne (15+20-5)/3 = 10
    });

    it('devrait générer une configuration de heatmap', () => {
        const config = engine.renderEngagementHeatmap([]);
        expect(config).toBe('heatmap_config_json');
    });
});
