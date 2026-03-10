import { HubSpotConnector } from '../src/api/hubspot-connector';
import { CrmSyncService } from '../src/api/crm-sync-service';

describe('CrmSyncService', () => {
    let mockHubSpot: HubSpotConnector;
    let service: CrmSyncService;

    beforeEach(() => {
        mockHubSpot = new HubSpotConnector('fake-key');
        jest.spyOn(mockHubSpot, 'syncContact').mockResolvedValue(true);
        service = new CrmSyncService(mockHubSpot);
    });

    it('devrait calculer un score de lead correct et synchroniser avec HubSpot', async () => {
        const lead = { accountUrn: 'urn:li:member:123', engagementWeight: 8.5 };
        const email = 'prospect@business.com';

        await service.processAndSync(lead, email);

        expect(mockHubSpot.syncContact).toHaveBeenCalledWith(expect.objectContaining({
            email,
            leadScore: 85, // 8.5 * 10
            linkedinProfile: expect.stringContaining('urn:li:member:123')
        }));
    });
});
