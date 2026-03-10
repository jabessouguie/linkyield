/**
 * @file content-scheduler.ts
 * @description Gestionnaire de planification de contenus pour LinkedIn.
 * @version 1.0.0
 * @author Synapse B2B - PM & DEV
 */

export interface ScheduledPost {
    id: string;
    text: string;
    scheduledAt: Date;
    mediaUrls?: string[];
    status: 'draft' | 'scheduled' | 'published' | 'failed';
}

/**
 * @class ContentScheduler
 * @description Gère la file d'attente de publication et le calendrier éditorial.
 */
export class ContentScheduler {
    private queue: ScheduledPost[] = [];

    /**
     * @method schedulePost
     * @description Ajoute un post au calendrier.
     */
    public schedulePost(post: ScheduledPost): void {
        console.log(`[Scheduler] Post ${post.id} planifié pour le ${post.scheduledAt.toISOString()}`);
        this.queue.push(post);
        this.queue.sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
    }

    /**
     * @method getQueue
     * @description Récupère les posts à venir.
     */
    public getPendingQueue(): ScheduledPost[] {
        return this.queue.filter(p => p.status === 'scheduled');
    }

    public markAsPublished(id: string): void {
        const post = this.queue.find(p => p.id === id);
        if (post) post.status = 'published';
    }
}
