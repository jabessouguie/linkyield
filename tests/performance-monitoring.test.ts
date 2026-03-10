import { HealthMonitor } from '../src/core/monitoring/health-monitor';
import { MetricsExporter } from '../src/core/monitoring/metrics-exporter';

describe('Performance Monitoring (Phase 17)', () => {
    let monitor: HealthMonitor;
    let exporter: MetricsExporter;

    beforeEach(() => {
        monitor = new HealthMonitor();
        exporter = new MetricsExporter(monitor);
    });

    it('devrait rapporter un système "healthy" par défaut', async () => {
        const health = await monitor.checkAll();
        expect(health.overallStatus).toBe('healthy');
        expect(health.components.database.status).toBe('up');
    });

    it('devrait exporter des métriques au format Prometheus', async () => {
        const output = await exporter.getPrometheusFormat();
        expect(output).toContain('synapse_database_latency');
        expect(output).toContain('synapse_analytics_latency');
        expect(output).toContain('synapse_system_status 1');
    });
});
