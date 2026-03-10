/**
 * @file report-builder.ts
 * @description Générateur de structures de rapports analytiques "Marque Blanche".
 * @version 1.0.0
 * @author Synapse B2B - Product Management & UX
 */

export interface ReportConfig {
    title: string;
    brandName: string;
    logoUrl?: string;
    sections: ('performance' | 'audience' | 'roi' | 'benchmarking')[];
}

export interface ReportStructure {
    id: string;
    generatedAt: Date;
    config: ReportConfig;
    data: any;
}

/**
 * @class ReportBuilder
 * @description Construit l'objet structuré nécessaire à la génération PDF/Email.
 */
export class ReportBuilder {
    /**
     * @method buildReport
     * @description Agrège les données pour un rapport complet.
     */
    public async buildReport(config: ReportConfig, metricsData: any): Promise<ReportStructure> {
        return {
            id: `REP_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            generatedAt: new Date(),
            config,
            data: metricsData // Simulé: Normalement on filtrerait selon les sections demandées
        };
    }

    /**
     * @method formatForWhiteLabel
     * @description Applique les attributs visuels de la marque blanche.
     */
    public formatForWhiteLabel(structure: ReportStructure): string {
        return `Rapport ${structure.config.title} pour ${structure.config.brandName}. Généré le ${structure.generatedAt.toLocaleDateString()}`;
    }
}
