const Milga = require('../models/MilgaModel');

// GET /milga
exports.getAllMilgas = async (req, res) => {
    try {
        const milgas = await Milga.find();
        res.json(milgas);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch milgas' });
    }
};

// GET /milga/:id
exports.getMilgaById = async (req, res) => {
    try {
        const { id } = req.params;
        const milga = await Milga.findById(id);
        if (!milga) {
            return res.status(404).json({ error: 'Milga not found' });
        }
        res.json(milga);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch milga' });
    }
};

// POST /milga
exports.AddMilga = async (req, res) => {
    try {
        const data = req.body;
        const newMilga = new Milga(data);
        await newMilga.save();
        res.status(201).json(newMilga);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create milga' });
    }
};

// PUT /milga/:id
exports.updateMilga = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedMilga = await Milga.findByIdAndUpdate(id, data, { new: true });
        if (!updatedMilga) {
            return res.status(404).json({ error: 'Milga not found' });
        }
        res.json(updatedMilga);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update milga' });
    }
};

// DELETE /milga/:id
exports.deleteMilga = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMilga = await Milga.findByIdAndDelete(id);
        if (!deletedMilga) {
            return res.status(404).json({ error: 'Milga not found' });
        }
        res.json({ message: 'Milga deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete milga' });
    }
};