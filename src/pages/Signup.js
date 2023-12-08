import "./Signup.css";
import React from "react";
import { Link } from "react-router-dom"; 

function Signup(){
    return(
        <body>
            <div className="registrationForm-container">
            <form class="registrationForm">
                <p class="formTitle">Register </p>
                <div class="flex">
                    <label>
                        <input required="" placeholder="" type="text" class="input"></input>
                        <span>Firstname</span>
                    </label>
                    <label>
                        <input required="" placeholder="" type="text" class="input"></input>
                        <span>Lastname</span>
                    </label>
                </div>  
                <label>
                    <input required="" placeholder="" type="email" class="input"></input>
                    <span>Email</span>
                </label> 
        
                <label>
                    <input required="" placeholder="" type="password" class="input"></input>
                    <span>Password</span>
                </label>
                <label>
                    <input required="" placeholder="" type="password" class="input"></input>
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