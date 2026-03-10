import { CompetitorTracker, CompetitorStats } from '../src/api/competitor-tracker';

describe('CompetitorTracker', () => {
    it('devrait calculer correctement la Part de Voix (Share of Voice)', () => {
        const myEngagements = 400;
        const competitors: CompetitorStats[] = [
            { workspaceId: 'WS_TEST', competitorUrn: 'urn:li:organization:comp_A', totalPublicEngagements: 400 }, // Total = 400 + 400 + 200 = 1000
            { workspaceId: 'WS_TEST', competitorUrn: 'urn:li:organization:comp_B', totalPublicEngagements: 200 }
        ];

        const result = CompetitorTracker.calculateShareOfVoice(myEngagements, competitors);

        expect(result.myShare).toBe(40); // 400/1000
        expect(result.competitors.find(c => c.urn === 'urn:li:organization:comp_A')?.share).toBe(40);
        expect(result.competitors.find(c => c.urn === 'urn:li:organization:comp_B')?.share).toBe(20);
    });

    it('devrait retourner 0 si aucun engagement sur le marché', () => {
        const result = CompetitorTracker.calculateShareOfVoice(0, []);
        expect(result.myShare).toBe(0);
    });
});
