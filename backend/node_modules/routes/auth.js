const router = require("express").Router();
const { Passenger } = require("../models/passenger");
const { Driver } = require("../models/driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user;

    if (req.body.type === "passenger") {
      user = await Passenger.findOne({ email: req.body.email });
    } else if (req.body.type === "driver") {
      user = await Driver.findOne({ email: req.body.email });
    } else {
      return res.status(400).send({ message: "Invalid user type" });
    }

    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.jwt;

    // Fetch additional user details based on the user type
    let userDetails;
    if (req.body.type === "passenger") {
      userDetails = await Passenger.findById(user._id);
    } else if (req.body.type === "driver") {
      userDetails = await Driver.findById(user._id);
    }

    // Send the user details and token in the response
    res.status(200).send({
      data: {
        token: token,
        userDetails: userDetails,
      },
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    type: Joi.string().valid("passenger", "driver").required().label("User Type"),
  });
  return schema.validate(data);
};

module.exports = router;
