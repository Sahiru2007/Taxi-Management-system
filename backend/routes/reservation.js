const express = require('express');
const router = express.Router();
const { Reservation } = require('../models/reservation');
const twilio = require('twilio');

const accountSid = 'AC15d3e67d0e267fa96f88926a9cca49fa';
const authToken = 'c070d6c3cf9142695288c6b85813831e'
const twilioPhoneNumber = '+15028222264';

const client = new twilio(accountSid, authToken);

router.post('/', async (req, res) => {
  try {
   

    // Check if the passenger has an ongoing reservation
   
    // Extract relevant details from the request body
    const {
      driverId,
      driverName,
      driverContactNumber,
      vehicleType,
      vehicleMake,
      vehicleModel,
      vehicleRegistrationNumber,
      passengerId,
      passengerName,
      passengerContactNumber,
      pickupLocation,
      pickupCoordinates,
      destination,
      destinationCoordinates,
      distance,
      duration,
      time,
      date,
      status,
      totalPayment
    } = req.body;

    const passengerReservationCount = await Reservation.countDocuments({
      passengerId,
      status: { $in: ['OnGoing', 'Requested'] },
    });
    if (passengerReservationCount >= 1) {
      return res.status(400).json({ message: 'A passenger cannot book or request more than one reservation  at a time' });
    }

    // Create a new Reservation document and save it to the database
    const newReservation = new Reservation({
      driverId,
      driverName,
      driverContactNumber,
      vehicleType,
      vehicleMake,
      vehicleModel,
      vehicleRegistrationNumber,
      passengerId,
      passengerName,
      passengerContactNumber,
      pickupLocation,
      pickupCoordinates,
      destination,
      destinationCoordinates,
      distance,
      duration,
      time,
      date,
      status,
      totalPayment
    });

   
    await newReservation.save();

    const passengerContact = req.body.passengerContactNumber;
    const driverContact = req.body.driverContactNumber

    // Send SMS to the passenger
    const passengerMessage = `Your reservation request has been sent. You will receive an SMS once the driver has accepted the request.`;
    await sendSMS(passengerContact, passengerMessage);

    // Send SMS to the driver
    const driverMessage = `You have a reservation request from ${passengerName} to travel from ${pickupLocation} to ${destination}. Please accept or decline the request on the system.`;
    await sendSMS(driverContact, driverMessage);

    res.status(201).send({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Error processing reservation request:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
router.get('/reservationData/:driverId', async (req, res) => {
  try {
    const driverId = req.params.driverId;

    // Fetch all reservation requests for the given driver with status "Requested"
    const reservations = await Reservation.find({ driverId},'passengerId _id passengerName passengerContactNumber destination distance duration  pickupLocation time status'); 
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error getting driver requests:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
async function sendSMS(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });
    console.log('SMS sent successfully.');
  } catch (err) {
    console.error('Error sending SMS:', err);
  }
  
}
router.post('/paymentStatus/:reservationId', async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const newStatus = req.body.status;

    // Find the driver by MongoDB user ID
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update the user status
    reservation.paymentStatus = newStatus;
    await reservation.save();

    res.status(200).json({ message: 'Payment status has successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/admin', async (req, res) => {
  try {
   

    // Fetch all reservation requests for the given driver with status "Requested"
    const reservations = await Reservation.find({},'passengerId _id passengerName paymentStatus totalPayment rating vehicleMake  date driverName driverContactNumber vehicleType vehicleModel vehicleRegistrationNumber pickupLocation  passengerContactNumber destination distance duration  pickupLocation time status'); 
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error getting driver requests:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
