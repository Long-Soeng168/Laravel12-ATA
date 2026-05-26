import { CheckCircle2, QrCode, ShieldCheck, Zap } from 'lucide-react';
import FrontPageLayout from './layouts/frontpage-layout';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'accent' | 'outline' = 'accent', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors h-14 px-8 py-3 rounded-none border border-transparent cursor-pointer';
    const variants = {
        accent: 'bg-[#FF6D00] text-white hover:bg-[#e66200]',
        outline: 'border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

export default function DownloadAppPage() {
    return (
        <FrontPageLayout>
            <div className="container mx-auto px-4 py-16 md:px-6">
                {/* Hero Section */}
                <section className="bg-card border-border mb-12 flex flex-col items-center gap-12 border p-8 md:flex-row md:p-16">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center rounded-none border border-[#FF6D00]/20 bg-[#FF6D00]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#FF6D00] uppercase">
                            Now Available
                        </div>
                        <h1 className="text-foreground text-4xl leading-tight font-black tracking-tighter uppercase md:text-5xl">
                            ATech Auto <br /> <span className="text-[#FF6D00]">In Your Pocket</span>
                        </h1>
                        <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                            Get full access to all diagnostic tools, online courses, and our spare parts marketplace directly from your smartphone.
                            Faster, smarter, and always with you.
                        </p>
                        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                            {/* App Store Button */}
                            <a href="https://apps.apple.com/us/app/atech-auto/id6744029644" className={getButtonStyles('accent', 'gap-3')}>
                                <img src="/assets/icons/app-store.png" className="h-8 w-8" alt="App Store" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] opacity-80">Download on the</span>
                                    <span className="text-md font-semibold">App Store</span>
                                </div>
                            </a>
                            {/* Play Store Button */}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.ata.ata_new_app"
                                className={getButtonStyles('accent', 'gap-3')}
                            >
                                <img src="/assets/icons/play-store.png" className="h-8 w-8" alt="Google Play" />
                                <div className="flex flex-col items-start leading-tight">
                                    <span className="text-[10px] opacity-80">GET IT ON</span>
                                    <span className="text-md font-semibold">Google Play</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Hero Icon */}
                    <div className="bg-background border-border flex-shrink-0 border p-12">
                        <img src="/assets/icons/smartphone.png" className="h-64 w-64 opacity-80" alt="ATech Auto App" />
                    </div>
                </section>

                {/* QR Code Section */}
                <section className="bg-card border-border mb-20 border p-8 text-center md:p-12">
                    <div className="mb-8 flex items-center justify-center gap-2 text-[#FF6D00]">
                        <QrCode className="h-6 w-6" />
                        <h2 className="text-foreground text-xl font-bold tracking-tight uppercase">Scan to Download</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
                        <div className="flex flex-col items-center gap-3">
                            <img src="/assets/images/qr/app-store.png" className="border-border h-40 w-40 border bg-white p-2" alt="App Store QR" />
                            <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">App Store</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <img src="/assets/images/qr/play-store.png" className="border-border h-40 w-40 border bg-white p-2" alt="Play Store QR" />
                            <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Play Store</span>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="mb-20">
                    <h2 className="text-foreground mb-12 text-center text-2xl font-bold tracking-tight uppercase">Why use the app?</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            { icon: Zap, title: 'Instant Diagnostics', desc: 'Plug and play. Scan and decode error codes in seconds.' },
                            { icon: ShieldCheck, title: 'Secure & Private', desc: 'Your data is encrypted. We protect your automotive history.' },
                            { icon: CheckCircle2, title: 'Offline Access', desc: 'Download manuals and docs to use without internet.' },
                        ].map((feat, i) => (
                            <div key={i} className="bg-card border-border border p-8 text-center">
                                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center bg-[#FF6D00]/10 text-[#FF6D00]">
                                    <feat.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-foreground mb-2 font-bold uppercase">{feat.title}</h3>
                                <p className="text-muted-foreground text-sm">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </FrontPageLayout>
    );
}
