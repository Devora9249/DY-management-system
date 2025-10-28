const mongoose = require('mongoose');
const milgaSchema = require('./MilgaModel');


const AvrechimSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String },
    emailAddress: { type: String},
    bankName: { type: String },
    branchNumber: { type: String },
    accountNumber: { type: String },
    womenName: { type: String },
    womenPhoneNumber: { type: String },
    womenEmailAddress: { type: String },
    active: { type: Boolean, default: true },
    recentMilgot: { type: [milgaSchema] }
}, { timestamps: true });

module.exports = mongoose.model('Avrech', AvrechimSchema);