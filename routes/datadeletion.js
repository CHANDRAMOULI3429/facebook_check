const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config'); // Ensure this points to your configuration file

// Middleware to verify access token
const verifyAccessToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];

    if (!accessToken) {
        return res.status(401).json({ error: 'Access token required' });
    }

    // Optionally verify the access token here
    next();
};

// Route to handle data deletion
router.delete('/user', verifyAccessToken, async (req, res) => {
    const { userId } = req.body; // Extract userId from the request body

    // Ensure the userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Example: Making a request to Facebook's Graph API to delete user data
    const url = `https://graph.facebook.com/${userId}?access_token=${req.headers['authorization']}`;

    try {
        const response = await axios.delete(url);
        if (response.status === 200) {
            return res.status(200).json({ message: 'User data deleted successfully.' });
        } else {
            return res.status(response.status).json({ error: 'Failed to delete user data.' });
        }
    } catch (error) {
        console.error('Error deleting user data:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Error deleting user data' });
    }
});

module.exports = router;
