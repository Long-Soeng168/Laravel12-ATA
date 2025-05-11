import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import SectionHeader from './section-header';

const features = [
    {
        id: 1,
        title: 'Integrated School Packages',
        details: 'Streamline your operations and enhance learning with our bundled services and supplies.',
        tutorialLink: '/solutions',
    },
    {
        id: 2,
        title: 'Global Resource Access',
        details: 'Source the exact educational materials you need from our extensive international network.',
        tutorialLink: '/solutions',
    },
    {
        id: 3,
        title: 'Personalized Learning Support',
        details: 'Unlock your academic potential with our tailored tutoring and coaching programs.',
        tutorialLink: '/solutions',
    },
    {
        id: 4,
        title: 'Corporate Training Support',
        details: 'Enhance employee performance, drive growth, and foster continuous learning with our comprehensive learning solutions.',
        tutorialLink: '/solutions',
    },
];

const FeaturedSolutions = () => {
    return (
        <div className="relative h-full w-full bg-[radial-gradient(#0000001a_1px,#f8fafc_1px)] dark:bg-[radial-gradient(#ffffff33_1px,#0f172a_1px)] bg-[size:20px_20px]">
            <div className="flex relative z-10 min-h-screen items-center justify-center">
                <div className="w-full max-w-7xl px-6 py-20">
                    <h2 className="max-w-xl text-4xl font-bold tracking-tight md:mx-auto md:text-center md:text-5xl md:leading-[3.5rem]"></h2>
                    <SectionHeader label="Featured Solutions" title="Explore Our Key Offerings" />
                    <div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex flex-col items-center gap-x-20 gap-y-6 md:flex-row md:odd:flex-row-reverse">
                                <div className="bg-border border-border/50 aspect-[6/4] w-full basis-1/2 rounded-xl border" />
                                <div className="shrink-0 basis-1/2">
                                    <h4 className="my-3 text-3xl font-semibold tracking-tight">{feature.title}</h4>
                                    <p className="text-muted-foreground text-[17px]">{feature.details}</p>
                                    <Button asChild className="mt-6 min-w-40 rounded-full text-[15px]">
                                        <Link href={feature.tutorialLink}>
                                            Learn More <ArrowRight />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSolutions;
