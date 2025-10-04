const mongoose = require('mongoose');


const milgaSchema = new mongoose.Schema({
    date: { type: Date },
    milgaAmount: { type: Number },
},{timestamps: true});

module.exports = milgaSchema;