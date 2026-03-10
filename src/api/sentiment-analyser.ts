/**
 * @file sentiment-analyser.ts
 * @description Simulateur d'analyse de sentiment (NLP) pour les commentaires LinkedIn.
 * @version 1.0.0
 * @author Synapse B2B - Data Science
 */

export interface SentimentResult {
    score: number; // -1 (Négatif) à 1 (Positif)
    label: 'positive' | 'neutral' | 'negative';
    keywords: string[];
}

/**
 * @class SentimentAnalyser
 * @description Analyse le ton et les thématiques des interactions textuelles.
 */
export class SentimentAnalyser {
    /**
     * @method analyzeText
     * @description Retourne un score de sentiment simulé.
     */
    public static analyzeText(text: string): SentimentResult {
        const positiveWords = ['génial', 'excellent', 'merci', 'bravo', 'top', 'utile'];
        const negativeWords = ['mauvais', 'déçu', 'problème', 'erreur', 'inutile', 'lent'];

        let score = 0;
        const words = text.toLowerCase().split(/\s+/);

        words.forEach(word => {
            if (positiveWords.includes(word)) score += 0.2;
            if (negativeWords.includes(word)) score -= 0.2;
        });

        const label = score > 0 ? 'positive' : (score < 0 ? 'negative' : 'neutral');

        return {
            score: Math.min(1, Math.max(-1, score)),
            label,
            keywords: words.filter(w => w.length > 5).slice(0, 3) // Extraction simplifiée
        };
    }
}
