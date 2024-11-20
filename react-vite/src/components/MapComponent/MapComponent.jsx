import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
    const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco

    useEffect(() => {
        // Check if Geolocation is available
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    // Optionally, fallback to a default location
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []); // Empty dependency array to run only once

    const mapContainerStyle = {
        width: '50%',
        height: '400px',
    };

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            />
        </LoadScript>
    );
};

export default MapComponent;