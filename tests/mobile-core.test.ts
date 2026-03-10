import { PushNotificationService } from '../src/api/mobile/push-notification-service';

describe('Mobile Expansion (Phase 18)', () => {
    let pushService: PushNotificationService;

    beforeEach(() => {
        pushService = new PushNotificationService();
    });

    it('devrait envoyer une notification de performance avec succès', async () => {
        const result = await pushService.sendNotification({
            userId: 'user_123',
            title: 'Test',
            body: 'Ceci est un test',
            priority: 'normal'
        });
        expect(result.success).toBe(true);
        expect(result.messageId).toBeDefined();
    });

    it('devrait déclencher une alerte de résonance faible', async () => {
        const spy = jest.spyOn(pushService, 'sendNotification');
        await pushService.sendLowResonanceAlert('user_456', 'urn:li:share:789');
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
            userId: 'user_456',
            priority: 'high'
        }));
    });
});
