-- IMBT Consulting Database Schema
-- PostgreSQL Database Setup Script

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- Create ENUM types
DROP TYPE IF EXISTS reservation_status CASCADE;
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

DROP TYPE IF EXISTS service_type CASCADE;
CREATE TYPE service_type AS ENUM (
  'conseil_transformation_digitale',
  'developpement_web',
  'formations_digitales',
  'crm_gestion',
  'erp_gestion',
  'marketing_digital'
);

DROP TYPE IF EXISTS user_role CASCADE;
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'agent');

DROP TYPE IF EXISTS purchase_status CASCADE;
CREATE TYPE purchase_status AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded');

DROP TYPE IF EXISTS product_type CASCADE;
CREATE TYPE product_type AS ENUM ('service', 'formation', 'consultation', 'software', 'other');

-- Users table (for admin authentication)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role user_role NOT NULL DEFAULT 'agent',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table (now with authentication capability)
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- Nullable for backward compatibility with existing clients
  phone VARCHAR(20),
  company VARCHAR(200),
  position VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Tunisia',
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations table
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,

  -- Client information (denormalized for quick access)
  client_name VARCHAR(200) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  client_company VARCHAR(200),

  -- Reservation details
  service service_type NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 60, -- in minutes

  -- Status and tracking
  status reservation_status DEFAULT 'pending',
  message TEXT,
  admin_notes TEXT,

  -- Assignment
  assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Settings table (key-value pairs for application configuration)
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  category VARCHAR(50) DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
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
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
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
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_company ON clients(company);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);

CREATE INDEX idx_reservations_client_id ON reservations(client_id);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_date ON reservations(date DESC);
CREATE INDEX idx_reservations_service ON reservations(service);
CREATE INDEX idx_reservations_created_at ON reservations(created_at DESC);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_settings_key ON settings(key);
CREATE INDEX idx_settings_category ON settings(category);

CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

