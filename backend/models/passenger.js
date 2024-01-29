const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const passwordComplexity = require("joi-password-complexity" )

const passengerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  NIC: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  homeAddress: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String }, // Assuming profile pic is a URL or file path
});
const private_key = "newprivatekeyuesr0001"
passengerSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, private_key,{expiresIn: "7d"} );
    return token
}

const Passenger = mongoose.model("passenger", passengerSchema);


const validate = (data) => {
    const schema = Joi.object({
      fullName: Joi.string().required().label("Full Name"),
      gender: Joi.string().required().label("Gender"),
      dateOfBirth: Joi.date().required().label("Date of Birth"),
      NIC: Joi.string().required().label("NIC"),
      email: Joi.string().email().required().label("Email"),
      contactNumber: Joi.string().required().label("Contact Number"),
      homeAddress: Joi.string().required().label("Home Address"),
      city: Joi.string().required().label("City"),
      postalCode: Joi.string().required().label("Postal Code"),
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
      profilePic: Joi.string().label("Profile Picture"),
    });
  
    return schema.validate(data);
  };

  module.exports = {Passenger, validate}
  
