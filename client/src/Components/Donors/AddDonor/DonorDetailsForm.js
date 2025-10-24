import { Box, Typography,TextField } from '@mui/material';

export default function DonorDetailsForm({ donorData, setDonorData }) {
  const handleChange = (field) => (e) =>
    setDonorData({ ...donorData, [field]: e.target.value });

  return (
    <>
  <Box
    sx={{
      p: 3,
      borderRadius: 3,
      backgroundColor: "#fafafa", // ✅ רקע בהיר רך
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // ✅ הצללה עדינה
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: "#b71c1c", // ✅ אדום עדין
        fontWeight: 700,
        textAlign: "center",
        mb: 1,
      }}
    >
      פרטי תורם
    </Typography>

    <TextField
      label="שם"
      value={donorData.name || ""}
      onChange={handleChange("name")}
      required
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
      label="ת.ז"
      value={donorData.donorId || ""}
      onChange={handleChange("donorId")}
      required
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
      label="כתובת"
      value={donorData.address || ""}
      onChange={handleChange("address")}
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
      label="פלאפון"
      value={donorData.phoneNumber || ""}
      onChange={handleChange("phoneNumber")}
      required
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
      label="מייל"
      value={donorData.emailAddress || ""}
      onChange={handleChange("emailAddress")}
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
      label="וואצאפ"
      value={donorData.whatsappNumber || ""}
      onChange={handleChange("whatsappNumber")}
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
      type="date"
      label="תאריך לידה"
      InputLabelProps={{ shrink: true }}
      value={donorData.birthDate || ""}
      onChange={handleChange("birthDate")}
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
  </Box>
</>
  );
}
