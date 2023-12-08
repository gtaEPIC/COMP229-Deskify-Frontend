import "./Signup.css";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authenticate } from "./login-helper";
import { signup } from "./api-signup";

function Signup(){

    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
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
        signup(user)
            .then((data) => {
                if (data && data.success) {
                    authenticate(data.token, () => {
                    navigate(from, { replace: true });
                    });
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch((err) => {
                setErrorMsg(err.message);
                console.log(err);
            });
    };

    const unusedVariable = errorMsg;
    
    return(
        <body>
            <div className="registrationForm-container">
            <form class="registrationForm" onSubmit={handleSubmit}>
                <p class="formTitle">Register </p>
                <div class="flex">
                    <label>
                        <input required="" placeholder="" type="text" class="input" onChange={handleChange}></input>
                        <span>Username</span>
                    </label>
                </div>  
                <label>
                    <input required="" placeholder="" type="email" class="input" onChange={handleChange}></input>
                    <span>Email</span>
                </label> 
        
                <label>
                    <input required="" placeholder="" type="password" class="input" onChange={handleChange}></input>
                    <span>Password</span>
                </label>
                <label>
                    <input required="" placeholder="" type="password" class="input" onChange={handleChange}></input>
                    <span>Confirm password</span>
                </label>
                <button class="submitRegistration">Submit</button>
                <p class="signin">Already have an acount ? <Link to="/login"> Sign In!</Link></p>
            </form>
            </div>
        </body>
    );

}

export default Signup;