import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});

  // Function to normalize errors (ensures all errors are arrays)
  const normalizeErrors = (errorPayload) => {
    return Object.entries(errorPayload).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value : [value]; // Convert single errors to arrays
      return acc;
    }, {});
  };

  // Client-side validation
  const validateForm = () => {
    const validationErrors = {};

    if (!username || username.length < 3 || username.length > 40) {
      validationErrors.username = "Username must be between 3 and 40 characters.";
    }

    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email = "Email must be a valid email address.";
    }

    if (!password || password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (!firstName || firstName.length < 2 || firstName.length > 40) {
      validationErrors.firstName = "First name must be between 2 and 40 characters.";
    }

    if (!lastName || lastName.length < 2 || lastName.length > 40) {
      validationErrors.lastName = "Last name must be between 2 and 40 characters.";
    }

    if (bio && bio.length > 500) {
      validationErrors.bio = "Bio must be no more than 500 characters.";
    }

    if (city && city.length > 100) {
      validationErrors.city = "City must be no more than 100 characters.";
    }

    if (state && state.length > 100) {
      validationErrors.state = "State must be no more than 100 characters.";
    }

    if (country && country.length > 100) {
      validationErrors.country = "Country must be no more than 100 characters.";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run client-side validation
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const normalizedValidationErrors = normalizeErrors(validationErrors);
      setErrors(normalizedValidationErrors);
      return;
    }

    // Dispatch signup thunk
    const resultAction = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        bio,
        latitude,
        longitude,
        city,
        state,
        country,
      })
    );

    // Handle server-side errors
    if (thunkSignup.fulfilled.match(resultAction)) {
      closeModal();
    } else {
      const normalizedErrors = normalizeErrors(resultAction.payload || {});
      setErrors(normalizedErrors);
    }
  }

  return (
    <div className="signup-form-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="error-message general-error">{errors.server}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email &&
          (Array.isArray(errors.email) ? (
            errors.email.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.email}</p>
          ))}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username &&
          (Array.isArray(errors.username) ? (
            errors.username.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.username}</p>
          ))}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password &&
          (Array.isArray(errors.password) ? (
            errors.password.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.password}</p>
          ))}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword &&
          (Array.isArray(errors.confirmPassword) ? (
            errors.confirmPassword.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.confirmPassword}</p>
          ))}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName &&
          (Array.isArray(errors.firstName) ? (
            errors.firstName.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.firstName}</p>
          ))}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName &&
          (Array.isArray(errors.lastName) ? (
            errors.lastName.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.lastName}</p>
          ))}

        <label>
          Bio
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself (optional)"
          />
        </label>
        {errors.bio &&
          (Array.isArray(errors.bio) ? (
            errors.bio.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.bio}</p>
          ))}

        <label>
          Latitude
          <input
            type="number"
            step="0.0001"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="-90.0000 and 90.0000 (optional)"
          />
        </label>
        {errors.latitude &&
          (Array.isArray(errors.latitude) ? (
            errors.latitude.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.latitude}</p>
          ))}

        <label>
          Longitude
          <input
            type="number"
            step="0.0001"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="-180.0000 and 180.0000 (optional)"
          />
        </label>
        {errors.longitude &&
          (Array.isArray(errors.longitude) ? (
            errors.longitude.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.longitude}</p>
          ))}

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city (optional)"
          />
        </label>
        {errors.city &&
          (Array.isArray(errors.city) ? (
            errors.city.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.city}</p>
          ))}

        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter your state (optional)"
          />
        </label>
        {errors.state &&
          (Array.isArray(errors.state) ? (
            errors.state.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.state}</p>
          ))}

        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country (optional)"
          />
        </label>
        {errors.country &&
          (Array.isArray(errors.country) ? (
            errors.country.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))
          ) : (
            <p className="error-message">{errors.country}</p>
          ))}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;