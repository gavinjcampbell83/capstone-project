import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { updateReview } from "../../redux/reviewSlice";
import { fetchCruzDetails } from '../../redux/cruzSlice';
import './UpdateReviewModal.css';

function UpdateReviewModal({ cruzId, reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const reviewDetails = useSelector((state) => {
        const reviews = state.review?.reviews || [];
        console.log('REVIEWS', reviews)
        return reviews.find((review) => review.id === reviewId);
    });
    const isLoading = !reviewDetails;

    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        if (reviewDetails) {
            setReviewText(reviewDetails.review_text);
            setStars(reviewDetails.rating);
        }
    }, [reviewDetails]);

    if (isLoading) return <div>Loading...</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);

        const reviewData = {
            review_text: reviewText,
            rating: stars,
        };

        const result = await dispatch(updateReview({ reviewId, reviewData }));
        if (result.error) {
            setServerError(result.error.message || "Failed to update review.");
        } else {
            // await dispatch(fetchCruzDetails(cruzId));
            closeModal();
        }
    };

    const isSubmitDisabled = reviewText.length < 10 || stars === 0;

    return (
        <div className="review-modal-container">
            <h2>Update Your Review</h2>
            <form onSubmit={handleSubmit}>
                {serverError && (
                    <div className='error-messages'>
                        <p className="error">{serverError}</p>
                    </div>
                )}

                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    required
                    minLength={10}
                />

                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onMouseEnter={() => setHoveredStars(star)}
                            onMouseLeave={() => setHoveredStars(0)}
                            onClick={() => setStars(star)}
                            className={star <= (hoveredStars || stars) ? 'filled' : 'empty'}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitDisabled}
                    className={isSubmitDisabled ? 'disabled' : ''}
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}

export default UpdateReviewModal;