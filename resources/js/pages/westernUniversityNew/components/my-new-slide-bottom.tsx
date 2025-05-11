
import { Card } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

export function MyNewSlideBottom() {
    const images = [
        { id: '1', image: '/assets/demo-images/slide1.png', alt: 'Slide 1' },
        { id: '2', image: '/assets/demo-images/slide2.png', alt: 'Slide 2' },
    ];

   const [selectedIndex, setSelectedIndex] = useState(0);
       const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

       useEffect(() => {
           if (!emblaApi) return;
           const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
           emblaApi.on('select', onSelect);
           onSelect();
       }, [emblaApi]);

       return (
           <div className="relative mx-auto w-full max-w-full">
               {/* Carousel */}
               <div className="overflow-hidden" ref={emblaRef}>
                   <div className="flex">
                       {images?.map((item) => (
                           <div key={item.id} className="flex-[0_0_100%]">
                               <Card className="relative aspect-[16/4] w-full rounded-none py-0">
                                   <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                                   <div className="absolute top-0 left-0 bottom-0 h-full w-[30%]">
                                       <div className="mx-auto flex justify-center items-center max-w-screen-lg sm:max-w-screen-xl md:max-w-screen-2xl h-full px-4 sm:px-8 md:px-12">
                                           <h3 className="max-w-full text-sm text-white sm:text-lg md:text-2xl xl:text-2xl font-proxima-nova-regular" dangerouslySetInnerHTML={{ __html: item.short }} />
                                       </div>
                                   </div>
                               </Card>
                           </div>
                       ))}
                   </div>
               </div>
               {/* Dot Navigation */}
               <div className="absolute bottom-2 sm:bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                   {images?.map((_, index) => (
                       <button
                           key={index}
                           className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition ${index === selectedIndex ? 'bg-[#e31c24]' : 'border'}`}
                           onClick={() => emblaApi && emblaApi.scrollTo(index)}
                       />
                   ))}
               </div>
           </div>
       );
}
