import { ChurnDetector, EngagementTrend } from '../src/api/retention/churn-detector';

describe('Predictive Analytics - Churn Detection (Phase 22)', () => {
    let detector: ChurnDetector;

    beforeEach(() => {
        detector = new ChurnDetector();
    });

    it('devrait détecter un risque élevé pour une chute d\'engagement massive', () => {
        const trend: EngagementTrend = {
            workspaceId: 'ws_risk_high',
            historicalAverage: 100,
            currentPeriodEngagement: 20, // 80% de baisse
            lastActivityDate: new Date()
        };

        const alert = detector.analyzeRisk(trend);
        expect(alert.alertLevel).toBe('high');
        expect(alert.riskScore).toBeGreaterThan(70);
        expect(alert.suggestedAction).toContain("Contact urgent");
    });

    it('devrait détecter un risque lié à l\'inactivité prolongée', () => {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const trend: EngagementTrend = {
            workspaceId: 'ws_inactive',
            historicalAverage: 50,
            currentPeriodEngagement: 45, // Baisse faible
            lastActivityDate: tenDaysAgo // Mais inactivité de 10j
        };

        const alert = detector.analyzeRisk(trend);
        expect(alert.riskScore).toBeGreaterThan(10); // Le score augmente avec l'inactivité
    });

    it('devrait rapporter un risque faible pour un compte stable', () => {
        const trend: EngagementTrend = {
            workspaceId: 'ws_stable',
            historicalAverage: 100,
            currentPeriodEngagement: 95,
            lastActivityDate: new Date()
        };

        const alert = detector.analyzeRisk(trend);
        expect(alert.alertLevel).toBe('low');
    });
});
