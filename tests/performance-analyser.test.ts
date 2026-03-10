import { PerformanceAnalyser, RawMetrics } from '../src/api/performance-analyser';

describe('PerformanceAnalyser', () => {
    const mockPost: RawMetrics = {
        likes: 10,
        comments: 5,
        shares: 2,
        clicks: 20,
        impressions: 1000
    };

    it('devrait calculer le taux d\'engagement correct', () => {
        // (10+5+2+20) = 37 interactions. (37/1000)*100 = 3.7%
        const er = PerformanceAnalyser.calculateEngagementRate(mockPost);
        expect(er).toBeCloseTo(3.7, 5);
    });

    it('devrait calculer un score de résonance pondéré', () => {
        // (10*1) + (20*1) + (5*3) + (2*5) = 10 + 20 + 15 + 10 = 55
        const score = PerformanceAnalyser.calculateResonanceScore(mockPost);
        expect(score).toBe(55);
    });

    it('devrait détecter un contenu viral (+200% de l\'engagement moyen)', () => {
        const averageEr = 1.0; // 1% d'engagement moyen
        // Le post a 3.7%, ce qui est > 3.0% (moyenne + 200%)
        const insights = PerformanceAnalyser.analyze(mockPost, averageEr);
        expect(insights.isViral).toBe(true);
    });

    it('ne devrait pas détecter de viralité si l\'augmentation est < 200%', () => {
        const averageEr = 2.0; // 2% d'engagement moyen
        // Le post a 3.7%, ce qui est < 6.0% (moyenne + 200%)
        const insights = PerformanceAnalyser.analyze(mockPost, averageEr);
        expect(insights.isViral).toBe(false);
    });
});
