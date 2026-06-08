/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

interface FaqItem {
 id: string;
 question: string;
 answer: string;
}

interface Props {
 items: FaqItem[];
}

export default function FAQ({ items }: Props) {
 const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

 return (
   <div class="divide-y divide-brand-gray-200 border-y border-brand-gray-200">
     {items.map((item) => {
       const isOpen = open === item.id;
       return (
         <div key={item.id}>
           <button
             type="button"
             aria-expanded={isOpen}
             aria-controls={`faq-${item.id}`}
             onClick={() => setOpen(isOpen ? null : item.id)}
             class="w-full flex items-center justify-between gap-6 py-6 text-left hover:opacity-70 transition"
           >
             <span class="font-display text-lg lg:text-xl">{item.question}</span>
             <span
               class={`shrink-0 w-8 h-8 rounded-full border border-brand-black flex items-center justify-center transition-transform ${isOpen ? 'rotate-45' : ''}`}
               aria-hidden="true"
             >
               <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                 <path d="M6 1v10M1 6h10" stroke-linecap="round" />
               </svg>
             </span>
           </button>
           <div
             id={`faq-${item.id}`}
             role="region"
             class={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
           >
             <p class="text-base text-brand-gray-600 leading-relaxed max-w-3xl">
               {item.answer}
             </p>
           </div>
         </div>
       );
     })}
   </div>
 );
}
