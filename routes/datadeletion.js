// routes/dataDeletion.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config'); // Make sure this points to your configuration file

// Middleware to verify access token (optional)
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
    const { userId } = req.body; // Assuming you're sending userId in the request body

    // Example: Making a request to Facebook's Graph API to delete user data
    const url = `https://graph.facebook.com/${userId}?access_token=${req.headers['authorization']}`;

    try {
        const response = await axios.delete(url);
        if (response.status === 200) {
            return res.status(200).json({ message: 'User data deleted successfully.' });
        }
    } catch (error) {
        console.error('Error deleting user data:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Error deleting user data' });
    }
});

module.exports = router;
