import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const SLIDE_DURATION = 4000;

export default function SlideHeroSection({ slides = [] }: { slides?: any[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const { currentLocale } = useTranslation();
    const isKh = currentLocale === 'kh';

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        return imagePath.startsWith('/') ? imagePath : `/assets/images/website_banners/${imagePath}`;
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Auto-play and Progress Bar logic
    useEffect(() => {
        if (slides.length <= 1) {
            setProgress(100);
            return;
        }

        setProgress(0);

        const progressTimer = setTimeout(() => {
            setProgress(100);
        }, 50);

        const slideTimer = setTimeout(() => {
            nextSlide();
        }, SLIDE_DURATION);

        return () => {
            clearTimeout(progressTimer);
            clearTimeout(slideTimer);
        };
    }, [currentSlide, slides.length]);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="border-border bg-card relative min-h-[450px] overflow-hidden border md:min-h-[550px]">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-[1000ms] ease-in-out ${
                        currentSlide === index ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
                    }`}
                    style={{
                        backgroundColor: slide.background_color || '#ffffff',
                    }}
                >
                    {/* Full Background Image */}
                    {slide.image && (
                        <img
                            src={getImageUrl(slide.image)}
                            alt={isKh ? slide.title_2_kh : slide.title_2}
                            className={`absolute inset-0 h-full w-full object-cover object-right transition-transform duration-[6000ms] ease-linear ${
                                currentSlide === index ? 'scale-105' : 'scale-100'
                            }`}
                        />
                    )}
                    <div className="absolute inset-0 z-20 flex max-w-3xl flex-col justify-center p-8 md:p-12 lg:p-16">
                        <div
                            className="absolute inset-0 z-10 hidden w-3/4 md:block"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${slide.background_color || '#ffffff'}f2 0%, ${slide.background_color || '#ffffff'}99 60%, transparent 100%)`,
                            }}
                        ></div>
                        <div
                            className="absolute inset-0 z-10 md:hidden"
                            style={{
                                backgroundColor: slide.background_color || '#ffffff',
                                opacity: 0.9,
                            }}
                        ></div>
                        <h2 className="z-20 mb-4 text-4xl font-black md:text-5xl" style={{ color: slide.foreground_color || '#000000' }}>
                            {isKh ? slide.title_1_kh : slide.title_1} <br />
                            <span className="mt-1 block text-[#FF6D00]">{isKh ? slide.title_2_kh : slide.title_2}</span>
                        </h2>
                        <p
                            className="z-20 mb-8 max-w-lg text-base font-medium md:text-lg md:font-normal"
                            style={{ color: slide.foreground_color || '#000000', opacity: 0.9 }}
                        >
                            {isKh ? slide.description_kh : slide.description}
                        </p>

                        {/* Dynamic Link Rendering Logic */}
                        {(slide.btn_link || slide.btn_text || slide.btn_text_kh) && (
                            slide.btn_link?.startsWith('http') ? (
                                <a
                                    href={slide.btn_link || '#'}
                                    className={getButtonStyles('accent', 'z-20 w-max gap-2 px-8 py-6 text-base shadow-none')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {isKh ? slide.btn_text_kh : slide.btn_text} <ArrowRight className="ml-1 h-5 w-5" />
                                </a>
                            ) : (
                                <Link
                                    prefetch
                                    href={slide.btn_link || '#'}
                                    className={getButtonStyles('accent', 'z-20 w-max gap-2 px-8 py-6 text-base shadow-none')}
                                >
                                    {isKh ? slide.btn_text_kh : slide.btn_text} <ArrowRight className="ml-1 h-5 w-5" />
                                </Link>
                            )
                        )}
                    </div>
                </div>
            ))}

            {/* Slideshow Navigation Controls (Dots with Progress & Arrows) */}
            {slides.length > 1 && (
                <div className="absolute right-8 bottom-6 left-8 z-30 flex items-center justify-between md:right-12 md:bottom-8 md:left-12 lg:right-16 lg:left-16">
                    {/* Dots with inline progress */}
                    <div className="flex gap-2">
                        {slides.map((_, idx) => {
                            const isActive = currentSlide === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    // Button itself acts as the background track
                                    className={`relative h-1.5 cursor-pointer overflow-hidden rounded-none transition-all duration-300 ${
                                        isActive ? 'w-12 bg-white/30' : 'w-4 bg-white/50 hover:bg-white/80'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                >
                                    {/* Inner progress bar fill */}
                                    <div
                                        className={`absolute top-0 left-0 h-full bg-[#FF6D00] ${
                                            progress === 0 ? 'transition-none' : 'transition-all ease-linear'
                                        }`}
                                        style={{
                                            width: isActive ? `${progress}%` : '0%',
                                            transitionDuration: progress === 0 ? '0ms' : `${SLIDE_DURATION}ms`,
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={prevSlide}
                            className="flex h-10 w-10 items-center justify-center rounded-none bg-black/10 text-white backdrop-blur transition-colors hover:bg-black/40"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="flex h-10 w-10 items-center justify-center rounded-none bg-black/10 text-white backdrop-blur transition-colors hover:bg-black/40"
                            aria-label="Next slide"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
