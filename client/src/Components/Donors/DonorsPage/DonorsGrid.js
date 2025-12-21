// import { Box, Grid, Paper } from "@mui/material";
// import DonorCardItem from "./DonorCardItem";

// export default function DonorsGrid({ donors, onSelect, onDelete }) {

//   console.log(donors, 'donors in donorsGrid');

//   return (
//     <Paper variant="tablePaper" sx={{width: "80%"}}>
//     <Grid container spacing={2} sx={{ mt: 2 }} >
//       {donors.map((donor) => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={donor._id}>
//           <DonorCardItem
//             donor={donor}
//             onSelect={() => onSelect(donor)}
//             onDelete={() => onDelete(donor._id)}
//           />
//         </Grid>
//       ))}
//     </Grid>
//     </Paper>
//   );
// }


import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,IconButton,Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DonorsTable({ donors, onSelect, onDelete }) {

  return (
    <Paper variant="tablePaper" >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>פעולות</TableCell>
            <TableCell>תרומה</TableCell>
            <TableCell>שם</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {donors.map((donor) => (
            <TableRow
              key={donor._id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => onSelect(donor)}
            >
              <TableCell>
                <IconButton onClick={(e) => { e.stopPropagation(); onDelete(donor._id); }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                {donor.donations && donor.donations.length > 0 ? (
                  donor.donations.map((d) => (
                    <Typography key={d._id}>
                      ₪{d.amount} | {d.frequency == 'once' ? 'חד פעמית' : 'הוראת קבע'} 
                    </Typography>
                  ))
                ) : (
                  <Typography>אין תרומות</Typography>
                )}</TableCell>
              <TableCell>{donor.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
