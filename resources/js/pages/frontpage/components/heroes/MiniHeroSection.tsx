import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

// --- Shared Flat UI Primitives ---
const getButtonStyles = (variant: 'default' | 'outline' | 'accent' | 'inverse' | 'ghost' = 'default', className = '') => {
    const baseStyle =
        'inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 rounded-none border border-transparent cursor-pointer';
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground text-muted-foreground',
        accent: 'bg-[#FF6D00] text-white hover:bg-[#e66200]',
        inverse: 'bg-[#121212] text-[#FF6D00] hover:bg-neutral-900 border border-[#121212]',
    };
    return `${baseStyle} ${variants[variant]} ${className}`;
};

// --- Mock Data ---
const APP_EXCLUSIVE_BANNERS = [
    {
        id: 'b1',
        title: 'Video Training Online',
        title_kh: 'វគ្គបណ្តុះបណ្តាលតាមវីដេអូអនឡាញ',
        desc: 'Master auto mechanics with our comprehensive library of expert video tutorials and step-by-step practical guides.',
        desc_kh: 'សិក្សាពីការថែទាំរថយន្តតាមរយៈបណ្ណាល័យវីដេអូបង្រៀនដោយអ្នកជំនាញ និងការណែនាំអនុវត្តជាជំហានៗរបស់យើង។',
        btnText: 'Watch in App',
        btnText_kh: 'ទស្សនាក្នុងកម្មវិធី',
        btnLink: '/download-app',
        background_color: '#0f172a',
        forground_color: '#ffffff',
        img: '/assets/images/sample/training_online_banner1.webp',
    },
    {
        id: 'b2',
        title: 'Engineering Documents',
        title_kh: 'ឯកសារវិស្វកម្ម',
        desc: 'Access thousands of car manuals and schematics.',
        desc_kh: 'ចូលមើលសៀវភៅណែនាំរថយន្ត និងគំនូសតាងរាប់ពាន់។',
        btnText: 'Read in App',
        btnText_kh: 'អានក្នុងកម្មវិធី',
        btnLink: '/download-app',
        background_color: '#0f172a',
        forground_color: '#ffffff',
        img: '/assets/images/sample/documents_banner1.webp',
    },
];

export default function MiniHeroSection() {
    const { currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';

    return (
        <div className={`grid grid-cols-1 gap-4 ${APP_EXCLUSIVE_BANNERS.length === 2 ? 'sm:grid-cols-3' : ''}`}>
            {APP_EXCLUSIVE_BANNERS.map((banner, index) => {
                const isLarge = APP_EXCLUSIVE_BANNERS.length === 1 || index === 0;

                return (
                    <div
                        key={banner.id}
                        className={`group bg-card border-border relative h-52 overflow-hidden border md:h-[260px] ${
                            isLarge && APP_EXCLUSIVE_BANNERS.length === 2 ? 'sm:col-span-2' : ''
                        }`}
                    >
                        <img
                            src={banner.img}
                            alt={isKh ? banner.title_kh : banner.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {isLarge ? (
                            <>
                                {/* Fade out background from left to right */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${banner.background_color}F2 0%, ${banner.background_color}99 60%, transparent 100%)`,
                                    }}
                                ></div>
                                <div className="absolute inset-0 z-20 flex items-center p-6 md:px-10">
                                    <div>
                                        <h3 className="mt-1 text-xl font-black md:text-3xl" style={{ color: banner.forground_color }}>
                                            {isKh ? banner.title_kh : banner.title}
                                        </h3>
                                        <p className="mt-2 max-w-sm text-sm" style={{ color: banner.forground_color, opacity: 0.85 }}>
                                            {isKh ? banner.desc_kh : banner.desc}
                                        </p>
                                        <a href={banner.btnLink} className={getButtonStyles('accent', 'mt-5 px-6 shadow-none')}>
                                            {isKh ? banner.btnText_kh : banner.btnText} <ArrowRight className="ml-2 h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Fade out background from bottom to top */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{
                                        backgroundImage: `linear-gradient(to top, ${banner.background_color}F2 0%, ${banner.background_color}66 70%, transparent 100%)`,
                                    }}
                                ></div>
                                <div className="absolute inset-0 z-20 flex items-end p-6">
                                    <div className="w-full">
                                        <h3 className="mt-0.5 text-lg font-black md:text-xl" style={{ color: banner.forground_color }}>
                                            {isKh ? banner.title_kh : banner.title}
                                        </h3>
                                        <p className="mt-2 max-w-sm text-sm" style={{ color: banner.forground_color, opacity: 0.85 }}>
                                            {isKh ? banner.desc_kh : banner.desc}
                                        </p>

                                        {banner.btnLink.startsWith('http') ? (
                                            <a
                                                href={banner.btnLink}
                                                className="mt-3 inline-flex items-center text-xs font-bold transition-colors hover:text-[#FF6D00]"
                                                style={{ color: banner.forground_color }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {isKh ? banner.btnText_kh : banner.btnText}
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </a>
                                        ) : (
                                            <Link
                                                prefetch
                                                href={banner.btnLink}
                                                className="mt-3 inline-flex items-center text-xs font-bold transition-colors hover:text-[#FF6D00]"
                                                style={{ color: banner.forground_color }}
                                            >
                                                {isKh ? banner.btnText_kh : banner.btnText}
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
