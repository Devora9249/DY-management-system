const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },           // תאריך ההוצאה
  amount: { type: Number, required: true },       // סכום ההוצאה
  description: { type: String }                   // תיאור נוסף (לא חובה)
},{timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);