import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchAllCruz } from '../../redux/cruzSlice';
import { FaStar } from "react-icons/fa";
import "./CruzTiles.css";

function CruzTiles() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cruzList, loading, error } = useSelector((state) => state.cruz);
  
    useEffect(() => {
      dispatch(fetchAllCruz());
    }, [dispatch]);
  console.log(cruzList)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
        <div className="cruz-tiles-container">
        <div className="tiles-wrapper">
          {cruzList.map((cruz) => {
            const primaryImage = cruz.images.find((img) => img.is_primary)?.image_url || 'default-image-url.jpg';
            const averageRating = cruz.reviews.length
              ? (cruz.reviews.reduce((sum, review) => sum + review.rating, 0) / cruz.reviews.length).toFixed(1)
              : 'New';
  
              const city = cruz.city || 'Unknown City';
              const state = cruz.state || 'Unknown State';

            return (
              <div className="cruz-tile" 
              key={cruz.id}
              onClick={() => {
                console.log("Navigating to Cruz ID:", cruz.id);
                navigate(`/cruz/${cruz.id}`);
              }}
              >
                <img src={primaryImage} alt={cruz.name} className="cruz-image" />
                <h3 className="cruz-name">{cruz.name}</h3>
                <p className="cruz-location">{`${city}, ${state}`}</p>
                <div className="cruz-info">
                  <FaStar className="star-icon" />
                  <span>{averageRating}</span>
                  <span className="dot">•</span>
                  <span>{cruz.difficulty}</span>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default CruzTiles;