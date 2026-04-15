-- Migration Script: Add User Authentication and Purchase Tracking
-- This script safely updates an existing database without losing data
-- Run this if you already have a database with clients and reservations

-- 1. Add new ENUM types
DO $$ BEGIN
  CREATE TYPE purchase_status AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE product_type AS ENUM ('service', 'formation', 'consultation', 'software', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Add authentication columns to clients table (if not exists)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;

-- 3. Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  product_type product_type NOT NULL DEFAULT 'service',
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',
  duration INTEGER,
  is_active BOOLEAN DEFAULT true,
  image_url VARCHAR(500),
  features JSONB,
  metadata JSONB,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_type product_type NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',
  status purchase_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  tracking_number VARCHAR(100),
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,
  delivered_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  refunded_at TIMESTAMP
);

-- 5. Create indexes for new columns and tables
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_purchases_client_id ON purchases(client_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_tracking ON purchases(tracking_number);

-- 6. Create triggers for updated_at on new tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Insert sample products (only if table is empty)
INSERT INTO products (name, description, product_type, price, currency, duration, features, created_by)
SELECT * FROM (VALUES
  ('Consultation Transformation Digitale', 'Consultation personnalisée pour votre transformation digitale', 'consultation'::product_type, 500.00, 'TND', 120, '["Audit digital complet", "Stratégie personnalisée", "Plan d''action détaillé", "Suivi mensuel"]'::jsonb, 1),
  ('Formation Marketing Digital', 'Formation complète en marketing digital pour votre équipe', 'formation'::product_type, 1200.00, 'TND', 480, '["4 jours de formation", "Support de cours", "Certification", "Accès plateforme e-learning"]'::jsonb, 1),
  ('Développement Site Web E-commerce', 'Création de site e-commerce complet', 'service'::product_type, 3500.00, 'TND', NULL, '["Design responsive", "Paiement en ligne", "Gestion des stocks", "Dashboard admin", "SEO optimisé"]'::jsonb, 1),
  ('CRM sur mesure', 'Solution CRM personnalisée pour votre entreprise', 'software'::product_type, 2800.00, 'TND', NULL, '["Gestion clients", "Pipeline des ventes", "Automatisation", "Reporting avancé", "Intégrations"]'::jsonb, 1),
  ('Formation React & Next.js', 'Formation développement web moderne', 'formation'::product_type, 900.00, 'TND', 360, '["3 jours intensifs", "Projets pratiques", "Certification", "Support post-formation"]'::jsonb, 1)
) AS v(name, description, product_type, price, currency, duration, features, created_by)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

-- 8. Add comments
COMMENT ON TABLE products IS 'Products and services catalog';
COMMENT ON TABLE purchases IS 'Client purchases and orders tracking';
COMMENT ON COLUMN clients.password_hash IS 'Hashed password for client authentication';
COMMENT ON COLUMN clients.email_verified IS 'Whether the client email has been verified';
COMMENT ON COLUMN clients.last_login IS 'Timestamp of last successful login';

-- Migration completed successfully!
SELECT 'Migration completed! Client authentication and purchase tracking have been added.' AS status;
