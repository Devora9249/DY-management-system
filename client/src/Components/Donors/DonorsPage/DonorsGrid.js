import { Box, Grid } from "@mui/material";
import DonorCardItem from "./DonorCardItem";

export default function DonorsGrid({ donors, onSelect, onDelete }) {

  console.log(donors, 'donors in donorsGrid');
  
  return (
    <Grid container spacing={2} sx={{ mt: 2 }} >
      {donors.map((donor) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={donor._id}>
          <DonorCardItem
            donor={donor}
            onSelect={() => onSelect(donor)}
            onDelete={() => onDelete(donor._id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
