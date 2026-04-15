-- Add test users with different roles
-- Password for all test users: "password123"
-- Password hash generated with bcrypt for "password123"

-- Regular user 1
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_active)
VALUES (
  'client@test.com',
  '$2b$10$YourHashHere',
  'Jean',
  'Client',
  '+33 6 12 34 56 78',
  'user',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Regular user 2
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_active)
VALUES (
  'marie@test.com',
  '$2b$10$YourHashHere',
  'Marie',
  'Dupont',
  '+33 6 98 76 54 32',
  'user',
  true
)
ON CONFLICT (email) DO NOTHING;

-- Manager user
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_active)
VALUES (
  'manager@test.com',
  '$2b$10$YourHashHere',
  'Pierre',
  'Manager',
  '+33 6 11 22 33 44',
  'manager',
  true
)
ON CONFLICT (email) DO NOTHING;

-- NOTE: The password hash above is a placeholder.
-- Run the Node.js script below to generate the actual hashes and insert the users.
