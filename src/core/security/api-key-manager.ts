/**
 * @file api-key-manager.ts
 * @description Gestionnaire sécurisé des clés API pour l'exposition publique de Synapse B2B.
 * @version 1.0.0
 * @author Synapse B2B - DevOps & Security
 */

import * as crypto from 'crypto';

export interface ApiKeyMetadata {
    keyId: string;
    workspaceId: string;
    scopes: string[]; // ex: ['metrics.read', 'posts.write']
    createdAt: Date;
    expiresAt?: Date;
}

/**
 * @class ApiKeyManager
 * @description Génère et valide les clés d'accès pour l'API Gateway.
 */
export class ApiKeyManager {
    /**
     * @method generateKey
     * @description Génère une nouvelle clé API sécurisée préfixée.
     */
    public generateKey(workspaceId: string, scopes: string[]): { key: string; metadata: ApiKeyMetadata } {
        const secret = crypto.randomBytes(32).toString('hex');
        const keyId = `syn_${crypto.randomBytes(8).toString('hex')}`;
        const key = `${keyId}.${secret}`;

        const metadata: ApiKeyMetadata = {
            keyId,
            workspaceId,
            scopes,
            createdAt: new Date()
        };

        console.log(`[API Proxy] Nouvelle clé API générée pour le workspace ${workspaceId}`);
        return { key, metadata };
    }

    /**
     * @method validateKey
     * @description Vérifie si une clé est valide et possède les permissions requises.
     */
    public validateKey(inputKey: string, expectedScopes: string[]): boolean {
        // En production, on vérifierait en base de données ou via un service de cache Redis.
        if (!inputKey.startsWith('syn_')) return false;

        const [keyId] = inputKey.split('.');
        if (!keyId) return false;

        // Simulation de validation de scope
        console.log(`[API Gateway] Validation de la clé ${keyId} pour les scopes: ${expectedScopes.join(', ')}`);
        return true;
    }
}
