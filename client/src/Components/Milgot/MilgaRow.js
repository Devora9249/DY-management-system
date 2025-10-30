import { TableRow, TableCell, TextField, Button } from "@mui/material";

const MilgaRow = ({ avrech, milgaAmounts, setMilgaAmounts, milgaDetails, setMilgaDetails, newDate, sendMilgaById, setAlert }) => {
    const checkAndSetAmount = (e) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= 10000) {
            setMilgaAmounts({ ...milgaAmounts, [avrech._id]: e.target.value })
        }
        else {
            setAlert({ message: "הסכום חייב להיות בין 0 ל-10,000 ₪", type: "error" });
            setMilgaAmounts({ ...milgaAmounts, [avrech._id]: "" })
        }
    }
  return (
    <TableRow hover>
      {/* עדכון */}
      <TableCell align="center">
        <Button
          variant="contained"
          fullWidth
          onClick={() => sendMilgaById(avrech._id, newDate)}
          sx={{
            mt: 2.5,
            fontWeight: "bold",
            py: 1,
            borderRadius: 2,
            backgroundColor: "#b71c1c",
            "&:hover": { backgroundColor: "#a31515" },
          }}
        >
          עדכן
        </Button>
      </TableCell>

      {/* פירוט */}
      <TableCell align="center">
        <TextField
          value={milgaDetails[avrech._id] || ""}
          onChange={(e) =>
            setMilgaDetails({ ...milgaDetails, [avrech._id]: e.target.value })
          }
          size="small"
          placeholder="פירוט המלגה"
          sx={{
            width: 90,
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#b71c1c" },
              "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
            },
          }}
        />
      </TableCell>

      {/* סכום */}
      <TableCell align="center">
        <TextField
          value={milgaAmounts[avrech._id] || ""}
          onChange={(e) => checkAndSetAmount(e)}
          type="number"
          size="small"
          placeholder="₪"
          sx={{
            width: 90,
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#e0e0e0" },
              "&:hover fieldset": { borderColor: "#b71c1c" },
              "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
            },
          }}
        />
      </TableCell>

      {/* שם */}
      <TableCell align="center" sx={{ fontSize: "0.9rem" }}>
        {avrech.name}
      </TableCell>
    </TableRow>
  );
};

export default MilgaRow;
