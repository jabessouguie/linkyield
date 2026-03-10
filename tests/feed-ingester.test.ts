import { FeedIngester, ClickHousePostMetric } from '../src/api/feed-ingester';
import { LinkedInConnector } from '../src/api/linkedin-connector';
import fs from 'fs';
import path from 'path';

// Mock de la classe LinkedInConnector
jest.mock('../src/api/linkedin-connector');

describe('FeedIngester', () => {
    let ingester: FeedIngester;
    let mockConnector: jest.Mocked<LinkedInConnector>;

    beforeEach(() => {
        // Initialiser le connecteur mocké
        mockConnector = new LinkedInConnector({
            version: '202502',
            capacity: 100,
            leakRate: 10
        }) as jest.Mocked<LinkedInConnector>;

        ingester = new FeedIngester(mockConnector);
    });

    it('devrait transformer correctement les données brutes de LinkedIn en métriques ClickHouse', async () => {
        // Lire le fichier de mock JSON
        const mockDataPath = path.join(__dirname, 'mocks/linkedin/shares.json');
        const mockJson = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

        // Simuler la réponse de fetch
        mockConnector.fetch.mockResolvedValue(mockJson);

        const organizationUrn = 'urn:li:organization:123456';
        const metrics: ClickHousePostMetric[] = await ingester.fetchAndTransform(organizationUrn);

        // Assertions de base
        expect(metrics).toBeDefined();
        expect(metrics.length).toBe(3); // 3 éléments dans le mock

        // Tester le premier élément du mock
        // Interactions: 45 (likes) + 12 (comments) + 15 (shares) + 120 (clicks) = 192
        // Impressions: 2500
        // ER: (192 / 2500) * 100 = 7.68
        const firstMetric = metrics[0];
        expect(firstMetric.post_urn).toBe('urn:li:share:7891011');
        expect(firstMetric.impressions).toBe(2500);
        expect(firstMetric.likes).toBe(45);
        expect(firstMetric.engagement_rate).toBeCloseTo(7.68, 2);

        // S'assurer que fetch a été appelé avec la bonne URI encodée
        const expectedEndpoint = `/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${encodeURIComponent(organizationUrn)}`;
        expect(mockConnector.fetch).toHaveBeenCalledWith(expectedEndpoint);
    });

    it('devrait gérer les erreurs de fetch en relayant l\'exception', async () => {
        const testError = new Error("API Limit Reached");
        mockConnector.fetch.mockRejectedValue(testError);

        await expect(ingester.fetchAndTransform('urn:li:organization:error')).rejects.toThrow("API Limit Reached");
    });
});
