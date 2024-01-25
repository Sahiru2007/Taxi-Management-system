const express = require('express');
const router = express.Router();
const { Driver } = require('../models/driver');

// Endpoint to get user status
router.get('/getUserLocation/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the driver by MongoDB user ID
    const driver = await Driver.findById(userId);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ latitude: driver.latitude, longitude: driver.longitude });
  } catch (error) {
    console.error('Error getting user locatino:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to update user status
router.post('/updateUserLocation/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const newLatitude = req.body.latitude;
    const newLongitude = req.body.longitude

    // Find the driver by MongoDB user ID
    const driver = await Driver.findById(userId);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Update the user status
    driver.latitude = newLatitude
    driver.longitude = newLongitude;
    await driver.save();

    res.status(200).json({ message: 'User location updated successfully' });
  } catch (error) {
    console.error('Error updating user location:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
