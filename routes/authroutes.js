const express = require('express');
const authControllers = require('../controllers/authcontroller'); // Ensure this points to the correct file
const router = express.Router();

// Route to initiate Facebook OAuth
router.get('/auth/facebook/login', authControllers.facebookLogin); // Added 'auth' prefix

// Route to handle the callback (where the code is captured)
router.get('/auth/facebook/callback', authControllers.facebookCallback); // Added 'auth' prefix

module.exports = router;
