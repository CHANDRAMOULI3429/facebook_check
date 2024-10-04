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
        // Get the access token
        const response = await axios.get(tokenUrl);
        const accessToken = response.data.access_token; // Retrieve access token

        // Fetch user data
        // Fetch user details without followers_count, as it's not a direct field
        const userUrl = `https://graph.facebook.com/me?fields=id,name,email,picture,friends&access_token=${accessToken}`;
        const userData = await axios.get(userUrl);

        // Calculate followers count if needed
        const followersCount = userData.data.friends ? userData.data.friends.summary.total_count : 0; // Assuming you want to get the count of friends

        // Send user data along with followers count
        res.json({
            ...userData.data,
            followers_count: followersCount
        }); // Send user data as JSON response
    } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching user data' });
    }
};
