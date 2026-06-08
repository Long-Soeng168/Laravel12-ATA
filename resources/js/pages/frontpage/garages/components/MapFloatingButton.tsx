import useTranslation from '@/hooks/use-translation';
import { MapPin, Navigation } from 'lucide-react';

const MapFloatingButton = () => {
    // Note: 't' is imported but unused in the text below. 
    // Consider replacing the ternary string with t('garages_map') if it's in your locales!
    const { t, currentLocale } = useTranslation();

    return (
        <div className="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
            <a
                href="/garages_map"
                aria-label={currentLocale === 'kh' ? 'ផែនទីយានដ្ឋាន' : 'Garages Map'}
                className="group flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500 py-3 pl-4 pr-5 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95 sm:gap-3 sm:py-3.5"
            >
                {/* Icon Container with subtle pulse */}
                <div className="relative flex size-5 items-center justify-center sm:size-6">
                    <MapPin className="relative z-10 size-4 transition-transform duration-300 group-hover:rotate-12 sm:size-5" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/20 opacity-75"></span>
                </div>

                {/* Text - Scaled down slightly for mobile */}
                <span className="text-xs font-medium sm:text-sm">
                    {currentLocale === 'kh' ? 'ផែនទីយានដ្ឋាន' : 'Garages Map'}
                </span>

                {/* Small Arrow - Hidden on extra-small screens to save space, appears on hover */}
                <Navigation className="hidden size-4 rotate-0 opacity-80 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
            </a>
        </div>
    );
};

export default MapFloatingButton;