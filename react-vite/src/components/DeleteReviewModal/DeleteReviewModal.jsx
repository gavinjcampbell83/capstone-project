import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { deleteReview } from '../../redux/reviewSlice';

import './DeleteReviewModal.css';

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deleteReview(reviewId));
        closeModal();
    };

    return (
        <div className="delete-review-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <div className="delete-review-modal-buttons">
                <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
                <button onClick={closeModal} className="cancel-delete">Cancel</button>
            </div>
        </div>
    );
}

export default DeleteReviewModal;