import { SsoManager } from '../src/core/security/sso-manager';
import { ImmutableAuditLogger } from '../src/core/governance/immutable-audit-logger';

describe('Enterprise Security & Compliance (Phase 24)', () => {
    let sso: SsoManager;
    let logger: ImmutableAuditLogger;

    beforeEach(() => {
        sso = new SsoManager();
        logger = new ImmutableAuditLogger();
    });

    describe('SSO Management', () => {
        it('devrait générer une URL de login SAML correcte', () => {
            const config: any = { provider: 'okta', entryPoint: 'https://okta.com/auth', issuer: 'synapse-b2b' };
            const url = sso.getLoginUrl(config);
            expect(url).toContain('okta.com');
            expect(url).toContain('RelayState=synapse-b2b');
        });

        it('devrait valider une assertion SAML simulée', async () => {
            const config: any = { provider: 'auth0' };
            const user = await sso.validateAssertion("LONG_BASE64_SAML_ASSERTION_DATA_SIMULATED_1234567890", config);
            expect(user.email).toBe("admin@enterprise-client.com");
            expect(user.roles).toContain('ADMIN_WORKSPACE');
        });
    });

    describe('Immutable Audit Logging', () => {
        it('devrait enregistrer une action dans le log d\'audit immuable', async () => {
            const spy = jest.spyOn(console, 'log');
            await logger.logAction({
                actorId: 'user_dev',
                action: 'DELETE_POST',
                targetId: 'urn:li:share:abc',
                details: 'Supprimé par erreur',
                timestamp: new Date(),
                ipAddress: '127.0.0.1'
            });
            expect(spy).toHaveBeenCalledWith(expect.stringContaining('DELETE_POST'));
        });
    });
});
