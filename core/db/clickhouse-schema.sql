-- Création de la base de données analysée par l'application
CREATE DATABASE IF NOT EXISTS synapse_analytics;

-- Table optimisée pour les requêtes analytiques massives sur les performances des posts (MergeTree)
CREATE TABLE IF NOT EXISTS synapse_analytics.post_metrics (
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
ORDER BY (account_urn, published_date, post_urn)
SETTINGS index_granularity = 8192;
