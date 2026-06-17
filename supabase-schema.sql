-- ============================================================
-- PURIST — Lead Nurture Schema
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT        NOT NULL,
  source      TEXT,
  page        TEXT,
  status      TEXT        DEFAULT 'active'
                          CHECK (status IN ('active', 'unsubscribed', 'converted')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS email_sequences (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id      UUID        NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  step         INTEGER     NOT NULL CHECK (step IN (0, 2, 5)),
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at      TIMESTAMPTZ,
  status       TEXT        DEFAULT 'pending'
                           CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Index used by the daily cron job
CREATE INDEX IF NOT EXISTS idx_email_sequences_pending
  ON email_sequences (scheduled_at, status)
  WHERE status = 'pending';

-- RLS: service role bypasses these automatically.
-- If you ever want anon inserts, add appropriate policies.
ALTER TABLE leads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
