/**
 * @file crm-sync-service.ts
 * @description Service d'orchestration pour le transfert de données LinkedIn -> CRM.
 * @version 1.0.0
 * @author Synapse B2B - Data Engineer & BIZ_DEV
 */

import { HubSpotConnector, HubSpotContact } from './hubspot-connector';

export interface LinkedInLead {
    accountUrn: string;
    engagementWeight: number; // Score d'engagement cumulé
}

/**
 * @class CrmSyncService
 * @description Calcule les scores de leads et pilote la synchronisation CRM.
 */
export class CrmSyncService {
    private crm: HubSpotConnector;

    constructor(crm: HubSpotConnector) {
        this.crm = crm;
    }

    /**
     * @method processAndSync
     * @description Analyse les interactions d'un utilisateur et met à jour son score CRM.
     */
    public async processAndSync(lead: LinkedInLead, email: string): Promise<void> {
        // Algorithme de scoring de lead (Rôle BIZ_DEV)
        // Transformation du poids d'engagement en score 0-100
        const leadScore = Math.min(100, lead.engagementWeight * 10);

        const hubspotContact: HubSpotContact = {
            email,
            leadScore,
            linkedinProfile: `https://www.linkedin.com/in/${lead.accountUrn}`
        };

        await this.crm.syncContact(hubspotContact);
        console.log(`[CRM Sync] Lead qualifié synchronisé: ${email} (Score: ${leadScore})`);
    }
}
