const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true }
});


module.exports = mongoose.model('Donation', DonationSchema);