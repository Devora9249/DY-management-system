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

const DonorCard = ({ isOpen, donor, onClose }) => {
  const [donations, setDonations] = useState([]);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAmount, setNewAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [frequency, setFrequency] = useState('');
  const [showAddDonationForm, setShowAddDonationForm] = useState(false);

  // טוען את התרומות מה-API
  const getDonations = async () => {
    if (!donor?._id) return;
    try {
      const { data } = await Axios.get(`http://localhost:5678/api/donors/${donor._id}/donations`);
      setDonations(Array.isArray(data) ? data : []); // מבטיחים מערך
    } catch (error) {
      console.error(error);
      alert('שגיאה בטעינת התרומות: ' + error.message);
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
        paymentMethod
      });
      setNewDate(new Date().toISOString().split('T')[0]);
      setNewAmount('');
       setFrequency('');
      setPaymentMethod('');
      setShowAddDonationForm(false);
      getDonations(); // טוען שוב את הנתונים אחרי ההוספה
    } catch (error) {
      console.error(error);
      alert('שגיאה בהוספת התרומה: ' + error.message);
    }
  };

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
        <Typography>תאריך יארצייט: {new Date(donor?.yahrzeitDate).toLocaleDateString('he-IL')}</Typography>

        <Typography variant="h6" sx={{ mt: 3, mb: 1, color: '#7b1fa2' }}>רשימת תרומות:</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>תאריך</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>סכום</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>סוג תשלום</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>תדירות</TableCell>
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
    <TextField label="תאריך" type="date" InputLabelProps={{ shrink: true }}
      value={newDate} onChange={(e) => setNewDate(e.target.value)}
      size="small" fullWidth />

    <TextField label="סכום" type="number"
      value={newAmount} onChange={(e) => setNewAmount(e.target.value)}
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

    <FormControl fullWidth size="small">
      <InputLabel>תדירות</InputLabel>
      <Select value={frequency} onChange={(e) => setFrequency(e.target.value)} label="תדירות">
        <MenuItem value="חד פעמי">חד פעמי</MenuItem>
        <MenuItem value="הוראת קבע">הוראת קבע</MenuItem>
      </Select>
    </FormControl>

    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button variant="contained" sx={{ bgcolor: '#7b1fa2', '&:hover': { bgcolor: '#6a1b9a' } }} onClick={handleAddDonation}>הוסף תרומה</Button>
      <Button variant="outlined" color="secondary" onClick={() => setShowAddDonationForm(false)}>ביטול</Button>
    </Box>
  </Box>
)}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">סגור</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonorCard;
