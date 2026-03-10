/**
 * @file redis-manager.ts
 * @description Gestionnaire de cache ultra-rapide pour les KPIs analytiques.
 * @version 1.0.0
 * @author Synapse B2B - Backend Engineering
 */

// Note: Dans cet environnement, nous simulons l'interface Redis pour éviter les erreurs de connexion.
export class RedisManager {
    private mockStorage: Map<string, string> = new Map();

    /**
     * @method get
     * @description Récupère une valeur du cache.
     */
    public async get(key: string): Promise<string | null> {
        console.log(`[Cache] Récupération de ${key}`);
        return this.mockStorage.get(key) || null;
    }

    /**
     * @method set
     * @description Stocke une valeur avec un TTL (Time-To-Live).
     */
    public async set(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
        console.log(`[Cache] Stockage de ${key} (TTL: ${ttlSeconds}s)`);
        this.mockStorage.set(key, value);
    }

    /**
     * @method invalidate
     * @description Supprime une entrée du cache lors d'un événement (Webhooks).
     */
    public async invalidate(key: string): Promise<void> {
        this.mockStorage.delete(key);
    }
}
