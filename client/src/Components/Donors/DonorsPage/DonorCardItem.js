import { Card, CardContent, Typography } from "@mui/material";
import DeleteDialog from "../../GeneralConponents/DeleteDialog.js";

export default function DonorCardItem({ donor, onSelect, onDelete }) {
  return (
    <Card
      sx={{
        border: '1.5px solid #b71c1c', // ✅ אדום עדין
        flex: '1 1 calc(20% - 16px)',
        minHeight: 130,
        borderRadius: 3,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // ✅ הצללה עדינה
        transition: '0.3s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: 'right',
          backgroundColor: '#fff',
          borderRadius: 3,
        }}
        onClick={onSelect}
      >
        <Typography sx={{ fontWeight: 'bold', color: '#b71c1c', mb: 1 }}>
          שם: {donor.name}
        </Typography>

        {donor.donations && donor.donations.length > 0 ? (
          donor.donations.map((d) => (
            <Typography key={d._id} sx={{ color: '#555', fontSize: '0.9rem' }}>
              {d.amount}₪ | {d.frequency}
            </Typography>
          ))
        ) : (
          <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>אין תרומות</Typography>
        )}
      </CardContent>
<DeleteDialog deleteFunc={onDelete} itemId={donor._id} />
    </Card>
  );
}
