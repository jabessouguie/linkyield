/**
 * @file webhook-handler.ts
 * @description Gestionnaire de réception des événements synchrones/asynchrones de LinkedIn.
 * @version 1.0.0
 * @author Synapse B2B - Infrastructure
 */

import { RedisManager } from '../core/cache/redis-manager';

export interface LinkedInWebhookEvent {
    type: 'ugc_created' | 'organizational_change' | 'security_alert';
    payload: any;
    timestamp: number;
}

/**
 * @class WebhookHandler
 * @description Traite les notifications push de LinkedIn pour assurer la fraîcheur des données.
 */
export class WebhookHandler {
    private cache: RedisManager;

    constructor(cache: RedisManager) {
        this.cache = cache;
    }

    /**
     * @method handleEvent
     * @description Point d'entrée pour les requêtes POST entrantes de LinkedIn.
     */
    public async handleEvent(event: LinkedInWebhookEvent): Promise<void> {
        console.log(`[Webhook] Événement reçu: ${event.type}`);

        switch (event.type) {
            case 'ugc_created':
                // Nouveau post détecté : on invalide le cache des métriques pour forcer un refresh
                const accountUrn = event.payload.accountUrn;
                await this.cache.invalidate(`metrics_${accountUrn}`);
                console.log(`[Webhook] Cache invalidé pour ${accountUrn}`);
                break;

            case 'security_alert':
                console.warn(`[Webhook] Alerte sécurité LinkedIn reçue!`);
                break;

            default:
                console.log(`[Webhook] Type d'événement non traité: ${event.type}`);
        }
    }
}
