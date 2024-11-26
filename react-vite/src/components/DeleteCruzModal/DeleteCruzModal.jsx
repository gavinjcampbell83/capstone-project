import { useDispatch } from "react-redux";
import { deleteCruzThunk } from "../../redux/cruzSlice";
import { useModal } from "../../context/Modal";
import "./DeleteCruzModal.css";

const DeleteCruzModal = ({ cruzId, onDelete }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteCruzThunk(cruzId));
    onDelete(); // Refresh the Cruz list after deletion
    closeModal();
  };

  return (
    <div className="delete-cruz-modal">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this Cruz?</p>
      <div className="delete-cruz-modal-actions">
        <button onClick={handleDelete} className="confirm-delete-button">
          Yes, Delete
        </button>
        <button onClick={closeModal} className="cancel-delete-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCruzModal;