import React from 'react';
import './index.css'

const Login = () => {
    return (
  
        <div className="form">
            <h2>Login</h2>
            <div className="input">
                <div className="inputBox">
                    <label for="">Username</label>
                    <input type="text"/>
                </div>
                <div className="inputBox">
                    <label for="">Password</label>
                    <input type="password"/>
                </div>
                <div className="inputBox">
                    <input type="submit" name="" value="Sign In" /> 
                </div>
            </div>
            <p className="forgot">Forgot Password? <a href="#">Click Here</a></p>
            
        </div>
  

    )
}

export default Login
