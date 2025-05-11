import { Card } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

export function MyNewSlide() {
    const images = [
        { id: '1', image: '/assets/demo-images/banner3.jpg', alt: 'Slide 1' },
        { id: '2', image: '/assets/demo-images/banner4.jpg', alt: 'Slide 2' },
        { id: '3', image: '/assets/demo-images/banner5.jpg', alt: 'Slide 3' },
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="relative mx-auto w-full">
            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images?.map((item) => (
                        <div key={item.id} className="flex-[0_0_100%]">
                            <Card className="relative aspect-[21/9] w-full rounded-none py-0">
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-white px-4 sm:px-10 md:px-16 lg:px-20">
                                    <div className="font-proxima-nova-regular max-w-full sm:max-w-screen-xl md:max-w-[50%] p-5 rounded-sm px-1 text-center sm:text-left">
                                        <h3 className="max-w-full font-noto-san-extra-light text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold">
                                            Inspiration, Innovation and Discovery.
                                        </h3>
                                        <p className="mt-2 sm:mt-3 md:mt-5 max-w-full sm:max-w-[80%] text-xs sm:text-sm md:text-base">
                                            Any successful career starts with good education. Together with us you will have deeper knowledge of the subjects that will be especially useful for you when climbing the career ladder.
                                        </p>
                                        <div className="mt-1 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start">
                                            <a
                                                className="min-w-[50px] sm:min-w-[120px] rounded border border-white bg-[#b30e13] px-4 py-1 sm:px-6 sm:py-2 text-center text-white hover:bg-transparent hover:border-[#e31c24] hover:text-white focus:ring focus:outline-none active:text-white text-xs sm:text-base"
                                                href="/contact"
                                            >
                                                Contact Us
                                            </a>
                                            <a
                                                className="min-w-[100px] sm:min-w-[120px] hidden xl:block rounded border bg-black/50 border-[#ffff] px-4 sm:px-6 py-2 text-center text-white hover:bg-[#147bac] hover:text-white focus:ring focus:outline-none active:bg-indigo-500"
                                                href="/explore"
                                            >
                                                Lean More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Navigation */}
            <div className="absolute bottom-2 sm:bottom-10 xl:bottom-20 left-1/2  transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
                {images?.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition ${index === selectedIndex ? 'bg-[#ffff]' : 'border'}`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
