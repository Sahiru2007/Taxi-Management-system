const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const driverSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  NIC: { type: String, required: true },
  contactNumber: { type: String, required: true },
  homeAddress: { type: String, required: true },
  city: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  driverLicenseNumber: { type: String, required: true },
  licenseExpiryDate: { type: Date, required: true },
  vehicleType: { type: String, required: true },
  vehicleRegistrationNumber: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleMake: { type: String, required: true },
  profilePic: { type: String }, // Assuming profile pic is a URL or file path
  status: { type: String, default: 'Busy' },
  averageRating: {type: Number, default: 0 },
  latitude: { type: Number },
  longitude: { type: Number , },

});

const private_key = "newprivatekeydriver0001";

driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, private_key, { expiresIn: '7d' });
  return token;
};

const Driver = mongoose.model('driver', driverSchema);

const validate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().label('Full Name'),
    dateOfBirth: Joi.date().required().label('Date of Birth'),
    email: Joi.string().email().required().label('Email'),
    NIC: Joi.string().required().label('NIC'),
    contactNumber: Joi.string().required().label('Contact Number'),
    homeAddress: Joi.string().required().label('Home Address'),
    city: Joi.string().required().label('City'),

    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
    driverLicenseNumber: Joi.string().required().label('Driver License Number'),
    licenseExpiryDate: Joi.date().required().label('License Expiry Date'),
    vehicleType: Joi.string().required().label('Vehicle Type'),
    vehicleRegistrationNumber: Joi.string().required().label('Vehicle Registration Number'),
    vehicleModel: Joi.string().required().label('Vehicle Model'),
    vehicleMake: Joi.string().required().label('Vehicle Make'),
    profilePic: Joi.string().label('Profile Picture'),
  });

  return schema.validate(data);
};

module.exports = { Driver, validate };
