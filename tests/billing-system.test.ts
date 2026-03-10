import { BillingService } from '../src/api/billing/billing-service';
import { StripeConnector } from '../src/api/billing/stripe-connector';

describe('Monetization & Billing (Phase 19)', () => {
    let stripe: StripeConnector;
    let service: BillingService;

    beforeEach(() => {
        stripe = new StripeConnector('sk_test_fake');
        service = new BillingService(stripe);
    });

    it('devrait valider les quotas d\'utilisation', () => {
        expect(service.checkQuota(5, 10)).toBe(true);
        expect(service.checkQuota(11, 10)).toBe(false);
    });

    it('devrait générer une URL de paiement pour un upgrade', async () => {
        const url = await service.upgradeWorkspace('ws_999', 'user@company.com', 'plan_premium');
        expect(url).toContain('checkout.stripe.com');
    });
});
