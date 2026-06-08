/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

interface Props {
 images: string[];
 title: string;
}

export default function ProductGallery({ images, title }: Props) {
 const [active, setActive] = useState(0);
 const [zoom, setZoom] = useState(false);

 return (
   <>
     <div class="grid grid-cols-[80px_1fr] gap-4">
       <div class="flex flex-col gap-2 order-1">
         {images.map((src, i) => (
           <button
             key={i}
             type="button"
             onClick={() => setActive(i)}
             aria-label={`View image ${i + 1}`}
             class={`aspect-square rounded-image overflow-hidden bg-brand-sand border-2 transition ${
               active === i ? 'border-brand-black' : 'border-transparent hover:border-brand-gray-200'
             }`}
           >
             <img src={src} alt="" class="w-full h-full object-cover" loading="lazy" />
           </button>
         ))}
       </div>

       <button
         type="button"
         onClick={() => setZoom(true)}
         class="order-2 aspect-square rounded-image overflow-hidden bg-brand-sand cursor-zoom-in group"
         aria-label="Zoom image"
       >
         <img
           src={images[active]}
           alt={`${title} view ${active + 1}`}
           class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
         />
       </button>
     </div>

     {zoom && (
       <div
         role="dialog"
         aria-modal="true"
         class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fade-in"
         onClick={() => setZoom(false)}
       >
         <img
           src={images[active]}
           alt={title}
           class="max-w-[90vw] max-h-[90vh] object-contain rounded-image"
           onClick={(e) => e.stopPropagation()}
         />
         <button
           type="button"
           aria-label="Close"
           onClick={() => setZoom(false)}
           class="absolute top-6 right-6 text-white p-2 hover:opacity-70 transition"
         >
           <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
             <path d="M6 6l12 12M18 6l-12 12" stroke-linecap="round" />
           </svg>
         </button>
       </div>
     )}
   </>
 );
}
