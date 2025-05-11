
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const images = [
    { id: '1', image: '/assets/demo-images/01ourHistory/01.jpg', alt: 'Slide 1' },
    { id: '2', image: '/assets/demo-images/01ourHistory/02jpg', alt: 'Slide 2' },
    { id: '2', image: '/assets/demo-images/01ourHistory/03.jpg', alt: 'Slide 2' },
];

export function MyMainSlide({ images, route }: { images?: any; route?: string }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="relative mx-auto h-full w-full rounded-2xl">
            {/* Carousel */}
            <div className="aspect-video h-full w-full overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex aspect-video h-full w-full rounded-2xl">
                    {images?.map((item) => (
                        <div key={item.id} className="flex-[0_0_100%]">
                            <div className="relative aspect-video h-full w-full rounded-2xl">
                                <img
                                    src={route ? route + item.image : item.image}
                                    alt={item.alt}
                                    className="aspect-video h-full w-full rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Dot Navigation */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2 sm:-bottom-10">
                {images?.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${index === selectedIndex ? 'bg-white' : 'border'}`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
