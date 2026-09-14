-- Sales pipeline: deals move through fixed stages, each with a default win
-- probability, so a weighted forecast (value × probability) is always
-- computable without extra manual input. Recurring deals feed the MRR KPI.
CREATE TABLE IF NOT EXISTS deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  value NUMERIC NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'new_lead' CHECK (stage IN (
    'new_lead', 'qualified', 'proposal_sent', 'negotiation', 'closed_won', 'closed_lost'
  )),
  probability INTEGER NOT NULL DEFAULT 10 CHECK (probability BETWEEN 0 AND 100),
  recurring BOOLEAN NOT NULL DEFAULT false,
  expected_close_date DATE,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deals_lead_id ON deals (lead_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals (stage);
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
