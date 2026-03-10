/**
 * @file re-engagement-service.ts
 * @description Moteur de réengagement automatisé piloté par l'IA Gemini.
 * @version 1.0.0
 * @author Synapse B2B - Customer Success & Prompt Engineering
 */

import { GeminiService } from '../../core/ai/gemini-service';

/**
 * @class ReEngagementService
 * @description Déclenche des actions personnalisées pour améliorer la rétention des utilisateurs à risque.
 */
export class ReEngagementService {
    private gemini: GeminiService;

    constructor(gemini: GeminiService) {
        this.gemini = gemini;
    }

    /**
     * @method triggerAction
     * @description Génère un message de réengagement contextuel.
     */
    public async triggerAction(userId: string, healthScore: number, lastMetricLabel: string): Promise<string> {
        console.log(`[CS Action] Déclenchement réengagement pour ${userId} (Score: ${healthScore})...`);

        if (healthScore > 50) return 'Aucune action requise.';

        const prompt = `L'utilisateur ${userId} a un score de santé de ${healthScore}/100. Son dernier insight marquant était "${lastMetricLabel}". Rédige un court mail d'encouragement pour qu'il revienne consulter ses nouveaux analytics.`;

        const result = await this.gemini.generateContent(prompt, 'Customer Success Coach');
        return result.text;
    }
}
