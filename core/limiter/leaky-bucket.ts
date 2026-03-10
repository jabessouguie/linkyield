/**
 * @file leaky-bucket.ts
 * @description Implémentation de l'algorithme de Leaky Bucket pour le respect des quotas API LinkedIn.
 * @version 1.0.0
 * @author Synapse B2B - Infrastructure
 */

export interface LimiterOptions {
  capacity: number;       // Capacité maximale du seau (tokens)
  leakRate: number;       // Vitesse de fuite (tokens par seconde)
}

/**
 * @class LeakyBucket
 * @description Gère le lissage des appels API pour éviter les erreurs HTTP 429.
 */
export class LeakyBucket {
  private tokens: number;
  private lastLeakTime: number;
  private capacity: number;
  private leakRate: number;

  constructor(options: LimiterOptions) {
    this.capacity = options.capacity;
    this.leakRate = options.leakRate;
    this.tokens = 0;
    this.lastLeakTime = Date.now();
  }

  /**
   * @method leak
   * @description Applique la fuite des tokens basée sur le temps écoulé.
   * @private
   */
  private leak(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastLeakTime) / 1000;
    const leakedAmount = elapsedSeconds * this.leakRate;

    this.tokens = Math.max(0, this.tokens - leakedAmount);
    this.lastLeakTime = now;
  }

  /**
   * @method tryAcquire
   * @description Tente d'acquérir un jeton pour un appel API.
   * @returns {boolean} True si l'appel est autorisé, False si le quota est dépassé.
   */
  public tryAcquire(): boolean {
    this.leak();

    if (this.tokens < this.capacity) {
      this.tokens++;
      return true;
    }

    return false;
  }

  /**
   * @method acquire
   * @description Attend qu'un jeton soit disponible (asynchrone).
   * @returns {Promise<void>}
   */
  public async acquire(): Promise<void> {
    while (!this.tryAcquire()) {
      // Calculer le temps d'attente estimé pour qu'un jeton soit libéré
      const waitTime = (1 / this.leakRate) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  /**
   * @method getStatus
   * @description Retourne l'état actuel du seau.
   */
  public getStatus() {
    this.leak();
    return {
      tokens: Math.round(this.tokens * 100) / 100,
      capacity: this.capacity,
      isFull: this.tokens >= this.capacity
    };
  }
}
