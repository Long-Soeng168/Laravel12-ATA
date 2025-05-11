
import { Card } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

export function MyWelcomeSlide({ imageSlide }) {
    // console.log(images)
    // const images = [
    //     { id: '1', image: '/assets/demo-images/Homepage/03_welcome_to_western_1.jpg', alt: 'Slide 1' },
    //     { id: '2', image: '/assets/demo-images/Homepage/03_welcome_to_western_2.jpg', alt: 'Slide 2' },
    //     { id: '2', image: '/assets/demo-images/Homepage/03_welcome_to_western_3.jpg', alt: 'Slide 3' },
    // ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="relative mx-auto w-full max-w-full  shadow-md shadow-gray-300 object-cover rounded-3xl">
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {imageSlide?.images?.map((item) => (
                    <div key={item.id} className="flex-[0_0_100%]">
                        <Card className="relative aspect-[16/9] w-full py-0 object-cover rounded-3xl">
                            <img src={`/assets/images/pages/thumb/${item.image}`} alt={item.alt} className="w-full h-full object-cover rounded-3xl " />
                            <div className="absolute top-0 left-0 bottom-0 h-full w-[30%]" style={{ background: item.bg }}>
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
        <div className="absolute -bottom-5 sm:-bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
            {imageSlide?.images?.map((_, index) => (
                <button
                    key={index}
                    className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition ${index === selectedIndex ? 'bg-[#273896]' : 'bg-gray-500'}`}
                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                />
            ))}
        </div>
    </div>
    );
}
