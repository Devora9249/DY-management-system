const Donor = require('../models/DonorModel');

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const { search } = req.query;

    //  כל התורמים
    if (!search || search.trim() === "") {
      const donors = await Donor.find();
      return res.json(donors);
    }

    //  רק תואמים
    const donors = await Donor.find({
      name: { $regex: search.trim(), $options: "i" }
    });

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

exports.getDonationsById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).select('donations');
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor.donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const { date, amount, paymentMethod, frequency, endDate } = req.body;
    if (!date || !amount || !paymentMethod || !frequency) {
      return res.status(400).json({ message: 'required' });
    }

    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    if (frequency === "monthly") {
      const next = new Date(date);
      next.setMonth(next.getMonth() + 1);

      const parsedEndDate = endDate ? new Date(endDate) : null;

      donor.donations.push({
        date: new Date(date),
        amount,
        paymentMethod,
        frequency: "monthly",
        nextDonationDate: next,
        isActive: true,
        endDate: parsedEndDate,
        stoppedAt: null
      });
    } else { // חדפ
      donor.donations.push({
        date: new Date(date),
        amount,
        paymentMethod,
        frequency: "once",
      });
    }
    await donor.save();
    res.status(201).json({ message: 'התרומה נוספה בהצלחה', donor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDonor = async (req, res) => {
  try {
    const { name, donationAmount, donationDate, paymentMethod, frequency, duration, endDate, ...donorData } = req.body;

    console.log("REQ BODY:", req.body);
    console.log("DONOR DATA:", donorData);

    if (!name) {
      return res.status(400).json({ message: "שם התורם הוא שדה חובה" });
    }

    console.log("NAME TO CHECK:", name);

    const existingDonor = await Donor.findOne({ name });

    console.log("FOUND DONOR:", existingDonor);
    if (existingDonor) {
      return res.status(409).json({
        message: "תורם עם שם זה כבר קיים במערכת",
      });
    }

   if (donorData.donorId === "") {
      donorData.donorId = null;
    }
    const donor = new Donor({ name, ...donorData });

 

    await donor.save();

    if (!donationAmount || !donationDate || !paymentMethod || !frequency) {
      return res.status(201).json({ message: "Donor created", donor });
    }

    req.params.id = donor._id;
    req.body = {
      date: donationDate,
      amount: donationAmount,
      paymentMethod,
      frequency,
      endDate: endDate ?? null
    };

    return exports.createDonation(req, res);
  } catch (err) {
    console.log(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: "התורם הזה כבר קיים במערכת" });
    }
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

exports.deleteDonation = async (req, res) => {
  try {
    const { id, donationId } = req.params;

    const donor = await Donor.findById(id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    donor.donations = donor.donations.filter(
      (donation) => donation._id.toString() !== donationId
    );

    await donor.save();
    res.json({ message: 'Donation deleted successfully', donor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// הפסקת תרומת הוראת קבע
exports.stopRecurringDonation = async (req, res) => {
  try {
    const { id, donationId } = req.params;

    const donor = await Donor.findById(id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    const d = donor.donations.id(donationId);
    if (!d) return res.status(404).json({ message: 'Donation not found' });

    if (d.frequency !== "monthly") {
      return res.status(400).json({ message: "Not a recurring donation" });
    }

    d.isActive = false;
    d.stoppedAt = new Date();

    await donor.save();
    res.json({ message: "Recurring donation stopped", donor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
