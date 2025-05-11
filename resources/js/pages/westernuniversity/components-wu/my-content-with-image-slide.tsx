
import { Card } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { console } from 'inspector';
import { useEffect, useState } from 'react';

const Carousel = ({ images }:{images:any}) => {
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
            <Card className="aspect-[4/5] w-full border-0 py-0">
              <img src={`/assets/images/pages/thumb/${item.image}`} alt={item.alt} className="h-full w-full rounded-2xl object-cover" />
            </Card>
            <div className="mt-5 flex transform justify-center space-x-2">
              {images?.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${index === selectedIndex ? 'bg-gray-500' : 'bg-gray-200'}`}
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

export function MyContentWithSlide( {news}:{news:any} ) {
  const carouselContent = [
    {
      images: [
        {
          id: '1',
          image: '/assets/demo-images/Homepage/04_quality_education_1.jpg',
          alt: 'Slide 1',
          bg: '#273896',
        },
        {
          id: '2',
          image: '/assets/demo-images/Homepage/04_quality_education_2.jpg',
          alt: 'Slide 2',
          bg: '#008080',
        },
        {
          id: '3',
          image: '/assets/demo-images/Homepage/04_quality_education_3.jpg',
          alt: 'Slide 3',
          bg: '#36454f',
        },
      ],
      title: 'Quality Education',
      description: 'Access to quality teachers; use of quality learning tools and professional development; quality education as one that focuses on the',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-900',
    },
    {
      images: [
        {
          id: '1',
          image: '/assets/demo-images/Homepage/05_caring_environment_1.jpg',
          alt: 'Slide 1',
          bg: '#273896',
        },
        {
          id: '2',
          image: '/assets/demo-images/Homepage/05_caring_environment_2.jpg',
          alt: 'Slide 2',
          bg: '#008080',
        },
        {
          id: '3',
          image: '/assets/demo-images/Homepage/05_caring_environment_3.jpg',
          alt: 'Slide 3',
          bg: '#36454f',
        },
      ],
      title: 'Caring Environment',
      description: 'The establishment of safe and supportive quality learning environments. A safe and caring school environment is one in which',
     
    },
    {
      images: [
        {
          id: '1',
          image: '/assets/demo-images/Homepage/06_global_competitiveness_1.jpg',
          alt: 'Slide 1',
          bg: '#273896',
        },
        {
          id: '2',
          image: '/assets/demo-images/Homepage/06_global_competitiveness_2.jpg',
          alt: 'Slide 2',
          bg: '#008080',
        },
        {
          id: '3',
          image: '/assets/demo-images/Homepage/06_global_competitiveness_3.jpg',
          alt: 'Slide 3',
          bg: '#36454f',
        },
      ],
      title: 'Globally Competitive',
      description: 'Globally competent individuals are life-long learners who understand the issues of global significance and have an appreciation for cultural',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-900',
    },
    {
      images: [
        {
          id: '1',
          image: '/assets/demo-images/Homepage/07_leadership1.jpg',
          alt: 'Slide 1',
          bg: '#273896',
        },
        {
          id: '2',
          image: '/assets/demo-images/Homepage/07_leadership2.jpg',
          alt: 'Slide 2',
          bg: '#008080',
        },
        {
          id: '3',
          image: '/assets/demo-images/Homepage/07_leadership3.jpg',
          alt: 'Slide 3',
          bg: '#36454f',
        },
      ],
      title: 'Leadership',
      description: 'Leadership education enhances communication, critical thinking, and decision-making skills.',

    },
    {
      images: [
        {
          id: '1',
          image: '/assets/demo-images/Homepage/08_exchange_program_1.jpg',
          alt: 'Slide 1',
          bg: '#273896',
        },
        {
          id: '2',
          image: '/assets/demo-images/Homepage/08_exchange_program_2.jpg',
          alt: 'Slide 2',
          bg: '#008080',
        },
        {
          id: '3',
          image: '/assets/demo-images/Homepage/08_exchange_program_3.jpg',
          alt: 'Slide 3',
          bg: '#36454f',
        },
      ],
      title: 'Exchange Program (IR)',
      description: 'US Exchange Program is an American cultural exchange where students study and live in a volunteer host family for 1 semester in one of the',

    },
    {
      images: [
        {
          id: '1',
          image: '/assets/demo-images/Homepage/09_study_tour_1.jpg',
          alt: 'Slide 1',
          bg: '#273896',
        },
        {
          id: '2',
          image: '/assets/demo-images/Homepage/09_study_tour_2.jpg',
          alt: 'Slide 2',
          bg: '#008080',
        },
        {
          id: '3',
          image: '/assets/demo-images/Homepage/09_study_tour_3.jpg',
          alt: 'Slide 3',
          bg: '#36454f',
        },
      ],
      title: 'Study Tours (IR)',
      description: 'A study tour helps students appreciate their field of study more and it really helps them better realize the interaction between their',

    },
    
    // Add more items as needed...
  ];

  
  return (
    <>
       <div className="mx-auto max-w-screen-2xl px-4 lg:px-20 py-12">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {news?.children?.map((item, index) => {
          const textColor = index < 3 ? 'text-blue-900' : 'text-red-700';
          const borderColor = index < 3 ? 'border-blue-900' : 'border-red-700';
          return (
            <div
              key={index}
              className="flex flex-col h-full w-full max-w-full rounded-2xl bg-white transition duration-300 hover:shadow-xl"
            >
              <Carousel images={item.images} />
              <div className={`flex flex-col px-4 pt-6 pb-4 ${textColor}`}>
                <h3 className="text-2xl font-semibold text-balance">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed line-clamp-3">
                  {item.short_description}
                </p>
              </div>
              <div className="mt-auto px-4 pb-6 pt-4">
                <Link
                  href={`/detail/${1}`}
                  className={`inline-block border-2 ${borderColor} ${textColor} text-base sm:text-lg px-6 py-3 rounded-md hover:-translate-y-1 transition-all duration-200`}
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}
