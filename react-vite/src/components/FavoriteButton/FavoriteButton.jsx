import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

const FavoriteButton = ({ cruzId }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.favorites);
    const isFavorited = favorites[cruzId];

    const handleClick = () => {
        if (isFavorited) {
            dispatch(removeFavorite(cruzId));
        } else {
            dispatch(addFavorite(cruzId));
        }
    };

    return (
        <button onClick={handleClick}>
            {isFavorited ? 'Unfavorite' : 'Favorite'}
        </button>
    );
};

export default FavoriteButton;