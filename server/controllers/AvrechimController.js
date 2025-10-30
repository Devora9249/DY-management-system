const Avrech = require('../models/AvrechimModel');

// Get all Avrechim
exports.getAllAvrechim = async (req, res) => {
    try {
        
        const avrechim = await Avrech.find();
        if (!avrechim) {
            return res.status(404).json({ message: 'No Avrechim found' });
        }
        // if(avrechim.length === 0)
        res.json(avrechim);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Avrech by ID
exports.getAvrechById = async (req, res) => {
    try {
        const avrech = await Avrech.findById(req.params.id);
        if (!avrech) return res.status(404).json({ message: 'Avrech not found' });
        res.json(avrech);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMilgotAvrechById = async (req, res) => {
    try {
        const avrech = await Avrech.findById(req.params.id).select('recentMilgot');
        if (!avrech) return res.status(404).json({ message: 'Avrech not found' });
        res.json(avrech.recentMilgot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create new Avrech
exports.createAvrech = async (req, res) => {
    try {
        if (!req.body.name || !req.body.id || !req.body.phoneNumber) {
            return res.status(400).json({ message: 'יש למלא את השדות שם, ת"ז ומספר טלפון' });
        }

        const existing = await Avrech.findOne({ $or: [{ id: req.body.id }, { name: req.body.name }] });
        if (existing) {
            return res.status(400).json({ message: "האברך כבר קיים במערכת" });
        }

        const avrech = new Avrech(req.body); 
        await avrech.save();
        res.status(201).json(avrech);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMilgaToAvrech = async (req, res) => {
    try {
        const avrech = await Avrech.findById(req.params.id);
        if (!avrech) return res.status(404).json({ message: 'Avrech not found' });
        avrech.recentMilgot.push(req.body);
        await avrech.save();
        res.status(201).json(avrech);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Update Avrech
exports.updateAvrech = async (req, res) => {
    try {
        const avrech = await Avrech.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!avrech) return res.status(404).json({ message: 'Avrech not found' });
        res.json(avrech);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Avrech
exports.deleteAvrech = async (req, res) => {
    try {
        const avrech = await Avrech.findByIdAndDelete(req.params.id);
        if (!avrech) return res.status(404).json({ message: 'Avrech not found' });
        res.json({ message: 'Avrech deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
