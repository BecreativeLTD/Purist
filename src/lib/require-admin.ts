import { createSupabaseServerClient } from './supabase';
import { isAdminEmail } from './admin';

// Shared guard for /api/admin/* routes, which sit outside src/middleware.ts's
// PROTECTED_ROUTES (that list only covers page routes). Every admin API
// route must call this before doing anything privileged.
export async function requireAdmin(request: Request): Promise<Response | null> {
  const headers = new Headers();
  const supabase = createSupabaseServerClient(request, headers);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}
