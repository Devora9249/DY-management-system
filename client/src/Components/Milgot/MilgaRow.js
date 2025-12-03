import { TableRow, TableCell, TextField, Button } from "@mui/material";

const MilgaRow = ({ avrech, milgaAmounts, setMilgaAmounts, milgaDetails, setMilgaDetails, newDate, sendMilgaById, setAlert }) => {

  const checkAndSetAmount = (e) => {
console.log("setAlert:", setAlert);


    const value = Number(e.target.value);
    if (value >= 0 && value <= 10000) {
      setMilgaAmounts({ ...milgaAmounts, [avrech._id]: e.target.value })
    }
    else {
      setAlert({ message: "הסכום חייב להיות בין 0 ל-10,000", type: "error" });
      setMilgaAmounts({ ...milgaAmounts, [avrech._id]: "" })
    }
  }
  return (
    <TableRow hover>
      {/* עדכון */}
      <TableCell align="center">
        <Button
          variant="miniButton"
          onClick={() => sendMilgaById(avrech._id, newDate)}      >
          עדכן
        </Button>
      </TableCell>

      {/* פירוט */}
      <TableCell align="center">
        <TextField
        ro
          value={milgaDetails[avrech._id] || ""}
          onChange={(e) =>
            setMilgaDetails({ ...milgaDetails, [avrech._id]: e.target.value })
          }
          placeholder="פירוט המלגה" />
      </TableCell>

      {/* סכום */}
      <TableCell align="center">
        <TextField
          value={milgaAmounts[avrech._id] || ""}
          onChange={(e) => checkAndSetAmount(e)}
          type="number"
          placeholder="₪" />
      </TableCell>

      {/* שם */}
      <TableCell>
        {avrech.name}
      </TableCell>
    </TableRow>
  );
};

export default MilgaRow;
