-- Migration to add purchases and products tables
-- This migration creates the purchases functionality

-- Create purchase_status enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE purchase_status AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create product_type enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE product_type AS ENUM ('service', 'formation', 'consultation', 'software', 'other');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  product_type product_type NOT NULL DEFAULT 'service',
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',
  duration INTEGER, -- Duration in minutes (for services/consultations)
  is_active BOOLEAN DEFAULT true,
  image_url VARCHAR(500),
  features JSONB, -- Store product features as JSON array
  metadata JSONB, -- Additional product metadata
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table
-- NOTE: client_id can reference either users table or clients table
-- We'll store it as an integer and handle the relationship in the application
CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL, -- References either users(id) or clients(id)
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,

  -- Purchase details
  product_name VARCHAR(255) NOT NULL,
  product_type product_type NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',

  -- Status and tracking
  status purchase_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  tracking_number VARCHAR(100),

  -- Notes
  notes TEXT,
  admin_notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,
  delivered_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  refunded_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_purchases_client_id ON purchases(client_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_tracking ON purchases(tracking_number);

-- Create trigger for updated_at on products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for updated_at on purchases
DROP TRIGGER IF EXISTS update_purchases_updated_at ON purchases;
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (name, description, product_type, price, currency, duration, features, created_by)
VALUES
('Consultation Transformation Digitale', 'Consultation personnalisée pour votre transformation digitale', 'consultation', 500.00, 'TND', 120, '["Audit digital complet", "Stratégie personnalisée", "Plan d''action détaillé", "Suivi mensuel"]'::jsonb, 1),
('Formation Marketing Digital', 'Formation complète en marketing digital pour votre équipe', 'formation', 1200.00, 'TND', 480, '["4 jours de formation", "Support de cours", "Certification", "Accès plateforme e-learning"]'::jsonb, 1),
('Développement Site Web E-commerce', 'Création de site e-commerce complet', 'service', 3500.00, 'TND', NULL, '["Design responsive", "Paiement en ligne", "Gestion des stocks", "Dashboard admin", "SEO optimisé"]'::jsonb, 1),
('CRM sur mesure', 'Solution CRM personnalisée pour votre entreprise', 'software', 2800.00, 'TND', NULL, '["Gestion clients", "Pipeline des ventes", "Automatisation", "Reporting avancé", "Intégrations"]'::jsonb, 1),
('Formation React & Next.js', 'Formation développement web moderne', 'formation', 900.00, 'TND', 360, '["3 jours intensifs", "Projets pratiques", "Certification", "Support post-formation"]'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- Add some sample purchases for the test users
-- Note: We're using user IDs from the users table
DO $$
DECLARE
  client_user_id INTEGER;
  marie_user_id INTEGER;
BEGIN
  -- Get the user IDs
  SELECT id INTO client_user_id FROM users WHERE email = 'client@test.com';
  SELECT id INTO marie_user_id FROM users WHERE email = 'marie@test.com';

  -- Insert sample purchases if users exist
  IF client_user_id IS NOT NULL THEN
    INSERT INTO purchases (client_id, product_id, product_name, product_type, quantity, unit_price, total_price, currency, status, payment_method, tracking_number, paid_at)
    VALUES
    (client_user_id, 1, 'Consultation Transformation Digitale', 'consultation', 1, 500.00, 500.00, 'TND', 'completed', 'bank_transfer', 'TRK-2025-001', '2025-01-10 14:30:00'),
    (client_user_id, 5, 'Formation React & Next.js', 'formation', 1, 900.00, 900.00, 'TND', 'processing', 'credit_card', 'TRK-2025-004', NOW())
    ON CONFLICT DO NOTHING;
  END IF;

  IF marie_user_id IS NOT NULL THEN
    INSERT INTO purchases (client_id, product_id, product_name, product_type, quantity, unit_price, total_price, currency, status, payment_method, tracking_number, paid_at)
    VALUES
    (marie_user_id, 2, 'Formation Marketing Digital', 'formation', 1, 1200.00, 1200.00, 'TND', 'completed', 'bank_transfer', 'TRK-2025-002', '2025-01-12 10:15:00')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

COMMENT ON TABLE products IS 'Products and services catalog';
COMMENT ON TABLE purchases IS 'Client purchases and orders tracking';
