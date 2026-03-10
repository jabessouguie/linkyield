/**
 * @file token-bucket-limiter.ts
 * @description Implémentation du pattern Token Bucket pour la gestion stricte des quotas API.
 * @version 1.0.0
 * @author Synapse B2B - Data Engineering
 */

/**
 * @class TokenBucketLimiter
 * @description Contrôle le débit des appels API sortants pour éviter les erreurs 429.
 */
export class TokenBucketLimiter {
    private tokens: number;
    private lastRefill: number;
    private readonly capacity: number;
    private readonly refillRate: number; // jetons par seconde

    constructor(capacity: number, refillRate: number) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity;
        this.lastRefill = Date.now();
    }

    /**
     * @method tryConsume
     * @description Tente de consommer un jeton. Retourne true si autorisé.
     */
    public tryConsume(): boolean {
        this.refill();
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }

    /**
     * @method refill
     * @description Recharge le seau en fonction du temps écoulé.
     */
    private refill(): void {
        const now = Date.now();
        const deltaSeconds = (now - this.lastRefill) / 1000;
        const newTokens = deltaSeconds * this.refillRate;

        this.tokens = Math.min(this.capacity, this.tokens + newTokens);
        this.lastRefill = now;
    }

    public getAvailableTokens(): number {
        this.refill();
        return Math.floor(this.tokens);
    }
}
