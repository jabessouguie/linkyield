import { ContentScheduler, ScheduledPost } from '../src/api/content/content-scheduler';
import { LinkedInPublishingService } from '../src/api/content/linkedin-publishing-service';

describe('Smart Content Scheduling (Phase 30)', () => {
    let scheduler: ContentScheduler;
    let publisher: LinkedInPublishingService;

    beforeEach(() => {
        scheduler = new ContentScheduler();
        publisher = new LinkedInPublishingService();
    });

    it('devrait planifier un post et le retrouver dans la file d\'attente', () => {
        const post: ScheduledPost = {
            id: 'post_001',
            text: 'Hello LinkedIn world!',
            scheduledAt: new Date(Date.now() + 3600000), // Dans 1h
            status: 'scheduled'
        };

        scheduler.schedulePost(post);
        const queue = scheduler.getPendingQueue();

        expect(queue.length).toBe(1);
        expect(queue[0].id).toBe('post_001');
    });

    it('devrait publier un post via le service LinkedIn API', async () => {
        const post: ScheduledPost = {
            id: 'p_99',
            text: 'Content to publish',
            scheduledAt: new Date(),
            status: 'scheduled'
        };

        const result = await publisher.publishPost(post);
        expect(result.success).toBe(true);
        expect(result.linkedinUrn).toContain('published');
    });
});
