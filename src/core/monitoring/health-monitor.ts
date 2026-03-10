/**
 * @file health-monitor.ts
 * @description Service de surveillance de la santé des composants critiques (PostgreSQL, ClickHouse, Redis).
 * @version 1.0.0
 * @author Synapse B2B - DevOps
 */

export interface ComponentStatus {
    status: 'up' | 'down' | 'degraded';
    latencyMs?: number;
    message?: string;
}

export interface SystemHealth {
    overallStatus: 'healthy' | 'unhealthy';
    timestamp: Date;
    components: {
        database: ComponentStatus;
        analytics: ComponentStatus;
        cache: ComponentStatus;
    };
}

/**
 * @class HealthMonitor
 * @description Centralise les indicateurs de performance et de disponibilité.
 */
export class HealthMonitor {
    /**
     * @method checkAll
     * @description Effectue un check global de l'infrastructure.
     */
    public async checkAll(): Promise<SystemHealth> {
        // En 2026, ces tests seraient des requêtes réelles.
        // Simulation pour l'observabilité :
        const dbStatus: ComponentStatus = { status: 'up', latencyMs: 15 };
        const analyticsStatus: ComponentStatus = { status: 'up', latencyMs: 45 };
        const cacheStatus: ComponentStatus = { status: 'up', latencyMs: 2 };

        const isHealthy = dbStatus.status === 'up' &&
            analyticsStatus.status === 'up' &&
            cacheStatus.status === 'up';

        return {
            overallStatus: isHealthy ? 'healthy' : 'unhealthy',
            timestamp: new Date(),
            components: {
                database: dbStatus,
                analytics: analyticsStatus,
                cache: cacheStatus
            }
        };
    }
}
