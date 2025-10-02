const mongoose = require('mongoose');


const milgaSchema = new mongoose.Schema({
    date: { type: Date },
    milgaAmount: { type: Number },
});

module.exports = mongoose.model('Milga', milgaSchema);