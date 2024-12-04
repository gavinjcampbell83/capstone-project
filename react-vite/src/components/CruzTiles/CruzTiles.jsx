import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllCruz } from '../../redux/cruzSlice';
import { FaStar, FaBookmark } from "react-icons/fa";
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import "./CruzTiles.css";

function CruzTiles() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cruzList, loading, error } = useSelector((state) => state.cruz);
    const favorites = useSelector((state) => state.favorites.favorites);
    const currentUser = useSelector((state) => state.session.user); // Access current user state

    useEffect(() => {
        dispatch(fetchAllCruz());
    }, [dispatch]);

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
                    const isFavorited = favorites[cruz.id];

                    const handleFavoriteClick = (e) => {
                        e.stopPropagation(); // Prevent navigating to the detail page
                        if (isFavorited) {
                            dispatch(removeFavorite(cruz.id));
                        } else {
                            dispatch(addFavorite(cruz.id));
                        }
                    };

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
                                {currentUser && ( // Conditionally render the bookmark icon
                                    <FaBookmark
                                        className={`bookmark-icon ${isFavorited ? 'favorited' : ''}`}
                                        onClick={handleFavoriteClick}
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

export default CruzTiles;