

import { useState } from 'react';
import {Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Axios from 'axios';
import DonorDetailsForm from './DonorDetailsForm';
import YahrzeitSection from './YahrzeitSection';
import DonationSection from './DonationSection';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
    const { name, donorId, phoneNumber, emailAddress, whatsappNumber } = donorData;
    const { newDate, newAmount, paymentMethod, frequency, duration } = donation;

    if (!name || !donorId || !phoneNumber)
      return alert("נא למלא את כל שדות החובה");
    if (!whatsappNumber && !emailAddress)
      return alert("יש למלא או מייל או וואצאפ");
    if (!newDate || !newAmount || !paymentMethod || !frequency)
      return alert("נא למלא את כל פרטי התרומה");

    try {
      await Axios.post("http://localhost:5678/api/donors", {
        ...donorData,
        yahrzeitDate: yahrzeits,
        donationAmount: Number(newAmount),
        donationDate: newDate,
        paymentMethod,
        frequency,
        duration
      });

      alert("✅ התורם נוסף בהצלחה");
      setDonorData({});
      setYahrzeits([]);
      setDonation({});
      onAdd();
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
<Dialog
  open={isOpen}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: 4,
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      backgroundColor: "#fafafa",
      border: "1.5px solid #b71c1c",
      overflow: "hidden",
    },
  }}
>
  {/* כותרת עם כפתור סגירה */}
  <DialogTitle
    sx={{
      textAlign: "center",
      color: "#b71c1c",
      fontWeight: 700,
      fontSize: "1.3rem",
      letterSpacing: 0.5,
      py: 2,
      borderBottom: "1px solid #eee",
      position: "relative",
    }}
  >
    טופס הוספת תורם
    <IconButton
      onClick={onClose}
      sx={{
        position: "absolute",
        left: 8,
        top: 8,
        color: "#b71c1c",
        transition: "0.2s",
        "&:hover": { backgroundColor: "#fdeaea" },
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  {/* תוכן הדיאלוג */}
  <DialogContent sx={{ p: 3, backgroundColor: "white" }}>
    <form onSubmit={handleSubmit}>
      {/* 🪄 Stack שולט על ריווחים אנכיים אחידים */}
      <Stack spacing={3}>
        <DonorDetailsForm donorData={donorData} setDonorData={setDonorData} />
        <YahrzeitSection yahrzeits={yahrzeits} setYahrzeits={setYahrzeits} />
        <DonationSection donation={donation} setDonation={setDonation} />
      </Stack>

      {/* פעולות בתחתית */}
      <DialogActions
        sx={{
          mt: 4,
          justifyContent: "space-between",
          px: 2,
          borderTop: "1px solid #f0f0f0",
          pt: 2,
        }}
      >

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#b71c1c",
            fontWeight: "bold",
            px: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            "&:hover": { backgroundColor: "#9a1313" },
          }}
        >
          הוסף תורם
        </Button>
      </DialogActions>
    </form>
  </DialogContent>
</Dialog>
  );
}