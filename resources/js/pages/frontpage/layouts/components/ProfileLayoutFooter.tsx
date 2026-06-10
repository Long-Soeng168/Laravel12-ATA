import useTranslation from '@/hooks/use-translation';
import { Link, usePage } from '@inertiajs/react';

export default function ProfileLayoutFooter() {
    const { t, currentLocale } = useTranslation();
    const { website_info } = usePage<any>().props;

    const copyrightText =
        (currentLocale === 'kh' ? website_info?.copyright_kh : website_info?.copyright) ||
        `© ${new Date().getFullYear()} RULE Library. All rights reserved.`;

    const logo = website_info?.logo ? `/assets/images/website_infos/thumb/${website_info.logo}` : '/assets/images/default-logo.png';

    return (
        <footer className="relative mt-auto overflow-hidden bg-background">
            {/* ========================================= */}
            {/* 1. PREMIUM BACKGROUND LAYERS              */}
            {/* ========================================= */}

            {/* Gradient Top Border Highlight */}
            <div className="absolute top-0 left-1/2 h-[1.5px] w-full max-w-screen-xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#FF6D00]/60 to-transparent"></div>

            {/* Top Center Radial Mesh Glow */}
            <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-full bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(255,109,0,0.12),transparent)]"></div>

            {/* ========================================= */}
            {/* 2. FOREGROUND CONTENT                     */}
            {/* ========================================= */}
            <section className="section-container">
                <div className="flex justify-center pt-10">
                    <Link prefetch href="/" className="group mb-6 flex cursor-pointer items-center gap-4">
                        <div className="flex flex-col items-center">
                            <img src={logo} className="mb-3 size-22 object-contain md:size-28" alt="RULE Logo" />
                            <div className="flex flex-col text-center text-foreground">
                                <div className="whitespace-nowrap">
                                    <p className="text-base font-medium whitespace-nowrap md:text-[16px]">គេហទំព័របណ្ណាល័យនៃ</p>
                                    <p className="text-lg leading-tight font-semibold md:text-[18px] md:font-bold">សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្ត្រ</p>
                                    <p className="text-lg leading-tight font-semibold md:text-[18px] md:font-bold">និងវិទ្យាសាស្ត្រសេដ្ឋកិច្ច</p>
                                    <p className="mt-1 text-xs leading-tight font-normal md:text-[12px] md:font-medium">
                                        Royal University of Law and Economics
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="relative z-10 mx-auto max-w-333 sm:pb-0">
                    <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
                        <p
                            className="text-center text-sm"
                            dangerouslySetInnerHTML={{
                                __html: copyrightText,
                            }}
                        />
                        <Link prefetch href={`/our-staffs`} className="text-sm">
                            {t('Deverloped By')} : <b className="underline-offset-4 hover:underline">{t('E-Library Staff')}</b>
                        </Link>
                    </div>
                </div>
            </section>
        </footer>
    );
}
