import { Mail, MapPin, Phone, SendIcon } from 'lucide-react';
import FrontPageLayout from './layouts/frontpage-layout';

export default function ContactPage() {
    return (
        <FrontPageLayout>
            <div className="section-container mt-8 pb-12">
                {/* Header Section */}
                <section className="mb-16 flex flex-col items-center text-center">
                    <h1 className="text-foreground mb-6 text-4xl font-black tracking-tighter uppercase md:text-5xl lg:text-6xl">
                        Get in <span className="text-[#FF6D00]">Touch</span>
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
                        Have questions about our products, services, or how A-Tech Auto can support your automotive journey? Reach out to our team
                        directly through any of the channels below.
                    </p>
                </section>

                {/* Contact Channels Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Phone */}
                    <a
                        href="tel:+85585839881"
                        className="bg-card border-border group flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00] active:scale-[0.97]"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00] transition-colors group-hover:bg-[#FF6D00] group-hover:text-white">
                            <Phone className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <h2 className="text-foreground mb-2 text-lg font-black tracking-wide uppercase">Phone</h2>
                        <p className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">+855 85 839 881</p>
                    </a>

                    {/* Telegram */}
                    <a
                        href="https://t.me/atechauto086"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-card border-border group flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00] active:scale-[0.97]"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00] transition-colors group-hover:bg-[#FF6D00] group-hover:text-white">
                            <SendIcon className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <h2 className="text-foreground mb-2 text-lg font-black tracking-wide uppercase">Telegram</h2>
                        <p className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">@atechauto086</p>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:longsoeng017@gmail.com"
                        className="bg-card border-border group flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00] active:scale-[0.97]"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00] transition-colors group-hover:bg-[#FF6D00] group-hover:text-white">
                            <Mail className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <h2 className="text-foreground mb-2 text-lg font-black tracking-wide uppercase">Email</h2>
                        <p className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors">
                            longsoeng017@gmail.com
                        </p>
                    </a>

                    {/* Location */}
                    <div className="bg-card border-border flex flex-col items-center border p-8 text-center transition-all duration-200 hover:border-[#FF6D00]">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#FF6D00]/20 bg-[#FF6D00]/10 text-[#FF6D00]">
                            <MapPin className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <h2 className="text-foreground mb-2 text-lg font-black tracking-wide uppercase">Our Office</h2>
                        <p className="text-muted-foreground text-[13px] leading-relaxed">ភូមិគោកឪឡឹក, សង្កាត់ស្ពានថ្ម, ខណ្ឌដង្កោ, រាជធានីភ្នំពេញ</p>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
