const mongoose = require('mongoose');

const SanctuarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, default: 'https://via.placeholder.com/300' },
    country: { type: String, required: true },
    stateOrRegion: { type: String, required: true },
});

module.exports = mongoose.model('Sanctuary', SanctuarySchema);

