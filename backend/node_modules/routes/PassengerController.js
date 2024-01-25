const { Passenger } = require("../models/passenger");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    // Fetch user details from the database using the authenticated user's ID
    const user = await Passenger.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send the user details in the response
    res.status(200).send({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      // Include other user details as needed
    });
  } catch (error) {
    console.error("Error fetching passenger details:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



module.exports = router;
