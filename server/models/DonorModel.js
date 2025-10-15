const mongoose = require('mongoose');
const DonationSchema = require('./DonationModel');
const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  donorId: { type: String, required: true, unique: true },
  address: { type: String },
  phoneNumber: { type: String },
  emailAddress: { type: String },
  whatsappNumber: { type: String },
  birthDate: { type: Date },
  yahrzeitDate: { type: Date },
  donationAmount: { type: Number },
  paymentMethod: { type: String },
  frequency: { type: String },
  donationDate: { type: Date },
   donations:{type:[DonationSchema]} 
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);