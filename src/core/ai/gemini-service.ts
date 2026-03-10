/**
 * @file gemini-service.ts
 * @description Service central d'IA générative utilisant Google Gemini Pro.
 * @version 1.0.0
 * @author Synapse B2B - Prompt Engineering
 */

export interface GeminiRefinedInsight {
    text: string;
    tokensUsed: number;
    model: string;
}

/**
 * @class GeminiService
 * @description Wrapper pour les appels aux LLMs de Google.
 */
export class GeminiService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * @method generateContent
     * @description Envoie un prompt à Gemini et retourne le contenu généré.
     */
    public async generateContent(prompt: string, role: string = 'Marketing Assistant'): Promise<GeminiRefinedInsight> {
        console.log(`[Gemini AI] Requête pour le rôle ${role}...`);

        // Simulation d'appel SDK (en production : const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }))
        return {
            text: `[Gemini Response for ${role}]: Analyse pertinente basée sur votre historique LinkedIn...`,
            tokensUsed: 150,
            model: 'gemini-1.5-pro'
        };
    }

    /**
     * @method analyzeSentiment
     * @description Utilise Gemini pour une analyse de sentiment nuancée (Zero-shot).
     */
    public async analyzeSentiment(content: string): Promise<string> {
        const prompt = `Analyse le sentiment du commentaire suivant sur LinkedIn et réponds par un seul mot (Supportive, Skeptical, Angry, Inquisitive) : "${content}"`;
        const result = await this.generateContent(prompt, 'Sentiment Analyst');
        return result.text;
    }
}
