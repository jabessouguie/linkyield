import { DataLakeExporter } from '../src/api/data/data-lake-exporter';
import { SyncScheduler } from '../src/core/data/sync-scheduler';

describe('Data Lake Bridge (Phase 28)', () => {
    let exporter: DataLakeExporter;
    let scheduler: SyncScheduler;

    beforeEach(() => {
        exporter = new DataLakeExporter();
        scheduler = new SyncScheduler(exporter);
    });

    it('devrait exécuter un export Snowflake avec succès', async () => {
        const result = await exporter.runExport({
            id: 'job_001',
            target: 'snowflake',
            workspaceId: 'ws_corp_01',
            format: 'parquet'
        });

        expect(result.success).toBe(true);
        expect(result.rowsExported).toBe(154000);
        expect(result.path).toContain('parquet');
    });

    it('devrait planifier une synchronisation quotidienne', async () => {
        const jobId = await scheduler.scheduleDailySync('ws_enterprise_x', 'bigquery');
        expect(jobId).toContain('sync_ws_enterprise_x');
    });
});
