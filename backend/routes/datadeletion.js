const express = require('express');
const router = express.Router(); // Initialize the router

// Example route for data deletion
router.delete('/data', (req, res) => {
    // Your deletion logic here
    res.send('Data deleted successfully'); // Respond with a success message
});

// Export the router
module.exports = router; // Ensure this is at the bottom of the file
