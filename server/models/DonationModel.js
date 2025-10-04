const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true }
},{timestamps: true});


module.exports = DonationSchema;