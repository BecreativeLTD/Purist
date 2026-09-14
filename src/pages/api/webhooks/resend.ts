import type { APIRoute } from 'astro';
import { createSupabaseAdminClient } from '~/lib/supabase-admin';
import { recordLeadEvent } from '~/lib/lead-scoring';

export const prerender = false;

// Public endpoint (Resend calls it, it can't send an admin session cookie),
// gated by a shared secret in the URL instead of the admin allowlist.
// Resend signs webhooks with Svix under the hood; a full HMAC verification
// would be the more rigorous option, but for a low-stakes signal (a few
// extra scoring points on an email-open event) an unguessable secret in
// the endpoint URL is a reasonable, honestly-simpler tradeoff. Set
// RESEND_WEBHOOK_SECRET in Vercel and configure this exact URL
// (https://www.purist.online/api/webhooks/resend?secret=<value>) as the
// webhook endpoint in the Resend dashboard.
export const POST: APIRoute = async ({ request, url }) => {
  const secret = import.meta.env.RESEND_WEBHOOK_SECRET;
  if (!secret || url.searchParams.get('secret') !== secret) {
    return new Response('unauthorized', { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || body.type !== 'email.opened') {
    // Acknowledge every other event type without acting on it, Resend
    // retries on non-2xx responses.
    return new Response('ok', { status: 200 });
  }

  const to = Array.isArray(body.data?.to) ? body.data.to[0] : body.data?.to;
  if (!to) return new Response('ok', { status: 200 });

  const db = createSupabaseAdminClient();
  const { data: lead } = await db.from('leads').select('id').eq('email', String(to).toLowerCase()).maybeSingle();
  if (lead) {
    await recordLeadEvent({ email: String(to).toLowerCase(), eventType: 'email_opened', source: 'resend_webhook' });
  }

  return new Response('ok', { status: 200 });
};
