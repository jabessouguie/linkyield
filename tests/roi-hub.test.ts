import { RoiAttributionService } from '../src/api/analytics/roi-attribution-service';
import { DecisionSpeedOptimizer } from '../src/core/ux/decision-speed-optimizer';

describe('ROI Hub "30 Seconds" (Phase 27)', () => {
    let roiService: RoiAttributionService;
    let speedOptimizer: DecisionSpeedOptimizer;

    beforeEach(() => {
        roiService = new RoiAttributionService();
        speedOptimizer = new DecisionSpeedOptimizer();
    });

    it('devrait calculer un insight d\'attribution de revenus', async () => {
        const insight = await roiService.calculateAttribution('ws_sales_01', 30);
        expect(insight.totalRevenueAttributed).toBeGreaterThan(0);
        expect(insight.conversionEfficiency).toBe(4.2);
    });

    it('devrait retourner un insight express en respectant la latence UX', async () => {
        const startTime = Date.now();
        const insight = await speedOptimizer.getExpressInsight('ws_fast_01');
        const duration = Date.now() - startTime;

        expect(insight).toContain('conversion');
        expect(duration).toBeLessThan(500); // Test strict de performance
    });
});
