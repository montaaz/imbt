-- Migration: password reset tokens
-- Supports both staff accounts (users) and customer accounts (clients).

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id SERIAL PRIMARY KEY,
  -- Only the SHA-256 hash of the token is stored, never the token itself.
  token_hash VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  -- 'user' = staff account, 'client' = customer account
  account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('user', 'client')),
  account_id INTEGER NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_password_reset_token_hash ON password_reset_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_password_reset_email ON password_reset_tokens(email);
CREATE INDEX IF NOT EXISTS idx_password_reset_expires ON password_reset_tokens(expires_at);

COMMENT ON TABLE password_reset_tokens IS 'Single-use, time-limited password reset tokens';
COMMENT ON COLUMN password_reset_tokens.token_hash IS 'SHA-256 hash of the reset token sent to the user';
COMMENT ON COLUMN password_reset_tokens.used_at IS 'Set once the token has been consumed; prevents reuse';
