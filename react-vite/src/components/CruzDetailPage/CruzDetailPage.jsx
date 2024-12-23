import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCruzDetails } from '../../redux/cruzSlice';
import { fetchReviews } from '../../redux/reviewSlice';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice'; // Import favorite actions
import { FaBookmark } from "react-icons/fa"; // Bookmark icon
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
    const { reviews } = useSelector((state) => state.review);
    const favorites = useSelector((state) => state.favorites.favorites);
    const currentUser = useSelector((state) => state.session.user);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchCruzDetails(id));
            await dispatch(fetchReviews(id));
            setDataLoaded(true);
        }
        fetchData();
    }, [dispatch, id]);

    if (loading || !dataLoaded) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!cruzDetails) return <div>No Cruz details available.</div>;

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 'New';
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const { start_lat, start_lng, end_lat, end_lng } = cruzDetails;
    const primaryImage = cruzDetails.images.find((img) => img.is_primary)?.image_url || 'default-image.jpg';

    const isFavorited = favorites[cruzDetails.id];
    const handleFavoriteClick = () => {
        if (isFavorited) {
            dispatch(removeFavorite(cruzDetails.id));
        } else {
            dispatch(addFavorite(cruzDetails.id));
        }
    };

    const isCruzOwner = currentUser?.id === cruzDetails.creator.id;
    const userHasPostedReview = reviews.some((review) => review.user_id === currentUser?.id);

    return (
        <div className="cruz-detail-page">
            <header className="cruz-header">
                <div className="header-left">
                    <h2>{cruzDetails.name}</h2>
                </div>
                <div className="header-right">
                    <h2>Cruz Map</h2>
                </div>
            </header>

            <section className="content-section">
                <div className="image-section">
                    <div className="image-wrapper">
                        <img src={primaryImage} alt={cruzDetails.name} className="primary-image" />
                        {currentUser && (
                            <FaBookmark
                                className={`bookmark-icon ${isFavorited ? 'favorited' : ''}`}
                                onClick={handleFavoriteClick}
                            />
                        )}
                    </div>
                </div>
                <div className="map-section">
                    {start_lat && start_lng && end_lat && end_lng ? (
                        <MapComponent
                            startLat={start_lat}
                            startLng={start_lng}
                            endLat={end_lat}
                            endLng={end_lng}
                        />
                    ) : (
                        <p>Map data is not available.</p>
                    )}
                </div>
            </section>

            <section className="description-section">
                <p>{cruzDetails.description}</p>
                <p><strong>Location:</strong>{` ${cruzDetails.city}, ${cruzDetails.state}`}</p>
                <p><strong>Difficulty:</strong> {cruzDetails.difficulty}</p>
                <p><strong>Created by:</strong> {cruzDetails.creator.username}</p>
            </section>

            <section className="review-section">
                <h3>
                    ⭐ {reviews.length > 0 ? (
                        <>
                            {calculateAverageRating(reviews)} • {reviews.length}{' '}
                            {reviews.length === 1 ? 'Review' : 'Reviews'}
                        </>
                    ) : (
                        <>New</>
                    )}
                </h3>

                {currentUser && !isCruzOwner && !userHasPostedReview && (
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal cruzId={id} />}
                    />
                )}

                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="review">
                                <div className="review-details">
                                    <p>
                                        {new Date(review.created_at).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p><strong>{review.user.first_name}</strong> -{' '}{review.review_text}</p>
                                </div>

                                {currentUser?.id === review.user_id && (
                                    <div className="review-actions">
                                        <OpenModalButton
                                            buttonText="Edit"
                                            className="edit-button"
                                            modalComponent={<UpdateReviewModal reviewId={review.id} cruzId={id} />}
                                        />
                                        <OpenModalButton
                                            buttonText="Delete"
                                            className="delete-button"
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