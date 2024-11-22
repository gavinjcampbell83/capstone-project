import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { deleteReview } from '../../redux/reviewSlice';
import { fetchCruzDetails } from '../../redux/cruzSlice';
import './DeleteReviewModal.css';

function DeleteReviewModal({ reviewId, cruzId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        // Dispatch deleteReview and refresh Cruz details
        await dispatch(deleteReview(reviewId));
        await dispatch(fetchCruzDetails(cruzId));
        closeModal(); // Close the modal after deletion
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