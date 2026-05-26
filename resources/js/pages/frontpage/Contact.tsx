import { Mail, MapPin, Phone, Send } from 'lucide-react';
import React from 'react';
import FrontPageLayout from './layouts/frontpage-layout';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'accent' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors h-10 px-6 py-2 rounded-none border border-transparent cursor-pointer';
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        accent: 'bg-[#FF6D00] text-white hover:bg-[#e66200]',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={`border-border bg-card h-10 w-full rounded-none border px-4 py-2 text-sm focus:border-[#FF6D00] focus:outline-none ${className}`}
        {...props}
    />
);

const TextArea = ({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        className={`border-border bg-card min-h-[120px] w-full rounded-none border px-4 py-3 text-sm focus:border-[#FF6D00] focus:outline-none ${className}`}
        {...props}
    />
);

export default function ContactPage() {
    return (
        <FrontPageLayout>
            <div className="container mx-auto px-4 py-12 md:px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-foreground mb-4 text-3xl font-black tracking-tighter uppercase">Get in Touch</h1>
                    <p className="text-muted-foreground max-w-xl text-lg">
                        Have questions about our products, services, or how ATech Auto can support your automotive journey? Reach out to our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Contact Form */}
                    <div className="bg-card border-border border p-8 lg:col-span-2">
                        <h2 className="text-foreground mb-6 text-xl font-bold uppercase">Send a Message</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input placeholder="Full Name" />
                                <Input type="email" placeholder="Email Address" />
                            </div>
                            <Input placeholder="Subject" />
                            <TextArea placeholder="How can we help you?" />
                            <button type="submit" className={getButtonStyles('accent', 'w-full md:w-auto')}>
                                Send Message <Send className="ml-2 h-4 w-4" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-card border-border border p-8">
                            <h2 className="text-foreground mb-6 text-xl font-bold uppercase">Contact Channels</h2>
                            <div className="text-muted-foreground space-y-6 text-sm">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-5 w-5 shrink-0 text-[#FF6D00]" />
                                    <div>
                                        <p className="text-foreground font-bold">Phone</p>
                                        <a href="tel:+85585839881" className="hover:text-[#FF6D00]">
                                            +855 85 839 881
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Send className="h-5 w-5 shrink-0 text-[#FF6D00]" />
                                    <div>
                                        <p className="text-foreground font-bold">Telegram</p>
                                        <a href="https://t.me/atechauto086" target="_blank" className="hover:text-[#FF6D00]">
                                            @atechauto086
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-5 w-5 shrink-0 text-[#FF6D00]" />
                                    <div>
                                        <p className="text-foreground font-bold">Email</p>
                                        <a href="mailto:longsoeng017@gmail.com" className="hover:text-[#FF6D00]">
                                            longsoeng017@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Mini-Card */}
                        <div className="bg-card border-border border p-8">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 shrink-0 text-[#FF6D00]" />
                                <div>
                                    <p className="text-foreground mb-1 font-bold">Our Office</p>
                                    <p className="text-muted-foreground text-sm">ភូមិគោកឪឡឹក, សង្កាត់ស្ពានថ្ម, ខណ្ឌដង្កោ, រាជធានីភ្នំពេញ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
