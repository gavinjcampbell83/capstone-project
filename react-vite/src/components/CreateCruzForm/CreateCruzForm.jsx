import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { createCruz, addCruzImageThunk, deleteCruzThunk } from '../../redux/cruzSlice';
import './CreateCruzForm.css';

function CreateCruzForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startLat, setStartLat] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLng, setEndLng] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreviewImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate required fields
    if (!name || name.length < 2 || name.length > 100) {
      validationErrors.name = 'Name must be between 2 and 100 characters.';
    }
    if (!description || description.length < 10 || description.length > 500) {
      validationErrors.description = 'Description must be between 10 and 500 characters.';
    }
    if (!startLat || !startLng || !endLat || !endLng)
      validationErrors.coordinates = 'All latitude and longitude fields are required.';
    if (startLat === endLat && startLng === endLng)
      validationErrors.coordinates = 'Start and end points cannot be the same.';
    if (startLat < -90 || startLat > 90)
      validationErrors.startLat = 'startLat must be between -90 and 90.';
    if (startLng < -180 || startLng > 180)
      validationErrors.startLng = 'startLng must be between -180 and 180.';
    if (endLat < -90 || endLat > 90)
      validationErrors.endLat = 'endLat must be between -90 and 90.';
    if (endLng < -180 || endLng > 180)
      validationErrors.endLng = 'endLng must be between -180 and 180.';
    if (!city) validationErrors.city = 'City is required.';
    if (!state) validationErrors.state = 'State is required.';
    if (!difficulty) validationErrors.difficulty = 'Difficulty is required.';
    if (!previewImageFile) validationErrors.previewImage = 'Preview image is required.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cruzData = {
      name,
      description,
      start_lat: parseFloat(startLat),
      start_lng: parseFloat(startLng),
      end_lat: parseFloat(endLat),
      end_lng: parseFloat(endLng),
      city,
      state,
      difficulty,
      created_by: user.id,
    };

    const cruzResult = await dispatch(createCruz(cruzData));
    if (cruzResult.error) {
      setErrors({ form: cruzResult.error.message || 'Failed to create Cruz.' });
      return;
    }

    const cruzId = cruzResult.payload.id;

    if (previewImageFile) {
      const imageResult = await dispatch(
        addCruzImageThunk({ cruzId, imageData: { file: previewImageFile, is_primary: true } })
      );

      if (imageResult.error) {
        await dispatch(deleteCruzThunk(cruzId));
        setErrors({ previewImage: imageResult.error.message || 'Invalid image upload.' });
        return;
      }
    }

    closeModal();
    navigate(`/cruz/${cruzId}`);
  }
  return (
    <div className="create-cruz-form-container">
      <h2>Create a New Cruz</h2>
      {errors.server && <p className="error-message general-error">{errors.server}</p>}
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
        {errors.name && <p className="error-message">{errors.name}</p>}

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className="error-message">{errors.description}</p>}

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
        {errors.startLat && <p className="error-message">{errors.startLat}</p>}

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
        {errors.startLng && <p className="error-message">{errors.startLng}</p>}

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
        {errors.endLat && <p className="error-message">{errors.endLat}</p>}

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
        {errors.endLng && <p className="error-message">{errors.endLng}</p>}

        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p className="error-message">{errors.city}</p>}

        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        {errors.state && <p className="error-message">{errors.state}</p>}

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
        {errors.difficulty && <p className="error-message">{errors.difficulty}</p>}

        <label>
          Preview Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>
        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}

        <button type="submit">Create Cruz</button>
      </form>
    </div>
  );
}

export default CreateCruzForm;