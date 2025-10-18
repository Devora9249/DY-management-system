import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, Button,
  FormControl, InputLabel, Box, Typography
} from '@mui/material';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
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
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])
  const [newAmount, setNewAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [frequency, setFrequency] = useState('');

  const [duration, setDuration] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("http://localhost:5678/api/donors", {
        name, donorId, address, phoneNumber, emailAddress, whatsappNumber,
        birthDate, yahrzeitDate,
        donationAmount: Number(newAmount),
        donationDate: newDate,
        paymentMethod, frequency,duration
      });
      console.log(data);

      // איפוס השדות
      setName(''); setDonorId(''); setAddress(''); setPhoneNumber('');
      setEmailAddress(''); setWhatsappNumber(''); setBirthDate(''); setYahrzeitDate('');
      setNewDate(new Date().toISOString().split('T')[0]); setNewAmount(''); setPaymentMethod(''); setFrequency('');setDuration('');

      alert("התורם נוסף בהצלחה");
      onAdd();  // מעדכן את רשימת התורמים
      onClose();
    } catch (error) {
      console.error("❌ שגיאה בהוספת תורם:", error);
      alert(error.message);
    }
  };

  return (
    
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { border: '2px solid #7b1fa2', borderRadius: 3 } }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: '#7b1fa2', fontWeight: 'bold' }}>
        טופס הוספת תורם
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* שדות התורם */}
          <TextField label="שם" value={name} onChange={e => setName(e.target.value)} required fullWidth size="small" margin="dense" />
          <TextField label="ת.ז" value={donorId} onChange={e => setDonorId(e.target.value)} required fullWidth size="small" margin="dense" />
          <TextField label="כתובת" value={address} onChange={e => setAddress(e.target.value)} required fullWidth size="small" margin="dense" />
          <TextField label="פלאפון" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required fullWidth size="small" margin="dense" />
          <TextField label="מייל" value={emailAddress} onChange={e => setEmailAddress(e.target.value)}  fullWidth size="small" margin="dense" />
          <TextField label="וואצאפ" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)}  fullWidth size="small" margin="dense" />
          <TextField type="date" label="תאריך יום הולדת" InputLabelProps={{ shrink: true }} value={birthDate} onChange={e => setBirthDate(e.target.value)} fullWidth size="small" margin="dense" />
          <TextField type="date" label="תאריך יארצייט" InputLabelProps={{ shrink: true }} value={yahrzeitDate} onChange={e => setYahrzeitDate(e.target.value)} fullWidth size="small" margin="dense" />

          {/* כותרת תרומה */}
          <Typography sx={{ mt: 2, mb: 1, color: '#7b1fa2', fontWeight: 'bold' }}>הוספת תרומה</Typography>

          {/* שדות התרומה */}
          <TextField
            label="תאריך גביה"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            fullWidth
            size="small"
            margin="dense"
          />
          <TextField
            label="סכום"
            type="number"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
            fullWidth
            size="small"
            margin="dense"
          />
          <FormControl fullWidth size="small" margin="dense">
            <InputLabel>סוג תשלום</InputLabel>
            <Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} label="סוג תשלום">
              <MenuItem value="מזומן">מזומן</MenuItem>
              <MenuItem value="נדרים פלוס">נדרים פלוס</MenuItem>
              <MenuItem value="בנק">בנק</MenuItem>
              <MenuItem value="דעת יהודית">חשבון דעת יהודית</MenuItem>
              <MenuItem value="חשבון משה וקסלר">חשבון משה וקסלר</MenuItem>
            </Select>
          </FormControl>
         <FormControl component="fieldset" fullWidth margin="dense">
  <Typography variant="subtitle2" sx={{ mb: 1 }}>
    תדירות
  </Typography>

  <RadioGroup
    row={false}
    value={frequency}
    onChange={(e) => setFrequency(e.target.value)}
  >
    <FormControlLabel value="חדפ" control={<Radio />} label="חד פעמי" />
    <FormControlLabel value="הוראת קבע" control={<Radio />} label="הוראת קבע" />
  </RadioGroup>

  {frequency === 'הוראת קבע' && (
    <TextField
      label="למשך כמה חודשים"
      type="number"
      size="small"
      fullWidth
      margin="dense"
      value={duration || ''}
      onChange={(e) => setDuration(e.target.value)}
      InputProps={{ inputProps: { min: 1 } }}
    />
  )}
</FormControl>

          <DialogActions sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={onClose} color="secondary">ביטול</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#7b1fa2', '&:hover': { bgcolor: '#6a1b9a' } }}>
              הוסף תורם
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}