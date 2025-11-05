const mongoose = require('mongoose');

const DebtSchema = new mongoose.Schema({
  borrower: { type: String, required: true },
  lender: { type: String, required: true },
  amount: { type: Number, required: true },
  dateBorrowed: { type: Date, required: true },
  dueDate: { type: Date },
  description: { type: String },
  paid: { type: Boolean, default: false },
  type: { type: String, enum: ['taken', 'given'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Debt', DebtSchema);