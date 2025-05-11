import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const Carousel = ({ images }: { images: string }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {images?.map((item) => (
                    <div key={item.id} className="flex-[0_0_100%]">
                        <Card className="aspect-[4/5] w-full rounded-2xl border-0 py-0">
                            <img
                                src={`/assets/images/pages/thumb/${item?.image}`}
                                alt={item?.alt}
                                className="h-full w-full rounded-2xl object-cover"
                            />
                        </Card>
                        <div className="mt-5 flex transform justify-center space-x-2">
                            {images?.map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${index === selectedIndex ? 'bg-white' : 'bg-gray-500'}`}
                                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Carousel1 = ({ images }: { images: string }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {images?.map((item) => (
                    <div key={item.id} className="flex-[0_0_100%]">
                        <Card className="aspect-video w-full rounded-2xl border-0 py-0">
                            <img
                                src={`/assets/images/pages/thumb/${item?.image}`}
                                alt={item.alt}
                                className="h-full w-full rounded-2xl object-cover"
                            />
                        </Card>
                        <div className="mt-5 flex transform justify-center space-x-2">
                            {images?.map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${index === selectedIndex ? 'bg-white' : 'bg-gray-500'}`}
                                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function MyContentWithSlideExtracurricular({banner, topData, dataPage, bottomData }: {banner:any, topData: any; dataPage: any; bottomData: any }) {
  
    return (
        <>
            <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-16 bg-gradient-to-b from-[#023506] to-[#012405] px-4 py-8 sm:px-10 sm:py-16 md:px-20">
                <div className="max-w-6xl text-start text-white">
                    <p className="mt-6 text-[17px] md:text-2xl">{banner?.short_description}</p>
                </div>
                <div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2 xl:grid-cols-3">
                    {topData?.map((item) => (
                        <div key={item.id} className="mx-auto w-full max-w-full">
                            <Carousel key={item.id} images={item?.images} />
                            <div className="text-white">
                                <h3 className="mt-4 text-center text-4xl font-semibold">{item.title}</h3>
                                <p className="mt-6 text-xl">{item.short_description}</p>
                            </div>
                            <Link
                                href="#"
                                className="font-now-alt-medium mt-10 block w-full rounded-md border-2 border-white px-8 py-4 text-center text-xl text-white transition-transform duration-300 hover:-translate-y-1 hover:cursor-pointer"
                            >
                                Read more
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="mt-10 grid w-full grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                    {bottomData?.map((item) => (
                        <div key={item.id} className="mx-auto w-full max-w-full">
                            <Carousel1 images={item?.images} />
                            <div className="text-white">
                                <h3 className="mt-4 text-center text-4xl font-semibold">{item?.title}</h3>
                                <p className="mt-6 text-xl">{item?.short_description}</p>
                            </div>
                            <Link
                                href="#"
                                className="font-now-alt-medium mt-10 block w-full rounded-md border-2 border-white px-8 py-4 text-center text-xl text-white transition-transform duration-300 hover:-translate-y-1 hover:cursor-pointer"
                            >
                                Read more
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
