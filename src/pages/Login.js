import "./Login.css";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "./api-login.js";
import { authenticate } from './login-helper.js';
import FailAlertMessage from '../components/FailAlertMessage.js';

function Login() {
  const { state } = useLocation();
  const { from } = state || { from: { pathname: '/' } };

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [showFailAlert, setShowFailAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDismissFailAlert = () => {
    setShowFailAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login(user)
      .then((data) => {
        if (data && data.success) {
          authenticate(data.token, () => {
            navigate(from, { replace: true });
          });
        } else if (data && data.status === 401) {
          setShowFailAlert(true);
          setErrorMsg("Authentication failed. Please check your credentials.");
        } else {
          console.error(data);
          setErrorMsg(data.message);
        }
      })
      .catch((err) => {
        setShowFailAlert(true);
        setErrorMsg(err.message);
        console.error(err);
      });
  };

  return (
    <body>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Sign in to account</p>
        <div className="input-container">
          <input type="text" name="username" placeholder="Enter username" onChange={handleChange}></input>
          <span></span>
        </div>
        <div className="input-container">
          <input type="password" name="password" placeholder="Enter password" onChange={handleChange}></input>
        </div>
        <button type="submit" className="submit">Sign In</button>
        <FailAlertMessage
          message={errorMsg}
          visible={showFailAlert}
          handleDismiss={handleDismissFailAlert}
          timeout={4000}
        />
        <p className="signup-link">No account? <Link to="/signup"> Sign up!</Link></p>
      </form>
    </body>
  );
}

export default Login;
