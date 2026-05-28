import { BatteryCharging, CarFront, CodeXmlIcon, FileText, GraduationCap, MapPin, PlayCircle, ShoppingCart, Store } from 'lucide-react';
import FrontPageLayout from './layouts/frontpage-layout';

export default function DownloadAppPage() {
    // Enhanced UX states: Active scale for click and refined border for hover
    const storeBadgeStyle =
        'flex h-[52px] w-full items-center justify-center gap-2 bg-black px-2 sm:px-4 text-white transition-all duration-150 ease-out border border-black hover:bg-neutral-800 hover:border-neutral-700 active:scale-[0.97] active:bg-black rounded-none cursor-pointer';

    return (
        <FrontPageLayout>
            <div className="section-container mt-8 pb-12">
                {/* Hero Section - Stacks flush on mobile/tablet, boxes out on desktop (lg) */}
                <section className="lg:border-border lg:bg-card mb-12 flex flex-col lg:flex-row lg:border">
                    {/* Left Column: Copy & Actions */}
                    <div className="lg:border-border flex flex-1 flex-col justify-center py-6 md:py-10 lg:border-r lg:p-10 xl:p-12">
                        <h1 className="text-foreground text-4xl leading-[1.1] font-black tracking-tighter uppercase md:text-5xl xl:text-6xl">
                            A-Tech Auto <br /> <span className="text-[#FF6D00]">In Your Pocket</span>
                        </h1>

                        <p className="text-muted-foreground mt-4 max-w-lg text-lg leading-relaxed">
                            Your ultimate automotive hub. Access DTC lookups, interactive garage maps, extensive repair manuals, and our spare parts
                            marketplace directly from your smartphone. Faster, smarter, and always with you.
                        </p>
                    </div>

                    {/* Right Column: Download & QR Grid */}
                    <div className="lg:bg-background flex w-full flex-col items-center justify-center py-8 lg:w-[480px] lg:p-10 xl:w-[560px] xl:p-12">
                        <div className="mb-8 flex items-center gap-3 text-[#FF6D00]">
                            <h2 className="text-foreground text-lg font-black tracking-widest uppercase">Get The App</h2>
                        </div>

                        {/* 2-Column Strict Grid */}
                        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
                            {/* iOS Column */}
                            <div className="flex flex-col items-center gap-4">
                                <a href="https://apps.apple.com/us/app/atech-auto/id6744029644" className={storeBadgeStyle}>
                                    <img src="/assets/icons/app-store.png" className="h-7 w-7 object-contain" alt="App Store" />
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="mb-1 text-[9px] font-medium tracking-wide opacity-90 sm:text-[10px]">Download on the</span>
                                        <span className="text-[14px] font-semibold tracking-tight sm:text-[16px]">App Store</span>
                                    </div>
                                </a>
                                <div className="border-border bg-card flex aspect-square w-full items-center justify-center border p-3 sm:p-4">
                                    <img src="/assets/images/qr/app-store.png" className="h-full w-full bg-white object-contain" alt="App Store QR" />
                                </div>
                                <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">iOS Version</span>
                            </div>

                            {/* Android Column */}
                            <div className="flex flex-col items-center gap-4">
                                <a href="https://play.google.com/store/apps/details?id=com.ata.ata_new_app" className={storeBadgeStyle}>
                                    <img src="/assets/icons/play-store.png" className="h-7 w-7 object-contain" alt="Google Play" />
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="mb-1 text-[9px] font-medium tracking-wide opacity-90 sm:text-[10px]">GET IT ON</span>
                                        <span className="text-[14px] font-semibold tracking-tight sm:text-[16px]">Google Play</span>
                                    </div>
                                </a>
                                <div className="border-border bg-card flex aspect-square w-full items-center justify-center border p-3 sm:p-4">
                                    <img
                                        src="/assets/images/qr/play-store.png"
                                        className="h-full w-full bg-white object-contain"
                                        alt="Play Store QR"
                                    />
                                </div>
                                <span className="text-muted-foreground text-[11px] font-bold tracking-widest uppercase">Android Version</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Expanded to 3x3 for the full ecosystem */}
                <section className="mb-12">
                    <h2 className="text-foreground mb-8 text-center text-2xl font-black tracking-tight uppercase">Why use our app?</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: ShoppingCart,
                                title: 'Parts Marketplace',
                                desc: 'Buy cars and spare parts, or register to list your own automotive products for sale.',
                            },
                            {
                                icon: Store,
                                title: 'Shops Directory',
                                desc: 'Browse our comprehensive directory to find trusted automotive shops and local experts.',
                            },
                            {
                                icon: PlayCircle,
                                title: 'Video Training',
                                desc: 'Master mechanics and car maintenance through our comprehensive online video tutorials.',
                            },
                            {
                                icon: MapPin,
                                title: 'Garage Maps',
                                desc: 'Google Maps integration helps you instantly locate verified auto garages near your current location.',
                            },
                            {
                                icon: BatteryCharging,
                                title: 'EV Station Map',
                                desc: 'Find nearby Electric Vehicle (EV) charging stations directly on our integrated live map.',
                            },
                            {
                                icon: FileText,
                                title: 'Documents Library',
                                desc: 'Access extensive PDFs including wiring diagrams, repair manuals, ECU pinouts, and Khmer specs.',
                            },

                            {
                                icon: GraduationCap,
                                title: 'In-Person Courses',
                                desc: 'Discover schedules and enroll in offline, hands-on professional automotive classes.',
                            },

                            {
                                icon: CodeXmlIcon,
                                title: 'DTC Decoder',
                                desc: 'Search Diagnostic Trouble Codes (DTC) to instantly read and understand vehicle errors.',
                            },
                            {
                                icon: CarFront,
                                title: 'The Ultimate Hub',
                                desc: 'An all-in-one platform built entirely to cover every aspect of the automotive industry.',
                            },
                        ].map((feat, i) => (
                            <div key={i} className="bg-card border-border flex flex-col items-center border p-6 text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <feat.icon className="h-6 w-6" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-foreground mb-2 text-lg font-black tracking-wide uppercase">{feat.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </FrontPageLayout>
    );
}
