import { ApiKeyManager } from '../src/core/security/api-key-manager';

describe('API Marketplace - Security (Phase 23)', () => {
    let manager: ApiKeyManager;

    beforeEach(() => {
        manager = new ApiKeyManager();
    });

    it('devrait générer une clé API valide avec des métadonnées correctes', () => {
        const workspaceId = 'ws_enterprise_01';
        const scopes = ['metrics.read'];
        const { key, metadata } = manager.generateKey(workspaceId, scopes);

        expect(key).toMatch(/^syn_[a-f0-9]+\.[a-f0-9]+$/);
        expect(metadata.workspaceId).toBe(workspaceId);
        expect(metadata.scopes).toEqual(scopes);
    });

    it('devrait valider une clé API conforme', () => {
        const { key } = manager.generateKey('ws_test', ['read']);
        const isValid = manager.validateKey(key, ['read']);
        expect(isValid).toBe(true);
    });

    it('devrait rejeter une clé malformée', () => {
        const invalidKey = 'invalid_key_format';
        const isValid = manager.validateKey(invalidKey, ['read']);
        expect(isValid).toBe(false);
    });
});
