import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const OutreachCarousel = ({ images }: { images: any }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <div className="relative mb-16">
            <div ref={emblaRef} className="overflow-hidden rounded-xl shadow-lg">
                <div className="embla__container flex">
                    {images?.map((img) => (
                        <div className="embla__slide aspect-[21/9] flex-[0_0_100%]" key={img.id}>
                            <img src={`/assets/images/pages/thumb/${img.image}`} alt={img.alt} className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-2 sm:-bottom-6">
                {images?.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 rounded-full border border-gray-400 transition ${
                            index === selectedIndex ? 'bg-gray-400' : 'bg-gray-100'
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};

const MyOutreachPrograms = ({ banner, outreachProgramData }: { banner: any; outreachProgramData: any }) => {
    console.log(outreachProgramData);

    return (
        <div>
            {/* Introduction */}
            <div className="mx-auto my-16 max-w-6xl text-start">
                <p className="text-lg text-green-900 md:text-xl  px-4">{banner?.short_description}</p>
            </div>
            <div className="mx-auto max-w-screen-2xl bg-gray-200 px-4 py-20 lg:px-20">
                {outreachProgramData?.children?.map((item) => (
                    <div key={item.id}>
                        <OutreachCarousel images={item.images} />
                        <div className="mx-auto mb-16 max-w-6xl text-center md:text-left">
                            <h3 className="mb-6 text-3xl md:text-4xl">{item?.title}</h3>
                            <div className="mb-4 text-lg md:text-xl whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.long_description }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOutreachPrograms;
