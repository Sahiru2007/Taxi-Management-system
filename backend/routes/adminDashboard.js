const router = require("express").Router();
const bcrypt = require("bcrypt");
const twilio = require("twilio");
const { Reservation } = require('../models/reservation');
const { Driver, validate } = require("../models/driver");
const { Passenger } = require("../models/passenger");
const SALT_ROUNDS = 10;

const accountSid = 'AC9f6f60a644f881af7ebdc04054cfc285';
const authToken = '9dba35c2502894358a538816a75fc7b1';
const twilioPhoneNumber = '+19853063845';
const client = new twilio(accountSid, authToken);

router.get('/', async (req, res) => {
  try {
    const result = await Reservation.aggregate([
      {
        $group: {
          _id: null,
          totalPayment: { $sum: '$totalPayment' }
        }
      }
    ]);
    const totalEarning = result[0].totalPayment;

    const reservationCount = await Reservation.countDocuments();
    const passengerCount = await Passenger.countDocuments();
    const cancelledReservationsCount = await Reservation.countDocuments({ status: 'Canceled' });

    const todayDate = new Date().toISOString().split('T')[0];
    const todayReservationsCount = await Reservation.countDocuments({ date: todayDate });

    // Find the top 3 drivers with the highest averageRating
    const topDrivers = await Driver.aggregate([
      { $match: { averageRating: { $exists: true } } },
      { $sort: { averageRating: -1 } },
      { $limit: 3 },
      { $project: { fullName: 1, averageRating: 1 } }
    ]);

    // Find the top 3 passengers with the highest number of records in reservations
    const topPassengers = await Passenger.aggregate([
      { $lookup: { from: 'reservations', localField: '_id', foreignField: 'passengerId', as: 'reservations' } },
      { $addFields: { reservationCount: { $size: '$reservations' } } },
      { $sort: { reservationCount: -1 } },
      { $limit: 3 },
      { $project: { fullName: 1, reservationCount: 1 } }
    ]);

    // Calculate vehicle type statistics
    const vehicleTypeStats = await Reservation.aggregate([
      { $group: { _id: '$vehicleType', count: { $sum: 1 } } },
      {
        $project: {
          vehicleType: '$_id',
          count: 1,
          percentage: { $multiply: [{ $divide: ['$count', reservationCount] }, 100] }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      totalEarning,
      reservationCount,
      passengerCount,
      cancelledReservationsCount,
      todayReservationsCount,
      topDrivers,
      topPassengers,
      vehicleTypeStats
    });
  } catch (error) {
    console.error('Error getting passenger details:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getDriverDetails', async (req, res) => {
  try {
    // Fetch all drivers from the database with selected fields
    const drivers = await Driver.find({}, 'fullName latitude longitude');

    // Respond with the driver details
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error getting driver details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
