/**
 * @file analytics-schema-v2.sql
 * @description Migration du schéma ClickHouse vers SummingMergeTree pour l'agrégation haute performance.
 * @version 2.0.0
 * @author Synapse B2B - Data Engineering
 */

/*
  CONTEXTE :
  Le moteur SummingMergeTree fusionne toutes les lignes avec la même clé de tri (ORDER BY) 
  en remplaçant les valeurs des colonnes numériques par leur somme. 
  Indispensable pour calculer les totaux de reach et d'engagement sans scanner des milliards de lignes.
*/

CREATE TABLE IF NOT EXISTS synapse_analytics.post_metrics_aggregated (
    workspace_id String,
    post_urn String,
    event_date Date,
    -- Dimensions pour le filtrage
    industry String,
    content_type Enum8('image' = 1, 'video' = 2, 'article' = 3, 'poll' = 4),
    -- Métriques à sommer
    impressions UInt64,
    clicks UInt64,
    reactions UInt64,
    comments UInt64,
    shares UInt64
) 
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (workspace_id, post_urn, event_date, industry, content_type);
