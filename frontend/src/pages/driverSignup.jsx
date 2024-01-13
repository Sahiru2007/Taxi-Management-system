import React from 'react';
import './driverSignup.css';

import taxi from '../assets/taxi_3.jpeg';
import profile_image from '../assets/profile-user.png';

const DriverSignup = () => {
  return (
    <div className='driverSignup-container'>
      <div className='image-container'>
        <img className='image' src={taxi} alt="City Taxi" />
      </div>
      <div className='form-container'>
        <div className='header'>
          <div className="text">Sign Up as a driver</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" />
          </div>
          <div className="input">
            <label htmlFor="dob">Date Of Birth</label>
            <input type="date" id="dob" />
          </div>
          <div className="input">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" />
          </div>
         
          <div className="input">
            <label htmlFor="nic">NIC</label>
            <input type="text" id="nic" />
          </div>

          <div className="input">
            <label htmlFor="contact-number">Contact Number</label>
            <input type="tel" id="contact-number" />
          </div>
          <div className="input">
            <label htmlFor="home-address">Home Address</label>
            <input type="text" id="home-address" />
          </div>
          <div className="input">
            <label htmlFor="city">City</label>
            <input type="text" id="city" />
          </div>
          <div className="input">
            <label htmlFor="license-number">Driver License Number</label>
            <input type="text" id="license-number" />
          </div>
          <div className="input">
            <label htmlFor="license-expiry">License Expiry Date</label>
            <input type="date" id="license-expiry" />
          </div>
          <div className="input">
            <label htmlFor="vehicle-type">Vehicle Type</label>
            <input type="text" id="vehicle-type" />
          </div>
          <div className="input">
            <label htmlFor="vehicle-registration">Vehicle Registration Number</label>
            <input type="text" id="vehicle-registration" />
          </div>
          <div className="input">
            <label htmlFor="vehicle-model">Vehicle Model</label>
            <input type="text" id="vehicle-model" />
          </div>
          <div className="input">
            <label htmlFor="vehicle-make">Vehicle Make</label>
            <input type="text" id="vehicle-make" />
          </div>
          <div className="input">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input">
            <label htmlFor="profile-picture">Profile Picture</label>
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

export default DriverSignup;
