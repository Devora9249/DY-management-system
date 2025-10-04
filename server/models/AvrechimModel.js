const mongoose = require('mongoose');
const milgaSchema = require('./MilgaModel');


const AvrechimSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // ID
    name: { type: String, required: true },
    recentMilgot: { type: [milgaSchema] } // Array of recent milgot
}, { timestamps: true });

module.exports = mongoose.model('Avrech', AvrechimSchema);