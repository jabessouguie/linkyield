/**
 * @file insight-generator.ts
 * @description Générateur d'insights stratégiques utilisant l'IA (grounding sur données réelles).
 * @version 1.0.0
 * @author Synapse B2B - Prompt Engineering
 */

export interface PerformanceSnapshot {
    topPostUrn: string;
    averageResonance: number;
    viralContentDetect: boolean;
    industry: string;
}

export interface StrategicInsight {
    recommendation: string;
    rationale: string;
    impact: 'low' | 'medium' | 'high';
}

/**
 * @class InsightGenerator
 * @description Transforme les métriques brutes en conseils actionnables via LLM.
 */
export class InsightGenerator {
    /**
     * @method generatePrompt
     * @description Construit le prompt structuré (Chain-of-Thought) pour le LLM.
     */
    public static generatePrompt(snapshot: PerformanceSnapshot): string {
        return `
            En tant qu'expert en marketing B2B pour le secteur ${snapshot.industry}, 
            analyse les données suivantes LinkedIn :
            - Score de Résonance Moyen : ${snapshot.averageResonance}
            - Contenu Viral Détecté : ${snapshot.viralContentDetect ? 'OUI' : 'NON'}
            - Top Post (ID) : ${snapshot.topPostUrn}

            Objectif : Fournir 1 recommandation prioritaire pour la semaine prochaine.
            Format de sortie : JSON { recommendation: string, rationale: string, impact: string }
        `.trim();
    }

    /**
     * @method getRecommendations
     * @description Simule l'appel au LLM et retourne l'insight métier.
     */
    public async getRecommendations(snapshot: PerformanceSnapshot): Promise<StrategicInsight> {
        // En 2025, nous utiliserions un connecteur Gemini/OpenAI ici.
        // Simulation pour le walkthrough :
        if (snapshot.viralContentDetect) {
            return {
                recommendation: "Dupliquez le format du top post (" + snapshot.topPostUrn + ")",
                rationale: "Votre dernier contenu a généré un pic de résonance 3x supérieur à la moyenne du secteur " + snapshot.industry + ".",
                impact: 'high'
            };
        }

        return {
            recommendation: "Augmentez la fréquence de publication le mardi matin.",
            rationale: "Les données d'audience montrent un pic de réactivité à 10h CET.",
            impact: 'medium'
        };
    }
}
