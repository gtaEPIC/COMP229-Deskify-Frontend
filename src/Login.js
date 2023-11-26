// import React, { useState, useEffect } from 'react';
import "./Login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react"
import { login } from "./api-login.js";
import { authenticate } from './login-helper.js';

async function Login (){

    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    let navigate = useNavigate();
    
    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        login(user).then((data) => {
            if (data && data.success) {
                authenticate(data.token, () => {
                    navigate(from, {replace: true});
                });
            }
            else {
                setErrorMsg(data.message);
            }
        }).catch(err => {
            setErrorMsg(err.message);
            console.log(err)
        });
    };

    return(
        <form class ="form">
            <p class ="title">Sign in to account</p>
            <div class ="input-container">
                <input type ="email" placeholder = "Enter email"></input>
                <span></span>
            </div>
            <div class = "input-container">
                <input type = "password" placeholder = "Enter password"></input>
            </div>
            <button type = "submit" class ="submit">Sign In</button>
            <p class ="signup-link">No account?<a href = ""> Sign up!</a></p>
        </form>
    );
}

export default Login;

