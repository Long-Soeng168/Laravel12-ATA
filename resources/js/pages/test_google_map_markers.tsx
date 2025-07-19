import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import { XIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import NokorTechLayout from './nokor-tech/layouts/nokor-tech-layout';

// Define default styles and center for the map
const containerStyle = {
    width: '100%',
    height: '100%', // Increased height for better visibility of multiple markers
};

const defaultCenter = {
    // Centered around Phnom Penh, or you can calculate a center based on your data
    lat: 11.5564,
    lng: 104.9282,
};

function LocationsMapDisplay() {
    // --- Data to be displayed (You will replace this with your fetch logic) ---

    const { locationsData } = usePage().props;

    const { isLoaded } = useJsApiLoader({
        // IMPORTANT: Replace with your actual environment variable for the API key
        googleMapsApiKey: 'AIzaSyCc_v9QSM5uPBP08pJ3OMA_a2_BtqHXNMM', // e.g., process.env.REACT_APP_Maps_API_KEY
        libraries: ['places'], // 'places' is still useful if you plan to add search later
    });

    // State to manage the currently open InfoWindow
    const [activeMarker, setActiveMarker] = useState(null);

    const handleMarkerClick = useCallback((markerId) => {
        setActiveMarker(markerId);
    }, []);

    const handleInfoWindowClose = useCallback(() => {
        setActiveMarker(null);
    }, []);

    if (!isLoaded) {
        return <p>Loading map...</p>;
    }

    return (
        <NokorTechLayout>
            <div className="map-container flex flex-col" style={{ height: '80vh', width: '100%' }}>
                <div className="flex-1">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={defaultCenter} // You might want to dynamically calculate this based on your markers
                        zoom={12} // Adjust zoom level as needed
                    >
                        {locationsData.map((location) => (
                            <Marker
                                key={location.id}
                                position={{ lat: location.latitude, lng: location.longitude }}
                                onClick={() => handleMarkerClick(location.id)}
                                icon={{
                                    url: '/assets/icons/khmer.png', // Custom marker icon (replace with your own)
                                    scaledSize: new window.google.maps.Size(30, 30), // Resize marker
                                    anchor: new window.google.maps.Point(20, 30), // Position anchor
                                }}
                            >
                                {activeMarker === location.id && (
                                    <InfoWindow onCloseClick={handleInfoWindowClose}>
                                        <div className="relative ml-2 max-w-72">
                                            <style>{`
                                      .gm-style-iw button.gm-ui-hover-effect {
                                          display: none !important;
                                      }
                                  `}</style>
                                            <div className="absolute top-1 right-1 z-10 flex justify-end">
                                                <Button onClick={handleInfoWindowClose} variant="outline" className="bg-background/50">
                                                    <XIcon />
                                                </Button>
                                            </div>
                                            {/* Banner */}
                                            {location.banner && (
                                                <div className="relative w-full">
                                                    <img
                                                        src={`/assets/images/garages/${location.banner}`}
                                                        alt="Banner"
                                                        onError={(e) => (e.target.src = '/assets/images/garages/default-banner.png')}
                                                        className="aspect-[21/9] w-full max-w-10 rounded-md object-cover"
                                                    />
                                                    {/* Logo overlay */}
                                                    {location.logo && (
                                                        <img
                                                            src={`/assets/images/garages/${location.logo}`}
                                                            alt="Logo"
                                                            onError={(e) => (e.target.src = '/assets/images/garages/default-logo.png')}
                                                            className="absolute bottom-0 left-4 -mb-8 size-16 rounded-full border-2 border-white bg-white object-contain shadow-md"
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="pt-10 pb-1">
                                                {/* Info */}
                                                <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
                                                <p className="mb-1 text-sm text-gray-600">Phone: {location.phone}</p>
                                                <p className="text-sm text-gray-700">{location.address}</p>
                                                {location.latitude && location.longitude && (
                                                    <a
                                                        href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-2 inline-block text-sm text-blue-500 hover:underline"
                                                    >
                                                        View on Google Maps
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}
                    </GoogleMap>
                </div>
            </div>
        </NokorTechLayout>
    );
}

export default LocationsMapDisplay;
