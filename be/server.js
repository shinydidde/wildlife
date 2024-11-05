const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
    origin: '*', // Allows all origins. You can specify an array of allowed origins here if needed.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
}));

// Your routes would be imported and used here
const animalRoutes = require('./routes/animalRoutes');
app.use('/api/animals', animalRoutes);

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
};

mongoose.connect(process.env.MONGO_URI, options)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
