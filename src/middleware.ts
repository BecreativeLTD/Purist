import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from '~/lib/supabase';

const PROTECTED_ROUTES = ['/pages/dashboard'];
const AUTH_ROUTES = ['/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;

  const isProtected = PROTECTED_ROUTES.some(r => url.pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some(r => url.pathname.startsWith(r));

  // Skip middleware entirely for POST to /login (form submission handled by the page)
  if (isAuthRoute && context.request.method === 'POST') {
    return next();
  }

  // Only run auth check on relevant routes
  if (!isProtected && !isAuthRoute) {
    return next();
  }

  try {
    const responseHeaders = new Headers();
    const supabase = createSupabaseServerClient(context.request, responseHeaders);
    const { data: { user } } = await supabase.auth.getUser();

    if (isProtected && !user) {
      return context.redirect('/login');
    }

    if (isAuthRoute && user) {
      return context.redirect('/pages/dashboard');
    }

    context.locals.user = user;

    const response = await next();
    responseHeaders.forEach((value, key) => {
      response.headers.append(key, value);
    });
    return response;
  } catch {
    if (isProtected) {
      return context.redirect('/login');
    }
    return next();
  }
});
