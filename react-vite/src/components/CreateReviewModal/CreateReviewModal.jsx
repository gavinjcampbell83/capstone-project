import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../redux/reviewSlice';
import { fetchCruzDetails } from '../../redux/cruzSlice';
import './CreateReviewModal.css';
import { useModal } from '../../context/Modal';

function CreateReviewForm({ cruzId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoveredStars, setHoveredStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    setReviewText("");
    setRating(0);
    setHoveredStars(0);
    setErrors([]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || reviewText.length < 10) {
      setErrors(['Rating is required and review must be at least 10 characters']);
      return;
    }

    const result = await dispatch(
      createReview({
        cruzId,
        userId: user.id,
        rating,
        reviewText,
      })
    );

    if (result.error) {
      setErrors([result.error.message || 'Failed to create review']);
    } else {
      await dispatch(fetchCruzDetails(cruzId));
      closeModal();
    }
  };

  const isSubmitDisabled = reviewText.length < 10 || rating === 0;

  return (
    <div className="review-modal-container">
      <h2>Write a Review</h2>
      {errors && (
        <ul className='error-messages'>
          {errors.map((error, idx) => (
            <li key={idx} className="error">{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Review:
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            required
          />
        </label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHoveredStars(star)}
              onMouseLeave={() => setHoveredStars(0)}
              onClick={() => setRating(star)}
              className={star <= (hoveredStars || rating) ? 'filled' : 'empty'}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit" disabled={isSubmitDisabled}>Submit Review</button>
      </form>
    </div>
  );
}

export default CreateReviewForm;