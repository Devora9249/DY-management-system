import { Typography, Paper, Divider, Box } from '@mui/material';

export default function DonorDetails({ donor }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        mt: 3,
        borderRadius: 3,
        bgcolor: "#fafafa",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        width: "92%",
        direction: "rtl",
        textAlign: "right",
      }}
    >
      {/* כותרת */}
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          color: "#b71c1c",
          fontWeight: 700,
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        פרטי תורם
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* תוכן */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "120px 1fr", // ✅ יוצר עמודת תוויות + עמודת תוכן
          rowGap: 1.5,
          columnGap: 2,
          fontSize: "1rem",
          color: "#333",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>שם:</Typography>
        <Typography>{donor?.name || "-"}</Typography>

        <Typography sx={{ fontWeight: 600 }}>ת.ז:</Typography>
        <Typography>{donor?.donorId || "-"}</Typography>

        <Typography sx={{ fontWeight: 600 }}>כתובת:</Typography>
        <Typography>{donor?.address || "-"}</Typography>

        <Typography sx={{ fontWeight: 600 }}>פלאפון:</Typography>
        <Typography>{donor?.phoneNumber || "-"}</Typography>

        <Typography sx={{ fontWeight: 600 }}>מייל:</Typography>
        <Typography>{donor?.emailAddress || "-"}</Typography>

        <Typography sx={{ fontWeight: 600 }}>וואצאפ:</Typography>
        <Typography>{donor?.whatsappNumber || "-"}</Typography>

        <Typography sx={{ fontWeight: 600 }}>תאריך לידה:</Typography>
        <Typography>
          {donor?.birthDate
            ? new Date(donor.birthDate).toLocaleDateString("he-IL")
            : "-"}
        </Typography>
      </Box>
    </Paper>
  




    
  );
}
