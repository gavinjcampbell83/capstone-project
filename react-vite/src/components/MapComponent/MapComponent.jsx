import { useState, useEffect } from 'react';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = ({ startLat, startLng, endLat, endLng }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [directions, setDirections] = useState(null);

    useEffect(() => {
        if (isLoaded && startLat && startLng && endLat && endLng) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: { lat: startLat, lng: startLng },
                    destination: { lat: endLat, lng: endLng },
                    travelMode: window.google.maps.TravelMode.BICYCLING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );
        }
    }, [isLoaded, startLat, startLng, endLat, endLng]);

    if (!isLoaded) {
        return <p>Loading map...</p>;
    }

    const mapContainerStyle = {
        width: '100%',
        height: '500px',
    };

    const center = { lat: startLat || 0, lng: startLng || 0 };

    return (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};

export default MapComponent;