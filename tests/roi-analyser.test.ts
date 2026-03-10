import { RoiAnalyser, FinancialMetrics } from '../src/api/roi-analyser';

describe('RoiAnalyser', () => {
    const mockMetrics: FinancialMetrics = {
        engagementCount: 1000,
        estimatedCpe: 0.5,
        conversionRate: 2, // 2% de conversion Engagement -> MQL
        mqlValue: 50 // 1 MQL vaut 50€
    };

    it('devrait calculer la valeur générée estimée', () => {
        // (1000 * 2) / 100 = 20 MQLs. 20 * 50 = 1000€
        const value = RoiAnalyser.calculateEstimatedValue(mockMetrics);
        expect(value).toBe(1000);
    });

    it('devrait calculer le ROI correctement', () => {
        const generatedValue = 1000;
        const budget = 500;
        // ((1000 - 500) / 500) * 100 = 100%
        const roi = RoiAnalyser.calculateRoi(generatedValue, budget);
        expect(roi).toBe(100);
    });

    it('devrait fournir des insights financiers complets', () => {
        const budget = 400;
        const insights = RoiAnalyser.analyze(mockMetrics, budget);

        expect(insights.totalEstimatedValue).toBe(1000);
        expect(insights.costPerEngagement).toBe(0.4); // 400 / 1000
        expect(insights.roiPercentage).toBe(150); // ((1000-400)/400)*100
    });
});
