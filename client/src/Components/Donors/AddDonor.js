import React, { useState } from 'react';
import { Card, CardHeader, CardContent, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

export default function AddDonor({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [yahrzeitDate, setYahrzeitDate] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [donationDate, setDonationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      idNumber,
      birthDate,
      yahrzeitDate,
      donationAmount,
      paymentType,
      frequency,
      donationDate
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Card>
      <CardHeader title="טופס הוספת תורם" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField label="שם" value={name} onChange={e => setName(e.target.value)} required fullWidth margin="normal" />
          <TextField label="תז" value={idNumber} onChange={e => setIdNumber(e.target.value)} required fullWidth margin="normal" />
          <TextField type="date" label="תאריך יום הולדת" value={birthDate} onChange={e => setBirthDate(e.target.value)} fullWidth margin="normal" />
          <TextField type="date" label="תאריך יארצייט" value={yahrzeitDate} onChange={e => setYahrzeitDate(e.target.value)} fullWidth margin="normal" />
          <TextField type="number" label="סכום תרומה" value={donationAmount} onChange={e => setDonationAmount(e.target.value)} required fullWidth margin="normal" />

          <FormControl fullWidth margin="normal">
            <InputLabel>סוג תשלום</InputLabel>
            <Select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
              <MenuItem value="cash">מזומן</MenuItem>
              <MenuItem value="NedarimPlus">נדרים פלוס</MenuItem>
              <MenuItem value="bank">בנק</MenuItem>
              <MenuItem value="DaatYehuditAccount">חשבון דעת יהודית</MenuItem>
              <MenuItem value="MosheWexlerAccount">חשבון משה וקסלר</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>תדירות</InputLabel>
            <Select value={frequency} onChange={e => setFrequency(e.target.value)}>
              <MenuItem value="once">חד פעמי</MenuItem>
              <MenuItem value="monthly">הוראת קבע</MenuItem>
            </Select>
          </FormControl>

          <TextField type="date" label="תאריך תרומה" value={donationDate} onChange={e => setDonationDate(e.target.value)} fullWidth margin="normal" />

          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button variant="outlined" onClick={onClose}>ביטול</Button>
            <Button type="submit" variant="contained" color="primary">הוסף תורם</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
