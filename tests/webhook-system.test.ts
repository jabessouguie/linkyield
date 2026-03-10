import { WebhookDispatcher, SynapseEvent } from '../src/core/webhooks/webhook-dispatcher';
import { WebhookRegistry, WebhookSubscription } from '../src/core/webhooks/webhook-registry';

describe('Webhook Marketplace (Phase 36)', () => {
    let dispatcher: WebhookDispatcher;
    let registry: WebhookRegistry;

    beforeEach(() => {
        dispatcher = new WebhookDispatcher();
        registry = new WebhookRegistry();
    });

    it('devrait enregistrer un abonnement et le récupérer par événement', () => {
        const sub: WebhookSubscription = {
            id: 'sub_001',
            url: 'https://api.client.com/hooks',
            events: ['sync.complete', 'post.published'],
            isActive: true,
            secret: 'shhh'
        };

        registry.register(sub);
        const activeSubs = registry.getSubscriptionsForEvent('sync.complete');

        expect(activeSubs.length).toBe(1);
        expect(activeSubs[0].url).toBe(sub.url);
    });

    it('devrait expédier un événement avec succès', async () => {
        const result = await dispatcher.dispatch('https://webhook.site/test', 'engagement.high', { score: 95 });
        expect(result.success).toBe(true);
        expect(result.attempt).toBe(1);
    });
});
