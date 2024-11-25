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
  const [startLat, setStartLat] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLng, setEndLng] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Validate inputs
    if (!startLat || !startLng || !endLat || !endLng) {
      setErrors(['All latitude and longitude fields are required.']);
      return;
    }

    if (startLat === endLat && startLng === endLng) {
      setErrors(['Start and end points cannot be the same.']);
      return;
    }

    const cruzData = {
      name,
      description,
      start_lat: parseFloat(startLat),
      start_lng: parseFloat(startLng),
      end_lat: parseFloat(endLat),
      end_lng: parseFloat(endLng),
      difficulty,
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
          Start Latitude:
          <input
            type="number"
            step="0.0001"
            value={startLat}
            onChange={(e) => setStartLat(e.target.value)}
            required
          />
        </label>
        <label>
          Start Longitude:
          <input
            type="number"
            step="0.0001"
            value={startLng}
            onChange={(e) => setStartLng(e.target.value)}
            required
          />
        </label>
        <label>
          End Latitude:
          <input
            type="number"
            step="0.0001"
            value={endLat}
            onChange={(e) => setEndLat(e.target.value)}
            required
          />
        </label>
        <label>
          End Longitude:
          <input
            type="number"
            step="0.0001"
            value={endLng}
            onChange={(e) => setEndLng(e.target.value)}
            required
          />
        </label>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <button type="submit">Create Cruz</button>
      </form>
    </div>
  );
}

export default CreateCruzForm;