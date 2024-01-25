// Signup.jsx
import React from 'react';
import './signup.css';

import taxi from '../assets/taxi.jpeg';
import profile_image from '../assets/profile-user.png';

const Signup = () => {
  return (
    <div className='signup-container'>
      <div className='image-container'>
        <img className='image' src={taxi} alt="Image" />
      </div>
      <div className='form-container'>
        <div className='header'>
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src="" alt="" />
            <label>Full Name</label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Date Of Birth</label>
            <input type="date" />
          </div>
          <div className="input">
            <label>Gender</label>
            <div className="gender-options">
            <input type="radio" id="male" name="gender" value="male"/>
  <label for="male">Male</label>

  <input type="radio" id="female" name="gender" value="female"/>
  <label for="female">Female</label>
            </div>
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>NIC</label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Email Address</label>
            <input type="email" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Contact Number</label>
            <input type="tel" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Home Address</label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>City</label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Postal Code</label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Username</label>
            <input type="text" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="input">
            <img src="" alt="" />
            <label>Confirm Password</label>
            <input type="password" />
          </div>
          <div className="profile-section">
        <div className="profile-picture">
          {/* User profile image */}
          <img
            loading="lazy"
            srcSet={profile_image}  // Replace with your image source
            alt="User Profile"
            className="profile-image"
          />
        </div>
        <div className="file-input">
          {/* File input button */}
          <label htmlFor="file-upload" className="browsebtn">
            Browse
          </label>
          <input type="file" id="file-upload" style={{ display: 'none' }} />
        </div>
      </div>
        </div>
        <div className="submit-container">
          <div className="mainbtn">Sign up</div>
          <div className="subbtn">Cancel</div>
        </div>
        <div className="already-container">
          <div className="">Already have an account?
          <a href="/login">Login</a></div>
         
        </div>
      </div>
    </div>
  );
};

export default Signup;
