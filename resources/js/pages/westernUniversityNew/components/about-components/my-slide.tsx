import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

const MySlide = ({ className, images = [] }: { className?: string; images?: any }) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    return (
        <div className={className}>
            {images.length > 0 && (
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                    opts={{ align: 'start', loop: false }}
                    setApi={setApi}
                    className='bg-true-primary m-0'
                >
                    <CarouselContent>
                        {images.map((image) => (
                            <CarouselItem key={image.id} className='pl-0'>
                                <Link href={image.link || '#'}>
                                    <img
                                        className={`w-full aspect-[16/9] object-cover transition-all duration-500 ${
                                            image.link ? 'border-primary hover:scale-95 hover:border-2' : ''
                                        }`}
                                        // width={1050}
                                        // height={300}
                                        src={image.image}
                                        alt={image.name}
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 py-2">
                        {Array.from({ length: count }).map((_, index) => (
                            <div key={index} className={`size-3 rounded-full ${current === index + 1 ? ' bg-white' : 'border'}`}></div>
                        ))}
                    </div>

                    {/* <CarouselPrevious className="rounded-none max-md:hidden" />
          <CarouselNext className="rounded-none max-md:hidden" /> */}
                </Carousel>
            )}
        </div>
    );
};

export default MySlide;
