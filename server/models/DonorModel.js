const mongoose = require('mongoose');
const DonationSchema = require('./DonationModel');

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
    donations:{type:[DonationSchema]} 
},{timestamps: true});

module.exports = mongoose.model('Donor', DonorSchema);