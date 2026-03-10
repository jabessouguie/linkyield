import { E2EMonitor } from '../src/core/monitoring/e2e-monitor';
import { AlertingPipeline } from '../src/core/monitoring/emergency-alerting-pipeline';

describe('Automated E2E Monitoring (Phase 34)', () => {
    let monitor: E2EMonitor;
    let alerts: AlertingPipeline;

    beforeEach(() => {
        monitor = new E2EMonitor();
        alerts = new AlertingPipeline();
    });

    it('devrait valider tous les points de passage du test synthétique', async () => {
        const results = await monitor.runSyntheticTest('qa_bot_01');
        expect(results.every(r => r.status === 'pass')).toBe(true);
        expect(results.length).toBe(3);
    });

    it('devrait dispatcher une alerte critique en cas d\'erreur', async () => {
        const result = await alerts.dispatchAlert('La synchronisation LinkedIn est interrompue', 'critical');
        expect(result).toBe(true);
    });
});
