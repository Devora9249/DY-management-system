const mongoose = require('mongoose');
const DonationSchema = require('./DonationModel');
const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  donorId: { type: String, unique: true,   
    partialFilterExpression: {
      donorId: { $exists: true, $ne: "" }
    } },
  address: { type: String },
  phoneNumber: { type: String },
  emailAddress: { type: String },
  whatsappNumber: { type: String },
  birthDate: { type: Date },
  yahrzeitDate: [
    {
      date: { type: Date, required: true },
      name: { type: String, required: true }
    }
  ],
  donations: { type: [DonationSchema] }
}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);