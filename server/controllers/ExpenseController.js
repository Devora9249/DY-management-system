// server/controllers/ExpenseController.js

// const Expense = require('../models/ExpenseModel');

exports.getAllExpenses = async (req, res) => {
    try {
        // const expenses = await Expense.find();
        const expenses = [];
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
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
        const { name, amount } = req.body;
        // const newExpense = new Expense({ name, amount }); await newExpense.save();
        const newExpense = { id: Date.now(), name, amount };
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
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
        // const deletedExpense = await Expense.findByIdAndDelete(id);
        const deletedExpense = null; // Replace with DB logic
        if (!deletedExpense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
