import { Typography, Paper, Divider, Box } from '@mui/material';

export default function DonorDetails({ donor }) {
  return (

    <Paper >
      {/* כותרת */}
      <Typography> פרטי תורם</Typography>

      <Divider sx={{ mb: 3 }} />

      {/* תוכן */}
      <Box>

        <Typography >שם:</Typography>
        <Typography>{donor?.name || "-"}</Typography>

        <Typography>ת.ז:</Typography>
        <Typography>{donor?.donorId || "-"}</Typography>

        <Typography>כתובת:</Typography>
        <Typography>{donor?.address || "-"}</Typography>

        <Typography >פלאפון:</Typography>
        <Typography>{donor?.phoneNumber || "-"}</Typography>

        <Typography >מייל:</Typography>
        <Typography>{donor?.emailAddress || "-"}</Typography>

        <Typography >וואצאפ:</Typography>
        <Typography>{donor?.whatsappNumber || "-"}</Typography>

        <Typography >תאריך לידה:</Typography>
        <Typography>
          {donor?.birthDate
            ? new Date(donor.birthDate).toLocaleDateString("he-IL")
            : "-"}
        </Typography>
      </Box>
    </Paper>
  );
}
