
const Expense = require('../models/ExpensesModel');

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        if (!expenses || expenses.length === 0) {
            res.status(404).json({ message: 'No expenses found' });
            return;
        }
        res.json(expenses);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

exports.getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        // const expense = await Expense.findById(id);
        const expense = null; // Replace with DB logic
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const data = req.body;
        const newExpense = new Expense({ date: new Date(), amount:data.amount, description:data.description }); 
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, amount } = req.body;
        // const updatedExpense = await Expense.findByIdAndUpdate(id, { name, amount }, { new: true });
        const updatedExpense = null; // Replace with DB logic
        if (!updatedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
