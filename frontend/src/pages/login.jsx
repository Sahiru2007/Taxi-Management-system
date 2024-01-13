// Login.jsx
import React from 'react';
import './login.css';  

import taxi from '../assets/taxi_2.jpeg';


const Login = () => {
  return (
    <div className='login-container'>
      <div className='image-container'>
        <img className='image' src={taxi} alt="Image" />
      </div>
      <div className='form-container'>
        <div className='header'>
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src="" alt="" />
            <label>Username </label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Password</label>
            <input type="password" />
          </div>
        </div>
        <div className="submit-container">
          <div className="mainbtn">Login</div>
          <div className="subbtn">Cancel</div>
        </div>
        <div className="new-account-container">
          <div className="">Don't have an account?
            <a href="/userType">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
