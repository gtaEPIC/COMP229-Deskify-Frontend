import "./Login.css";
import {useNavigate, useLocation, Link} from "react-router-dom";
import { useState } from "react"
import { login } from "./api-login.js";
import { authenticate } from './login-helper.js';

function Login (){

    const { state } = useLocation();
    const { from } = state || { from: { pathname: '/' } };

    let navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('')
    const [user, setUser] = useState({
        username: '',
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
        <form className="form" onSubmit={handleSubmit}>
            <p className= "title">Sign in to account</p>
            <div className= "input-container">
                <input type ="text" name={"username"} placeholder = "Enter username" onChange={handleChange}></input>
                <span></span>
            </div>
            <div className= "input-container">
                <input type = "password" name={"password"} placeholder = "Enter password" onChange={handleChange}></input>
            </div>
            <button type = "submit" className= "submit">Sign In</button>
            <p className= "signup-link">No account?<Link href = ""> Sign up!</Link></p>
        </form>
    );
}

export default Login;