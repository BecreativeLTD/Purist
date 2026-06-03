import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from '~/lib/supabase';

const PROTECTED_ROUTES = ['/pages/dashboard'];
const AUTH_ROUTES = ['/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect, url } = context;
  const responseHeaders = new Headers();
  const supabase = createSupabaseServerClient(request, responseHeaders);

  const { data: { user } } = await supabase.auth.getUser();

  const isProtected = PROTECTED_ROUTES.some(r => url.pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some(r => url.pathname.startsWith(r));

  // Not logged in → redirect to login
  if (isProtected && !user) {
    return redirect('/login');
  }

  // Already logged in → redirect away from login
  if (isAuthRoute && user) {
    return redirect('/pages/dashboard');
  }

  // Pass user to all pages via locals
  context.locals.user = user;

  const response = await next();

  // Forward any auth cookies set by Supabase
  responseHeaders.forEach((value, key) => {
    response.headers.append(key, value);
  });

  return response;
});
