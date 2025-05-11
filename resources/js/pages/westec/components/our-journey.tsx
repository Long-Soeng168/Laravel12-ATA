import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { BrainIcon } from 'lucide-react';

export function OurJourney() {
    const Colors = ['true-primary-two', 'true-primary', 'true-primary-three', 'true-primary-four'];
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-full px-4 lg:px-16"
        >
            <CarouselContent className="-ml-10">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-10 sm:basis-1/2 lg:basis-1/4">
                        <div>
                            <div className="flex h-full w-full items-end">
                                <p
                                    className={cn(
                                        'text-true-primary text-true-primary-two text-true-primary-three text-true-primary-four mr-2 translate-y-[7px] text-2xl font-bold 2xl:text-4xl',
                                        `text-${Colors[index % Colors.length]}`,
                                    )}
                                >
                                    2007
                                </p>
                                <div className="flex flex-1 flex-col">
                                    <span className="flex justify-center py-2">
                                        <BrainIcon size={100} />
                                    </span>
                                    <div
                                        className={cn(
                                            'bg-true-primary bg-true-primary-two bg-true-primary-three bg-true-primary-four h-5 w-full 2xl:h-7',
                                            `bg-${Colors[index % Colors.length]}`,
                                        )}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex h-full w-full items-end">
                                <p className={`text-${Colors[index % Colors.length]} invisible mr-2 translate-y-1 text-2xl font-bold 2xl:text-4xl`}>
                                    2007
                                </p>
                                <div className="flex flex-1 flex-col">
                                    <p className="py-1 text-2xl 2xl:text-3xl">A Strong Start —</p>
                                    <p className="text-sm 2xl:text-lg">
                                        Launched operations, specializing in CCTV solutions, supporting schools with IT and electrical systems.
                                    </p>
                                </div>
                            </div>
                            {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="mt-10 flex items-center justify-center gap-8">
                <CarouselPrevious className="relative translate-0" />
                <CarouselNext className="relative translate-0" />
            </div>
        </Carousel>
    );
}
