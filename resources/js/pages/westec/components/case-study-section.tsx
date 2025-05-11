import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';

export function CaseStudySection({ defaultDropDown = true }: { defaultDropDown?: boolean }) {
    const [selectedData, setSelectedData] = useState('');
    const bannerRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (item: any) => {
        setSelectedData(item);
        setTimeout(() => {
            bannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // slight delay ensures the state update doesn't interrupt scroll
    };

    return (
        <>
            <div className="relative bg-black">
                <img src="/assets/demo-images/Artboard3.jpg" className="min-h-[250px] w-full object-cover" alt="" />
                <div className="absolute top-0 left-0">
                    <div className="flex flex-col p-4 text-start md:text-left lg:grid-cols-2 lg:p-16">
                        <h1 className="font-proxima-nova-bold text-xl leading-[30px] text-white md:mb-4 md:text-2xl md:leading-[30px] lg:text-4xl lg:leading-[50px] 2xl:text-5xl">
                            Security And Safety Solutions
                        </h1>
                        <p className="font-proxima-nova-regular text-base text-white capitalize md:max-w-[65%] lg:text-xl 2xl:text-3xl">
                            <ul className="list-disc">
                                <li>
                                    In 2016, we took on a major challenge—securing the banking sector, where the cost of risk is high and the margin
                                    for error is razor-thin.
                                </li>
                                <li>
                                    We delivered an end-to-end security and safety solution designed to protect assets, personnel, and operations.
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-2">
                    <div ref={bannerRef} className="h-[90px]"></div>
                    <div className="flex w-full flex-nowrap justify-center gap-2.5 px-4 py-2.5 lg:justify-end lg:px-16">
                        {selectedData != '' ? (
                            <Button className="h-7 rounded-none 2xl:text-2xl 2xl:h-10" onClick={() => handleSelect('')}>
                                Show Less <ChevronUp />
                            </Button>
                        ) : (
                            <Button className="h-7 rounded-none 2xl:text-2xl 2xl:h-10" onClick={() => handleSelect('/assets/westec/images/study-case1.jpeg')}>
                                Read More <ChevronDown />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {selectedData != '' && (
                <div className="relative bg-black">
                    <img src="/assets/westec/images/study-case1.jpeg" className="w-full" alt="" />
                    <div className="border-t bg-white">
                        <div className="flex w-full flex-nowrap justify-end px-4 py-2.5 lg:px-16">
                            <button className="rounded-none" onClick={() => setSelectedData('')}>
                                <ChevronUp className="stroke-primary size-12" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
