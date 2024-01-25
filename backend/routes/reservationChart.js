const express = require('express');
const router = express.Router();
const { Reservation } = require('../models/reservation');

const extractDateFromObjectId = (objectId) => {
  const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return date.toISOString();
};

router.get('/', async (req, res) => {
  try {
    const allReservations = await Reservation.find({
      _id: { $exists: true, $type: 'objectId' },
    });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgoStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000);

    const filteredReservations = allReservations.filter((reservation) => {
      const extractedDate = extractDateFromObjectId(reservation.id);
      return new Date(extractedDate).getTime() >= sevenDaysAgoStart.getTime();
    });

    const groupedData = filteredReservations.reduce((acc, reservation) => {
      const extractedDate = extractDateFromObjectId(reservation.id);
      const formattedDate = new Date(extractedDate).toISOString().split('T')[0];

      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(groupedData).map(([day, count]) => ({
      day,
      reservations: count,
    }));

    console.log(chartData);

    res.json(chartData);
  } catch (error) {
    console.error('Error getting reservation data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
