import { CommunityCoachAgent, SocialInteraction } from '../src/api/ai/community-coach-agent';

describe('Community Coach Agent (Phase 26)', () => {
    let coach: CommunityCoachAgent;

    beforeEach(() => {
        coach = new CommunityCoachAgent();
    });

    it('devrait suggérer une réponse alignée sur le branding', async () => {
        const interaction: SocialInteraction = {
            authorName: 'Jean Dupont',
            commentBody: 'Super article, très instructif !',
            timestamp: new Date()
        };
        const brandingVoice = 'expert en data B2B';

        const suggestion = await coach.analyzeAndSuggest(interaction, brandingVoice);
        expect(suggestion.tone).toBe('supportive');
        expect(suggestion.suggestedReply).toContain('expert en data B2B');
        expect(suggestion.brandingAlignmentScore).toBeGreaterThan(80);
    });

    it('devrait détecter une tonalité interrogative', async () => {
        const interaction: SocialInteraction = {
            authorName: 'Alice',
            commentBody: 'Comment implémenter cela concrètement ?',
            timestamp: new Date()
        };

        const suggestion = await coach.analyzeAndSuggest(interaction, 'consultante');
        expect(suggestion.tone).toBe('inquisitive');
    });
});
