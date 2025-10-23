import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, TableContainer } from '@mui/material';
import DeleteDialog from '../../GeneralConponents/DeleteDialog.js';

export default function DonationTable({ donations, onDelete }) {
  return (

    <TableContainer
  component={Paper}
  sx={{
    mt: 3,
    borderRadius: 3,
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // ✅ הצללה רכה
    backgroundColor: "#fafafa", // ✅ רקע בהיר רך
    overflow: "hidden",
  }}
>
  {/* כותרת */}
  <Typography
    variant="h6"
    textAlign={'center'}
    sx={{
      px: 2,
      pt: 2,
      color: "#b71c1c", // ✅ אדום אחיד
      fontWeight: 700,
      letterSpacing: 0.5,
    }}
  >
    רשימת תרומות
  </Typography>

  {/* טבלה */}
  <Table sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "#f5f5f5", // ✅ רקע שורה עליונה
          "& th": { fontWeight: 600, color: "#333" }, // ✅ טקסט כהה וברור
        }}
      >
        <TableCell>תאריך</TableCell>
        <TableCell>סכום</TableCell>
        <TableCell>תדירות</TableCell>
        <TableCell>סוג תשלום</TableCell>
        <TableCell align="center">פעולות</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {donations.length ? (
        donations.map((d) => (
          <TableRow
            key={d._id}
            hover
            sx={{
              transition: "0.25s ease",
              "&:hover": {
                backgroundColor: "#fff5f5", // ✅ רמז אדום רך בריחוף
              },
            }}
          >
            <TableCell>{new Date(d.date).toLocaleDateString("he-IL")}</TableCell>
            <TableCell>{d.amount}</TableCell>
            <TableCell>{d.frequency}</TableCell>
            <TableCell>{d.paymentMethod}</TableCell>
            <TableCell align="center">
              <DeleteDialog deleteFunc={onDelete} itemId={d._id} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={5}
            align="center"
            sx={{
              py: 4,
              color: "#9e9e9e",
              fontWeight: 500,
            }}
          >
            אין תרומות להצגה
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
  );
}
