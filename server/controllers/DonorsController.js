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

exports.getDonationsById = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id).select('donations');
        if (!donor) return res.status(404).json({ message: 'Donor not found' });
        res.json(donor.donations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.createDonation = async (req, res) => {
  try {
    const { date, amount, paymentMethod, frequency, duration} = req.body; // שולפים את הנתונים מהבקשה
    if (!date || !amount|| !paymentMethod || !frequency) return res.status(400).json({ message: 'required' });

    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    // מוסיפים תרומה חדשה למערך
    donor.donations.push({ date: new Date(date), amount,  paymentMethod, frequency,monthsRemaining:duration});

        if (frequency === "הוראת קבע") {
      const next = new Date(date);
      next.setMonth(next.getMonth() + 1);
      donationData.nextDonationDate = next;
      donationData.active = true;
        donationData.monthsRemaining = duration ? Number(duration) : 12; // ברירת מחדל 12 חודשים

    }
donor.donations.push(donationData);

    await donor.save();

    res.status(201).json({ message: 'התרומה נוספה בהצלחה', donor });
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};


exports.createDonor = async (req, res) => {
  try {
    const { donationAmount, donationDate, paymentMethod, frequency,duration, ...donorData } = req.body;

    const donor = new Donor(donorData);

    // אם התקבלו נתוני תרומה ראשונית, דוחפים למערך donations
    if (donationAmount && donationDate && paymentMethod && frequency) {
      donor.donations.push({ date: new Date(donationDate), amount: donationAmount , paymentMethod, frequency,monthsRemaining:duration});
    }
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
       if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "התורם הזה כבר קיים במערכת" });
    }
    res.status(400).json({ message: err.message });
  }
};


 
// // Update donor
// exports.updateDonor = async (req, res) => {
//   try {
//     const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!donor) return res.status(404).json({ message: 'Donor not found' });
//     res.json(donor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

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
    const { id, donationId } = req.params; // מזהי התורם והתרומה

    const donor = await Donor.findById(id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    // מוצאים את התרומה ומסננים אותה החוצה
    donor.donations = donor.donations.filter(
      (donation) => donation._id.toString() !== donationId
    );

    await donor.save();
    res.json({ message: 'Donation deleted successfully', donor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};