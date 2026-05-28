import useTranslation from '@/hooks/use-translation';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function SeeAllProductsButton() {
    const { t } = useTranslation();

    return (
        <div className="flex justify-center pt-8">
            <Link
                prefetch
                href="/products"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF8A33] to-[#E66200] px-8 font-semibold text-white shadow-[0_8px_20px_-6px_rgba(255,109,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_-6px_rgba(255,109,0,0.6)] active:translate-y-0 active:shadow-md"
            >
                {/* Auto-sweeping Shimmer Effect (Glass reflection) */}
                <div className="absolute inset-0 flex h-full w-full [transform:skew(-13deg)_translateX(-150%)] justify-center transition-all duration-700 ease-out group-hover:[transform:skew(-13deg)_translateX(150%)]">
                    <div className="h-full w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2.5 tracking-wide">
                    {t('See All Products')}

                    {/* Arrow that bounces slightly right on hover */}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </span>
            </Link>
        </div>
    );
}
