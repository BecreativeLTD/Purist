import type { APIRoute } from 'astro';
import { createSupabaseAdminClient } from '../../lib/supabase-admin';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const email = decodeURIComponent(url.searchParams.get('email') ?? '');
  if (!email) return redirect('/');

  const db = createSupabaseAdminClient();
  await db
    .from('leads')
    .update({ status: 'unsubscribed', updated_at: new Date().toISOString() })
    .eq('email', email);

  // Redirect to a simple confirmation — you can create a nicer page later
  return new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
    <title>Unsubscribed — PURIST</title>
    <style>body{background:#0A0A0A;color:#F8F6F1;font-family:-apple-system,sans-serif;
    display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;margin:0;}
    h1{font-family:Georgia,serif;font-size:28px;font-weight:400;margin-bottom:12px;}
    p{color:rgba(248,246,241,0.4);font-size:14px;line-height:1.8;}
    a{color:#E8B4B0;text-decoration:none;}</style>
    </head><body>
    <div><h1>You've been unsubscribed.</h1>
    <p>You won't receive any more emails from us.<br/>
    <a href="https://www.purist.online">← Back to purist.online</a></p>
    </div></body></html>`,
    { headers: { 'Content-Type': 'text/html' } },
  );
};
