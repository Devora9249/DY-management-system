import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Typography, TextField, Box , Select, MenuItem,
  FormControl, InputLabel} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Select, MenuItem, Button,
//   FormControl, InputLabel
// } from '@mui/material';
import Axios from 'axios';
import ToDelete from './ToDelete';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
const DonorCard = ({ isOpen, donor, onClose }) => {
  const [donations, setDonations] = useState([]);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAmount, setNewAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [frequency, setFrequency] = useState('');
  const [showAddDonationForm, setShowAddDonationForm] = useState(false);
const [duration, setDuration] = useState('');
  // טוען את התרומות מה-API
  const getDonations = async () => {
    if (!donor?._id) return;
    try {
      const { data } = await Axios.get(`http://localhost:5678/api/donors/${donor._id}/donations`);
      setDonations(Array.isArray(data) ? data : []); // מבטיחים מערך
    } catch (error) {
      console.error(error);
            alert(error.response?.data?.message || error.message);

    }
  };

  useEffect(() => {
    if (isOpen) getDonations();
  }, [isOpen, donor]);

  const handleAddDonation = async () => {
    if (!newDate || !newAmount || !frequency ||!paymentMethod ) return alert("יש למלא");
    try {
      await Axios.post(`http://localhost:5678/api/donors/${donor._id}`, {
        date: newDate,
        amount: Number(newAmount),
        frequency,
        paymentMethod,
        duration
      });
      setNewDate(new Date().toISOString().split('T')[0]);
      setNewAmount('');
       setFrequency('');
      setPaymentMethod('');
      setDuration('')
      setShowAddDonationForm(false);
      getDonations(); // טוען שוב את הנתונים אחרי ההוספה
    } catch (error) {
      console.error(error);
      alert('שגיאה בהוספת התרומה: ' + error.message);
    }
  };

  const handleDeleteDonation = async (donationId) => {
  try {
    await Axios.delete(`http://localhost:5678/api/donors/${donor._id}/donations/${donationId}`);
    alert('התרומה נמחקה בהצלחה');
    getDonations(); // טען שוב את התרומות לאחר המחיקה
  } catch (error) {
    console.error(error);
    alert('שגיאה במחיקת התרומה: ' + error.message);
  }
}
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#7b1fa2', fontWeight: 'bold' }}>
        טופס פרטי תורם
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography>שם: {donor?.name}</Typography>
        <Typography>ת.ז: {donor?.donorId}</Typography>
        <Typography>כתובת: {donor?.address}</Typography>
        <Typography>פלאפון: {donor?.phoneNumber}</Typography>
        <Typography>מייל: {donor?.emailAddress}</Typography>
        <Typography>וואצאפ: {donor?.whatsappNumber}</Typography>
        <Typography>תאריך לידה: {new Date(donor?.birthDate).toLocaleDateString('he-IL')}</Typography>  
         {/* <TableCell>{}</TableCell> */}
        <Typography variant="h6" sx={{ mt: 2, color: '#7b1fa2' }}>יארצייטים:</Typography>

{donor?.yahrzeitDate?.length > 0 ? (
  <Table sx={{ mb: 2 }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>שם הנפטר</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>תאריך יארצייט</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {donor.yahrzeitDate.map((y, index) => (
        <TableRow key={index}>
          <TableCell>{y.name}</TableCell>
          <TableCell>{new Date(y.date).toLocaleDateString('he-IL')}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
) : (
  <Typography color="text.secondary">אין יארצייטים להצגה</Typography>
)}


        <Typography variant="h6" sx={{ mt: 3, mb: 1, color: '#7b1fa2' }}>רשימת תרומות:</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>תאריך</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>סכום</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>תדירות</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>סוג תשלום</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.length > 0 ? (
              donations.map((d) => (
                <TableRow key={d._id} hover>
                  <TableCell>{new Date(d.date).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell>{d.amount}</TableCell>
                  <TableCell>{d.frequency}</TableCell>
                  <TableCell>{d.paymentMethod}</TableCell>
                  <TableCell><ToDelete deleteId={handleDeleteDonation} id={d._id}/></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">אין תרומות להצגה</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {!showAddDonationForm && (
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => setShowAddDonationForm(true)}>
            הוסף תרומה נוספת
          </Button>
        )}
{showAddDonationForm && (
  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
    <TextField label="תאריך גביה" type="date" InputLabelProps={{ shrink: true }}
      value={newDate} onChange={(e) => setNewDate(e.target.value)}
      size="small" fullWidth />

    <TextField label="סכום" type="number"
      value={newAmount} required onChange={(e) => setNewAmount(e.target.value)}
      size="small" fullWidth />

    <FormControl fullWidth size="small">
      <InputLabel>סוג תשלום</InputLabel>
      <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label="סוג תשלום">
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
      required
      margin="dense"
      value={duration || ''}
      onChange={(e) => setDuration(e.target.value)}
      InputProps={{ inputProps: { min: 1 } }}
    />
  )}
</FormControl>

    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button variant="contained" sx={{ bgcolor: '#7b1fa2', '&:hover': { bgcolor: '#6a1b9a' } }} onClick={handleAddDonation}>הוסף תרומה</Button>
      <Button variant="outlined" color="secondary" onClick={() => setShowAddDonationForm(false)}>ביטול</Button>
    </Box>
  </Box>
)}
      </DialogContent>
    </Dialog>
  );
};

export default DonorCard;
