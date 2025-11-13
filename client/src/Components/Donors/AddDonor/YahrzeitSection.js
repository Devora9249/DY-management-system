import { Typography, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';


export default function YahrzeitSection({ yahrzeits, setYahrzeits }) {
  
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');

  const handleAdd = () => {
    if (!tempDate || !tempName) return alert("נא למלא שם ותאריך");
    setYahrzeits([...yahrzeits, { name: tempName, date: tempDate }]);
    setTempDate('');
    setTempName('');
  };

  return (
    <>
      <Box>
        {/* כותרת בתוך הבוקס */}
        <Typography> יארצייטים</Typography>

        {/* רשימת יארצייטים קיימים */}
        {yahrzeits.length ? (
          yahrzeits.map((y, i) => (
            <Box
              key={i} >

              <TextField
                value={y.name}
                disabled />

              <TextField
                type="date"
                value={y.date}
                InputLabelProps={{ shrink: true }}
                disabled />
            </Box>
          ))
        )
          : null}

        {/* הוספת יארצייט חדש */}
        <Box>

          <TextField
            placeholder="שם הנפטר"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)} />

          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)} />

          <Button
            variant="contained"
            onClick={handleAdd} >
            הוסף
          </Button>
        </Box>
      </Box>
    </>
  );
} 