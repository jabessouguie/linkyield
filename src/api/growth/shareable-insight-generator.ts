/**
 * @file shareable-insight-generator.ts
 * @description Générateur d'assets visuels et textuels optimisés pour le partage social.
 * @version 1.0.0
 * @author Synapse B2B - Growth & UX
 */

export interface SocialAsset {
    id: string;
    imageUrl: string;
    caption: string;
    ctaUrl: string;
}

/**
 * @class ShareableInsightGenerator
 * @description Transforme les insights de performance en "cards" partageables sur LinkedIn.
 */
export class ShareableInsightGenerator {
    /**
     * @method generateCard
     * @description Crée un asset de partage pour un insight spécifique.
     */
    public generateCard(workspaceId: string, insightText: string): SocialAsset {
        console.log(`[Viral] Génération de la card de partage pour le workspace ${workspaceId}...`);

        const shortHash = Buffer.from(insightText).toString('hex').substring(0, 8);

        return {
            id: `social_${shortHash}`,
            imageUrl: `https://cdn.synapse-b2b.io/assets/${workspaceId}/insight_${shortHash}.png`,
            caption: `🚀 Mon analyse LinkedIn avec Synapse B2B : ${insightText}`,
            ctaUrl: `https://synapse-b2b.io/showcase/${workspaceId}`
        };
    }
}
