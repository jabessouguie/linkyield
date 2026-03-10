/**
 * @file multi-client-manager.ts
 * @description Gestionnaire de portefeuilles clients pour les agences utilisant Synapse B2B.
 * @version 1.0.0
 * @author Synapse B2B - CS & Sales
 */

export interface ClientWorkspace {
    workspaceId: string;
    clientName: string;
    subscriptionStatus: 'active' | 'past_due' | 'canceled';
    lastReportGenerated?: Date;
}

/**
 * @class MultiClientManager
 * @description Permet aux administrateurs d'agence de superviser et de naviguer entre plusieurs comptes clients.
 */
export class MultiClientManager {
    private agencyId: string;
    private clients: ClientWorkspace[] = [];

    constructor(agencyId: string) {
        this.agencyId = agencyId;
    }

    /**
     * @method onboardClient
     * @description Enrôle un nouveau client dans le portefeuille de l'agence.
     */
    public onboardClient(workspaceId: string, clientName: string): void {
        this.clients.push({
            workspaceId,
            clientName,
            subscriptionStatus: 'active'
        });
        console.log(`[Agency Hub] Nouveau client enrôlé: ${clientName} (${workspaceId})`);
    }

    /**
     * @method getGlobalSnapshot
     * @description Retourne un résumé de performance agrégé pour tous les clients.
     */
    public getGlobalSnapshot(): { totalClients: number; activeClients: number } {
        return {
            totalClients: this.clients.length,
            activeClients: this.clients.filter(c => c.subscriptionStatus === 'active').length
        };
    }

    /**
     * @method listClients
     * @description Liste tous les workspaces gérés par cette agence.
     */
    public listClients(): ClientWorkspace[] {
        return this.clients;
    }
}
