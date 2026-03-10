/**
 * @file anomaly-detector.ts
 * @description Détection automatique des chutes ou hausses anormales de métriques.
 * @version 1.0.0
 * @author Synapse B2B - Data Science
 */

export interface MetricStream {
    timestamp: number;
    value: number;
}

/**
 * @class AnomalyDetector
 * @description Utilise des algorithmes statistiques pour identifier les ruptures de tendance.
 */
export class AnomalyDetector {
    /**
     * @method detectDrops
     * @description Identifie si la dernière valeur chute de plus de X% par rapport à la moyenne mobile.
     */
    public static detectDrops(stream: MetricStream[], threshold: number = 0.5): boolean {
        if (stream.length < 5) return false;

        const lastValue = stream[stream.length - 1].value;
        const previousValues = stream.slice(0, -1).map(s => s.value);
        const average = previousValues.reduce((a, b) => a + b, 0) / previousValues.length;

        return lastValue < (average * (1 - threshold));
    }
}
