const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true }
});

const DonorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    donorId: { type: String, required: true, unique: true }, // ID
    address: { type: String },
    telephoneNumber: { type: String },
    emailAddress: { type: String },
    whatsappNumber: { type: String },
    birthday: { type: Date },
    donationAmount: { type: Number },
    paymentMethod: { type: String },
    frequency: { type: String },
    donations: [DonationSchema]
});

module.exports = mongoose.model('Donor', DonorSchema);