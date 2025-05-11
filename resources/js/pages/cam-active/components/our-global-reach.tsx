import { Globe, HandshakeIcon, MapPin, Users } from 'lucide-react';
import SectionHeader from './section-header';
import Earth from './ui/globe';
import { Sparkles } from './ui/sparkles';

const OurGlobalReach = () => {
    const features = [
        {
            icon: MapPin,
            title: 'Sourcing Niche Educational Materials',
            desc: 'We navigate global markets to source rare and specialized learning materials for unique curricula.',
        },
        {
            icon: HandshakeIcon,
            title: 'Facilitating International Exchange',
            desc: 'We empower cross-border academic collaboration through streamlined resource exchange programs.',
        },
        {
            icon: Users,
            title: 'Customized Procurement Services',
            desc: 'Acting as your dedicated procurement partner, we tailor our services to meet specific institutional needs.',
        },
        {
            icon: Globe,
            title: 'Fostering Global Educational Partnerships',
            desc: 'Building strategic alliances that expand educational opportunities and impact worldwide.',
        },
    ];

    return (
        <section className="min-h-screen overflow-hidden bg-gray-700 text-white">
            {/* World Map Placeholder */}
            <article className="relative mx-auto rounded-lg p-5 py-16 text-center">
                <div className="absolute top-0 left-0 z-[1] h-full w-full bg-[radial-gradient(#5875d653_1px,#06080e_1px)] bg-[size:20px_20px]"></div>
                <div className="relative z-10">
                    <h1 className="mx-auto max-w-[20ch] bg-gradient-to-b from-[#edeffd] to-[#06152e] bg-clip-text text-4xl leading-[100%] font-semibold tracking-tighter text-transparent md:text-6xl">
                        Extending Our Impact Across the Globe
                    </h1>
                    <Earth />
                    <SectionHeader
                        labelColor="text-[#38bdf8]"
                        titleColor="text-[#f1f5f9]"
                        subtitleColor="text-[#cbd5e1]"
                        title=""
                        subtitle="Our commitment to global education is deeply embedded in our import and export capabilities, providing you with unparalleled
                    access and opportunities."
                    />
                </div>
                <ul className="relative z-10 mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 text-start md:grid-cols-2">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <li
                            key={title}
                            className="flex items-start space-x-4 rounded-xl bg-gray-900 p-6 shadow-lg ring-1 ring-white/50 transition hover:scale-[1.02] hover:bg-gray-800/90"
                        >
                            <div className="flex-shrink-0">
                                <div className="inline-flex items-center justify-center rounded-full bg-gray-600 p-3 shadow-sm">
                                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-gray-300">{desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
};

export default OurGlobalReach;
