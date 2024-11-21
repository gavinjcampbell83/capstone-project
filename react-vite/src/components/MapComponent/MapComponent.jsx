import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const MapComponent = ({ center, routePath }) => {
    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };
    console.log('Received Route Path:', routePath);
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
            >
                {routePath && (
                    console.log('Polyline rendered with path:', routePath),
                    <Polyline
                        path={routePath}
                        options={{
                            strokeColor: '#FF0000',
                            strokeOpacity: 1,
                            strokeWeight: 4,
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;