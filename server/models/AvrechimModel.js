const mongoose = require('mongoose');



const AvrechimSchema = new mongoose.Schema({
    Id: { type: String, required: true, unique: true }, // ID
    name: { type: String, required: true },
    recentMilgot: [milgaSchema]
});

module.exports = mongoose.model('Avrech', AvrechimSchema);