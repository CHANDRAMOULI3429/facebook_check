const express = require('express');
const cors = require('cors');
const authroute = require('./routes/authroutes'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Mount the routes with the '/auth' prefix
app.use('/auth', authroute); // Keep this line to use '/auth' prefix

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
