import { Globe, LifeBuoy, Sparkles, Star, Users } from 'lucide-react';
import SectionHeader from './section-header';

const commitments = [
    {
        icon: Star,
        title: 'Quality',
        description: 'We are steadfast in delivering world-class educational resources and services that exceed expectations.',
    },
    {
        icon: Globe,
        title: 'Accessibility',
        description: 'We firmly believe that quality education should be within reach for every learner, everywhere.',
    },
    {
        icon: Sparkles,
        title: 'Innovation',
        description: 'We are relentless in pursuing fresh ideas and modern solutions that transform learning experiences.',
    },
    {
        icon: Users,
        title: 'Partnership',
        description: 'We deeply value collaboration, fostering meaningful relationships that drive educational advancement.',
    },
    {
        icon: LifeBuoy,
        title: 'Support',
        description: 'We are passionately committed to providing comprehensive support that empowers institutions and learners alike.',
    },
];

const OurCommitment = () => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="Our Commitment"
                    title="Anchored in Values, Driven by Purpose"
                    subtitle="At CamActive, our unwavering commitment to excellence is guided by these core values:"
                />

                <div className="outline-background mt-14 grid gap-0 overflow-hidden rounded-xl outline-[1px] outline-offset-[-1px] md:grid-cols-2">
                    {commitments.map(({ title, description, icon: Icon }) => (
                        <div key={title} className="-mt-px -ml-px border bg-white p-6">
                            <div className="bg-accent text-accent-foreground flex h-11 w-11 items-center justify-center rounded-full">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="mt-4 mb-2 flex items-start gap-2 text-[1.35rem] font-semibold tracking-tight text-gray-800">
                                <span>{title}</span>
                            </div>
                            <p className="leading-relaxed text-gray-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurCommitment;
