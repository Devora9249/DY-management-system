const mongoose = require('mongoose');


const milgaSchema = new mongoose.Schema({
    date: { type: Date },
    milgaAmount: { type: Number},
    details: { type: String },
},{timestamps: true});

module.exports = milgaSchema;