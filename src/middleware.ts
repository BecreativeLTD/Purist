import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from '~/lib/supabase';

const PROTECTED_ROUTES = ['/pages/dashboard', '/pages/leads'];
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

   // getUser() can rotate/refresh the session token under the hood (e.g. an
   // expired access token with a still-valid refresh token), which queues a
   // new Set-Cookie in responseHeaders. Previously that queue was only ever
   // flushed on the success path below, redirects below returned early and
   // silently dropped the refreshed cookie, so a request that needed a
   // refresh but happened to also redirect (login <-> dashboard bounce) sent
   // the browser off with a stale, already-rotated cookie, causing the next
   // request to fail auth even though the user was, a moment earlier,
   // genuinely signed in. Every return path now flushes responseHeaders.
   function withAuthHeaders(response: Response): Response {
     responseHeaders.forEach((value, key) => {
       response.headers.append(key, value);
     });
     return response;
   }

   if (isProtected && !user) {
     return withAuthHeaders(context.redirect('/login'));
   }

   if (isAuthRoute && user) {
     return withAuthHeaders(context.redirect('/pages/leads'));
   }

   context.locals.user = user;

   const response = await next();
   return withAuthHeaders(response);
 } catch (e) {
   console.error('[middleware] unexpected error on', url.pathname, e instanceof Error ? e.message : String(e));
   if (isProtected) {
     return context.redirect('/login');
   }
   return next();
 }
});
