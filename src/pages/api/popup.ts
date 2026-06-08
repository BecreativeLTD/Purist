import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
 try {
   const { email } = await request.json();
   if (!email || !email.includes('@')) {
     return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
   }

   const resend = new Resend(import.meta.env.Resend || import.meta.env.RESEND_API_KEY);
   const notifyEmail = import.meta.env.notifymail || import.meta.env.NOTIFY_EMAIL || 'hello@purist.online';

   // Notify team
   const r1 = await resend.emails.send({
     from: 'PURIST Leads <hello@purist.online>',
     to: [notifyEmail],
     subject: `🎯 Popup lead ${email}`,
     html: `
<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;">
 <div style="background:#fff;border-radius:12px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e8e8e8;">
   <h2 style="font-size:16px;margin:0 0 6px;color:#0a0a0a;">New popup lead</h2>
   <p style="font-size:12px;color:#aaa;margin:0 0 20px;">Submitted via the exit-intent popup</p>
   <div style="background:#f9f9f9;border-radius:8px;padding:12px 14px;margin-bottom:20px;">
     <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#aaa;margin-bottom:3px;">Email</div>
     <div style="font-size:14px;color:#0a0a0a;font-weight:600;">${email}</div>
   </div>
   <a href="mailto:${email}" style="display:inline-block;background:#E8B4B0;color:#0a0a0a;padding:10px 20px;border-radius:7px;font-size:12px;font-weight:600;text-decoration:none;">Reply to lead →</a>
 </div>
</div>`,
   });
   if (r1.error) console.error('Popup notify error:', JSON.stringify(r1.error));

   // Auto-reply
   const r2 = await resend.emails.send({
     from: 'PURIST <hello@purist.online>',
     to: [email],
     subject: `Your free audit next steps`,
     html: `
<div style="font-family:-apple-system,sans-serif;background:#f5f5f5;padding:20px;">
 <div style="background:#0a0a0a;border-radius:12px;padding:36px;max-width:500px;margin:0 auto;">
   <h1 style="font-size:22px;color:#fff;margin:0 0 10px;font-weight:400;letter-spacing:-0.01em;">You're on the list.</h1>
   <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0 0 20px;">
     A member of the PURIST team will reach out within <span style="color:#E8B4B0;">1 business day</span> to schedule your free 30-minute automation audit.
   </p>
   <div style="height:1px;background:rgba(255,255,255,0.07);margin:0 0 20px;"></div>
   <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin:0 0 20px;">
     In the meantime, tell us a bit more about your business to make the audit more useful.
   </p>
   <a href="https://purist.online/pages/welcome" style="display:inline-block;background:#E8B4B0;color:#0a0a0a;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">Complete your audit request →</a>
 </div>
</div>`,
   });
   if (r2.error) console.error('Popup confirm error:', JSON.stringify(r2.error));

   return new Response(JSON.stringify({ success: true }), {
     headers: { 'Content-Type': 'application/json' },
   });
 } catch (err) {
   console.error('Popup API error:', err);
   return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
 }
};
