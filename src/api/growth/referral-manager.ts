/**
 * @file referral-manager.ts
 * @description Moteur de gestion des parrainages et des récompenses de quotas.
 * @version 1.0.0
 * @author Synapse B2B - Growth Engineering
 */

export interface ReferralRecord {
    referrerUserId: string;
    referredUserId: string;
    status: 'pending' | 'converted';
    rewardGranted: boolean;
}

/**
 * @class ReferralManager
 * @description Gère l'acquisition de nouveaux utilisateurs via les boucles de parrainage.
 */
export class ReferralManager {
    private referrals: ReferralRecord[] = [];

    /**
     * @method generateReferralLink
     * @description Crée un lien de parrainage unique pour un utilisateur.
     */
    public generateReferralLink(userId: string): string {
        return `https://synapse-b2b.io/signup?ref=${Buffer.from(userId).toString('base64')}`;
    }

    /**
     * @method trackSignup
     * @description Enregistre une conversion de parrainage et active les récompenses.
     */
    public trackSignup(referrerId: string, referredId: string): void {
        console.log(`[Growth] Conversion détectée : ${referredId} parrainé par ${referrerId}`);
        this.referrals.push({
            referrerUserId: referrerId,
            referredUserId: referredId,
            status: 'converted',
            rewardGranted: true
        });

        // Attribution de bonus de quota (ex: +500 API calls)
        this.grantReward(referrerId);
    }

    private grantReward(userId: string): void {
        console.log(`[Billing] Récompense de quota attribuée à l'utilisateur ${userId}`);
    }

    public getConversionCount(userId: string): number {
        return this.referrals.filter(r => r.referrerUserId === userId && r.status === 'converted').length;
    }
}
