/**
 * @file metrics-exporter.ts
 * @description Exporteur de métriques formatées pour Prometheus.
 * @version 1.0.0
 * @author Synapse B2B - DevOps
 */

import { HealthMonitor } from './health-monitor';

/**
 * @class MetricsExporter
 * @description Formate les données internes pour les outils de monitoring standards.
 */
export class MetricsExporter {
    private monitor: HealthMonitor;

    constructor(monitor: HealthMonitor) {
        this.monitor = monitor;
    }

    /**
     * @method getPrometheusFormat
     * @description Expose les métriques au format texte Prometheus.
     */
    public async getPrometheusFormat(): Promise<string> {
        const health = await this.monitor.checkAll();

        return [
            '# HELP synapse_database_latency Latence de la base transactionnelle en ms',
            '# TYPE synapse_database_latency gauge',
            `synapse_database_latency ${health.components.database.latencyMs}`,
            '',
            '# HELP synapse_analytics_latency Latence ClickHouse en ms',
            '# TYPE synapse_analytics_latency gauge',
            `synapse_analytics_latency ${health.components.analytics.latencyMs}`,
            '',
            '# HELP synapse_system_status Statut global (1=OK, 0=ERR)',
            '# TYPE synapse_system_status binary',
            `synapse_system_status ${health.overallStatus === 'healthy' ? 1 : 0}`
        ].join('\n');
    }
}
