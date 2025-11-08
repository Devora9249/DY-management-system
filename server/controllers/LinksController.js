
const Link = require('../models/LinksModel');

exports.getAllLinks = async (req, res) => {
    try {
        const link = await Link.find();
        if (!link ) {
            res.status(404).json({ message: 'No links found' });
            return;
        }
        res.json(link);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

        // exports.getExpenseById = async (req, res) => {
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

exports.addLink = async (req, res) => {
    try {
        const data = req.body;
        if(!data.websiteName || !data.websitelink ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newLink = new Link(req.body);
        await newLink.save();
        res.status(201).json(newLink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.updateExpense = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, amount } = req.body;
//         // const updatedExpense = await Expense.findByIdAndUpdate(id, { name, amount }, { new: true });
//         const updatedExpense = null; // Replace with DB logic
//         if (!updatedExpense) {
//             return res.status(404).json({ error: 'Expense not found' });
//         }
//         res.json(updatedExpense);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

exports.deleteLink = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLink = await Link.findByIdAndDelete(id);
        if (!deletedLink) {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.json({ message: 'Link deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
