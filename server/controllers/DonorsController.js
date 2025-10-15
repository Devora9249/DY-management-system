const Donor = require('../models/DonorModel');

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    if (!donors || donors.length === 0) {
        res.status(404).json({ message: 'No donors found' });
        return;
    }
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get donor by ID
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new donor
exports.createDonor = async (req, res) => {
  try {
    console.log("Received body:", req.body); 
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update donor
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete donor
exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ message: 'Donor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};