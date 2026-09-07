-- ============================================================
-- PURIST Lead Intelligence Schema (v2)
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- Safe to run multiple times.
--
-- What changed from v1 (supabase-schema.sql) and why:
--
-- v1's `leads` table was a single mutable row per email: source,
-- page, status. Every new capture overwrote the previous one, so
-- there was no way to see that a lead had engaged more than once,
-- what industry they were in, or why their score (if any) was what
-- it was.
--
-- v2 adds an append-only `lead_events` table: every capture writes
-- a new event row instead of overwriting a field. Each event carries
-- its own `points`, so a lead's total score is always the sum of a
-- readable, auditable history, never an opaque number. `leads` keeps
-- a denormalized `score` / `touch_count` / `last_seen_at` for fast
-- reads (dashboard, sorting), recomputed from `lead_events` by
-- application code (see src/lib/lead-scoring.ts) every time a new
-- event is recorded.
-- ============================================================

-- ── Extend `leads` with fields the capture forms already collect
-- but previously discarded after sending the confirmation email. ──
ALTER TABLE leads ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS profession_slug TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS score INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS touch_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- ── Append-only activity log. One row per meaningful interaction. ──
CREATE TABLE IF NOT EXISTS lead_events (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id     UUID        NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event_type  TEXT        NOT NULL
                          CHECK (event_type IN (
                            'newsletter_signup',
                            'guide_download',
                            'report_download',
                            'roi_calculator',
                            'audit_request'
                          )),
  source      TEXT,
  page        TEXT,
  metadata    JSONB       DEFAULT '{}'::jsonb,
  points      INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id     ON lead_events (lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_events_created_at  ON lead_events (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_score             ON leads (score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_category          ON leads (category);

-- RLS: service role bypasses these automatically, same pattern as v1.
-- If you ever want anon inserts, add appropriate policies.
ALTER TABLE lead_events ENABLE ROW LEVEL SECURITY;
