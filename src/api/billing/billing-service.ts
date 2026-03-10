/**
 * @file billing-service.ts
 * @description Service de gestion des quotas et de la facturation par workspace.
 * @version 1.0.0
 * @author Synapse B2B - CFO & PO
 */

import { StripeConnector } from './stripe-connector';

export interface UsageMetrics {
    ingestedPosts: number;
    aiInsightsCount: number;
    maxPostsLimit: number;
}

/**
 * @class BillingService
 * @description Contrôle l'accès aux fonctionnalités basé sur l'abonnement en vigueur.
 */
export class BillingService {
    private stripe: StripeConnector;

    constructor(stripe: StripeConnector) {
        this.stripe = stripe;
    }

    /**
     * @method checkQuota
     * @description Vérifie si un workspace a dépassé son quota d'ingestion.
     */
    public checkQuota(currentUsage: number, limit: number): boolean {
        return currentUsage < limit;
    }

    /**
     * @method upgradeWorkspace
     * @description Lance le processus d'upgrade vers un plan supérieur.
     */
    public async upgradeWorkspace(workspaceId: string, email: string, targetPlanId: string): Promise<string> {
        return await this.stripe.createSubscription(workspaceId, email, targetPlanId);
    }
}
