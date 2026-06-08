export const prerender = false;

import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '~/lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
 const contentType = request.headers.get('content-type') ?? '';
 let email = '';
 let password = '';

 if (contentType.includes('application/x-www-form-urlencoded')) {
   const text = await request.text();
   const params = new URLSearchParams(text);
   email = params.get('email') ?? '';
   password = params.get('password') ?? '';
 } else if (contentType.includes('multipart/form-data')) {
   const formData = await request.formData();
   email = formData.get('email')?.toString() ?? '';
   password = formData.get('password')?.toString() ?? '';
 } else {
   // fallback try text parse anyway
   try {
     const text = await request.text();
     const params = new URLSearchParams(text);
     email = params.get('email') ?? '';
     password = params.get('password') ?? '';
   } catch {
     return redirect('/login?error=invalid_credentials');
   }
 }

 if (!email || !password) {
   return redirect('/login?error=Please+fill+all+fields');
 }

 const responseHeaders = new Headers();
 const supabase = createSupabaseServerClient(request, responseHeaders);

 const { error } = await supabase.auth.signInWithPassword({ email, password });

 if (error) {
   return redirect('/login?error=invalid_credentials');
 }

 const response = redirect('/pages/dashboard');
 responseHeaders.forEach((value, key) => {
   response.headers.append(key, value);
 });

 return response;
};
