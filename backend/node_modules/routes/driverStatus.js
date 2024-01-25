const express = require('express');
const router = express.Router();
const { Driver } = require('../models/driver');

// Endpoint to get user status
router.get('/getUserStatus/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the driver by MongoDB user ID
    const driver = await Driver.findById(userId);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ status: driver.status });
  } catch (error) {
    console.error('Error getting user status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to update user status
router.post('/updateUserStatus/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const newStatus = req.body.status;

    // Find the driver by MongoDB user ID
    const driver = await Driver.findById(userId);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Update the user status
    driver.status = newStatus;
    await driver.save();

    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
