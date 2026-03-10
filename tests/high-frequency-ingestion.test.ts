import { TokenBucketLimiter } from '../src/core/data/token-bucket-limiter';
import { AsyncWorkerOrchestrator, IngestionJob } from '../src/core/data/async-worker-orchestrator';

describe('High-Frequency Ingestion (Phase 25)', () => {
    describe('TokenBucketLimiter', () => {
        it('devrait autoriser la consommation de jetons jusqu\'à épuisement', () => {
            const limiter = new TokenBucketLimiter(2, 1);
            expect(limiter.tryConsume()).toBe(true);
            expect(limiter.tryConsume()).toBe(true);
            expect(limiter.tryConsume()).toBe(false);
        });

        it('devrait se recharger avec le temps', async () => {
            const limiter = new TokenBucketLimiter(1, 10); // Recharge 10 jetons/sec
            limiter.tryConsume();
            expect(limiter.tryConsume()).toBe(false);

            await new Promise(resolve => setTimeout(resolve, 150)); // Attendre 150ms -> +1.5 jetons
            expect(limiter.tryConsume()).toBe(true);
        });
    });

    describe('AsyncWorkerOrchestrator', () => {
        let orchestrator: AsyncWorkerOrchestrator;
        let limiter: TokenBucketLimiter;

        beforeEach(() => {
            limiter = new TokenBucketLimiter(10, 5);
            orchestrator = new AsyncWorkerOrchestrator(limiter);
        });

        it('devrait traiter les jobs par ordre de priorité', async () => {
            orchestrator.scheduleJob({ id: 'low', targetUrn: 'u1', priority: 1, payload: {} });
            orchestrator.scheduleJob({ id: 'high', targetUrn: 'u2', priority: 10, payload: {} });

            const processed = await orchestrator.processBatch(2);
            expect(processed[0]).toBe('high');
            expect(processed[1]).toBe('low');
        });

        it('devrait respecter la limitation de débit (Token Bucket)', async () => {
            const strictLimiter = new TokenBucketLimiter(1, 0); // Pas de recharge
            const limitedOrchestrator = new AsyncWorkerOrchestrator(strictLimiter);

            limitedOrchestrator.scheduleJob({ id: 'j1', targetUrn: 'u1', priority: 1, payload: {} });
            limitedOrchestrator.scheduleJob({ id: 'j2', targetUrn: 'u2', priority: 1, payload: {} });

            const processed = await limitedOrchestrator.processBatch(5);
            expect(processed.length).toBe(1); // Seul j1 passe
            expect(limitedOrchestrator.getQueueLength()).toBe(1); // j2 reste en file
        });
    });
});
