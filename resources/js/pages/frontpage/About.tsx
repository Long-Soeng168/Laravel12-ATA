import { ArrowRight, FileText, GraduationCap, MapPin, Phone, Search, SendIcon, ShoppingCart } from 'lucide-react';
import FrontPageLayout from './layouts/frontpage-layout';

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
    <div className="bg-card border-border flex flex-col items-center gap-4 border p-8 text-center transition-colors hover:border-[#FF6D00]">
        <div className="flex h-16 w-16 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
            <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-foreground text-lg font-bold tracking-tight uppercase">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
);

export default function AboutPage() {
    return (
        <FrontPageLayout>
            <div className="container mx-auto px-4 py-12 md:px-6">
                {/* Hero Section */}
                <section className="mb-20 text-center">
                    <h1 className="text-foreground mb-6 text-4xl font-black tracking-tighter uppercase md:text-5xl">
                        About <span className="text-[#FF6D00]">ATech Auto</span>
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
                        ATech Auto is your ultimate companion for all things automotive. Designed for car owners, auto engineers, garage
                        professionals, and passionate enthusiasts, our platform offers everything you need to maintain, repair, and enjoy your vehicle
                        to the fullest.
                    </p>
                </section>

                {/* Core Pillars */}
                <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={Search}
                        title="Smart Tools & Decoders"
                        desc="Instantly decode vehicle error codes, manage diagnostics, and access essential repair documentation."
                    />
                    <FeatureCard
                        icon={GraduationCap}
                        title="Learn & Grow"
                        desc="Boost your skills with curated automotive courses tailored for beginners, professionals, and enthusiasts alike."
                    />
                    <FeatureCard
                        icon={ShoppingCart}
                        title="Product Marketplace"
                        desc="Discover top-quality automotive products, tools, and accessories carefully selected for performance."
                    />
                </section>

                {/* Why Choose Us */}
                <section className="bg-card border-border mb-20 border p-8 md:p-12">
                    <h2 className="text-foreground mb-10 text-center text-2xl font-bold tracking-tight uppercase">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: ShoppingCart, title: 'Shop Products', desc: 'Top-quality automotive tools, parts & accessories.' },
                            { icon: GraduationCap, title: 'Learn & Grow', desc: 'Expert-crafted courses to boost your diagnostic skills.' },
                            { icon: Search, title: 'DTC Decoder', desc: 'Decode vehicle error codes instantly and fix issues fast.' },
                            { icon: FileText, title: 'Docs & Manuals', desc: 'Access essential guides, manuals and repair docs.' },
                            { icon: MapPin, title: 'Garage Finder', desc: 'Find trusted garages with real reviews near you.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <item.icon className="h-6 w-6 shrink-0 text-[#FF6D00]" />
                                <div>
                                    <h4 className="text-foreground font-bold">{item.title}</h4>
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Target Audience */}
                <section className="mb-20">
                    <h2 className="text-foreground mb-10 text-center text-2xl font-bold tracking-tight uppercase">Built for Everyone</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: 'Car Owners', desc: 'Stay ahead with smart tools for maintenance.' },
                            { title: 'Auto Engineers', desc: 'Take your skills further with industry-focused learning.' },
                            { title: 'Garage Owners', desc: 'Manage smarter, reach more customers & grow.' },
                            { title: 'Car Enthusiasts', desc: 'Dive deep into tools, docs & your passion.' },
                        ].map((item, i) => (
                            <div key={i} className="border-border bg-background border p-6 text-center">
                                <h4 className="text-foreground mb-2 font-bold">{item.title}</h4>
                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Privacy & Contact */}
                <section className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="bg-card border-border border p-8">
                        <h2 className="text-foreground mb-6 text-xl font-bold uppercase">Privacy Policy</h2>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                            We respect your privacy and are committed to protecting your personal data. We do not share or sell your data to third
                            parties. Your trust is important to us, and we take security seriously.
                        </p>
                        <a href="#" className="inline-flex items-center text-sm font-bold text-[#FF6D00] hover:underline">
                            More about privacy <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                    </div>
                    <div className="bg-card border-border border p-8">
                        <h2 className="text-foreground mb-6 text-xl font-bold uppercase">Get in Touch</h2>
                        <div className="text-muted-foreground space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-[#FF6D00]" /> 085 839 881
                            </div>
                            <div className="flex items-center gap-3">
                                <SendIcon className="h-4 w-4 text-[#FF6D00]" />
                                <a href="https://t.me/atechauto086" target="_blank" className="hover:text-[#FF6D00]">
                                    Telegram: @atechauto086
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-[#FF6D00] p-12 text-center text-white">
                    <h2 className="mb-4 text-3xl font-black tracking-tight uppercase">Get Started Now</h2>
                    <p className="mx-auto mb-8 max-w-lg font-medium opacity-90">Download the app and drive your automotive knowledge forward.</p>
                    <a
                        href="/download"
                        className="inline-block bg-[#121212] px-8 py-4 font-bold tracking-wider text-[#FF6D00] uppercase transition-colors hover:bg-neutral-900"
                    >
                        Download the App
                    </a>
                </section>
            </div>
        </FrontPageLayout>
    );
}
