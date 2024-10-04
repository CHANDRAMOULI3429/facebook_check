const express = require('express');
const authControllers = require('../controllers/authcontroller'); // Ensure this points to the correct file
const router = express.Router();

// Route to initiate Facebook OAuth
router.get('/facebook/login', authControllers.facebookLogin);

// Route to handle the callback (where the code is captured)
router.get('/facebook/callback', authControllers.facebookCallback);

module.exports = router;
