-- ============================================================
-- PURIST CRM Schema (v3)
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- Safe to run multiple times.
--
-- Adds what the v1/v2 lead-intelligence schema didn't have: contact
-- fields (phone, tags, company size, last-contacted date), a generic
-- activity log for calls/meetings/notes/manual emails (so the contact
-- timeline has one place to read non-sequence activity from), and an
-- expanded lead_events type list so email-open tracking and manually
-- created contacts have a legitimate event type to record against.
-- ============================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS tags TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_size TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_contacted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_tags  ON leads USING GIN (tags);

-- ── Generic activity log: calls, meetings, notes, and manual emails. ──
-- Nurture-sequence emails stay in email_sequences (they already have
-- their own step/status model); this table covers everything else so
-- a contact's timeline can merge both sources into one chronological view.
CREATE TABLE IF NOT EXISTS contact_activities (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id     UUID        NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type        TEXT        NOT NULL CHECK (type IN ('email', 'call', 'meeting', 'note')),
  subject     TEXT,
  body        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_contact_activities_lead_id ON contact_activities (lead_id);
ALTER TABLE contact_activities ENABLE ROW LEVEL SECURITY;

-- ── Widen lead_events to allow email-open tracking (Resend webhook)
-- and manually created contacts (no capture-form event otherwise). ──
ALTER TABLE lead_events DROP CONSTRAINT IF EXISTS lead_events_event_type_check;
ALTER TABLE lead_events ADD CONSTRAINT lead_events_event_type_check CHECK (event_type IN (
  'newsletter_signup',
  'guide_download',
  'report_download',
  'roi_calculator',
  'audit_request',
  'email_opened',
  'manual_entry'
));
