const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Driver } = require("../models/driver");
const { Passenger } = require("../models/passenger");
const private_key = "newprivatekeydriver0001";
// Middleware to check authentication
const authenticateToken = async (req, res, next) => {
  const token = req.header(private_key);
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = await getUser(decoded.id, decoded.userType);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.sendStatus(403);
  }
};

// Function to get user based on user type
const getUser = async (id, userType) => {
  if (userType === "driver") {
    return await Driver.findById(id);
  } else if (userType === "passenger") {
    return await Passenger.findById(id);
  } else {
    return null;
  }
};

// Endpoint to get user profile picture
router.get("/", authenticateToken, async (req, res) => {
  const user = req.user;
  if (!user || !user.profilePic) {
    return res.status(404).json({ error: "Profile picture not found" });
  }

  // You might want to implement logic to serve the image file
  // For simplicity, we'll just send the path
  res.json({
    profilePic: user.profilePic,
  });
});

module.exports = router;
