import { Box, Typography, TextField } from '@mui/material';

export default function DonorDetailsForm({ donorData, setDonorData }) {
  const handleChange = (field) => (e) =>
    setDonorData({ ...donorData, [field]: e.target.value });

  return (
    <>
      <Box>
        <Typography> פרטי תורם </Typography>

        <TextField
          label="שם"
          value={donorData.name || ""}
          onChange={handleChange("name")}
          required />

        <TextField
          label="ת.ז"
          value={donorData.donorId || ""}
          onChange={handleChange("donorId")}
           />

        <TextField
          label="כתובת"
          value={donorData.address || ""}
          onChange={handleChange("address")} />

        <TextField
          label="פלאפון"
          value={donorData.phoneNumber || ""}
          onChange={handleChange("phoneNumber")}
           />

        <TextField
          label="מייל"
          value={donorData.emailAddress || ""}
          onChange={handleChange("emailAddress")} />

        <TextField
          label="וואצאפ"
          value={donorData.whatsappNumber || ""}
          onChange={handleChange("whatsappNumber")} />

        <TextField
          type="date"
          label="תאריך לידה"
          InputLabelProps={{ shrink: true }}
          value={donorData.birthDate || ""}
          onChange={handleChange("birthDate")} />
      </Box>
    </>
  );
}
