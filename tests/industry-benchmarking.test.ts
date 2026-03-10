import { BenchmarkingService } from '../src/api/analytics/benchmarking-service';
import { IndustryDataAggregator } from '../src/core/data/industry-data-aggregator';

describe('Industry Benchmarking (Phase 31)', () => {
    let benchmark: BenchmarkingService;
    let aggregator: IndustryDataAggregator;

    beforeEach(() => {
        benchmark = new BenchmarkingService();
        aggregator = new IndustryDataAggregator();
    });

    it('devrait identifier une surperformance sectorielle', async () => {
        const result = await benchmark.comparePerformance('ws_top', 5.2, 'Tech'); // 5.2% vs 3.5%
        expect(result.percentDiff).toBeGreaterThan(40);
        expect(result.recommendation).toContain('surperformez');
    });

    it('devrait identifier une sous-performance sectorielle', async () => {
        const result = await benchmark.comparePerformance('ws_low', 1.5, 'Fintech'); // 1.5% vs 3.5%
        expect(result.percentDiff).toBeLessThan(-50);
        expect(result.recommendation).toContain('sous-performent');
    });

    it('devrait agreger des moyennes globales par secteur', async () => {
        const stats = await aggregator.getGlobalAverages('Marketing');
        expect(stats.sampleSize).toBe(45000);
        expect(stats.metrics.engagementRate).toBe(3.5);
    });
});
