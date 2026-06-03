export const prerender = false;

import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '~/lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  const responseHeaders = new Headers();
  const supabase = createSupabaseServerClient(request, responseHeaders);

  await supabase.auth.signOut();

  const response = redirect('/login');
  responseHeaders.forEach((value, key) => {
    response.headers.append(key, value);
  });

  return response;
};
