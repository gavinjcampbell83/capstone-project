import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllCruz } from "../../redux/cruzSlice";
import OpenModalButton from "../OpenModalButton";
import DeleteCruzModal from "../DeleteCruzModal/DeleteCruzModal";
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
    <div className="cruz-management-container">
      {userCruz.length === 0 ? (
        <div className="no-cruz-management-container">
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
            <div key={cruz.id} className="cruz-management-tile">
              <div className="cruz-management-image-container">
                <img
                  src={primaryImage}
                  alt={cruz.name}
                  className="cruz-management-image"
                  onClick={() => navigate(`/cruz/${cruz.id}`)}
                />
              </div>
            <div className="cruz-management-details">
            <div className="cruz-management-details-wrapper">
              <h3>{cruz.name}</h3>
              <span className="cruz-management-rating">
                <FaStar className="star-icon" />
                {averageRating}
              </span>
            </div>
              <div className="cruz-management-location">
                {`${cruz.city || "Unknown City"}, ${cruz.state || "Unknown State"}`}
              </div>
                <div className="cruz-management-buttons">
                  <button
                    onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cruz/${cruz.id}/edit`);
                    }}
                    className="management-edit-button"
                    >
                    Edit
                  </button>
                      <OpenModalButton
                      modalComponent={
                      <DeleteCruzModal cruzId={cruz.id} onDelete={handleCruzDelete} />
                      }
                      buttonText="Delete"
                      className="management-delete-button"
                      onClick={(e) => e.stopPropagation()}
                      />
                  </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CruzManagementPage;