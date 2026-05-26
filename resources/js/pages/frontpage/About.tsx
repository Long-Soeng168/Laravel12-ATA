import {
    ArrowRight,
    CodeXml,
    FileText,
    GraduationCap,
    MapPin,
    Phone,
    PlayCircle,
    SendIcon,
    ShoppingCart,
    Smartphone,
    type LucideIcon,
} from 'lucide-react';
import FrontPageLayout from './layouts/frontpage-layout';

const FeatureCard = ({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) => (
    <div className="bg-card border-border flex flex-col items-center gap-4 border p-8 text-center transition-colors duration-200 hover:border-[#FF6D00]">
        <div className="flex h-16 w-16 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
            <Icon className="h-8 w-8" strokeWidth={2} />
        </div>
        <h3 className="text-foreground text-lg font-black tracking-tight uppercase">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
);

export default function AboutPage() {
    return (
        <FrontPageLayout>
            <div className="container mx-auto mt-6 px-4 pb-12 md:px-6">
                {/* Hero Section */}
                <section className="mb-20 flex flex-col items-center text-center">
                    <h1 className="text-foreground mb-6 text-4xl font-black tracking-tighter uppercase md:text-5xl lg:text-6xl">
                        About <span className="text-[#FF6D00]">A-Tech Auto</span>
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
                        A-Tech Auto is the ultimate all-in-one platform built to cover every aspect of the automotive industry. Whether you need to
                        decode vehicle errors, find verified garages, learn through training videos, or buy spare parts, everything is integrated
                        directly into your smartphone.
                    </p>
                </section>

                {/* Core Pillars */}
                <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={ShoppingCart}
                        title="Marketplace & Shops"
                        desc="Buy and sell cars or spare parts, and browse our comprehensive directory to find trusted local automotive shops."
                    />
                    <FeatureCard
                        icon={MapPin}
                        title="Live Integrated Maps"
                        desc="Utilize our Google Maps integration to instantly locate verified auto garages and nearby EV charging stations."
                    />
                    <FeatureCard
                        icon={GraduationCap}
                        title="Education & Training"
                        desc="Access extensive PDF libraries, master mechanics via video tutorials, or enroll in professional in-person classes."
                    />
                </section>

                {/* What We Offer */}
                <section className="bg-card border-border mb-20 border p-8 md:p-12">
                    <h2 className="text-foreground mb-12 text-center text-2xl font-black tracking-tight uppercase">What We Offer</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: ShoppingCart, title: 'Parts Marketplace', desc: 'Buy spare parts or list your own products for sale.' },
                            { icon: MapPin, title: 'Garage & EV Maps', desc: 'Locate nearby auto garages and EV stations on a live map.' },
                            { icon: CodeXml, title: 'DTC Decoder', desc: 'Search codes to instantly read and understand vehicle errors.' },
                            { icon: FileText, title: 'Documents Library', desc: 'Access wiring diagrams, repair manuals, and Khmer specs.' },
                            { icon: PlayCircle, title: 'Video Training', desc: 'Master car maintenance through our online video tutorials.' },
                            { icon: GraduationCap, title: 'In-Person Courses', desc: 'Discover schedules and enroll in offline, hands-on classes.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <item.icon className="h-6 w-6" strokeWidth={2} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-foreground text-base font-bold tracking-tight uppercase">{item.title}</h4>
                                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Target Audience */}
                <section className="mb-20">
                    <h2 className="text-foreground mb-10 text-center text-2xl font-black tracking-tight uppercase">Built for Everyone</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: 'Car Owners', desc: 'Find nearby garages, EV stations, and buy necessary parts.' },
                            { title: 'Mechanics', desc: 'Decode DTC errors instantly and access ECU pinout documents.' },
                            { title: 'Garage Owners', desc: 'List your shop in our directory and sell parts on the marketplace.' },
                            { title: 'Enthusiasts', desc: 'Learn through our video training and hands-on professional courses.' },
                        ].map((item, i) => (
                            <div key={i} className="border-border bg-background hover:bg-card border p-6 text-center transition-colors">
                                <h4 className="text-foreground mb-2 font-bold tracking-tight uppercase">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Privacy & Contact */}
                <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                    <div className="bg-card border-border border p-8 lg:p-10">
                        <h2 className="text-foreground mb-6 text-xl font-black uppercase">Privacy Policy</h2>
                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                            We respect your privacy and are committed to protecting your personal data. We do not share or sell your data to third
                            parties. Your trust is important to us, and we take security seriously.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center text-sm font-bold tracking-wider text-[#FF6D00] transition-transform active:scale-[0.97]"
                        >
                            MORE ABOUT PRIVACY <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
                        </a>
                    </div>
                    <div className="bg-card border-border border p-8 lg:p-10">
                        <h2 className="text-foreground mb-6 text-xl font-black uppercase">Get in Touch</h2>
                        <div className="text-muted-foreground space-y-5 text-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10">
                                    <Phone className="h-4 w-4 text-[#FF6D00]" />
                                </div>
                                <span className="font-medium tracking-wide">085 839 881</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10">
                                    <SendIcon className="h-4 w-4 text-[#FF6D00]" />
                                </div>
                                <a
                                    href="https://t.me/atechauto086"
                                    target="_blank"
                                    className="font-medium tracking-wide transition-colors hover:text-[#FF6D00]"
                                >
                                    Telegram: @atechauto086
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action - Upgraded to a dynamic, high-contrast industrial banner */}
                <section className="flex flex-col items-center justify-between gap-8 border border-[#FF6D00] bg-[#FF6D00] p-8 md:flex-row md:p-12 lg:p-16">
                    <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                        <h2 className="mb-3 text-3xl font-black tracking-tighter text-white uppercase lg:text-4xl">Ready to hit the road?</h2>
                        <p className="max-w-md text-base font-medium text-white/90 md:text-lg">
                            Get the ultimate automotive hub in your pocket. DTC decoding, live maps, and parts marketplace—all in one app.
                        </p>
                    </div>
                    <div className="flex shrink-0">
                        <a
                            href="/download-app"
                            className="inline-flex h-[60px] items-center justify-center gap-3 border border-black bg-black px-8 text-[15px] font-bold tracking-widest text-white uppercase transition-all duration-150 ease-out hover:border-neutral-800 hover:bg-neutral-800 active:scale-[0.97]"
                        >
                            <Smartphone className="h-5 w-5 text-[#FF6D00]" />
                            <span>Get The App</span>
                        </a>
                    </div>
                </section>
            </div>
        </FrontPageLayout>
    );
}
