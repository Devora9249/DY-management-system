import { Box } from "@mui/material";
import DonorCardItem from "./DonorCardItem";

export default function DonorsGrid({ donors, onSelect, onDelete }) {
  return (
    <Box  >
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
