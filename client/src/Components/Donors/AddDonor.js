import React, { useState } from 'react';
import { Modal, Card, CardHeader, CardContent, TextField, Select, MenuItem, Button, FormControl, InputLabel, Box } from '@mui/material';
import Axios from 'axios';

export default function AddDonor({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [donorId, setDonorId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [yahrzeitDate, setYahrzeitDate] = useState('');

  const [donationAmount, setDonationAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [frequency, setFrequency] = useState('');
  const [donationDate, setDonationDate] = useState('');

  const handleSubmit = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5678/api/donors", { name, donorId, address,phoneNumber,emailAddress,whatsappNumber, birthDate, yahrzeitDate, donationAmount: Number(donationAmount), paymentMethod, frequency, donationDate })
      console.log(data);
      setName('')
      setDonorId('')
      setAddress('')
      setPhoneNumber('')
      setEmailAddress('')
      setWhatsappNumber('')
      setBirthDate('')
      setYahrzeitDate('')
      setDonationAmount('')
      setPaymentMethod('')
      setFrequency('')
      setDonationDate('')
      alert("התורם נוסף בהצלחה");
      onClose()
    } catch (error) {
      console.error("❌ שגיאה בהוספת תורם:", error);
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 3, border: '2px solid #7b1fa2' }}>
        <Card elevation={0} sx={{ border: 'none' }}>
          <CardHeader title="טופס הוספת תורם" sx={{ textAlign: 'center', color: '#7b1fa2', fontWeight: 'bold', fontSize: '1.2rem' }} />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField label="שם" value={name} onChange={e => setName(e.target.value)} required fullWidth size="small" margin="dense" />
              <TextField label="ת.ז" value={donorId} onChange={e => setDonorId(e.target.value)} required fullWidth size="small" margin="dense" />
                  <TextField label="כתובת" value={address} onChange={e => setAddress(e.target.value)} required fullWidth size="small" margin="dense" />
              <TextField label="פלאפון" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required fullWidth size="small" margin="dense" />
                  <TextField label="מייל" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} required fullWidth size="small" margin="dense" />
              <TextField label="וואצאפ" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} required fullWidth size="small" margin="dense" />
              <TextField type="date" label="תאריך יום הולדת" InputLabelProps={{ shrink: true }} value={birthDate} onChange={e => setBirthDate(e.target.value)} fullWidth size="small" margin="dense" />
              <TextField type="date" label="תאריך יארצייט" InputLabelProps={{ shrink: true }} value={yahrzeitDate} onChange={e => setYahrzeitDate(e.target.value)} fullWidth size="small" margin="dense" />
              <TextField type="number" label="סכום תרומה" value={donationAmount} onChange={e => setDonationAmount(e.target.value)} required fullWidth size="small" margin="dense" />
              <FormControl fullWidth size="small" margin="dense"><InputLabel>סוג תשלום</InputLabel><Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} label="סוג תשלום"><MenuItem value="מזומן">מזומן</MenuItem><MenuItem value="נדרים פלוס">נדרים פלוס</MenuItem><MenuItem value="בנק">בנק</MenuItem><MenuItem value="דעת יהודית">חשבון דעת יהודית</MenuItem><MenuItem value="חשבון משה וקסלר">חשבון משה וקסלר</MenuItem></Select></FormControl>
              <FormControl fullWidth size="small" margin="dense"><InputLabel>תדירות</InputLabel><Select value={frequency} onChange={e => setFrequency(e.target.value)} label="תדירות"><MenuItem value="חדפ">חד פעמי</MenuItem><MenuItem value="הוראת קבע">הוראת קבע</MenuItem></Select></FormControl>
              <TextField type="date" label="תאריך תרומה" InputLabelProps={{ shrink: true }} value={donationDate} onChange={e => setDonationDate(e.target.value)} fullWidth size="small" margin="dense" />
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={onClose} color="secondary">ביטול</Button>
                <Button onClick={onAdd} type="submit" variant="contained" sx={{ bgcolor: '#7b1fa2', '&:hover': { bgcolor: '#6a1b9a' } }}>הוסף תורם</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
