-- Création de la base de données analysée par l'application
CREATE DATABASE IF NOT EXISTS synapse_analytics;

-- Table optimisée pour les requêtes analytiques massives sur les performances des posts (MergeTree)
CREATE TABLE IF NOT EXISTS synapse_analytics.post_metrics (
    workspace_id UUID,
    post_urn String,                     -- ID Unique du post LinkedIn
    account_urn String,                  -- ID du créateur ou de la page
    post_type String,                    -- Type de contenu (video, document, image, text)
    published_date DateTime,             -- Date de publication
    
    -- Métriques absolues
    impressions UInt32,
    reach UInt32,
    
    -- Interactions (Engagement)
    likes UInt32,
    comments UInt32,
    shares UInt32,
    clicks UInt32,
    
    -- Calculs de performances pré-agrégés (optionnel, mais pratique en OLAP)
    engagement_rate Float32,            -- (Interactions Totales / Impressions) * 100
    
    -- Métadonnées de persistance
    ingested_at DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(published_date)
ORDER BY (workspace_id, account_urn, published_date, post_urn)
SETTINGS index_granularity = 8192;

-- Table pour le benchmarking concurrentiel (Données publiques uniquement)
CREATE TABLE IF NOT EXISTS synapse_analytics.competitor_metrics (
    workspace_id UUID,
    competitor_urn String,               -- ID de la page concurrente
    post_urn String,                     -- ID du post concurrent
    published_date DateTime,
    
    likes UInt32,
    comments UInt32,
    shares UInt32,
    
    ingested_at DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (workspace_id, competitor_urn, published_date)
SETTINGS index_granularity = 8192;

-- Table pour l'attribution de revenus et le ROI (Données calculées)
CREATE TABLE IF NOT EXISTS synapse_analytics.revenue_attribution (
    workspace_id UUID,
    account_urn String,
    period_start DateTime,
    period_end DateTime,
    
    total_engagements UInt32,
    estimated_revenue_value Float64,
    allocated_budget Float64,
    roi_percentage Float32,
    
    calculated_at DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (workspace_id, account_urn, period_start)
SETTINGS index_granularity = 8192;
