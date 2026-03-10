-- Création de la table de gestion des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Gestion des comptes connectés (Pages / Profils LinkedIn)
CREATE TABLE IF NOT EXISTS linkedin_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    account_urn VARCHAR(255) UNIQUE NOT NULL,    -- Identifiant LinkedIn (ex: urn:li:organization:1234)
    account_type VARCHAR(50) NOT NULL,           -- 'profile' ou 'organization'
    account_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stockage sécurisé des tokens (Devrait être chiffré dans l'applicatif)
CREATE TABLE IF NOT EXISTS oauth_tokens (
    id SERIAL PRIMARY KEY,
    linkedin_account_id INTEGER REFERENCES linkedin_accounts(id) ON DELETE CASCADE,
    access_token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stockage des segments d'audience agrégés (Firmographie)
CREATE TABLE IF NOT EXISTS audience_segments (
    id SERIAL PRIMARY KEY,
    linkedin_account_id INTEGER REFERENCES linkedin_accounts(id) ON DELETE CASCADE,
    segment_type VARCHAR(50) NOT NULL,    -- 'industry', 'company_size', 'seniority'
    segment_value VARCHAR(255) NOT NULL,
    follower_count INTEGER NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
