import React, { useState } from 'react';
import { Card, CardHeader, CardContent, TextField, Select, MenuItem, Button } from '@mui/material';


export default function AddDonor({ isOpen, onClose }) {
  const [donor, setDonor] = useState({ name:'', idNumber:'', birthDate:'', yahrzeitDate:'', donationAmount:'', paymentType:'', frequency:'', donationDate:'' });
  const handleChange = e => setDonor(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); console.log(donor); onClose(); };
  if(!isOpen) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <h3>טופס הוספת תורם</h3>
        </CardHeader>
        <CardContent>
          
          <form onSubmit={handleSubmit}>
            <TextField label="שם" name="name" value={donor.name} onChange={handleChange} required />
            <TextField label="תז" name="idNumber" value={donor.idNumber} onChange={handleChange} required />
            <TextField type="date" label="תאריך יום הולדת" name="birthDate" value={donor.birthDate} onChange={handleChange} />
            <TextField type="date" label="תאריך יארצייט" name="yahrzeitDate" value={donor.yahrzeitDate} onChange={handleChange} />
            <TextField type="number" label="סכום תרומה" name="donationAmount" value={donor.donationAmount} onChange={handleChange} required />
            <Select label="סוג תשלום" name="paymentType" value={donor.paymentType} onChange={handleChange} options={[{label:'מזומן',value:'cash'},{label:'כרטיס',value:'card'},{label:'בנק',value:'bank'}]} />
            <Select label="תדירות" name="frequency" value={donor.frequency} onChange={handleChange} options={[{label:'חד פעמי',value:'once'},{label:'הוראת קבע',value:'monthly'}]} />
            <TextField type="date" label="תאריך תרומה" name="donationDate" value={donor.donationDate} onChange={handleChange} />
            <div>
              <Button variant="secondary" onClick={onClose}>ביטול</Button>
              <Button type="submit" variant="primary" onClick={onClose} >הוסף תורם</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
