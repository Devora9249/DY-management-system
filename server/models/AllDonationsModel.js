const mongoose = require('mongoose');



const AllDonationsSchema = new mongoose.Schema({
    donationDate: { type: Date },
    donorName: { type: String, required: true },
    donationAmount: { type: Number },
    typeOfPayment: { type: String },
    frequency: { type: String },
});

module.exports = mongoose.model('AllDonations', AllDonationsSchema);
//תאריך, שם התורם, סכום, הו"ק, חד"פ, סוג תשלום.