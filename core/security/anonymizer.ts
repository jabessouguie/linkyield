/**
 * @file anonymizer.ts
 * @description Module d'anonymisation des données personnelles (PII) conformément au RGPD.
 * @version 1.0.0
 * @author Synapse B2B - Legal & Security
 */

import { createHash } from 'crypto';

/**
 * @class Anonymizer
 * @description Fournit des utilitaires pour pseudonymiser les identifiants utilisateur.
 */
export class Anonymizer {
    /**
     * @method anonymizeId
     * @description Hache un identifiant (ex: URN LinkedIn) pour le rendre non-identifiable.
     * @param {string} id - L'identifiant brut (ex: urn:li:person:ABC123)
     * @param {string} salt - Sel cryptographique pour éviter les attaques par dictionnaire.
     * @returns {string} L'identifiant haché (pseudo-anonymisé).
     */
    public static anonymizeId(id: string, salt: string = 'synapse_default_salt'): string {
        if (!id) return '';
        return createHash('sha256')
            .update(id + salt)
            .digest('hex');
    }

    /**
     * @method anonymizeBatch
     * @description Applique l'anonymisation sur un tableau d'identifiants.
     */
    public static anonymizeBatch(ids: string[], salt?: string): string[] {
        return ids.map(id => this.anonymizeId(id, salt));
    }
}
