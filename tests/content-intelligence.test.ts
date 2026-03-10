import { ContentIntelligenceAgent } from '../src/api/ai/content-intelligence-agent';

describe('Content Intelligence Agent (Phase 21)', () => {
    let agent: ContentIntelligenceAgent;

    beforeEach(() => {
        agent = new ContentIntelligenceAgent();
    });

    it('devrait générer des variations pertinentes pour un post original', async () => {
        const context = {
            originalContent: "Nous lançons notre nouvelle plateforme analytique aujourd'hui.",
            targetAudience: "Décideurs Marketing",
            historicalResonance: 0.65
        };

        const variations = await agent.generateVariations(context);
        expect(variations.length).toBeGreaterThan(0);
        expect(variations[0].predictedReachIncrease).toBeGreaterThan(0);
        expect(variations[1].content).toContain("AVERTISSEMENT");
    });

    it('devrait prédire un score de performance basé sur la structure', () => {
        const plainText = "Texte court sans structure.";
        const structuredText = "🚀 Titre accrocheur\n\n- Point 1\n- Point 2\n\n#LinkedIn";

        const scorePlain = agent.predictPerformance(plainText, 50);
        const scoreStructured = agent.predictPerformance(structuredText, 50);

        expect(scoreStructured).toBeGreaterThan(scorePlain);
    });
});
