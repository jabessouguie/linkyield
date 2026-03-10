import { HealthScoreCalculator } from '../src/api/customer-success/health-score-calculator';
import { ReEngagementService } from '../src/api/customer-success/re-engagement-service';
import { GeminiService } from '../src/core/ai/gemini-service';

describe('Customer Success Health Score (Phase 35)', () => {
    let calculator: HealthScoreCalculator;
    let gemini: GeminiService;
    let service: ReEngagementService;

    beforeEach(() => {
        calculator = new HealthScoreCalculator();
        gemini = new GeminiService('fake');
        service = new ReEngagementService(gemini);
    });

    it('devrait calculer un score de santé bas pour un utilisateur inactif', () => {
        const metrics = {
            lastLoginDays: 10,
            dashboardsViewed: 1,
            exportsGenerated: 0,
            sentimentScore: 40
        };
        const score = calculator.calculateScore(metrics);
        expect(score).toBeLessThan(40);
    });

    it('devrait calculer un excellent score pour un utilisateur ambassadeur', () => {
        const metrics = {
            lastLoginDays: 0,
            dashboardsViewed: 15,
            exportsGenerated: 10,
            sentimentScore: 90
        };
        const score = calculator.calculateScore(metrics);
        expect(score).toBeGreaterThan(85);
    });

    it('devrait générer un message de réengagement via Gemini pour les scores bas', async () => {
        const message = await service.triggerAction('user_ churn_risk', 25, 'Taux d\'engagement stable');
        expect(message).toContain('Gemini Response');
    });
});
