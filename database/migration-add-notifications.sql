-- Migration: admin notification read-state
--
-- Notifications are derived from real rows (new reservations, new clients)
-- rather than duplicated into their own table, so they can never drift out of
-- sync with the data they describe. This table only records which admin user
-- has read which item.

CREATE TABLE IF NOT EXISTS notification_reads (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- What the notification points at: 'reservation' | 'client'
  source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('reservation', 'client')),
  source_id INTEGER NOT NULL,
  read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, source_type, source_id)
);

CREATE INDEX IF NOT EXISTS idx_notification_reads_user ON notification_reads(user_id);

COMMENT ON TABLE notification_reads IS 'Tracks which admin user has read which derived notification';
