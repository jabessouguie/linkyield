import { MultiClientManager } from '../src/api/agency/multi-client-manager';

describe('Agency & Multi-Client (Phase 20)', () => {
    let manager: MultiClientManager;

    beforeEach(() => {
        manager = new MultiClientManager('agency_001');
    });

    it('devrait enrôler plusieurs clients et rapporter le statut global', () => {
        manager.onboardClient('ws_client_a', 'Entreprise A');
        manager.onboardClient('ws_client_b', 'Startup B');

        const snapshot = manager.getGlobalSnapshot();
        expect(snapshot.totalClients).toBe(2);
        expect(snapshot.activeClients).toBe(2);
    });

    it('devrait retourner la liste complète des clients', () => {
        manager.onboardClient('ws_client_x', 'Client X');
        const clients = manager.listClients();
        expect(clients[0].clientName).toBe('Client X');
    });
});
