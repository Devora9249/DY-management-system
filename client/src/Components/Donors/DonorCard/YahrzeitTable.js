import {TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function YahrzeitTable({ yahrzeits }) {
  return (
    <>

 {yahrzeits.length ? (
  <TableContainer
    sx={{
      mt: 3,
      mb: 2,
      borderRadius: 3,
      overflow: "hidden",
      backgroundColor: "#fafafa",
      boxShadow: "0 3px 8px rgba(0,0,0,0.1)", // ✅ הצללה רכה
    }}
  >
    {/* כותרת בתוך הקונטיינר */}
    <Typography
      variant="h6"
      sx={{
        pt: 2,
        pb: 1,
        textAlign: "center",
        color: "#b71c1c", // ✅ אדום אחיד
        fontWeight: 700,
      }}
    >
      יארצייטים
    </Typography>

    <Table sx={{ minWidth: 400 }}>
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: "#f5f5f5",
            "& th": {
              textAlign: "center",
              fontWeight: 600,
              color: "#333",
              width: "50%", // ✅ מתחלק שווה בין 2
            },
          }}
        >
          <TableCell>שם הנפטר</TableCell>
          <TableCell>תאריך יארצייט</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {yahrzeits.map((y, index) => (
          <TableRow
            key={index}
            hover
            sx={{
              transition: "0.25s ease",
              "&:hover": {
                backgroundColor: "#fff5f5", // ✅ ריחוף עדין
              },
            }}
          >
            <TableCell
              sx={{
                textAlign: "center",
                width: "50%",
                py: 1.2,
              }}
            >
              {y.name}
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                width: "50%",
                py: 1.2,
              }}
            >
              {new Date(y.date).toLocaleDateString("he-IL")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
) : (
  <Typography
    color="text.secondary"
    sx={{
      py: 3,
      fontStyle: "italic",
      textAlign: "center",
      color: "#777",
    }}
  >
    אין יארצייטים להצגה
  </Typography>
)}
</>
   
  );
}
