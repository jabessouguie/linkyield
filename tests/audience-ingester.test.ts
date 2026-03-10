import { AudienceIngester, AudienceStats } from '../src/api/audience-ingester';
import { LinkedInConnector } from '../src/api/linkedin-connector';
import { Anonymizer } from '../core/security/anonymizer';
import fs from 'fs';
import path from 'path';

jest.mock('../src/api/linkedin-connector');

describe('AudienceIngester & Anonymizer', () => {
    let ingester: AudienceIngester;
    let mockConnector: jest.Mocked<LinkedInConnector>;

    beforeEach(() => {
        mockConnector = new LinkedInConnector({
            version: '202502',
            capacity: 100,
            leakRate: 10
        }) as jest.Mocked<LinkedInConnector>;

        ingester = new AudienceIngester(mockConnector);
    });

    it('devrait anonymiser correctement les IDs (RGPD)', () => {
        const rawId = 'urn:li:organization:123456';
        const hashedId = Anonymizer.anonymizeId(rawId);

        expect(hashedId).toBeDefined();
        expect(hashedId).toHaveLength(64); // SHA-256 hex length
        expect(hashedId).not.toBe(rawId);

        // Consistance
        expect(Anonymizer.anonymizeId(rawId)).toBe(hashedId);
    });

    it('devrait ingérer et segmenter l\'audience correctement', async () => {
        const mockDataPath = path.join(__dirname, 'mocks/linkedin/followers.json');
        const mockJson = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
        mockConnector.fetch.mockResolvedValue(mockJson);

        const organizationUrn = 'urn:li:organization:123456';
        const stats: AudienceStats = await ingester.fetchAudienceMetadata(organizationUrn, 'WS_TEST_123');

        expect(stats.organizationUrn).toBe(organizationUrn);
        expect(stats.totalFollowers).toBeGreaterThan(0);
        expect(stats.netGrowth).toBeDefined();
        expect(stats.segments.industry.length).toBeGreaterThan(0);
    });
});
