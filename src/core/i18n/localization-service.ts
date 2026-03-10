/**
 * @file localization-service.ts
 * @description Moteur d'internationalisation (i18n) pour Synapse B2B.
 * @version 1.0.0
 * @author Synapse B2B - Senior Fullstack
 */

export type SupportedLocale = 'fr' | 'en' | 'de' | 'es';

/**
 * @class LocalizationService
 * @description Gère les traductions et le formatage des données selon la locale de l'utilisateur.
 */
export class LocalizationService {
    private translations: Record<SupportedLocale, Record<string, string>> = {
        fr: { welcome: 'Bienvenue', dashboard_link: 'Tableau de bord' },
        en: { welcome: 'Welcome', dashboard_link: 'Dashboard' },
        de: { welcome: 'Willkommen', dashboard_link: 'Übersicht' },
        es: { welcome: 'Bienvenido', dashboard_link: 'Tablero' }
    };

    /**
     * @method translate
     * @description Récupère la traduction d'une clé pour une locale donnée.
     */
    public translate(key: string, locale: SupportedLocale): string {
        return this.translations[locale][key] || key;
    }

    /**
     * @method formatCurrency
     * @description Formate un montant selon la locale et la devise.
     */
    public formatCurrency(amount: number, currency: string, locale: string): string {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
    }
}
