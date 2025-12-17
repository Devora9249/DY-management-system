import {
  Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel
} from '@mui/material';

export default function DonationSection({ donation, setDonation }) {
  const handleChange = (field) => (e) =>
    setDonation({ ...donation, [field]: e.target.value });

  return (
    <>
      <Box>
        <Typography> פרטי תרומה </Typography>

        <TextField
          label="תאריך גביה"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={donation.newDate || ""}
          onChange={handleChange("newDate")}
        />

        <TextField
          label="סכום"
          type="number"
          required
          value={donation.newAmount || ""}
          onChange={handleChange("newAmount")}
        />

        <FormControl required>
          <InputLabel>סוג תשלום</InputLabel>
          <Select
            value={donation.paymentMethod || ""}
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

        <FormControl component="fieldset" fullWidth sx={{ mt: 1 }}>
          <Typography>תדירות</Typography>

          <RadioGroup
            value={donation.frequency || ""}
            onChange={handleChange("frequency")}
          >
            <FormControlLabel
              value="once"
              control={<Radio />}
              label="חד פעמי"
            />
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label="הוראת קבע"
            />
          </RadioGroup>

          {donation.frequency === "monthly" && (
            <TextField
              label="למשך כמה חודשים"
              type="number"
              value={donation.duration || ""}
              onChange={handleChange("duration")}
            />
          )}
        </FormControl>
      </Box>
    </>
  );
}
