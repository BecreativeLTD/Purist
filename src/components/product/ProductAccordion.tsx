/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

interface Section {
 id: string;
 title: string;
 body: string;
}

interface Props {
 sections: Section[];
 defaultOpen?: string;
}

export default function ProductAccordion({ sections, defaultOpen }: Props) {
 const [open, setOpen] = useState<string | null>(defaultOpen ?? sections[0]?.id ?? null);

 return (
   <div class="divide-y divide-brand-gray-200 border-y border-brand-gray-200">
     {sections.map((s) => {
       const isOpen = open === s.id;
       return (
         <div key={s.id}>
           <button
             type="button"
             aria-expanded={isOpen}
             aria-controls={`acc-${s.id}`}
             onClick={() => setOpen(isOpen ? null : s.id)}
             class="w-full flex items-center justify-between gap-4 py-4 text-left hover:opacity-70 transition"
           >
             <span class="font-medium text-sm">{s.title}</span>
             <span
               class={`shrink-0 w-6 h-6 flex items-center justify-center transition-transform ${isOpen ? 'rotate-45' : ''}`}
               aria-hidden="true"
             >
               <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5">
                 <path d="M6 1v10M1 6h10" stroke-linecap="round" />
               </svg>
             </span>
           </button>
           <div
             id={`acc-${s.id}`}
             role="region"
             class={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}
           >
             <div class="text-sm text-brand-gray-600 leading-relaxed prose prose-sm max-w-none">
               {s.body.split('\n\n').map((p, i) => (
                 <p key={i}>{p}</p>
               ))}
             </div>
           </div>
         </div>
       );
     })}
   </div>
 );
}
