// Import necessary modules and configurations...
const express = require('express');
const router = express.Router();
const { Driver } = require('../models/driver');

// Endpoint to get driver details with a specific status
router.get('/getDriverDetails', async (req, res) => {
  try {
    const status = req.query.status || 'Available'; // Default to 'Available' if status is not provided in the query parameters

    // Fetch drivers from the database with selected fields and a specific status
    const drivers = await Driver.find({ status }, '_id DriverName Status VehicleType contactNumber');

    // Respond with the driver details
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error getting driver details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
