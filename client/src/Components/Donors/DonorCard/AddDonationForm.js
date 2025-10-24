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
// ⭐ עיצוב חדש בלבד! לא נגעתי בלוגיקה או במבנה.

<Paper
  sx={{
    mt: 3,
    p: 3,
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    borderRadius: 3,
    backgroundColor: "#fafafa", // ✅ רקע בהיר ורך
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // ✅ הצללה עדינה
    transition: "0.3s",
  }}
>
    <Typography
    variant="h6"
    textAlign={'center'}
    sx={{
      px: 2,
      pt: 2,
      color: "#b71c1c", // ✅ אדום אחיד
      fontWeight: 700,
      letterSpacing: 0.5,
    }}>הוספת תרומה
    </Typography>
    
  <TextField
    label="תאריך גביה"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={form.date}
    onChange={handleChange("date")}
    size="small"
    fullWidth
    sx={{
      backgroundColor: "white",
      borderRadius: 1,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#d0d0d0" },
        "&:hover fieldset": { borderColor: "#b71c1c" }, // ✅ אדום במעבר
        "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
      },
    }}
  />

  <TextField
    label="סכום"
    type="number"
    value={form.amount}
    onChange={handleChange("amount")}
    size="small"
    fullWidth
    sx={{
      backgroundColor: "white",
      borderRadius: 1,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#d0d0d0" },
        "&:hover fieldset": { borderColor: "#b71c1c" },
        "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
      },
    }}
  />

  <FormControl
    fullWidth
    size="small"
    sx={{
      backgroundColor: "white",
      borderRadius: 1,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#d0d0d0" },
        "&:hover fieldset": { borderColor: "#b71c1c" },
        "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
      },
    }}
  >
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

  <Typography
    variant="subtitle2"
    sx={{
      color: "#424242",
      fontWeight: 600,
      mt: 1,
    }}
  >
    תדירות
  </Typography>

  <RadioGroup
    value={form.frequency}
    onChange={handleChange("frequency")}
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: 2,
      "& .MuiRadio-root": { color: "#b71c1c" }, // ✅ צבע רדיו
    }}
  >
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
      onChange={handleChange("duration")}
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#d0d0d0" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
        },
      }}
    />
  )}

  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1 }}>
    <Button
      variant="outlined"
      color="secondary"
      onClick={onCancel}
      sx={{
        borderRadius: 2,
        px: 3,
        borderColor: "#b71c1c",
        color: "#b71c1c",
        "&:hover": { backgroundColor: "#fbeaea" },
        transition: "0.3s",
      }}
    >
      ביטול
    </Button>

    <Button
      variant="contained"
      onClick={handleSubmit}
      sx={{
        borderRadius: 2,
        px: 3,
        backgroundColor: "#b71c1c",
        "&:hover": { backgroundColor: "#9a1313" },
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        transition: "0.3s",
      }}
    >
      הוסף תרומה
    </Button>
  </Box>
</Paper>

  
  );
}
