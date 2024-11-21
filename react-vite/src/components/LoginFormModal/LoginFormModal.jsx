import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );
  
    if (thunkLogin.fulfilled.match(resultAction)) {
      closeModal();
    } else {
      setErrors(resultAction.payload || { server: "An unexpected error occurred." }); // Set errors if login failed
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
      <div className="login_form_container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Log In</button>
        <button onClick={handleDemoLogin}>Demo User Login</button>
      </form>
    </div>
  );
}

export default LoginFormModal;