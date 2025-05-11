import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const MyCurricullum = ({curriculum}:{curriculum:any}) => {
    const images = [
        { id: '1', image: '/assets/demo-images/02TopBackground/02 School Facilities.jpg', alt: 'Slide 1' },
        { id: '3', image: '/assets/demo-images/02TopBackground/04 Curriculum.jpg', alt: 'Slide 3' },
        { id: '4', image: '/assets/demo-images/02TopBackground/03Campuses.jpg', alt: 'Slide 4' },
    ];
    ;console.log(curriculum);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div>
            <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 py-16">
                <div className="relative">
                    <div className="bg-accent mx-auto w-full max-w-screen-xl overflow-hidden rounded-xl" ref={emblaRef}>
                        <div className="embla__container flex">
                            {curriculum?.images?.map((item, index) => (
                                <div className="embla__slide aspect-[21/9] flex-[0_0_100%]" key={index}>
                                    <img src={`/assets/images/pages/thumb/${item.image}`} alt={item.alt} className="h-full w-full rounded-xl object-cover" />
                                </div>
                            ))}
                        </div>

                        {/* Dot Navigation */}
                        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2 sm:-bottom-10">
                            {curriculum?.images?.map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${index === selectedIndex ? 'bg-gray-600' : 'border'}`}
                                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl text-start text-blue-900">
                    <p className="mt-6 text-[17px] md:text-2xl " dangerouslySetInnerHTML={{ __html: curriculum.long_description }}>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyCurricullum;
