/** @jsxImportSource preact */
import { useState, useEffect } from 'preact/hooks';

type Section = { label: string; links: { name: string; href: string }[] };

const SECTIONS: Section[] = [
 {
   label: 'Plans',
   links: [
     { name: 'Automation Pro',      href: '/plans/automation-pro' },
     { name: 'AI Agent Deploy',     href: '/plans/ai-agent-deploy' },
     { name: 'The Full Stack',      href: '/plans/full-stack' },
     { name: 'All plans',           href: '/pages/pricing' },
     { name: 'Add-ons & resources', href: '/pages/add-ons' },
   ],
 },
 {
   label: 'Expertise',
   links: [
     { name: 'n8n Agency USA',               href: '/pages/n8n-agency' },
     { name: 'Automation Consultant',         href: '/pages/automation-consultant' },
     { name: 'Workflow Automation',           href: '/pages/workflow-automation-services' },
     { name: 'AI Agent Development',          href: '/pages/ai-agent-development' },
     { name: 'Hermes AI Agent Deploy',        href: '/pages/hermes-agent' },
     { name: 'Switch from Zapier to n8n',     href: '/pages/zapier-alternative-agency' },
     { name: '200 Industries covered',        href: '/pages/automation' },
     { name: 'All services',                  href: '/pages/services' },
   ],
 },
 {
   label: 'Learn',
   links: [
     { name: 'How it works',             href: '/pages/methodology' },
     { name: 'Industries',               href: '/pages/integrations' },
     { name: 'Automation by profession', href: '/pages/automation' },
     { name: 'Reliability & monitoring', href: '/pages/our-standards' },
     { name: 'Client stories',           href: '/pages/client-results' },
     { name: 'The Automation Blog',      href: '/pages/blog' },
   ],
 },
 {
   label: 'Compare',
   links: [
     { name: 'PURIST vs DIY automation',   href: '/pages/purist-vs-green-powders' },
     { name: 'PURIST vs hiring in-house',  href: '/pages/purist-vs-multivitamins' },
     { name: 'PURIST vs other agencies',   href: '/pages/purist-vs-meal-replacements' },
   ],
 },
 {
   label: 'Discover',
   links: [
     { name: 'Creative Gallery',  href: '/ads' },
     { name: 'About us',        href: '/pages/about-us' },
     { name: 'Our approach',    href: '/pages/impact' },
     { name: 'Get started',     href: '/pages/welcome' },
     { name: 'Partner program', href: '/pages/ambassador-program' },
     { name: 'Refer a client',  href: '/pages/refer' },
   ],
 },
 {
   label: 'Support',
   links: [
     { name: 'FAQs',           href: '/pages/faq' },
     { name: 'Project status', href: '/pages/track' },
     { name: 'Refund policy',  href: '/pages/returns' },
     { name: 'Contact us',     href: '/pages/contact-us' },
   ],
 },
];

export default function MobileMenu() {
 const [open, setOpen] = useState(false);
 const [expanded, setExpanded] = useState<string | null>('Services');

 useEffect(() => {
   const trigger = document.querySelector('[data-mobile-menu-trigger]');
   if (!trigger) return;
   const onClick = () => setOpen(true);
   trigger.addEventListener('click', onClick);
   return () => trigger.removeEventListener('click', onClick);
 }, []);

 useEffect(() => {
   if (!open) return;
   const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
   document.addEventListener('keydown', onKey);
   const prev = document.body.style.overflow;
   document.body.style.overflow = 'hidden';
   return () => {
     document.removeEventListener('keydown', onKey);
     document.body.style.overflow = prev;
   };
 }, [open]);

 if (!open) return null;

 return (
   <div
     role="dialog"
     aria-modal="true"
     aria-label="Mobile navigation"
     class="fixed inset-0 z-50 bg-white animate-fade-in lg:hidden flex flex-col"
   >
     <header class="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-brand-gray-100 shrink-0">
       <a href="/" class="font-display text-2xl tracking-tight font-medium" onClick={() => setOpen(false)}>
         PURIST
       </a>
       <button
         type="button"
         aria-label="Close menu"
         onClick={() => setOpen(false)}
         class="p-2 -mr-2 hover:opacity-70 transition"
       >
         <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <path d="M6 6l12 12M18 6l-12 12" stroke-linecap="round"/>
         </svg>
       </button>
     </header>

     <nav class="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
       <ul class="divide-y divide-brand-gray-100">
         {SECTIONS.map((s) => {
           const isOpen = expanded === s.label;
           return (
             <li key={s.label}>
               <button
                 type="button"
                 aria-expanded={isOpen}
                 onClick={() => setExpanded(isOpen ? null : s.label)}
                 class="w-full flex items-center justify-between py-4 text-left"
               >
                 <span class="font-display text-xl">{s.label}</span>
                 <span
                   class={`w-8 h-8 rounded-full border border-brand-black flex items-center justify-center transition-transform ${
                     isOpen ? 'rotate-45' : ''
                   }`}
                   aria-hidden="true"
                 >
                   <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                     <path d="M6 1v10M1 6h10" stroke-linecap="round"/>
                   </svg>
                 </span>
               </button>
               <ul
                 class={`overflow-hidden transition-all duration-300 ${
                   isOpen ? 'max-h-[600px] pb-4' : 'max-h-0'
                 }`}
               >
                 {s.links.map((l) => (
                   <li key={l.href}>
                     <a
                       href={l.href}
                       onClick={() => setOpen(false)}
                       class="block py-2.5 text-base text-brand-gray-900/80 hover:text-brand-black transition"
                     >
                       {l.name}
                     </a>
                   </li>
                 ))}
               </ul>
             </li>
           );
         })}
       </ul>
     </nav>

     <footer class="border-t border-brand-gray-100 px-4 sm:px-6 py-5 shrink-0 bg-brand-cream">
       <a
         href="/plans/full-stack"
         onClick={() => setOpen(false)}
         class="block w-full text-center bg-brand-black text-white py-3.5 rounded-button text-sm font-medium hover:bg-brand-gray-900 transition"
       >
         Get started with The Full Stack →
       </a>
       <p class="text-[11px] text-brand-gray-600 text-center mt-3">
         30-day money-back guarantee · Deployed in 5–10 days
       </p>
     </footer>
   </div>
 );
}
