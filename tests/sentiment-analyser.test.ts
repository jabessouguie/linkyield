import { SentimentAnalyser } from '../src/api/sentiment-analyser';

describe('SentimentAnalyser', () => {
    it('devrait détecter un sentiment positif', () => {
        const text = "C'est un excellent outil, merci pour le partage top !";
        const result = SentimentAnalyser.analyzeText(text);
        expect(result.label).toBe('positive');
        expect(result.score).toBeGreaterThan(0);
    });

    it('devrait détecter un sentiment négatif', () => {
        const text = "Le service est lent et j'ai eu une erreur de problème.";
        const result = SentimentAnalyser.analyzeText(text);
        expect(result.label).toBe('negative');
        expect(result.score).toBeLessThan(0);
    });

    it('devrait être neutre sur un texte factuel', () => {
        const text = "Ceci est un message sans émotion particulière.";
        const result = SentimentAnalyser.analyzeText(text);
        expect(result.label).toBe('neutral');
        expect(result.score).toBe(0);
    });
});
