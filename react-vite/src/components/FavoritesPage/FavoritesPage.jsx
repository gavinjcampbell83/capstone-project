import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaBookmark } from "react-icons/fa";
import { removeFavorite } from '../../redux/favoritesSlice'; 
import "../CruzTiles/CruzTiles.css";

function FavoritesPage() {
    const favorites = useSelector((state) => state.favorites.favorites);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use dispatch for removing favorites
    const currentUser = useSelector((state) => state.session.user);

    // Extract the cruz details from the favorites
    const favoriteCruzList = Object.values(favorites).map((favorite) => favorite.cruz);

    if (favoriteCruzList.length === 0) {
        return <div>No favorites yet! Bookmark your favorite cruz to see them here.</div>;
    }

    const handleRemoveFavorite = (cruzId, e) => {
        e.stopPropagation(); // Prevent navigation to the detail page
        dispatch(removeFavorite(cruzId));
    };

    return (
        <div className="cruz-tiles-container">
            <div className="tiles-wrapper">
                {favoriteCruzList.map((cruz) => {
                    const reviews = Array.isArray(cruz.reviews) ? cruz.reviews : [];
                    const averageRating = reviews.length
                        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                        : 'New';

                    const primaryImage = Array.isArray(cruz.images)
                        ? cruz.images.find((img) => img.is_primary)?.image_url
                        : 'default-image-url.jpg';

                    const city = cruz.city || 'Unknown City';
                    const state = cruz.state || 'Unknown State';

                    return (
                        <div
                            className="cruz-tile"
                            key={cruz.id}
                            onClick={() => {
                                navigate(`/cruz/${cruz.id}`);
                            }}
                        >
                            <div className="image-wrapper">
                                <img src={primaryImage} alt={cruz.name} className="cruz-image" />
                                {currentUser && (
                                    <FaBookmark
                                        className="bookmark-icon favorited"
                                        onClick={(e) => handleRemoveFavorite(cruz.id, e)} // Remove from favorites
                                    />
                                )}
                            </div>
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

export default FavoritesPage;