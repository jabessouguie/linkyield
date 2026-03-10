/**
 * @file sync-scheduler.ts
 * @description Planificateur de synchronisation périodique pour les entreprises.
 * @version 1.0.0
 * @author Synapse B2B - DevOps & Data Engineering
 */

import { DataLakeExporter, ExportJob } from '../../api/data/data-lake-exporter';

/**
 * @class SyncScheduler
 * @description Orchestre les tâches récurrentes d'export et de synchronisation des données.
 */
export class SyncScheduler {
    private exporter: DataLakeExporter;

    constructor(exporter: DataLakeExporter) {
        this.exporter = exporter;
    }

    /**
     * @method scheduleDailySync
     * @description Planifie un export quotidien automatique pour un workspace.
     */
    public async scheduleDailySync(workspaceId: string, target: 'snowflake' | 'bigquery'): Promise<string> {
        console.log(`[Scheduler] Planification Daily Sync pour ${workspaceId} vers ${target}...`);

        // Simulation de planification Cron (ex: node-cron ou service externe)-
        const jobId = `sync_${workspaceId}_${Date.now()}`;

        const job: ExportJob = {
            id: jobId,
            target,
            workspaceId,
            format: 'parquet'
        };

        const result = await this.exporter.runExport(job);
        if (result.success) {
            return jobId;
        } else {
            throw new Error(`Échec de la planification pour ${workspaceId}`);
        }
    }
}
