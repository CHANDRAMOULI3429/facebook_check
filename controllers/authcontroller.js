const axios = require('axios');
const config = require('../config/config');

// Facebook login
exports.facebookLogin = (req, res) => {
    const url = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${config.facebookAppId}&redirect_uri=${config.redirectUri}&scope=email,public_profile,user_friends`; // Ensure the redirect_uri is secure
    res.json({ loginUrl: url });
};

// Facebook callback
exports.facebookCallback = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'No authorization code provided' });
    }

    const tokenUrl = `https://graph.facebook.com/v15.0/oauth/access_token?client_id=${config.facebookAppId}&redirect_uri=${config.redirectUri}&client_secret=${config.facebookAppSecret}&code=${code}`;

    try {
        const response = await axios.get(tokenUrl);
        const accessToken = response.data.access_token;

        // Fetch user data
        const userUrl = `https://graph.facebook.com/me?fields=id,name,email,picture,friends&access_token=${accessToken}`;
        const userData = await axios.get(userUrl);

        const followersCount = userData.data.friends ? userData.data.friends.summary.total_count : 0;

        res.json({
            ...userData.data,
            followers_count: followersCount
        });
    } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while fetching user data. Please try again later.' });
    }
};
