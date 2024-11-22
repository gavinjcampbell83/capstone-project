import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createCruz } from '../../redux/cruzSlice';
import './CreateCruzForm.css';

function CreateCruzForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [routePath, setRoutePath] = useState('');
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const routePoints = routePath
        .split(';') // Split by semicolon
        .map((point) => {
          const [lat, lng] = point.split(',').map((coord) => parseFloat(coord.trim())); // Split by comma and trim spaces
          if (isNaN(lat) || isNaN(lng)) {
            throw new Error('Invalid coordinates');
          }
          return { lat, lng }; // Create { lat, lng } object
        });

    if (routePoints.length < 2) {
            setErrors(['Route path must have at least 2 points']);
            return;
        }

    const cruzData = {
      name,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      difficulty,
      route_path: routePoints,
      created_by: user.id,
    };

    const result = await dispatch(createCruz(cruzData));

    if (result.error) {
      setErrors([result.error.message || 'Failed to create Cruz.']);
    } else {
      closeModal();
    }
  };

  return (
    <div className="create-cruz-form-container">
      <h2>Create a New Cruz</h2>
      {errors.length > 0 && (
        <ul className="error-messages">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude:
          <input
            type="number"
            step="0.0001"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            step="0.0001"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </label>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label>
          Route Path (format: `lat,lng;lat,lng`):
          <textarea
            value={routePath}
            onChange={(e) => setRoutePath(e.target.value)}
            placeholder="37.7749,-122.4194;37.8044,-122.2712"
            required
          />
        </label>
        <button type="submit">Create Cruz</button>
      </form>
    </div>
  );
}

export default CreateCruzForm;