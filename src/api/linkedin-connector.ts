/**
 * @file linkedin-connector.ts
 * @description Connecteur centralisé pour les APIs LinkedIn avec gestion automatique du versionnement et des quotas.
 * @version 1.0.0
 * @author Synapse B2B - Backend
 */

import { LeakyBucket } from '../../core/limiter/leaky-bucket.ts';

/**
 * @interface LinkedInConfig
 * @description Configuration pour la connexion API.
 */
export interface LinkedInConfig {
    version: string;             // ex: '202502'
    token?: string;              // Token OAuth utilisateur
    capacity: number;           // Quota max autorisé (tokens)
    leakRate: number;           // Vitesse de recharge des jetons
}

/**
 * @class LinkedInConnector
 * @description Gère les appels HTTP vers LinkedIn avec résilience et conformité.
 */
export class LinkedInConnector {
    private config: LinkedInConfig;
    private limiter: LeakyBucket;

    constructor(config: LinkedInConfig) {
        this.config = config;
        this.limiter = new LeakyBucket({
            capacity: config.capacity,
            leakRate: config.leakRate
        });
    }

    /**
     * @method fetch
     * @description Effectue un appel API avec gestion automatique des en-têtes et des quotas.
     * @param {string} endpoint - Point de terminaison LinkedIn.
     * @param {RequestInit} options - Options fetch standard.
     * @returns {Promise<any>}
     */
    public async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
        // 1. Attente d'un jeton (Lissage de charge)
        await this.limiter.acquire();

        // 2. Construction des headers obligatoires
        const headers = new Headers(options.headers);
        headers.set('Linkedin-Version', this.config.version);
        headers.set('X-Restli-Protocol-Version', '2.0.0');

        if (this.config.token) {
            headers.set('Authorization', `Bearer ${this.config.token}`);
        }

        // 3. Appel API (Note: en environnement de prod, l'URL de base est https://api.linkedin.com/v2)
        const url = `https://api.linkedin.com/v2${endpoint}`;

        try {
            // Mock de l'appel fetch effectif pour démonstration
            console.log(`[LinkedIn API] Appel Sortant : ${url} (Version ${this.config.version})`);

            const response = await fetch(url, { ...options, headers });

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Quota LinkedIn dépassé (Code 429). Utiliser les données en cache Redis.');
                }
                throw new Error(`Erreur API LinkedIn : ${response.status} - ${response.statusText}`);
            }

            return await response.json();
        } catch (error: any) {
            console.error(`[LinkedIn API Error] ${error.message}`);
            throw error;
        }
    }

    /**
     * @method getLimiterStatus
     * @description Retourne l'état actuel des quotas pour ce connecteur.
     */
    public getLimiterStatus() {
        return this.limiter.getStatus();
    }
}
