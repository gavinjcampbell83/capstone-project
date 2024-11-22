import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCruzDetails } from '../../redux/cruzSlice';
import { fetchReviews } from '../../redux/reviewSlice';
import MapComponent from '../MapComponent/MapComponent';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import './CruzDetailPage.css';

function CruzDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { cruzDetails, loading, error } = useSelector((state) => state.cruz);
    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(fetchCruzDetails(id));
        dispatch(fetchReviews(id));
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!cruzDetails) return <div>No Cruz details available.</div>;

    const { latitude, longitude, route_path, reviews } = cruzDetails;
    const center = { lat: latitude, lng: longitude };

    const primaryImage = cruzDetails.images.find((img) => img.is_primary)?.image_url || 'default-image.jpg';
    const secondaryImages = cruzDetails.images.filter((img) => !img.is_primary).slice(0, 4);

    const isCruzOwner = currentUser?.id === cruzDetails.creator.id;
    const userHasPostedReview = reviews.some((review) => review.user_id === currentUser?.id);

    return (
        <div className="cruz-detail-page">
            {/* Header Section */}
            <header className="cruz-header">
                <h1>{cruzDetails.name}</h1>
                <p>{`${cruzDetails.creator.city}, ${cruzDetails.creator.state}, ${cruzDetails.creator.country}`}</p>
            </header>

            {/* Content Section */}
            <section className="content-section">
                <div className="images-section">
                    <img src={primaryImage} alt={cruzDetails.name} className="primary-image" />
                    <div className="secondary-images">
                        {secondaryImages.map((image, index) => (
                            <img key={index} src={image.image_url} alt={`Secondary ${index}`} className="secondary-image" />
                        ))}
                    </div>
                </div>
                <div className="map-section">
                    <h2>Route Map</h2>
                    <MapComponent center={center} routePath={route_path} />
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

                {/* Post Review Button */}
                {currentUser && !isCruzOwner && !userHasPostedReview && (
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal cruzId={id} />}
                    />
                )}

                {/* Reviews List */}
                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews
                            .slice()
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .map((review) => (
                                <div key={review.id} className="review">
                                    <div className="review-details">
                                        <p>
                                            <strong>{review.user.firstName}</strong> -{' '}
                                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </p>
                                        <p>{review.review_text}</p>
                                    </div>

                                    {/* Update/Delete Buttons for User's Review */}
                                    {currentUser?.id === review.user_id && (
                                        <div className="review-actions">
                                            <OpenModalButton
                                                buttonText="Edit"
                                                {...console.log('Review.id in cruz details', review.id)}
                                                modalComponent={<UpdateReviewModal reviewId={review.id} cruzId={id} />}
                                            />
                                            <OpenModalButton
                                                buttonText="Delete"
                                                modalComponent={<DeleteReviewModal reviewId={review.id} cruzId={id} />}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))
                    ) : (
                        <div>Be the first to post a review!</div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default CruzDetailPage;