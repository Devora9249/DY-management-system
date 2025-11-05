
const Debts = require('../models/DebtsModel');

exports.getAllDebts = async (req, res) => {
    try {
        const debts = await Debts.find();
        if (!debts) {
            res.status(404).json({ message: 'No debts found' });
            return;
        }
        res.json(debts);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

exports.addDebt = async (req, res) => {
    try {
        const data = req.body;
        if (!data.borrower || !data.lender || !data.amount || !data.dateBorrowed || !data.type) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newDebt = new Debts( req.body);
        await newDebt.save();
        res.status(201).json(newDebt);
    } catch (error) {
              console.error(error.message);

        res.status(500).json({ error: error.message });
    }
};

        // exports.getDebtById = async (req, res) => {
        //     try {
        //         const { id } = req.params;
        //         // const expense = await Expense.findById(id);
        //         const expense = null; // Replace with DB logic
        //         if (!expense) {
        //             return res.status(404).json({ error: 'Expense not found' });
        //         }
        //         res.json(expense);
        //     } catch (error) {
        //         res.status(500).json({ error: 'Server error' });
        //     }
        // };



exports.updateDebt = async (req, res) => {
    try {
        const debt = await Debts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!debt) return res.status(404).json({ message: 'Debt not found' });
        res.json(debt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};                  


exports.deleteDebt = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDebt = await Debts.findByIdAndDelete(id);
        if (!deletedDebt) {
            return res.status(404).json({ error: 'Debt not found' });
        }
        res.json({ message: 'Debt deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
