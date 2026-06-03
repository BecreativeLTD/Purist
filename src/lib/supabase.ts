import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL
  ?? 'https://xzcvpetgcqsjwrtskadb.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3ZwZXRnY3FzandydHNrYWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODUxNjUsImV4cCI6MjA5NjA2MTE2NX0.zU3piiV92mOJJXjgl9rhgnry7SbGpfywev-VWR-qHGQ';

// Browser client — used in client-side scripts
export function createSupabaseBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Server client — used in Astro pages / middleware (handles cookies)
export function createSupabaseServerClient(request: Request, responseHeaders: Headers) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          responseHeaders.append('Set-Cookie', serializeCookieHeader(name, value, options));
        });
      },
    },
  });
}
