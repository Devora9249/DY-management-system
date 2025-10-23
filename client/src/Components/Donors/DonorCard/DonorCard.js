import { useState, useEffect } from 'react';
import {Box, Dialog, DialogTitle, DialogContent, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Axios from 'axios';
import DonorDetails from './DonorDetails';
import YahrzeitTable from './YahrzeitTable';
import DonationTable from './DonationTable';
import AddDonationForm from './AddDonationForm';

export default function DonorCard({ isOpen, donor, onClose }) {
  const [donations, setDonations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const getDonations = async () => {
    if (!donor?._id) return;
    try {
      const { data } = await Axios.get(`http://localhost:5678/api/donors/${donor._id}/donations`);
      setDonations(Array.isArray(data) ? data : []);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOpen) getDonations();
  }, [isOpen, donor]);

  const handleDeleteDonation = async (donationId) => {
    try {
      await Axios.delete(`http://localhost:5678/api/donors/${donor._id}/donations/${donationId}`);
      getDonations();
    } catch (error) {
      alert('שגיאה במחיקת התרומה: ' + error.message);
    }
  };

  const handleAddDonation = async (donation) => {
    try {
      await Axios.post(`http://localhost:5678/api/donors/${donor._id}`, donation);
      setShowAddForm(false);
      getDonations();
    } catch (error) {
      alert('שגיאה בהוספת תרומה: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (


    <Dialog
  open={isOpen}
  onClose={onClose}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4, // ✅ פינות רכות
      bgcolor: "#fafafa", // ✅ רקע בהיר
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)", // ✅ הצללה רכה
      direction: "rtl", // ✅ כתיבה מימין לשמאל
    },
  }}
>
  {/* כותרת */}
  <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#b71c1c", // ✅ אדום עדין קבוע
      fontWeight: 700,
      fontSize: "1.3rem",
      pb: 1,
    }}
  >
    טופס פרטי תורם
    <IconButton
      onClick={onClose}
      sx={{
        color: "#b71c1c",
        transition: "0.2s",
        "&:hover": { bgcolor: "#fdeaea" }, // ✅ hover עדין
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  {/* גוף הדיאלוג */}
  <DialogContent
    dividers
    sx={{
      p: 3,
      bgcolor: "white",
      borderRadius: 3,
    }}
  >
    <DonorDetails donor={donor} />

    <Box sx={{ mt: 3 }}>
      <YahrzeitTable yahrzeits={donor?.yahrzeitDate || []} />
    </Box>

    <Box sx={{ mt: 3 }}>
      <DonationTable donations={donations} onDelete={handleDeleteDonation} />
    </Box>

    {/* כפתור הוספה / טופס */}
    {!showAddForm && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          onClick={() => setShowAddForm(true)}
          sx={{
            bgcolor: "#b71c1c",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "#9a1313" },
          }}
        >
          הוסף תרומה נוספת
        </Button>
      </Box>
    )}

    {showAddForm && (
      <Box sx={{ mt: 3 }}>
        <AddDonationForm
          onAdd={handleAddDonation}
          onCancel={() => setShowAddForm(false)}
        />
      </Box>
    )}
  </DialogContent>
</Dialog>
   
  );
}

