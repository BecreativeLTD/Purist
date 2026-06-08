/** @jsxImportSource preact */
import { useState, useRef, useCallback, useEffect } from 'preact/hooks';

interface Athlete {
 id: string;
 name: string;
 role: string;
 discipline: string;
 image: string;
 quote: string;
}

interface Props {
 athletes: Athlete[];
}

export default function AthletesCarousel({ athletes }: Props) {
 const trackRef = useRef<HTMLDivElement | null>(null);
 const [selected, setSelected] = useState<Athlete | null>(null);
 const [canPrev, setCanPrev] = useState(false);
 const [canNext, setCanNext] = useState(true);

 const updateButtons = useCallback(() => {
   const el = trackRef.current;
   if (!el) return;
   setCanPrev(el.scrollLeft > 4);
   setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
 }, []);

 useEffect(() => {
   const el = trackRef.current;
   if (!el) return;
   updateButtons();
   el.addEventListener('scroll', updateButtons, { passive: true });
   window.addEventListener('resize', updateButtons);
   return () => {
     el.removeEventListener('scroll', updateButtons);
     window.removeEventListener('resize', updateButtons);
   };
 }, [updateButtons]);

 const scrollBy = (dir: 1 | -1) => {
   const el = trackRef.current;
   if (!el) return;
   const card = el.querySelector<HTMLElement>('[data-card]');
   const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
   el.scrollBy({ left: dir * step, behavior: 'smooth' });
 };

 useEffect(() => {
   if (!selected) return;
   const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
   document.addEventListener('keydown', onKey);
   document.body.style.overflow = 'hidden';
   return () => {
     document.removeEventListener('keydown', onKey);
     document.body.style.overflow = '';
   };
 }, [selected]);

 return (
   <>
     <div class="relative">
       <div
         ref={trackRef}
         class="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
         style={{ scrollbarWidth: 'none' }}
       >
         {athletes.map((a) => (
           <button
             key={a.id}
             type="button"
             data-card
             onClick={() => setSelected(a)}
             class="group/card flex-[0_0_75%] sm:flex-[0_0_45%] lg:flex-[0_0_28%] xl:flex-[0_0_22%] rounded-image overflow-hidden bg-white border border-brand-gray-100 text-left snap-start flex flex-col"
             style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
             aria-label={`Read ${a.name} testimonial`}
           >
             <div class="flex-1 bg-brand-cream overflow-hidden">
               <img
                 src={a.image}
                 alt={`${a.name} ${a.discipline}`}
                 class="w-full h-full object-contain transition-transform duration-700 group-hover/card:scale-105"
                 loading="lazy"
               />
             </div>
             <div class="px-5 py-4 border-t border-brand-gray-100">
               <p class="text-[10px] uppercase tracking-[0.12em] text-brand-rust mb-0.5">{a.discipline}</p>
               <p class="font-display text-base leading-tight text-brand-black">{a.name}</p>
               <p class="text-[11px] text-brand-gray-500 mt-0.5">{a.role}</p>
             </div>
           </button>
         ))}
       </div>

       <div class="flex items-center justify-between mt-6">
         <p class="text-sm text-brand-gray-600">
           <span class="font-medium">4.8 out of 5</span> · 16,255 verified reviews
         </p>
         <div class="flex items-center gap-2">
           <button
             type="button"
             aria-label="Previous"
             disabled={!canPrev}
             onClick={() => scrollBy(-1)}
             class="w-10 h-10 rounded-full border border-brand-black flex items-center justify-center disabled:opacity-30 hover:bg-brand-black hover:text-white transition"
           >
             <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
               <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
           </button>
           <button
             type="button"
             aria-label="Next"
             disabled={!canNext}
             onClick={() => scrollBy(1)}
             class="w-10 h-10 rounded-full border border-brand-black flex items-center justify-center disabled:opacity-30 hover:bg-brand-black hover:text-white transition"
           >
             <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
               <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
             </svg>
           </button>
         </div>
       </div>
     </div>

     {selected && (
       <div
         role="dialog"
         aria-modal="true"
         aria-labelledby="athlete-modal-title"
         class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
         onClick={() => setSelected(null)}
       >
         <div
           class="bg-white rounded-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
           onClick={(e) => e.stopPropagation()}
         >
           <div class="grid sm:grid-cols-2">
             <img src={selected.image} alt={selected.name} class="w-full h-64 sm:h-full object-cover" />
             <div class="p-6 sm:p-8 flex flex-col">
               <p class="eyebrow mb-3">{selected.discipline}</p>
               <h3 id="athlete-modal-title" class="font-display text-2xl mb-1">{selected.name}</h3>
               <p class="text-sm text-brand-gray-600 mb-6">{selected.role}</p>
               <blockquote class="text-base text-brand-black/90 leading-relaxed flex-1">
                 &ldquo;{selected.quote}&rdquo;
               </blockquote>
               <button
                 type="button"
                 onClick={() => setSelected(null)}
                 class="mt-6 self-start text-sm underline underline-offset-4 hover:opacity-70"
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       </div>
     )}
   </>
 );
}
