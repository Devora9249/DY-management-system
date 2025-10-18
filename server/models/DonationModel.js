const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    frequency: { type: String, required: true },
    nextDonationDate: { type: Date },  // ← חדש
    active: { type: Boolean, default: false },
    monthsRemaining: { type: Number, default: 0 }

}, { timestamps: true });


module.exports = DonationSchema;