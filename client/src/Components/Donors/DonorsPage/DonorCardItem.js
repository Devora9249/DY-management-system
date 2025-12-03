import { Card, CardContent, Typography } from "@mui/material";
import DeleteDialog from "../../GeneralConponents/DeleteDialog.js";

export default function DonorCardItem({ donor, onSelect, onDelete }) {
  return (
    <Card variant="donorCard">
      <CardContent onClick={onSelect} >
        <Typography > שם: {donor.name} </Typography>
        {donor.donations && donor.donations.length > 0 ? (
          donor.donations.map((d) => (
            <Typography key={d._id}>
              {d.amount}₪ | {d.frequency}
            </Typography>
          ))
        ) : (
          <Typography>אין תרומות</Typography>
        )}
      </CardContent>
      <DeleteDialog deleteFunc={onDelete} itemId={donor._id} />
    </Card>
  );
}
