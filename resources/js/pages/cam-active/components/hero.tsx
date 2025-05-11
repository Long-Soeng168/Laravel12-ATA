import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative flex min-h-[80vh] items-center justify-center">
            <div className="relative z-10 mx-auto grid w-full max-w-screen-xl gap-12 px-6 py-16 lg:grid-cols-2">
                <div>
                    <h1 className="text-4xl !leading-[1.2] font-bold whitespace-pre-line md:text-5xl lg:text-[2.75rem] xl:text-4xl">
                        Igniting Potential, Globally:
                        {`\n`}Your Partner in Educational Transformation
                    </h1>
                    <p className="mt-6 max-w-[60ch] text-lg">
                        Welcome to CamActive, a leading educational solutions provider dedicated to fostering academic and professional success
                        without borders. We uniquely combine expert educational support with a vast import and export network for study materials and
                        office supplies.
                    </p>
                    <div className="mt-12 flex items-center gap-4">
                        <Button size="lg" className="rounded-full text-base">
                            Our Solutions <ArrowUpRight className="!h-5 !w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full text-base shadow-none">
                            Our Company
                        </Button>
                    </div>
                </div>
                <div className="bg-accent aspect-video w-full rounded-xl" />
            </div>
        </div>
    );
};

export default Hero;
