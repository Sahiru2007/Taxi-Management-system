const router = require("express").Router();
const bcrypt = require("bcrypt");
const twilio = require("twilio");
const { Reservation } = require('../models/reservation');
const { Driver, validate } = require("../models/driver");

const SALT_ROUNDS = 10; // Consider using a more secure method to store your salt rounds
  
  
const accountSid = 'AC15d3e67d0e267fa96f88926a9cca49fa';
const authToken = 'c070d6c3cf9142695288c6b85813831e'
const twilioPhoneNumber = '+15028222264';const client = new twilio(accountSid, authToken);
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if a driver with the given email already exists
    const existingDriver = await Driver.findOne({ email: req.body.email });
    if (existingDriver) {
      return res.status(409).send({ message: "Driver with given email already exists!" });
    }
    const existingDriverUsername = await Driver.findOne({ username: req.body.username });
    if (existingDriverUsername) {
      return res.status(409).send({ message: "Driver with given username already exists!" });
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new Driver document and save it to the database
    const newDriver = new Driver({ ...req.body, password: hashPassword });
    await newDriver.save();

    res.status(201).send({ message: "Driver created successfully" });
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  await client.messages.create({
    body: `Welcome to City Taxi!\nUsername: ${req.body.username}\nPassword: ${req.body.password}\n\nThank you for joining our service. We are looking forward to working with you!`,
    from: twilioPhoneNumber,
    to: req.body.contactNumber,
  })
  .then(message => console.log(message), "sent")
  .catch(err => console.log(err), "not sent")
 
});
router.get('/getDriverDetails', async (req, res) => {
    try {
      // Fetch all drivers from the database with selected fields
      const drivers = await Driver.find({ status: 'Available'}, 'fullName status vehicleType contactNumber latitude  longitude  vehicleMake vehicleModel vehicleRegistrationNumber averageRating   ');
  
      // Respond with the driver details
      res.status(200).json(drivers);
    } catch (error) {
      console.error('Error getting driver details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/dashboard/:userId', async (req, res) => {
    try {
      const driverId = req.params.userId;
  
      // Get the number of reservations for the given passengerId
      const reservationCount = await Reservation.countDocuments({ driverId });
  
  // Get the total distance traveled by the passenger for completed reservations
  const reservationsdistance = await Reservation.find({ driverId, status: 'Completed' }, 'distance');
  // Calculate total distance by converting and summing
  const totalDistance = reservationsdistance.reduce((sum, reservationdistance) => {
    if (reservationdistance.distance && reservationdistance.distance.match(/\d+/)) {
      const numericDistance = parseInt(reservationdistance.distance.match(/\d+/)[0]);
      return sum + numericDistance;
    }
    return sum;
  }, 0);
  
  const result = await Reservation.find({ driverId, status: 'OnGoing' }, 'time');

  const driver = await Driver.findById(driverId, 'averageRating');
  const averageRating = driver ? driver.averageRating : 0;
  
  // Check if there are ongoing reservations
  const time = result.length > 0 ? result[0].time : 'No reservations';
  
   
  
      res.status(200).json({
        reservationCount,
        totalDistance,
        time,
        averageRating
      });
    } catch (error) {
      console.error('Error getting passenger details:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  router.get('/admin', async (req, res) => {
    try {
      // Fetch all drivers from the database with selected fields
      const drivers = await Driver.find({}, 'fullName status vehicleType contactNumber latitude  longitude  vehicleMake vehicleModel vehicleRegistrationNumber averageRating   ');
  
      // Respond with the driver details
      res.status(200).json(drivers);
    } catch (error) {
      console.error('Error getting driver details:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router;
