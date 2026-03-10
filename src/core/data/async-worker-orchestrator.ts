/**
 * @file async-worker-orchestrator.ts
 * @description Orchestrateur de tâches asynchrones pour l'ingestion massive ClickHouse.
 * @version 1.0.0
 * @author Synapse B2B - Data Engineering & DevOps
 */

import { TokenBucketLimiter } from './token-bucket-limiter';

export interface IngestionJob {
    id: string;
    targetUrn: string;
    priority: number;
    payload: any;
}

/**
 * @class AsyncWorkerOrchestrator
 * @description Gère l'exécution des jobs d'ingestion en respectant les contraintes de ressources et de quotas.
 */
export class AsyncWorkerOrchestrator {
    private queue: IngestionJob[] = [];
    private limiter: TokenBucketLimiter;

    constructor(limiter: TokenBucketLimiter) {
        this.limiter = limiter;
    }

    /**
     * @method scheduleJob
     * @description Ajoute un job à la file d'attente prioritaire.
     */
    public scheduleJob(job: IngestionJob): void {
        this.queue.push(job);
        this.queue.sort((a, b) => b.priority - a.priority);
        console.log(`[Orchestrator] Job ${job.id} planifié pour ${job.targetUrn} (Prio: ${job.priority})`);
    }

    /**
     * @method processNext
     * @description Traite le prochain job si les quotas le permettent.
     */
    public async processBatch(batchSize: number = 5): Promise<string[]> {
        const processedIds: string[] = [];
        let count = 0;

        while (count < batchSize && this.queue.length > 0) {
            if (this.limiter.tryConsume()) {
                const job = this.queue.shift();
                if (job) {
                    console.log(`[Worker] Traitement du job ${job.id}...`);
                    // Simulation d'ingestion ClickHouse
                    processedIds.push(job.id);
                    count++;
                }
            } else {
                console.warn("[Orchestrator] Quota API atteint. Pause du batch.");
                break;
            }
        }
        return processedIds;
    }

    public getQueueLength(): number {
        return this.queue.length;
    }
}
