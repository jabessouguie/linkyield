import { PerformancePredictor } from '../src/analytics/performance-predictor';

describe('PerformancePredictor', () => {
    it('devrait donner un score élevé aux carrousels publiés le matin sans lien externe', () => {
        const score = PerformancePredictor.predictScore({
            contentType: 'carousel',
            length: 500,
            hasExternalLink: false,
            publishHour: 9
        });
        expect(score).toBe(80); // 50 + 20 + 0 + 10
    });

    it('devrait pénaliser les posts avec des liens externes', () => {
        const score = PerformancePredictor.predictScore({
            contentType: 'text',
            length: 100,
            hasExternalLink: true,
            publishHour: 15
        });
        expect(score).toBe(35); // 50 + 0 - 15 + 0
    });
});
