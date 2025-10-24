import {
  Box,Typography, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel
} from '@mui/material';

export default function DonationSection({ donation, setDonation }) {
  const handleChange = (field) => (e) =>
    setDonation({ ...donation, [field]: e.target.value });

  return (
    <>


  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      p: 3,
      borderRadius: 3,
      backgroundColor: "#fafafa",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    }}
  >
        <Typography
      variant="h6"
      margin='20px'
      sx={{
        color: "#b71c1c", // ✅ אדום עדין
        fontWeight: 700,
        textAlign: "center",
        mb: 1,
      }}
    >
      פרטי תרומה
    </Typography>
    <TextField
      label="תאריך גביה"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={donation.newDate || ""}
      onChange={handleChange("newDate")}
      fullWidth
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
        },
      }}
    />

    <TextField
      label="סכום"
      type="number"
      required
      value={donation.newAmount || ""}
      onChange={handleChange("newAmount")}
      fullWidth
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
        },
      }}
    />

    <FormControl
      fullWidth
      required
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
        },
      }}
    >
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
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: "#333", fontWeight: 600 }}
      >
        תדירות
      </Typography>
      <RadioGroup
        value={donation.frequency || ""}
        onChange={handleChange("frequency")}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          "& .MuiRadio-root": { color: "#b71c1c" },
        }}
      >
        <FormControlLabel
          value="חדפ"
          control={<Radio />}
          label="חד פעמי"
        />
        <FormControlLabel
          value="הוראת קבע"
          control={<Radio />}
          label="הוראת קבע"
        />
      </RadioGroup>

      {donation.frequency === "הוראת קבע" && (
        <TextField
          label="למשך כמה חודשים"
          type="number"
          required
          value={donation.duration || ""}
          onChange={handleChange("duration")}
          fullWidth
          size="small"
          sx={{
            mt: 1,
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#b71c1c" },
              "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
            },
          }}
        />
      )}
    </FormControl>
  </Box>
</>

  );
}