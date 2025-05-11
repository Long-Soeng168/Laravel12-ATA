import { Button } from '@/components/ui/button';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { BackgroundPattern } from './background-pattern';

const HeroTwo = () => {
    return (
        <div className="bg-background relative">
            <div className="flex items-center justify-center px-6 py-20">
                <BackgroundPattern />

                <div className="relative max-w-2xl text-center">
                    <h1 className="mt-6 text-3xl !leading-[1.2] font-bold tracking-tight sm:text-5xl md:text-5xl">
                        Empowering Your Educational Journey with Comprehensive Solutions
                    </h1>
                    <p className="mt-6 text-[17px] md:text-lg">
                        At CamActive, we orchestrate a powerful synergy of services and resources, meticulously designed to address the diverse and
                        evolving needs of the education sector:
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <Button size="lg" className="rounded-full text-base">
                            Get Started <ArrowUpRight className="!h-5 !w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
                            <CirclePlay className="!h-5 !w-5" /> Watch Demo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroTwo;
