/**
 * @file multi-currency-service.ts
 * @description Service de gestion des paiements et de facturation multi-devises (Stripe).
 * @version 1.0.0
 * @author Synapse B2B - CFO
 */

/**
 * @class MultiCurrencyService
 * @description Calcule les conversions et gère les plans tarifaires internationaux.
 */
export class MultiCurrencyService {
    private exchangeRates: Record<string, number> = {
        'EUR': 1.0,
        'USD': 1.08,
        'GBP': 0.85
    };

    /**
     * @method convertFromBase
     * @description Convertit un montant EUR vers une devise cible.
     */
    public convertFromBase(amountInEur: number, targetCurrency: string): number {
        const rate = this.exchangeRates[targetCurrency] || 1;
        return parseFloat((amountInEur * rate).toFixed(2));
    }

    /**
     * @method getPlanPrice
     * @description Retourne le prix localisé d'un plan d'abonnement.
     */
    public getPlanPrice(basePriceEur: number, currency: string): { amount: number; currency: string } {
        return {
            amount: this.convertFromBase(basePriceEur, currency),
            currency
        };
    }
}
