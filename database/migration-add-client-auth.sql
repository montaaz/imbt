-- Migration to add authentication fields to clients table
-- This allows clients to have accounts and login

-- Add password_hash column for client authentication
ALTER TABLE clients ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Add email_verified column to track email verification status
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;

-- Add last_login column to track when client last logged in
ALTER TABLE clients ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;

COMMENT ON COLUMN clients.password_hash IS 'Hashed password for client authentication';
COMMENT ON COLUMN clients.email_verified IS 'Whether the client email has been verified';
COMMENT ON COLUMN clients.last_login IS 'Last login timestamp for the client';
