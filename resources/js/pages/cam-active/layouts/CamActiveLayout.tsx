import { Link } from '@inertiajs/react';
import { DribbbleIcon, GithubIcon, HomeIcon, TwitchIcon, TwitterIcon } from 'lucide-react';
import { ReactNode } from 'react';
import Footer from '../components/footer';
import { Navbar } from '../components/navbar';

const CamActiveLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="bg-true-primary text-white">
                <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-4 sm:flex-row xl:px-0">
                    {/* Copyright */}
                    <span className="text-white flex items-center gap-2">
                        92 Bowery St New York, NY 10013 demo@example.com
                    </span>

                    <div className="flex items-center gap-5 text-white">
                        <Link href="#" target="_blank">
                            <TwitterIcon className="h-5 w-5" />
                        </Link>
                        <Link href="#" target="_blank">
                            <DribbbleIcon className="h-5 w-5" />
                        </Link>
                        <Link href="#" target="_blank">
                            <TwitchIcon className="h-5 w-5" />
                        </Link>
                        <Link href="#" target="_blank">
                            <GithubIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
            <header className="bg-background sticky top-0 z-50 mx-auto px-2 backdrop-blur-md">
                <Navbar />
            </header>
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
        </>
    );
};

export default CamActiveLayout;
