import * as React from "react";
import { useState } from "react";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import Axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AddDebt({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [first, setFirst] = useState(false);

  // ⭐ מצב אחד לכל השדות (במקום useState לכל אחד)
  const [fields, setFields] = useState({
    borrower: "",
    lender: "",
    amount: "",
    dateBorrowed: new Date().toISOString().split("T")[0],
    dueDate: new Date().toISOString().split("T")[0],
    description: "",
    paid: false,
    type: "",
  });

    // ⭐ מערך השדות (label + name)
  const fieldData = [
    { label: "שם הלווה", name: "borrower", required: true },
    { label: "שם המלווה", name: "lender", required: true },
    { label: "סכום ההלוואה", name: "amount", required: true },
    { label: "תאריך ההלוואה", name: "dateBorrowed", required: true },
    { label: "תאריך פירעון", name: "dueDate", required: true },
    { label: "תיאור ", name: "description", required: true },
  ];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setFirst(false);};

const handleChange = (e) => {

  if (e.target.name === "type") {
    setFirst(true);
    // ⭐ שינוי חדש — מילוי ערכי ברירת מחדל בהתאם לסוג חוב
    const value = e.target.value;
    if (value === "taken") {
      setFields((prev) => ({
        ...prev,
        type: value,
        borrower: "כולל",   // ⭐ לווה = כולל
        lender: "",          // מנקה את הצד השני
      }));
      return;
    } 
    else if (value === "given") {
      setFields((prev) => ({
        ...prev,
        type: value,
        lender: "כולל",     // ⭐ מלווה = כולל
        borrower: "",        // מנקה את הצד השני
      }));
      return;
    }
  }
    setFields((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
}



  const addDebt = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:5678/api/debts", fields);

      setAlert({ message: "החוב נוסף בהצלחה ✅", type: "success" });
      setFields(Object.fromEntries(Object.keys(fields).map((k) => [k, ""]))); // איפוס כל השדות
      onAdd();
      handleClose();
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
    }
  };

  return (
    <React.Fragment>
      {/* כפתור פתיחה */}
      <Button
        variant="contained"
        color="secondary"
        sx={{
          mt: 2,
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          backgroundColor: "#b71c1c",
          "&:hover": { backgroundColor: "#a31515" },
        }}
        onClick={handleClickOpen}
      >
        הוסף חוב חדש
      </Button>

      {/* דיאלוג */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            minWidth: 400,
            bgcolor: "#fafafa",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              bgcolor: "#ffe6e6",
              "&:hover": { bgcolor: "#ffcccc" },
            }}
          >
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        <DialogTitle>
          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            color="#b71c1c"
          >
            הוספת חוב חדש
          </Typography>
        </DialogTitle>

        <form onSubmit={addDebt}>
          {!first? (<DialogContent><RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="type" 
                onChange={handleChange}
              >
                <FormLabel>סוג חוב</FormLabel>
                <FormControlLabel
                  value="taken"
                  control={<Radio />}
                  label="חוב שנלקח"
                  name="type"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="given"
                  control={<Radio />}
                  label="חוב שניתן"
                  name="type"
                  onChange={handleChange}
                />
              </RadioGroup>
              </DialogContent>):(
              <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* ⭐ לולאה על כל השדות */}
              {fieldData.map((field) => (
                <Grid item xs={12} key={field.name}>
                  <TextField
                    name={field.name}
                    label={field.label}
                    value={fields[field.name]}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required={field.required}
                    type={
                      field.name === "dateBorrowed" || field.name === "dueDate"
                        ? "date"
                        : "text"
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>)
}    
          <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                px: 4,
                py: 1.2,
                borderRadius: "10px",
                backgroundColor: "#b71c1c",
                boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                "&:hover": { backgroundColor: "#a31515" },
              }}
            >
              הוסף חוב
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  )
}
