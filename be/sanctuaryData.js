const mongoose = require('mongoose');
const { createReadStream } = require('fs');
const csv = require('csv-parser');
const Sanctuary = require('./models/Sanctuary');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        populateSanctuaries();
    })
    .catch(err => console.error(err));

// Function to populate sanctuaries into the database
const populateSanctuaries = async () => {
    const sanctuaries = [];

    // Read the CSV file and push each row to the `sanctuaries` array
    createReadStream('data/sanctuaries.csv')
        .pipe(csv())
        .on('data', (row) => {
            sanctuaries.push({
                name: row['Sanctuary Name'],
                imageUrl: row['Imageurl'] || 'https://via.placeholder.com/300', // Default image
                country: row['Country'],
                stateOrRegion: row['State/Region'],
            });
        })
        .on('end', async () => {
            console.log('Sanctuaries CSV file successfully processed.');

            try {
                for (let sanctuaryData of sanctuaries) {
                    const sanctuary = new Sanctuary(sanctuaryData);
                    await sanctuary.save(); // Save each sanctuary
                    console.log(`Sanctuary saved with _id: ${sanctuary._id}`);
                }
                console.log('All sanctuaries have been saved successfully.');
            } catch (error) {
                console.error(`Error saving sanctuary: ${error.message}`);
            } finally {
                mongoose.connection.close(); // Close the connection after all saves are complete
            }
        });
};
