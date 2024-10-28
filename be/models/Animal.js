const mongoose = require('mongoose');

// Create a separate schema to store the counter for auto-incrementing
const counterSchema = new mongoose.Schema({
  model: { type: String, required: true },  // Model name (e.g., 'Animal')
  count: { type: Number, default: 0 }       // Counter for the auto-increment
});

// Create the Counter model
const Counter = mongoose.model('Counter', counterSchema);

// Update the Animal schema
const animalSchema = new mongoose.Schema({
  _id: { type: Number, unique: true },  // Use Number type for the _id
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  country: { type: String, required: true },
  category: { type: String, required: true },
  taxonomicGroup: { type: String, required: true },
  taxonomicSubGroup: { type: String, required: true },
  nyListingStatus: { type: String, required: true },
  federalListingStatus: { type: String, required: true },
  stateConservationRank: { type: String, required: true },
  globalConservationRank: { type: String, required: true },
  distributionStatus: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

// Pre-save hook to auto-increment the _id field
animalSchema.pre('save', async function (next) {
  const doc = this;

  // Only auto-increment if _id is not provided or if the document is new
  if (!doc.isNew || doc._id) {
    return next();
  }

  try {
    // Find and update the counter for the Animal model, incrementing the count
    const counter = await Counter.findOneAndUpdate(
      { model: 'Animal' },  // Model name
      { $inc: { count: 1 } },  // Increment the count by 1
      { new: true, upsert: true }  // Create the counter if it doesn't exist
    );

    // Set the auto-incremented _id for the document
    doc._id = counter.count;
    next();
  } catch (err) {
    next(err);
  }
});

// Export the Animal model
module.exports = mongoose.model('Animal', animalSchema);
