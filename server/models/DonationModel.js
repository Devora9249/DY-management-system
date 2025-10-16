const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    frequency: { type: String, required: true },
}, { timestamps: true });


module.exports = DonationSchema;