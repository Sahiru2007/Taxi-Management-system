const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { Reservation } = require('../models/reservation');
const { Driver } = require('../models/driver');

const accountSid = 'AC15d3e67d0e267fa96f88926a9cca49fa';
const authToken = 'c070d6c3cf9142695288c6b85813831e'
const twilioPhoneNumber = '+15028222264';const client = new twilio(accountSid, authToken);

// Endpoint to update the rating for a reservation
router.post('/:reservationId', async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const newRating = req.body.rating;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update the rating and save the reservation
    reservation.rating = newRating;
    await reservation.save();

    const driverId = reservation.driverId;
    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Find all reservations for the specific driver
    const driverReservations = await Reservation.find({ driverId });

    let totalRating = 0;
    let count = 0;

    for (const driverReservation of driverReservations) {
      if (driverReservation.rating) {
        totalRating += driverReservation.rating;
        count++;
      }
    }

    if (count > 0) {
      const averageRating = totalRating / count;
      driver.averageRating = averageRating;
      await driver.save();
      res.status(200).json({ message: 'Rating updated successfully' });
    } else {
      res.status(404).json({ message: 'No matching reservations with ratings found' });
    }

  } catch (error) {
    console.error('Error updating reservation rating:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
