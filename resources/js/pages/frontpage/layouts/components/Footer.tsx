import { Facebook, Mail, MapPin, MessageCircle, Phone, Send, Wrench } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-card border-border mt-auto border-t">
            <div className="section-container py-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-1">
                        <a href="/" className="text-foreground mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <Wrench className="h-6 w-6 text-[#FF6D00]" />
                            <span>
                                ATECH <span className="text-[#FF6D00]">AUTO</span>
                            </span>
                        </a>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Your premier multi-vendor marketplace for high-quality automotive spare parts. Precision engineered solutions directly to
                            your garage.
                        </p>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">Information</h4>
                        <div className="text-muted-foreground space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6D00]" />
                                <span className="leading-tight">ភូមិគោកឪឡឹក, សង្កាត់ស្ពានថ្ម, ខណ្ឌដង្កោ, រាជធានីភ្នំពេញ</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-[#FF6D00]" />
                                <a href="tel:+85585839881" className="hover:text-foreground transition-colors">
                                    +855 85 839 881
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-[#FF6D00]" />
                                <a href="mailto:longsoeng017@gmail.com" className="hover:text-foreground transition-colors">
                                    longsoeng017@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">Quick Links</h4>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            <li>
                                <a href="/" className="transition-colors hover:text-[#FF6D00]">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/products" className="transition-colors hover:text-[#FF6D00]">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="transition-colors hover:text-[#FF6D00]">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="transition-colors hover:text-[#FF6D00]">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="transition-colors hover:text-[#FF6D00]">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-foreground mb-6 text-sm font-bold tracking-wider uppercase">Social Media</h4>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            <li>
                                <a href="#" className="flex items-center gap-2 transition-colors hover:text-[#FF6D00]">
                                    <Facebook className="h-4 w-4" /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 transition-colors hover:text-[#FF6D00]">
                                    <MessageCircle className="h-4 w-4" /> Messenger
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-2 transition-colors hover:text-[#FF6D00]">
                                    <Send className="h-4 w-4" /> Telegram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Area */}
                <div className="border-border text-muted-foreground mt-12 flex flex-col items-center justify-between border-t pt-6 text-xs md:flex-row">
                    <p>&copy; {new Date().getFullYear()} A-Tech Auto. All rights reserved.</p>
                    <div className="mt-4 flex gap-4 md:mt-0">
                        <a href="#" className="hover:text-foreground transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-foreground transition-colors">
                            Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
