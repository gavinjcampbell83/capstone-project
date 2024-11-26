import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCruzDetails, updateCruzThunk, updateCruzImageThunk } from '../../redux/cruzSlice';
import './UpdateCruzForm.css';

function UpdateCruzForm() {
  const { id } = useParams(); // Get Cruz ID from route params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cruzDetails, loading, error } = useSelector((state) => state.cruz);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startLat, setStartLat] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLng, setEndLng] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState(null);
  const [existingImageId, setExistingImageId] = useState(null); // For tracking the primary image
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCruzDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cruzDetails) {
      setName(cruzDetails.name || '');
      setDescription(cruzDetails.description || '');
      setStartLat(cruzDetails.start_lat || '');
      setStartLng(cruzDetails.start_lng || '');
      setEndLat(cruzDetails.end_lat || '');
      setEndLng(cruzDetails.end_lng || '');
      setDifficulty(cruzDetails.difficulty || '');
      setCity(cruzDetails.city || '');
      setState(cruzDetails.state || '');

      const primaryImage = cruzDetails.images.find((img) => img.is_primary);
      if (primaryImage) {
        setExistingImageId(primaryImage.id);
      }
    }
  }, [cruzDetails]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreviewImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = {};

    if (!name) validationErrors.name = 'Name is required.';
    if (!description) validationErrors.description = 'Description is required.';
    if (!startLat || !startLng || !endLat || !endLng)
      validationErrors.coordinates = 'All latitude and longitude fields are required.';
    if (startLat === endLat && startLng === endLng)
      validationErrors.coordinates = 'Start and end points cannot be the same.';
    if (!difficulty) validationErrors.difficulty = 'Difficulty is required.';
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
      difficulty,
      city,
      state,
    };

    const updateResult = await dispatch(updateCruzThunk({ id, cruzData }));
    if (updateResult.error) {
      setErrors({ form: updateResult.error.message || 'Failed to update Cruz.' });
      return;
    }

    // If there's a new preview image, update it
    if (previewImageFile) {
      const imageResult = await dispatch(
        updateCruzImageThunk({
          cruzId: id,
          cruzImageId: existingImageId,
          imageData: { file: previewImageFile, is_primary: true },
        })
      );

      if (imageResult.error) {
        setErrors({ previewImage: imageResult.error.message || 'Failed to upload image.' });
        return;
      }
    }

    navigate(`/cruz/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="update-cruz-form-container">
      <h2>Update Cruz</h2>
      {Object.keys(errors).length > 0 && (
        <ul className="error-messages">
          {Object.values(errors).map((error, idx) => (
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
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Preview Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Update Cruz</button>
      </form>
    </div>
  );
}

export default UpdateCruzForm;