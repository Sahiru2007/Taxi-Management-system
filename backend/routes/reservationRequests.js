// Import necessary modules
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { Reservation } = require('../models/reservation');
const { ReservationInstance } = require('twilio/lib/rest/taskrouter/v1/workspace/task/reservation');


const accountSid = 'AC15d3e67d0e267fa96f88926a9cca49fa';
const authToken = 'c070d6c3cf9142695288c6b85813831e'
const twilioPhoneNumber = '+15028222264';const client = new twilio(accountSid, authToken);
// Endpoint to get all reservation requests for a driver with status "Requested"
router.get('/:driverId', async (req, res) => {
  try {
    const driverId = req.params.driverId;

    // Fetch all reservation requests for the given driver with status "Requested"
    const reservations = await Reservation.find({ driverId, status: 'Requested' },'passengerId _id passengerName passengerContactNumber destination distance duration  pickupLocation time totalPayment'); 
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error getting driver requests:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/changeStatus/:reservationId', async (req, res) => {
    try {
      const reservationId = req.params.reservationId;
      const newStatus = req.body.status;
  
      
      const reservation = await Reservation.findById(reservationId);
      const paymentStatus = req.body.paymentStatus;
      

      if(paymentStatus){
        reservation.paymentStatus = paymentStatus;
        await reservation.save();
      }
  
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
  
      // Store the old status for comparison
      const oldStatus = reservation.status;
  
      const driverId = reservation.driverId;
      const driverStatusCount = await Reservation.countDocuments({ driverId, status: 'OnGoing' });

      if (driverStatusCount >= 1){
        const driverId = reservation.driverId;
        const driverStatusCount = await Reservation.countDocuments({ driverId, status: 'OnGoing' });
  
        if (driverStatusCount >= 1 && newStatus==="OnGoing") {
          // There is an ongoing reservation, send error message
          return res.status(400).json({ message: 'A driver cannot accept more than one request at a time' });
      }

      }
      // Update the reservation status
      reservation.status = newStatus;
      await reservation.save();
  
      // Check if the status changed to 'OnGoing'
      if (newStatus === 'OnGoing' && oldStatus !== 'OnGoing') {
        // Driver accepted the request, send SMS to the passenger
        const passengerContact = reservation.passengerContactNumber;
        const pickupLocation = reservation.pickupLocation;
        const time = reservation.time;
        const destination = reservation.destination;
        const duration = reservation.duration;
        const distance = reservation.distance;
        const driver = reservation.driverName
  
        const passengerMessage = `Your reservation request has been accepted by driver ${driver}. Please be ready at ${pickupLocation} at ${time}. Your Destination is ${destination}. You will be traveling approximately ${distance} and it will take an estimated time of ${duration}`;
        await sendSMS(passengerContact, passengerMessage);
      } else if (newStatus === 'Declined' && oldStatus !== 'Declined') {
        // Driver declined the request, send SMS to the passenger
        const passengerContact = reservation.passengerContactNumber;
  
        const passengerMessage = `We apologize, but the driver has declined your reservation request. Please try again with another driver.`;
        await sendSMS(passengerContact, passengerMessage);
      }
      else if (newStatus === 'Canceled' && oldStatus !== 'Canceled') {
        // Driver declined the request, send SMS to the passenger
        const passengerContact = reservation.passengerContactNumber;
  
        const passengerMessage = `We apologize, but the driver has canceled your reservation request for emergency reasons. Please try again with another driver.`;
        await sendSMS(passengerContact, passengerMessage);
      }
      
  
      res.status(200).json({ message: 'Reservation status updated successfully' });
    } catch (error) {
      console.error('Error updating reservation status:', error);
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
  
  module.exports = router;