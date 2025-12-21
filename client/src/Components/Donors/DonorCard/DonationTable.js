import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, TableContainer, Button } from '@mui/material';
import DeleteDialog from '../../GeneralConponents/DeleteDialog.js';

export default function DonationTable({ donations, onDelete, onStopRecurring }) {
  return (
    <>
      <Typography variant="h6" sx={{ p: 1 }}>פרטי תרומות</Typography>

      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>תאריך</TableCell>
              <TableCell>סכום</TableCell>
              <TableCell>תדירות</TableCell>
              <TableCell>סוג תשלום</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {donations.length ? (
              donations.map((d) => (
                <TableRow key={d._id}>
                  <TableCell>{new Date(d.date).toLocaleDateString("he-IL")}</TableCell>
                  <TableCell>{d.amount}</TableCell>
                  <TableCell>{d.frequency}</TableCell>
                  <TableCell>{d.paymentMethod}</TableCell>
                  <TableCell align="center">
                    {d.frequency === "monthly" && d.isActive === true && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onStopRecurring(d._id)}
                        sx={{ mr: 1 }}
                      >
                        ביטול הוראת קבע
                      </Button>
                    )}

                    <DeleteDialog deleteFunc={onDelete} itemId={d._id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  אין תרומות להצגה
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
