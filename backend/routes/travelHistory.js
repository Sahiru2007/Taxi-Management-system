// Import necessary modules
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { Reservation } = require('../models/reservation');


const accountSid = 'AC15d3e67d0e267fa96f88926a9cca49fa';
const authToken = 'c070d6c3cf9142695288c6b85813831e'
const twilioPhoneNumber = '+15028222264';const client = new twilio(accountSid, authToken);
// Endpoint to get all reservation requests for a driver with status "Requested"
router.get('/:userId', async (req, res) => {
  try {
    const passengerId = req.params.userId;

    // Fetch all reservation requests for the given driver with status "Requested"
    const reservations = await Reservation.find({ passengerId},'passengerId _id passengerName driverId driverName driverContactNumber passengerContactNumber pickupCoordinates destinationCoordinates destination distance duration  rating pickupLocation time totalPayment vehicleMake vehicleType vehicleRegistrationNumber vehicleModel date '); 
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error getting driver requests:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;