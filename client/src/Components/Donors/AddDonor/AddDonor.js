import { useState } from 'react';
import { Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Axios from 'axios';
import DonorDetailsForm from './DonorDetailsForm';
import YahrzeitSection from './YahrzeitSection';
import DonationSection from './DonationSection';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function addMonthsToDate(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + Number(months));
  return d.toISOString().split('T')[0];
}

export default function AddDonor({ isOpen, onClose, onAdd }) {
  const [donorData, setDonorData] = useState({
    name: '',
    donorId: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    whatsappNumber: '',
    birthDate: '',
  });

  const [yahrzeits, setYahrzeits] = useState([]);
  const [donation, setDonation] = useState({
    newDate: new Date().toISOString().split('T')[0],
    newAmount: '',
    paymentMethod: '',
    frequency: '',
    duration: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = donorData;
    const { newDate, newAmount, paymentMethod, frequency, duration } = donation;

    if (!name)
      return alert("נא למלא את כל שדות החובה");
    if (!newDate || !newAmount || !paymentMethod || !frequency)
      return alert("נא למלא את כל פרטי התרומה");

    const endDate =
      frequency === "monthly" && duration
        ? addMonthsToDate(newDate, duration)
        : null;

    try {
      await Axios.post("http://localhost:5678/api/donors", {
        ...donorData,
        yahrzeitDate: yahrzeits,
        donationAmount: Number(newAmount),
        donationDate: newDate,
        paymentMethod,
        frequency,
        endDate
      });

      alert("✅ התורם נוסף בהצלחה");
      setDonorData({
        name: '',
        donorId: '',
        address: '',
        phoneNumber: '',
        emailAddress: '',
        whatsappNumber: '',
        birthDate: '',
      });
      setYahrzeits([]);
      setDonation({
        newDate: new Date().toISOString().split('T')[0],
        newAmount: '',
        paymentMethod: '',
        frequency: '',
        duration: ''
      });

      onAdd();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        טופס הוספת תורם
        <IconButton variant="iconButton" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <DonorDetailsForm donorData={donorData} setDonorData={setDonorData} />
            <YahrzeitSection yahrzeits={yahrzeits} setYahrzeits={setYahrzeits} />
            <DonationSection donation={donation} setDonation={setDonation} />
          </Stack>

          <DialogActions>
            <Button type="submit" variant="contained">
              הוסף תורם
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
