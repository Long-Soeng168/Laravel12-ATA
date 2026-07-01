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

export default function MiniHeroSection({ banners = [] }: { banners?: any[] }) {
    const { currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        return imagePath.startsWith('/') ? imagePath : `/assets/images/website_banners/${imagePath}`;
    };

    if (!banners || banners.length === 0) return null;

    return (
        <div className={`grid grid-cols-1 gap-4 ${banners.length === 2 ? 'sm:grid-cols-3' : ''}`}>
            {banners.map((banner, index) => {
                const isLarge = banners.length === 1 || index === 0;

                return (
                    <div
                        key={banner.id}
                        className={`group bg-card border-border relative h-52 overflow-hidden border md:h-[260px] ${
                            isLarge && banners.length === 2 ? 'sm:col-span-2' : ''
                        }`}
                    >
                        {banner.image && (
                            <img
                                src={getImageUrl(banner.image)}
                                alt={isKh ? banner.title_1_kh : banner.title_1}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}

                        {isLarge ? (
                            <>
                                {/* Fade out background from left to right */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${banner.background_color || '#0f172a'}F2 0%, ${banner.background_color || '#0f172a'}99 60%, transparent 100%)`,
                                    }}
                                ></div>
                                <div className="absolute inset-0 z-20 flex items-center p-6 md:px-10">
                                    <div>
                                        <h3 className="mt-1 text-xl font-black md:text-3xl" style={{ color: banner.foreground_color || '#ffffff' }}>
                                            {isKh ? banner.title_1_kh : banner.title_1}
                                        </h3>
                                        <p className="mt-2 max-w-sm text-sm" style={{ color: banner.foreground_color || '#ffffff', opacity: 0.85 }}>
                                            {isKh ? banner.description_kh : banner.description}
                                        </p>
                                        {(banner.btn_link || banner.btn_text || banner.btn_text_kh) && (
                                            <a href={banner.btn_link || '#'} className={getButtonStyles('accent', 'mt-5 px-6 shadow-none')}>
                                                {isKh ? banner.btn_text_kh : banner.btn_text} <ArrowRight className="ml-2 h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Fade out background from bottom to top */}
                                <div
                                    className="absolute inset-0 z-10"
                                    style={{
                                        backgroundImage: `linear-gradient(to top, ${banner.background_color || '#0f172a'}F2 0%, ${banner.background_color || '#0f172a'}66 70%, transparent 100%)`,
                                    }}
                                ></div>
                                <div className="absolute inset-0 z-20 flex items-end p-6">
                                    <div className="w-full">
                                        <h3 className="mt-0.5 text-lg font-black md:text-xl" style={{ color: banner.foreground_color || '#ffffff' }}>
                                            {isKh ? banner.title_1_kh : banner.title_1}
                                        </h3>
                                        <p className="mt-2 max-w-sm text-sm" style={{ color: banner.foreground_color || '#ffffff', opacity: 0.85 }}>
                                            {isKh ? banner.description_kh : banner.description}
                                        </p>

                                        {(banner.btn_link || banner.btn_text || banner.btn_text_kh) && (
                                            banner.btn_link?.startsWith('http') ? (
                                                <a
                                                    href={banner.btn_link || '#'}
                                                    className="mt-3 inline-flex items-center text-xs font-bold transition-colors hover:text-[#FF6D00]"
                                                    style={{ color: banner.foreground_color || '#ffffff' }}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {isKh ? banner.btn_text_kh : banner.btn_text}
                                                    <ArrowRight className="ml-1 h-3 w-3" />
                                                </a>
                                            ) : (
                                                <Link
                                                    prefetch
                                                    href={banner.btn_link || '#'}
                                                    className="mt-3 inline-flex items-center text-xs font-bold transition-colors hover:text-[#FF6D00]"
                                                    style={{ color: banner.foreground_color || '#ffffff' }}
                                                >
                                                    {isKh ? banner.btn_text_kh : banner.btn_text}
                                                    <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            )
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
