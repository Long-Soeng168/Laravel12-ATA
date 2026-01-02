import { MapPin, Navigation } from 'lucide-react'; // Better icon for maps

const MapFloatingButton = () => {
    return (
        <div className="fixed right-6 bottom-6 z-50">
            <a
                href="/garages_map"
                className="group flex items-center gap-3 rounded-full border bg-red-500/80 px-5 py-3.5 pl-4 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95"
            >
                {/* Icon Container with subtle pulse */}
                <div className="relative flex size-6 items-center justify-center">
                    <MapPin className="relative z-10 size-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/20 opacity-75"></span>
                </div>

                {/* Text */}
                <span className="text-sm font-bold tracking-wide uppercase">Garages Map</span>

                {/* Small Arrow that appears on hover */}
                <Navigation className="size-4 rotate-0 opacity-80 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </a>
        </div>
    );
};

export default MapFloatingButton;
