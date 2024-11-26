import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCruzDetails, updateCruzThunk, updateCruzImageThunk } from '../../redux/cruzSlice';
import './UpdateCruzForm.css';

function UpdateCruzForm() {
  const { id } = useParams();
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
      {errors.form && <p className="error-message">{errors.form}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name your cruz"
            required
          />
        </label>
        {errors.name && <p className="error-message">{errors.name}</p>}

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe things you enjoy about this cruz"
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
            placeholder="-90.0000 and 90.0000"
            required
          />
        </label>
        {errors.startLat && <p className="error-message">{errors.startLat}</p>}
        {errors.coordinates && <p className="error-message">{errors.coordinates}</p>}
        <label>
          Start Longitude:
          <input
            type="number"
            step="0.0001"
            value={startLng}
            onChange={(e) => setStartLng(e.target.value)}
            placeholder="-180.0000 and 180.0000"
            required
          />
        </label>
        {errors.startLng && <p className="error-message">{errors.startLng}</p>}
        {errors.coordinates && <p className="error-message">{errors.coordinates}</p>}
        <label>
          End Latitude:
          <input
            type="number"
            step="0.0001"
            value={endLat}
            onChange={(e) => setEndLat(e.target.value)}
            placeholder="-90.0000 and 90.0000, must be different than start"
            required
          />
        </label>
        {errors.endLat && <p className="error-message">{errors.endLat}</p>}
        {errors.coordinates && <p className="error-message">{errors.coordinates}</p>}
        <label>
          End Longitude:
          <input
            type="number"
            step="0.0001"
            value={endLng}
            onChange={(e) => setEndLng(e.target.value)}
            placeholder="-180.0000 and 180.0000, must be different than start"
            required
          />
        </label>
        {errors.endLng && <p className="error-message">{errors.endLng}</p>}
        {errors.coordinates && <p className="error-message">{errors.coordinates}</p>}
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
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City where the cruz is located"
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
            placeholder="State where the cruz is located"
            required
          />
        </label>
        {errors.state && <p className="error-message">{errors.state}</p>}

        <label>
          Preview Image: 
          <label>(If you wish to keep current photo, no selection is required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}

        <button type="submit">Update Cruz</button>
      </form>
    </div>
  );
}

export default UpdateCruzForm;