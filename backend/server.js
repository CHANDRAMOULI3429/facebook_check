const express = require('express');
const cors = require('cors');
const authroute = require('./routes/authroutes');
const dataDeletionRoute = require('./routes/datadeletion');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authroute); // Authentication routes
app.use('/delete', dataDeletionRoute); // Data deletion routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
