import { LocalizationService } from '../src/core/i18n/localization-service';
import { MultiCurrencyService } from '../src/api/billing/multi-currency-service';

describe('Global Scaling & i18n (Phase 32)', () => {
    let i18n: LocalizationService;
    let billing: MultiCurrencyService;

    beforeEach(() => {
        i18n = new LocalizationService();
        billing = new MultiCurrencyService();
    });

    it('devrait traduire les clés correctement', () => {
        expect(i18n.translate('welcome', 'fr')).toBe('Bienvenue');
        expect(i18n.translate('welcome', 'en')).toBe('Welcome');
        expect(i18n.translate('dashboard_link', 'de')).toBe('Übersicht');
    });

    it('devrait formater la devise selon la locale', () => {
        // Mock simple car Intl dépend de l'environnement
        const formatted = i18n.formatCurrency(100, 'EUR', 'fr-FR');
        expect(formatted).toContain('100');
    });

    it('devrait convertir les montants correctement (Multi-currency)', () => {
        const priceInUsd = billing.convertFromBase(100, 'USD');
        expect(priceInUsd).toBe(108);

        const plan = billing.getPlanPrice(50, 'GBP');
        expect(plan.amount).toBe(42.5);
        expect(plan.currency).toBe('GBP');
    });
});
