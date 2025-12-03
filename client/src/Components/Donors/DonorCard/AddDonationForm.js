import { useState } from 'react';
import {Paper, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, RadioGroup, Radio, FormControlLabel } from '@mui/material';

export default function AddDonationForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    paymentMethod: '',
    frequency: '',
    duration: ''
  }); 

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.paymentMethod || !form.frequency) {
      alert('יש למלא את כל השדות');
      return;
    }
    onAdd({
      date: form.date,
      amount: Number(form.amount),
      paymentMethod: form.paymentMethod,
      frequency: form.frequency,
      duration: form.duration
    });
  };

  return (

<Paper>
    <Typography>הוספת תרומה </Typography>
    
  <TextField
    label="תאריך גביה"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={form.date}
    onChange={handleChange("date")}/>

  <TextField
    label="סכום"
    type="number"
    value={form.amount}
    onChange={handleChange("amount")}/>

  <FormControl> 
    <InputLabel>סוג תשלום</InputLabel>
    <Select
      value={form.paymentMethod}
      onChange={handleChange("paymentMethod")}
      label="סוג תשלום"
    >
      <MenuItem value="מזומן">מזומן</MenuItem>
      <MenuItem value="נדרים פלוס">נדרים פלוס</MenuItem>
      <MenuItem value="חשבון בינלאומי">חשבון בינלאומי</MenuItem>
      <MenuItem value="חשבון דעת יהודית">חשבון דעת יהודית</MenuItem>
      <MenuItem value="חשבון משה וקסלר">חשבון משה וקסלר</MenuItem>
    </Select>
  </FormControl>

  <Typography> תדירות </Typography>

  <RadioGroup
    value={form.frequency}
    onChange={handleChange("frequency")} >
    <FormControlLabel value="חדפ" control={<Radio />} label="חד פעמי" />
    <FormControlLabel value="הוראת קבע" control={<Radio />} label="הוראת קבע" />
  </RadioGroup>

  {form.frequency === "הוראת קבע" && (
    <TextField
      label="למשך כמה חודשים"
      type="number"
      size="small"
      fullWidth
      value={form.duration || ""}
      onChange={handleChange("duration")}/>
  )}

  <Box>
    <Button onClick={onCancel}> ביטול </Button>

    <Button
      variant="contained"
      onClick={handleSubmit} >
      הוסף תרומה
    </Button>
  </Box>
</Paper>

  
  );
}
