const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Passenger, validate } = require("../models/passenger");
const multer = require("multer"); 
const SALT = "10"; // Consider using a more secure method to store your salt
const twilio = require("twilio");
const { Reservation } = require('../models/reservation');
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

    // Check if a passenger with the given email already exists
    const existingPassenger = await Passenger.findOne({ email: req.body.email });
    if (existingPassenger) {
      return res.status(409).send({ message: "Passenger with given email already exists!" });
    }

    const existingPassengerUsername = await Passenger.findOne({ username: req.body.username });
    if (existingPassengerUsername) {
      return res.status(409).send({ message: "Passenger with given username already exists!" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(Number(SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new Passenger document and save it to the database
    const newPassenger = new Passenger({ ...req.body, password: hashPassword });
    await newPassenger.save();

    res.status(201).send({ message: "Passenger created successfully" });
  } catch (error) {
    console.error("Error processing POST request:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
  // Send an SMS to the provided contact number
  await client.messages.create({
    body: `Welcome to City Taxi! Your username is: ${req.body.username}, and your password is: ${req.body.password}. Please keep this information secure.`,
    from: twilioPhoneNumber,
    to: req.body.contactNumber,
  })
  .then(message => console.log(message), "sent")
  .catch(err => console.log(err), "not sent")
 
});
router.get('/:userId', async (req, res) => {
  try {
    const passengerId = req.params.userId;

    // Fetch all reservation requests for the given driver with status "Requested"
    const reservations = await Reservation.find({ passengerId },'passengerId _id passengerName driverId driverName driverContactNumber passengerContactNumber pickupCoordinates destinationCoordinates destination distance duration  pickupLocation time totalPayment vehicleMake vehicleType vehicleRegistrationNumber vehicleModel '); 
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error getting driver requests:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/dashboard/:userId', async (req, res) => {
  try {
    const passengerId = req.params.userId;

    // Get the number of reservations for the given passengerId
    const reservationCount = await Reservation.countDocuments({ passengerId });

// Get the total distance traveled by the passenger for completed reservations
const reservationsdistance = await Reservation.find({ passengerId, status: 'Completed' }, 'distance');
console.log(reservationsdistance)
// Calculate total distance by converting and summing
const totalDistance = reservationsdistance.reduce((sum, reservationdistance) => {
  if (reservationdistance.distance && reservationdistance.distance.match(/\d+/)) {
    const numericDistance = parseInt(reservationdistance.distance.match(/\d+/)[0]);
    return sum + numericDistance;
  }
  return sum;
}, 0);



    // Get the count of reservations with status 'Canceled'
    const canceledCount = await Reservation.countDocuments({ passengerId, status: 'Canceled' });

    res.status(200).json({
      reservationCount,
      totalDistance,
      canceledCount,
    });
  } catch (error) {
    console.error('Error getting passenger details:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/admin/details', async (req, res) => {
  try {
    // Fetch all drivers from the database with selected fields
    const passengers = await Passenger.find({}, 'fullName gender  contactNumber NIC  email username homeAddress city postalCode username');

    // Respond with the driver details
    res.status(200).json(passengers);
  } catch (error) {
    console.error('Error getting passenger details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
