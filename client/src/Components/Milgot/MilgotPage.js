import { useState, useEffect } from "react";
import Axios from "axios";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Paper, Typography, TextField, Button } from "@mui/material";
import MilgaTable from "./MilgaTable";
import AddMilgaToAll from "./AddMilgaToAll";

const MilgotPage = () => {
  const [AvrechimList, setAvrechimList] = useState([]);
  const [milgaAmounts, setMilgaAmounts] = useState({});
  const [milgaDetails, setMilgaDetails] = useState({});
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [alert, setAlert] = useState(null);
  const [resetVersion, setResetVersion] = useState(0);
  const [generalMilga, setGeneralMilga] = useState({ amount: "", details: "", date: new Date().toISOString().split("T")[0] });


  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/avrechim");
      setAvrechimList(data.filter((avrech) => avrech.active));
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

  const sendMilgaById = async (avrechId, date) => {
    if (!milgaAmounts[avrechId]) {
      setAlert({ message: "יש למלא סכום לפני עדכון!", type: "error" });
      return;
    }

    try {
      await Axios.post(`http://localhost:5678/api/avrechim/${avrechId}`, {
        milgaAmount: milgaAmounts[avrechId],
        details: milgaDetails[avrechId],
        date,
      });
      setMilgaAmounts(prev => ({ ...prev, [avrechId]: "" }));
      setMilgaDetails(prev => ({ ...prev, [avrechId]: "" }));
      setResetVersion(v => v + 1); // ⭐ רענון נקודתי
      setAlert({ message: "המלגה עודכנה בהצלחה ✅", type: "update" });
    } catch (err) {
      setAlert({ message: "אירעה שגיאה בעדכון", type: "error" });
    }
  };

  const sendAllMilgot = async () => {

    const missing = AvrechimList.find(avrech => !milgaAmounts[avrech._id]);
    if (missing) {
      setAlert({ message: `יש למלא סכום עבור ${missing.name}!`, type: "error" });
      return; // עצירה מוחלטת
    }
    try {
      const promises = AvrechimList.map((avrech) => {
        return Axios.post(`http://localhost:5678/api/avrechim/${avrech._id}`, {
          milgaAmount: milgaAmounts[avrech._id],
          date: newDate,
          details: milgaDetails[avrech._id],
        });
      });
      await Promise.all(promises);
      setMilgaAmounts({});
      setMilgaDetails({});
      setResetVersion(prev => prev + 1); // ⭐ מפעיל רענון שורות
      setAlert({ message: "המלגות עודכנו בהצלחה ✅", type: "update" });
    } catch (err) {
      setAlert({ message: "אירעה שגיאה בעדכון", type: "error" });
    }
  };

  const AddMilgaToAllAvrechim = async () => {
    try {
      const promises = AvrechimList.map((avrech) => {
        return Axios.post(`http://localhost:5678/api/avrechim/${avrech._id}`, {
          milgaAmount: generalMilga.amount,
          date: generalMilga.date,
          details: generalMilga.details,
        });
      });
      await Promise.all(promises);
      setAlert({ message: "המלגות נוספו בהצלחה ✅", type: "update" });
      setGeneralMilga({ amount: "", details: "", date: "" });
    } catch (err) {
      setAlert({ message: "אירעה שגיאה בהוספה", type: "error" });
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mx: "auto",
        mt: 4,
        maxWidth: 300,
        borderRadius: 2,
        bgcolor: "#fafafa",
      }}
    >
      <AddMilgaToAll addMilga={AddMilgaToAllAvrechim} generalMilga={generalMilga} setGeneralMilga={setGeneralMilga} setAlert={setAlert} />
      <Typography
        variant="h6"
        align="center"
        fontWeight="bold"
        sx={{ mb: 2, color: "#b71c1c" }}
      >
        חלוקת מלגות
      </Typography>

      <MilgaTable
        AvrechimList={AvrechimList}
        milgaAmounts={milgaAmounts}
        setMilgaAmounts={setMilgaAmounts}
        milgaDetails={milgaDetails}
        setMilgaDetails={setMilgaDetails}
        newDate={newDate}
        sendMilgaById={sendMilgaById}
        resetVersion={resetVersion}
        setAlert={setAlert}
      />

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
        }}
      />

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
};

export default MilgotPage;

