const axios = require('axios');
const config = require('../config/config');

// Facebook login
exports.facebookLogin = (req, res) => {
    const url = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${config.facebookAppId}&redirect_uri=${config.redirectUri}&scope=email,public_profile,user_friends`; // Add necessary scopes
    res.json({ loginUrl: url }); // Return the login URL as JSON
};

// Facebook callback
exports.facebookCallback = async (req, res) => {
    const { code } = req.query; // Capture the authorization code from the query parameters

    // Check if the code exists
    if (!code) {
        return res.status(400).json({ error: 'No authorization code provided' });
    }

    // Exchange code for access token
    const tokenUrl = `https://graph.facebook.com/v15.0/oauth/access_token?client_id=${config.facebookAppId}&redirect_uri=${config.redirectUri}&client_secret=${config.facebookAppSecret}&code=${code}`;

    try {
        const response = await axios.get(tokenUrl);
        const accessToken = response.data.access_token; // Retrieve access token

        // Fetch user data
        const userUrl = `https://graph.facebook.com/me?fields=id,name,email,picture,followers_count&access_token=${accessToken}`; // Fetch user details including followers count
        const userData = await axios.get(userUrl);

        res.json(userData.data); // Send user data as JSON response
    } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching user data' });
    }
};
