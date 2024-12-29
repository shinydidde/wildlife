const express = require('express');
const router = express.Router();
const Sanctuary = require('../models/Sanctuary');

// GET all sanctuaries
router.get('/', async (req, res) => {
    try {
        const sanctuaries = await Sanctuary.find();
        res.json(sanctuaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
