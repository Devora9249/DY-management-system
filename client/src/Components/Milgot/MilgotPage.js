import { useState, useEffect } from "react";
import Axios from "axios";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Paper,Table, TableHead, TableBody, TableRow, TableCell, Typography, TextField, Button } from '@mui/material';

const MilgotPage = () => {
  const [AvrechimList, setAvrechimList] = useState([]);
  const [milgaAmounts, setMilgaAmounts] = useState({});

  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])

  const [alert, setAlert] = useState(null);

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/avrechim");
      setAvrechimList(data);
    } catch (err) {
         setAlert({
                message: err.response?.data?.message || err.message,
                type: "error",
            });
    }
  };

  useEffect(() => {
    catchData();
  }, []);

  const sendAllMilgot = async () => {
    try {
      const promises = AvrechimList.map((avrech) =>
        Axios.post(`http://localhost:5678/api/avrechim/${avrech._id}`, {
          milgaAmount: milgaAmounts[avrech._id] || 0,
          date: newDate
        })
      );
      await Promise.all(promises);
      setAlert({ message: "המלגות עודכנו בהצלחה ✅", type: "update" });

      setMilgaAmounts({});
    } catch (err) {
      console.error(err);
      setAlert({ message: "אירעה שגיאה בעדכון", type: "error" });
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mx: "auto",
        mt: 4,
        maxWidth: 300, // ⭐️ הצרה משמעותית של כל הקונטיינר
        borderRadius: 2,
        bgcolor: "#fafafa",
      }}
    >
      {/* כותרת */}
      <Typography
        variant="h6"
        align="center"
        fontWeight="bold"
        sx={{ mb: 2, color: "#b71c1c" }}
      >
        חלוקת מלגות
      </Typography>

      {/* טבלה צרה */}
      <Table
        sx={{
          "& .MuiTableCell-root": {
            py: 0.8, // ⭐️ הקטנת גובה השורות
            px: 1.5, // ⭐️ צמצום הרוחב הפנימי של כל תא
          },
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            
            <TableCell align="center"
              sx={{ fontWeight: "bold", fontSize: "0.9rem", textAlign: "center" }}
            >
              סכום
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              שם
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {AvrechimList.map((avrech) => (
            <TableRow key={avrech._id} hover>
              <TableCell align="center" sx={{ textAlign: "center" }}>
                <TextField
                  value={milgaAmounts[avrech._id] || ""}
                  onChange={(e) =>
                    setMilgaAmounts({
                      ...milgaAmounts,
                      [avrech._id]: e.target.value,
                    })
                  }
                  type="number"
                  size="small"
                  placeholder="₪"
                  InputProps={{
                    inputProps: { min: 0, style: { textAlign: "center" } },
                  }}
                  sx={{
                    width: 90, // ⭐️ שדה צר ומדויק להזנה מהירה
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#b71c1c" },
                      "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                    },
                  }}
                />
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.9rem" }}>{avrech.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* תאריך */}
      <TextField
        label="תאריך"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
        fullWidth
        size="small"
        sx={{
          mt: 2,
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#e0e0e0" },
            "&:hover fieldset": { borderColor: "#b71c1c" },
            "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
          },
        }}
      />

      {/* כפתור */}
      <Button
        variant="contained"
        fullWidth
        onClick={sendAllMilgot}
        sx={{
          mt: 2.5,
          fontWeight: "bold",
          py: 1,
          borderRadius: 2,
          backgroundColor: "#b71c1c",
          "&:hover": { backgroundColor: "#a31515" },
        }}
      >
        עדכן לכולם
      </Button>
              <CustomSnackbar alert={alert} setAlert={setAlert} />

       </Paper>

  );
}
export default MilgotPage;
