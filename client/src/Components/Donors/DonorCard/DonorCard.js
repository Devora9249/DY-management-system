import { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Axios from 'axios';
import DonorDetails from './DonorDetails';
import YahrzeitTable from './YahrzeitTable';
import DonationTable from './DonationTable';
import AddDonationForm from './AddDonationForm';

export default function DonorCard({ donor, setOpen, open,isOpen, onChange}) {

  const [donations, setDonations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // ⭐ מצב עריכה/תצוגה
  const [alert, setAlert] = useState(null);

  


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
const handleClose = () => {
    setIsEditing(false); // ⭐ שינוי מצב לעריכה
    setOpen(false);
  };
   const updateDonorDetails = async () => {
    try {
      await Axios.put(
        `http://localhost:5678/api/donors/${donor._id}`,
        donor
      );
      handleClose();
      setAlert({ type: "success", message: "פרטי התורם עודכנו בהצלחה" });
      onChange();
    } catch (error) {
      setAlert({ type: "error", message: "שגיאה בעדכון פרטי התורם" });
    }
  };

  if (!isOpen) return null;

  return (
    
    <Dialog open={isOpen} onClose={handleClose}>
      {/* כותרת */}
      <DialogTitle >
        טופס פרטי תורם
        <Button
            variant="activeButton"
            onClick={isEditing ? updateDonorDetails : () => setIsEditing(true)} 
          >
            {/* { "שמירת עדכונים"} */}
             {isEditing ? "שמירת עדכונים" : "עדכון פרטים"}
          </Button>
        <IconButton variant="iconButton"
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* גוף הדיאלוג */}
      <DialogContent dividers>

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
              onClick={() => setShowAddForm(true)}>
              הוסף תרומה נוספת
            </Button>
          </Box>
        )}

        {showAddForm && (
          <Box >
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

