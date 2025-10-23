import { Box } from "@mui/material";
import DonorCardItem from "./DonorCardItem";

export default function DonorsGrid({ donors, onSelect, onDelete }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        width: '100%',
        mt: 3,
      }}
    >
      {donors.map((donor) => (
        <DonorCardItem
          key={donor._id}
          donor={donor}
          onSelect={() => onSelect(donor)}
          onDelete={() => onDelete(donor._id)}
        />
      ))}
    </Box>
  );
}
