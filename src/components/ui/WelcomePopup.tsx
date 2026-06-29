/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';

const STORAGE_KEY = 'purist:popup:v2';
const SHOW_DELAY_MS = 25000;

export default function WelcomePopup() {
 const [open, setOpen]         = useState(false);
 const [submitted, setSubmitted] = useState(false);
 const [loading, setLoading]   = useState(false);
 const [error, setError]       = useState('');
 const [email, setEmail]       = useState('');

 useEffect(() => {
   if (typeof window === 'undefined') return;
   if (window.location.pathname.startsWith('/pages/dashboard')) return;
   if (new URLSearchParams(window.location.search).get('nopopup')) return;
   try {
     const flag = localStorage.getItem(STORAGE_KEY);
     if (flag === 'dismissed' || flag === 'submitted') return;
   } catch {}

   let opened = false;
   const show = () => { if (!opened) { opened = true; setOpen(true); } };
   const timer = window.setTimeout(show, SHOW_DELAY_MS);
   const onLeave = (e: MouseEvent) => { if (e.clientY <= 0) show(); };
   document.addEventListener('mouseleave', onLeave);
   return () => { window.clearTimeout(timer); document.removeEventListener('mouseleave', onLeave); };
 }, []);

 useEffect(() => {
   if (!open) return;
   const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
   document.addEventListener('keydown', onKey);
   const prev = document.body.style.overflow;
   document.body.style.overflow = 'hidden';
   return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
 }, [open]);

 const dismiss = () => {
   setOpen(false);
   try { localStorage.setItem(STORAGE_KEY, 'dismissed'); } catch {}
 };

 const handleSubmit = async (e: Event) => {
   e.preventDefault();
   setLoading(true);
   setError('');
   try {
     const res = await fetch('/api/popup', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email }),
     });
     if (!res.ok) throw new Error('server');
     setSubmitted(true);
     try { localStorage.setItem(STORAGE_KEY, 'submitted'); } catch {}
   } catch {
     setError('Something went wrong — please try again.');
   } finally {
     setLoading(false);
   }
 };

 if (!open) return null;

 return (
   <div
     role="dialog"
     aria-modal="true"
     aria-labelledby="popup-title"
     class="fixed inset-0 z-[60] flex items-center justify-center p-4"
     style="background:rgba(10,10,10,0.52);backdrop-filter:blur(6px);"
     onClick={dismiss}
   >
     <div
       class="relative w-full max-w-lg overflow-hidden rounded-[20px] shadow-2xl"
       style="background:#F8F6F1;"
       onClick={(e) => e.stopPropagation()}
     >
       {/* Close */}
       <button
         type="button"
         aria-label="Close"
         onClick={dismiss}
         class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition shadow-sm"
       >
         <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
           <path d="M1 1l10 10M11 1L1 11"/>
         </svg>
       </button>

       {!submitted ? (
         <>
           {/* Header band */}
           <div class="relative bg-brand-black px-8 pt-8 pb-6 overflow-hidden">
             {/* Mini radar SVG decoration */}
             <svg class="absolute right-0 top-0 h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" aria-hidden="true">
               <circle cx="200" cy="100" r="80" fill="none" stroke="#E8B4B0" stroke-width="0.8" stroke-dasharray="12 6"/>
               <circle cx="200" cy="100" r="55" fill="none" stroke="#E8B4B0" stroke-width="0.6" stroke-dasharray="8 5"/>
               <circle cx="200" cy="100" r="32" fill="none" stroke="#E8B4B0" stroke-width="0.5" stroke-dasharray="5 5"/>
               <line x1="200" y1="100" x2="200" y2="20" stroke="#E8B4B0" stroke-width="0.6"/>
               <line x1="200" y1="100" x2="130" y2="40" stroke="#E8B4B0" stroke-width="0.4"/>
               <line x1="200" y1="100" x2="120" y2="100" stroke="#E8B4B0" stroke-width="0.4"/>
             </svg>

             <span class="inline-flex items-center gap-1.5 bg-brand-pink/20 text-brand-pink text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full mb-4 font-medium">
               <span class="w-1.5 h-1.5 rounded-full bg-brand-pink inline-block" style="animation:pulse 2s ease-in-out infinite"/>
               Free automation plan
             </span>

             <h2 id="popup-title" class="font-display text-white text-2xl leading-tight mb-2 text-balance">
               See exactly where<br/>
               <em class="font-medium text-brand-pink">your time is leaking.</em>
             </h2>
             <p class="text-white/60 text-sm leading-relaxed">
               Get your custom automation plan — we map your workflows and show you exactly where you're losing time and money.
             </p>
           </div>

           {/* Form area */}
           <div class="px-8 py-6">
             {/* Trust row */}
             <div class="flex items-center gap-4 mb-5 text-[11px] text-brand-gray-600">
               <span class="flex items-center gap-1">
                 <svg class="w-3.5 h-3.5 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12l5 5L20 7"/></svg>
                 No credit card
               </span>
               <span class="flex items-center gap-1">
                 <svg class="w-3.5 h-3.5 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12l5 5L20 7"/></svg>
                 Deployed in 5–10 days
               </span>
               <span class="flex items-center gap-1">
                 <svg class="w-3.5 h-3.5 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12l5 5L20 7"/></svg>
                 30-day guarantee
               </span>
             </div>

             <form onSubmit={handleSubmit} class="space-y-3">
               <input
                 type="email"
                 required
                 value={email}
                 onInput={(e) => setEmail((e.currentTarget as HTMLInputElement).value)}
                 placeholder="your@company.com"
                 aria-label="Email address"
                 disabled={loading}
                 class="w-full bg-white border border-brand-gray-200 focus:border-brand-black rounded-button px-4 py-3 text-sm outline-none transition placeholder:text-brand-gray-400 disabled:opacity-60"
               />
               {error && (
                 <p class="text-[12px] text-red-500 text-center">{error}</p>
               )}
               <button
                 type="submit"
                 disabled={loading}
                 class="w-full bg-brand-black text-white py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
               >
                 {loading ? 'Sending…' : 'Get my free automation plan →'}
               </button>
             </form>

             <button
               type="button"
               onClick={dismiss}
               class="text-[11px] text-brand-gray-600 hover:text-brand-black underline underline-offset-4 transition mt-4 w-full text-center block"
             >
               No thanks, I'll figure it out myself
             </button>
           </div>
         </>
       ) : (
         /* Success state */
         <div class="px-8 py-14 flex flex-col items-center text-center">
           <div class="w-16 h-16 rounded-full bg-brand-green/12 flex items-center justify-center mb-5">
             <svg class="w-7 h-7 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M5 12l5 5L20 7"/>
             </svg>
           </div>
           <h2 class="font-display text-2xl mb-2">You're booked in.</h2>
           <p class="text-sm text-brand-gray-600 mb-6 leading-relaxed max-w-xs">
             Check your inbox — we'll send your custom automation plan and calendar link within 24 hours.
           </p>
           <a
             href="/pages/welcome"
             onClick={dismiss}
             class="bg-brand-black text-white px-7 py-3 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
           >
             Explore our services →
           </a>
           <button type="button" onClick={dismiss} class="text-xs text-brand-gray-600 hover:text-brand-black mt-4 underline underline-offset-4 transition">
             Close
           </button>
         </div>
       )}

       <style>{`
         @keyframes pulse {
           0%,100% { opacity:0.6; transform:scale(1); }
           50%    { opacity:1; transform:scale(1.3); }
         }
       `}</style>
     </div>
   </div>
 );
}
