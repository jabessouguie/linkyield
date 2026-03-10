import { ReferralManager } from '../src/api/growth/referral-manager';
import { ShareableInsightGenerator } from '../src/api/growth/shareable-insight-generator';

describe('Viral Loops & Referral (Phase 33)', () => {
    let referral: ReferralManager;
    let generator: ShareableInsightGenerator;

    beforeEach(() => {
        referral = new ReferralManager();
        generator = new ShareableInsightGenerator();
    });

    it('devrait générer un lien de parrainage base64', () => {
        const link = referral.generateReferralLink('user_456');
        expect(link).toContain('signup?ref=');
        expect(link).toContain('dXNlcl80NTY='); // user_456 in base64
    });

    it('devrait tracker une conversion et compter les parrainages', () => {
        referral.trackSignup('referrer_1', 'referred_A');
        referral.trackSignup('referrer_1', 'referred_B');

        expect(referral.getConversionCount('referrer_1')).toBe(2);
    });

    it('devrait générer un asset de partage pour un insight', () => {
        const insight = "Taux d'engagement de 12% sur mes vidéos";
        const asset = generator.generateCard('ws_growth_01', insight);

        expect(asset.caption).toContain('🚀');
        expect(asset.imageUrl).toContain('ws_growth_01');
        expect(asset.id).toContain('social_');
    });
});
