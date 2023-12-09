import "./Signup.css";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authenticate } from "./login-helper";
import { signup } from "./api-signup";
import FailAlertMessage from "../components/FailAlertMessage";

function Signup(){

    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    const [errorMsg, setErrorMsg] = useState('');
    const [showFailAlert, setShowFailAlert] = useState(false);

    let navigate = useNavigate();
    const [user, setUser] = useState({
        username:'',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        signup(user)
            .then((data) => {
                if (data && data.success) {
                    authenticate(data.token, () => {
                        navigate(from, { replace: true });
                    });
                } else {
                    // alert(data.message);
                    console.error(data);
                    setErrorMsg(data.message);
                    setShowFailAlert(true);
                }
            })
            .catch((err) => {
                // alert(err.message);
                console.log(err);
                setErrorMsg(err.message);
                setShowFailAlert(true);
            });
    };
    
    return(
        <body>
            <div className="registrationForm-container">
            <form class="registrationForm" onSubmit={handleSubmit}>
                <p class="formTitle">Register </p>
                <label>
                    <input type="text" onChange={handleChange} name={"username"} className={"input"}
                           required={true}></input>
                    <span>Username</span>
                </label>
                <label>
                    <input type="email" onChange={handleChange} name={"email"} className={"input"}
                           required={true}></input>
                    <span>Email</span>
                </label> 
        
                <label>
                    <input type="password" onChange={handleChange} name={"password"} className={"input"} required={true}></input>
                    <span>Password</span>
                </label>
                <label>
                    <input type="password" onChange={handleChange} name={"confirmPassword"} className={"input"} required={true}></input>
                    <span>Confirm password</span>
                </label>
                <button className="submitRegistration">Submit</button>
                <FailAlertMessage
                    message={errorMsg}
                    visible={showFailAlert}
                    handleDismiss={() => setShowFailAlert(false)}
                    />
                <p className="signin">Already have an account ? <Link to="/login"> Sign In!</Link></p>
            </form>
            </div>
        </body>
    );

}

export default Signup;