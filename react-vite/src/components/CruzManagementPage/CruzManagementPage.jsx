import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCruz } from "../../redux/cruzSlice";
import OpenModalButton from "../OpenModalButton";
import DeleteCruzModal from "../DeleteCruzModal/DeleteCruzModal";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./CruzManagementPage.css";

const CruzManagementPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cruzList = useSelector((state) => state.cruz.cruzList);
  const currentUser = useSelector((state) => state.session.user);

  const userCruz = cruzList.filter((cruz) => cruz.created_by === currentUser.id);

  useEffect(() => {
    dispatch(fetchAllCruz());
  }, [dispatch]);

  const handleCruzDelete = () => {
    dispatch(fetchAllCruz());
  };

  return (
    <div className="cruz-container">
      {userCruz.length === 0 ? (
        <div className="no-cruz-container">
          <p>You have not created any Cruz yet.</p>
          <Link to="/cruz/new">Create New Cruz</Link>
        </div>
      ) : (
        userCruz.map((cruz) => {
          const primaryImage =
            cruz.images.find((img) => img.is_primary)?.image_url || "/default-image.jpg";
          const averageRating = cruz.reviews.length
            ? (cruz.reviews.reduce((sum, review) => sum + review.rating, 0) / cruz.reviews.length).toFixed(1)
            : "New";

          return (
            <div 
              key={cruz.id} 
              className="cruz-tile" 
            >
              <div className="image-container">
                <img
                  src={primaryImage}
                  alt={cruz.name}
                  className="cruz-image"
                  onClick={() => navigate(`/cruz/${cruz.id}`)}
                />
              </div>
              <div className="cruz-details">
                <div className="cruz-details-wrapper">
                  <h3>{cruz.name}</h3>
                  <span className="cruz-rating">
                  <FaStar className="star-icon" />
                  <span>{averageRating}</span>
                  </span>
                </div>
                <div className="cruz-location">{`${cruz.city || "Unknown City"}, ${cruz.state || "Unknown State"}`}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cruz/${cruz.id}/edit`);
                  }}
                  className="edit-button"
                >
                  Edit
                </button>
                <OpenModalButton
                  modalComponent={
                    <DeleteCruzModal cruzId={cruz.id} onDelete={handleCruzDelete} />
                  }
                  buttonText="Delete"
                  className="delete-button"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CruzManagementPage;