import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function FormDialog({ onAdd }) {

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])
  const [alert, setAlert] = useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    handleClose();
  };

  const sendExpense = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5678/api/expenses", {
        date: newDate,
        description,
        amount
      });
      setDescription("");
      setAmount("");
      setNewDate(new Date().toISOString().split('T')[0]);
      setAlert({ message: "הוצאה חדשה נוספה בהצלחה ✅", type: "success" });
      onAdd();
      handleClose();

    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      {/* כפתור פתיחת הדיאלוג */}
      <Button variant="addButton" onClick={handleClickOpen} >
        הוסף הוצאה
      </Button>

      {/* דיאלוג */}
      <Dialog open={open} onClose={handleClose}>
        {/* כפתור סגירה */}
        <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
          <IconButton onClick={handleClose} variant="iconButton" >
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        {/* כותרת */}
        <DialogTitle>
          <Typography variant="h1">
            הוספת הוצאה חדשה
          </Typography>
        </DialogTitle>

        {/* תוכן */}
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
            <form onSubmit={handleSubmit} id="expense-form">
                {/* שדה מהות ההוצאה */}
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="מהות ההוצאה"
                    type="text"
                    required />

                {/* שדה סכום */}
                  <TextField
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    label="סכום"
                    type="number"
                    required />

                {/* תאריך */}
                  <TextField
                    label="תאריך"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required />
            </form>
          </Box>
        </DialogContent>

        {/* כפתור שליחה */}
        <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
          <Button
            variant="activeButton"
            onClick={sendExpense} >
            הוסף הוצאה
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  );
}
