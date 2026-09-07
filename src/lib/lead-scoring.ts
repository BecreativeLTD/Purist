import { createSupabaseAdminClient } from './supabase-admin';

// ============================================================
// PURIST Lead Scoring
//
// One rule, stated once, applied everywhere: every capture route
// calls recordLeadEvent() below instead of writing to Supabase
// directly, so the formula can never drift between call sites.
//
// Base points per event type reflect purchase intent, not effort:
//   - newsletter_signup: 5   passive interest, no info given about their business
//   - guide_download:    10  downloaded a guide for their specific profession
//   - report_download:   15  read the 25-page industry report, real research intent
//   - roi_calculator:    20  entered real numbers about their own business
//   - audit_request:     30  asked directly for a paid engagement
//
// Multi-touch bonus: +10 the first time a lead triggers an event
// type they have not triggered before. A lead who both downloads
// the report and later requests an audit is a materially stronger
// signal than either action alone, repeating the SAME action again
// (e.g. downloading the report twice) earns no extra bonus, since it
// is not new information about intent.
// ============================================================

export const EVENT_TYPES = [
  'newsletter_signup',
  'guide_download',
  'report_download',
  'roi_calculator',
  'audit_request',
] as const;

export type LeadEventType = (typeof EVENT_TYPES)[number];

const BASE_POINTS: Record<LeadEventType, number> = {
  newsletter_signup: 5,
  guide_download: 10,
  report_download: 15,
  roi_calculator: 20,
  audit_request: 30,
};

const MULTI_TOUCH_BONUS = 10;

/**
 * Points a single event is worth, given the set of event types this
 * lead has already triggered before this one. Pure function, no I/O,
 * so the rule can be unit-tested or reasoned about without a database.
 */
export function computeEventPoints(
  eventType: LeadEventType,
  priorDistinctEventTypes: Set<string>,
): number {
  const base = BASE_POINTS[eventType];
  const isNewTouchType = !priorDistinctEventTypes.has(eventType);
  const bonus = isNewTouchType && priorDistinctEventTypes.size > 0 ? MULTI_TOUCH_BONUS : 0;
  return base + bonus;
}

export interface RecordLeadEventInput {
  email: string;
  eventType: LeadEventType;
  source?: string;
  page?: string;
  metadata?: Record<string, unknown>;
  /** Optional profile fields the capture form may already have on hand. */
  category?: string;
  professionSlug?: string;
  name?: string;
  company?: string;
}

/**
 * The single write path for all lead capture. Upserts the lead row
 * (creating it on first contact), inserts an auditable lead_events
 * row with its computed points, then recomputes the lead's
 * denormalized score / touch_count / last_seen_at from the full
 * event history, so those fields are always a sum you could
 * reproduce by hand from lead_events, never a number that only the
 * code remembers how it got there.
 *
 * Schedules the existing J0/J2/J5 nurture sequence exactly once per
 * lead, same behavior as the v1 upsertLead it replaces.
 */
export async function recordLeadEvent(input: RecordLeadEventInput): Promise<string | null> {
  const db = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();

  const profileUpdate: Record<string, unknown> = {
    email: input.email,
    source: input.source,
    page: input.page,
    updated_at: nowIso,
    last_seen_at: nowIso,
  };
  if (input.category) profileUpdate.category = input.category;
  if (input.professionSlug) profileUpdate.profession_slug = input.professionSlug;
  if (input.name) profileUpdate.name = input.name;
  if (input.company) profileUpdate.company = input.company;

  const { data: lead, error: upsertErr } = await db
    .from('leads')
    .upsert(profileUpdate, { onConflict: 'email' })
    .select('id, status')
    .single();

  if (upsertErr || !lead) {
    console.error('[lead-scoring] upsert failed', upsertErr?.message);
    return null;
  }

  const { data: priorEvents } = await db
    .from('lead_events')
    .select('event_type')
    .eq('lead_id', lead.id);

  const priorDistinctEventTypes = new Set((priorEvents ?? []).map((e) => e.event_type as string));
  const points = computeEventPoints(input.eventType, priorDistinctEventTypes);

  const { error: eventErr } = await db.from('lead_events').insert({
    lead_id: lead.id,
    event_type: input.eventType,
    source: input.source ?? null,
    page: input.page ?? null,
    metadata: input.metadata ?? {},
    points,
  });
  if (eventErr) console.error('[lead-scoring] event insert failed', eventErr.message);

  const { count: touchCount } = await db
    .from('lead_events')
    .select('id', { count: 'exact', head: true })
    .eq('lead_id', lead.id);

  const { data: allEvents } = await db
    .from('lead_events')
    .select('points')
    .eq('lead_id', lead.id);
  const totalScore = (allEvents ?? []).reduce((sum, e) => sum + (e.points ?? 0), 0);

  await db
    .from('leads')
    .update({ score: totalScore, touch_count: touchCount ?? 1 })
    .eq('id', lead.id);

  // Only schedule the nurture sequence for brand-new leads, same rule as v1.
  const { count: sequenceCount } = await db
    .from('email_sequences')
    .select('id', { count: 'exact', head: true })
    .eq('lead_id', lead.id);

  if ((sequenceCount ?? 0) === 0) {
    const now = new Date();
    const schedules = [
      { step: 0, offset: 0 },
      { step: 2, offset: 2 },
      { step: 5, offset: 5 },
    ].map(({ step, offset }) => {
      const at = new Date(now);
      at.setDate(at.getDate() + offset);
      if (offset > 0) at.setHours(9, 0, 0, 0);
      return {
        lead_id: lead.id,
        step,
        scheduled_at: at.toISOString(),
        status: step === 0 ? 'sent' : 'pending',
        sent_at: step === 0 ? now.toISOString() : null,
      };
    });
    const { error: seqErr } = await db.from('email_sequences').insert(schedules);
    if (seqErr) console.error('[lead-scoring] sequence insert failed', seqErr.message);
  }

  return lead.id;
}
