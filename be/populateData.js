const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Animal = require('./models/Animal');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        populateDatabase();
    })
    .catch(err => console.log(err));

// Ensure that the database connection remains open until all operations are complete
const populateDatabase = async () => {
    const animals = [];

    // Read the CSV file and push each row to the `animals` array
    fs.createReadStream('data/dummy.csv')
        .pipe(csv())
        .on('data', (row) => {
            animals.push({
                country: row.Country,
                category: row['Category'],
                taxonomicGroup: row['Taxonomic Group'],
                taxonomicSubGroup: row['Taxonomic Subgroup'],
                commonName: row['Common Name'],
                scientificName: row['Scientific Name'],
                nyListingStatus: row['NY Listing Status'],
                federalListingStatus: row['Federal Listing Status'],
                stateConservationRank: row['State Conservation Rank'],
                globalConservationRank: row['Global Conservation Rank'],
                distributionStatus: row['Distribution Status'] || 'Unknown', // Set a default if not provided
                imageUrl: row['Image Url'] || 'https://placehold.co/600x400' // Add default image if not provided
            });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

            // Save all animal data asynchronously, limiting concurrent operations
            try {
                for (let animalData of animals) {
                    const animal = new Animal(animalData);
                    await animal.save();  // Use await to ensure each save completes before proceeding
                    console.log(`Animal saved with _id: ${animal._id}`);
                }
                console.log('All animals have been saved successfully.');
            } catch (error) {
                console.error(`Error saving animal: ${error.message}`);
            } finally {
                mongoose.connection.close();  // Close the connection after all saves are complete
            }
        });
};
