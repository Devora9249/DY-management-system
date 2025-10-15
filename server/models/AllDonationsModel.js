const mongoose = require('mongoose');

const AllDonationsSchema = new mongoose.Schema({
    donationDate: { type: Date },
    donorName: { type: String, required: true },
    donationAmount: { type: Number },
    typeOfPayment: { type: String,
        enum:["hk","ot"]//הו"ק, חד"פ
     },
    frequency: { type: String },
},{timestamps: true});

module.exports = mongoose.model('AllDonations', AllDonationsSchema);
//תאריך, שם התורם, סכום, הו"ק, חד"פ, סוג תשלום.