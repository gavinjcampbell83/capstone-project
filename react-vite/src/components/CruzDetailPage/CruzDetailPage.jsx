import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCruzDetails } from '../../redux/cruzSlice';
import MapComponent from '../MapComponent/MapComponent';
import './CruzDetailPage.css';

function CruzDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { cruzDetails, loading, error } = useSelector((state) => state.cruz);

    useEffect(() => {
        dispatch(fetchCruzDetails(id));
    }, [dispatch, id]);
// console.log('CRUZ DETAILS', cruzDetails)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!cruzDetails) return <div>No Cruz details available.</div>;

    const { latitude, longitude, route_path } = cruzDetails;
    const center = { lat: latitude, lng: longitude };
    console.log('Route Path:', route_path);
    console.log('Center', center)
    const primaryImage = cruzDetails.images.find((img) => img.is_primary)?.image_url || 'default-image.jpg';
    const secondaryImages = cruzDetails.images.filter((img) => !img.is_primary).slice(0, 4);
    const testRoutePath = [
        { lat: 37.8199, lng: -122.4783 }, // Golden Gate Bridge
        { lat: 37.8100, lng: -122.4740 }, // Presidio
        { lat: 37.8025, lng: -122.4482 }, // Marina District
        { lat: 37.8001, lng: -122.4368 }, // Union Street
        { lat: 37.8078, lng: -122.4200 }, // Fisherman's Wharf
    ];
    return (
        <div className="cruz-detail-page">
            {/* Header Section */}
            <header className="cruz-header">
                <h1>{cruzDetails.name}</h1>
                <p>{`${cruzDetails.creator.city}, ${cruzDetails.creator.state}, ${cruzDetails.creator.country}`}</p>
            </header>

            
            <section className="content-section">
                <div className="images-section">
                    <img src={primaryImage} alt={cruzDetails.name} className="primary-image" />
                    <div className="secondary-images">
                        {secondaryImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.image_url}
                                alt={`Secondary ${index}`}
                                className="secondary-image"
                            />
                        ))}
                    </div>
                </div>
                <div className="map-section">
                    <h2>Route Map</h2>
                    <MapComponent center={center} routePath={testRoutePath} />
                </div>
            </section>

            {/* Description Section */}
            <section className="description-section">
                <h2>Description</h2>
                <p>{cruzDetails.description}</p>
            </section>

            {/* Review Section */}
            <section className="review-section">
                <h3>{`⭐ ${cruzDetails.rating} • ${cruzDetails.reviews.length} Reviews`}</h3>
                {cruzDetails.reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>
                            <strong>{review.user.firstName}</strong> -{' '}
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                        <p>{review.review_text}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default CruzDetailPage;