CREATE INDEX idx_purchases_client_id ON purchases(client_id);
CREATE INDEX idx_purchases_product_id ON purchases(product_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_created_at ON purchases(created_at DESC);
CREATE INDEX idx_purchases_tracking ON purchases(tracking_number);

-- Create function to update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@imbt-consulting.com', '$2b$10$GXRbzqWoiAPSamAAHDgnKO2r3qUtMyva8liLsXzi.V.o.QKkjU/OO', 'Admin', 'IMBT', 'admin'),
('manager@imbt-consulting.com', '$2b$10$GXRbzqWoiAPSamAAHDgnKO2r3qUtMyva8liLsXzi.V.o.QKkjU/OO', 'Manager', 'IMBT', 'manager');

-- Insert some sample clients
INSERT INTO clients (first_name, last_name, email, phone, company, position, city, country) VALUES
('Mohamed', 'Ben Ali', 'mohamed.benali@example.com', '+216 98 123 456', 'TechCorp Tunisia', 'CEO', 'Tunis', 'Tunisia'),
('Fatima', 'Mansouri', 'fatima.mansouri@example.com', '+216 97 234 567', 'Digital Solutions', 'CTO', 'Sfax', 'Tunisia'),
('Ahmed', 'Khalil', 'ahmed.khalil@example.com', '+216 96 345 678', 'Startup Innovate', 'Founder', 'Sousse', 'Tunisia'),
('Leila', 'Trabelsi', 'leila.trabelsi@example.com', '+216 95 456 789', 'Marketing Pro', 'Marketing Director', 'Tunis', 'Tunisia'),
('Karim', 'Sassi', 'karim.sassi@example.com', '+216 94 567 890', 'E-Commerce Plus', 'Project Manager', 'Nabeul', 'Tunisia');

-- Insert some sample reservations
INSERT INTO reservations (client_id, client_name, client_email, client_phone, client_company, service, service_name, date, time, status, message) VALUES
(1, 'Mohamed Ben Ali', 'mohamed.benali@example.com', '+216 98 123 456', 'TechCorp Tunisia', 'conseil_transformation_digitale', 'Conseil en Transformation Digitale', '2025-01-15', '10:00:00', 'confirmed', 'Besoin d''aide pour notre transformation digitale'),
(2, 'Fatima Mansouri', 'fatima.mansouri@example.com', '+216 97 234 567', 'Digital Solutions', 'developpement_web', 'Développement Web & Applications', '2025-01-16', '14:00:00', 'pending', 'Développement d''une application e-commerce'),
(3, 'Ahmed Khalil', 'ahmed.khalil@example.com', '+216 96 345 678', 'Startup Innovate', 'formations_digitales', 'Formations Digitales', '2025-01-18', '09:00:00', 'confirmed', 'Formation pour notre équipe'),
(4, 'Leila Trabelsi', 'leila.trabelsi@example.com', '+216 95 456 789', 'Marketing Pro', 'marketing_digital', 'Marketing Digital', '2025-01-20', '11:00:00', 'pending', 'Campagne marketing digital'),
(5, 'Karim Sassi', 'karim.sassi@example.com', '+216 94 567 890', 'E-Commerce Plus', 'crm_gestion', 'CRM - Gestion de la Relation Client', '2025-01-22', '15:00:00', 'completed', 'Implémentation CRM');

-- Insert default settings
INSERT INTO settings (key, value, category, description, is_public) VALUES
('company_name', 'IMBT Consulting', 'general', 'Company name', true),
('company_email', 'contact@imbt-consulting.com', 'general', 'Contact email', true),
('company_phone', '+216 XX XXX XXX', 'general', 'Contact phone', true),
('company_address', 'Immeuble Omar bloc A bureau 3-2 Montplaisir 1073, Tunis, Tunisia', 'general', 'Company address', true),
('business_hours', '{"monday": "9:00-18:00", "tuesday": "9:00-18:00", "wednesday": "9:00-18:00", "thursday": "9:00-18:00", "friday": "9:00-18:00", "saturday": "Closed", "sunday": "Closed"}', 'general', 'Business hours', true),
('max_reservations_per_day', '10', 'reservations', 'Maximum reservations per day', false),
('default_consultation_duration', '60', 'reservations', 'Default consultation duration in minutes', false),
('auto_confirm_reservations', 'false', 'reservations', 'Auto-confirm new reservations', false),
('notification_email', 'notifications@imbt-consulting.com', 'notifications', 'Email for notifications', false),
('enable_sms_notifications', 'false', 'notifications', 'Enable SMS notifications', false);

-- Insert sample products
INSERT INTO products (name, description, product_type, price, currency, duration, features, created_by) VALUES
('Consultation Transformation Digitale', 'Consultation personnalisée pour votre transformation digitale', 'consultation', 500.00, 'TND', 120, '["Audit digital complet", "Stratégie personnalisée", "Plan d''action détaillé", "Suivi mensuel"]'::jsonb, 1),
('Formation Marketing Digital', 'Formation complète en marketing digital pour votre équipe', 'formation', 1200.00, 'TND', 480, '["4 jours de formation", "Support de cours", "Certification", "Accès plateforme e-learning"]'::jsonb, 1),
('Développement Site Web E-commerce', 'Création de site e-commerce complet', 'service', 3500.00, 'TND', NULL, '["Design responsive", "Paiement en ligne", "Gestion des stocks", "Dashboard admin", "SEO optimisé"]'::jsonb, 1),
('CRM sur mesure', 'Solution CRM personnalisée pour votre entreprise', 'software', 2800.00, 'TND', NULL, '["Gestion clients", "Pipeline des ventes", "Automatisation", "Reporting avancé", "Intégrations"]'::jsonb, 1),
('Formation React & Next.js', 'Formation développement web moderne', 'formation', 900.00, 'TND', 360, '["3 jours intensifs", "Projets pratiques", "Certification", "Support post-formation"]'::jsonb, 1);

-- Insert sample purchases
INSERT INTO purchases (client_id, product_id, product_name, product_type, quantity, unit_price, total_price, currency, status, payment_method, tracking_number, paid_at) VALUES
(1, 1, 'Consultation Transformation Digitale', 'consultation', 1, 500.00, 500.00, 'TND', 'completed', 'bank_transfer', 'TRK-2025-001', '2025-01-10 14:30:00'),
(3, 2, 'Formation Marketing Digital', 'formation', 1, 1200.00, 1200.00, 'TND', 'processing', 'credit_card', 'TRK-2025-002', '2025-01-12 10:15:00'),
(5, 4, 'CRM sur mesure', 'software', 1, 2800.00, 2800.00, 'TND', 'completed', 'bank_transfer', 'TRK-2025-003', '2024-12-20 16:45:00');

-- Create a view for reservation statistics
CREATE OR REPLACE VIEW reservation_stats AS
SELECT
  COUNT(*) as total_reservations,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_reservations,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_reservations,
  COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_reservations,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_reservations,
  COUNT(*) FILTER (WHERE date >= CURRENT_DATE) as upcoming_reservations,
  COUNT(*) FILTER (WHERE date >= CURRENT_DATE - INTERVAL '7 days') as reservations_last_week,
  COUNT(*) FILTER (WHERE date >= CURRENT_DATE - INTERVAL '30 days') as reservations_last_month
FROM reservations;

-- Create a view for service popularity
CREATE OR REPLACE VIEW service_popularity AS
SELECT
  service,
  service_name,
  COUNT(*) as reservation_count,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
  ROUND(AVG(duration)) as avg_duration
FROM reservations
GROUP BY service, service_name
ORDER BY reservation_count DESC;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

COMMENT ON TABLE users IS 'Admin users with different roles';
COMMENT ON TABLE clients IS 'Client information with authentication capability';
COMMENT ON TABLE reservations IS 'Service reservations/consultations';
COMMENT ON TABLE settings IS 'Application configuration settings';
COMMENT ON TABLE products IS 'Products and services catalog';
COMMENT ON TABLE purchases IS 'Client purchases and orders tracking';
