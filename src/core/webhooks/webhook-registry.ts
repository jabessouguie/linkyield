/**
 * @file webhook-registry.ts
 * @description Registre de gestion des abonnements aux événements Webhook.
 * @version 1.0.0
 * @author Synapse B2B - Enterprise Architecture
 */

import { SynapseEvent } from './webhook-dispatcher';

export interface WebhookSubscription {
    id: string;
    url: string;
    events: SynapseEvent[];
    isActive: boolean;
    secret: string; // Pour signature HMAC
}

/**
 * @class WebhookRegistry
 * @description Gère l'inscription et la gestion des endpoints de notification pour les clients Enterprise.
 */
export class WebhookRegistry {
    private subscriptions: WebhookSubscription[] = [];

    /**
     * @method register
     * @description Enregistre un nouvel endpoint.
     */
    public register(sub: WebhookSubscription): void {
        console.log(`[Webhooks] Nouvel endpoint enregistré : ${sub.url}`);
        this.subscriptions.push(sub);
    }

    /**
     * @method getSubscriptionsForEvent
     * @description Récupère tous les abonnés actifs pour un type d'événement donné.
     */
    public getSubscriptionsForEvent(event: SynapseEvent): WebhookSubscription[] {
        return this.subscriptions.filter(s => s.isActive && s.events.includes(event));
    }
}
