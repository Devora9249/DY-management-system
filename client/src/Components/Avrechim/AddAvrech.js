import * as React from 'react';
import { useState } from 'react';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import Axios from 'axios';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AddAvrech({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  // ⭐ מצב אחד לכל השדות (במקום useState לכל אחד)
  const [fields, setFields] = useState({
    name: "",
    id: "",
    phoneNumber: "",
    address: "",
    emailAddress: "",
    bankName: "",
    branchNumber: "",
    accountNumber: "",
    womenName: "",
    womenPhoneNumber: "",
    womenEmailAddress: ""
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // ⭐ מערך השדות (label + name)
  const fieldData = [
    { label: "שם האברך", name: "name", required: true },
    { label: "תעודת זהות", name: "id", required: true },
    { label: "מספר טלפון", name: "phoneNumber", required: true },
    { label: "כתובת מגורים", name: "address" },
    { label: "כתובת אימייל", name: "emailAddress" },
    { label: "מספר בנק", name: "bankName" },
    { label: "מספר סניף", name: "branchNumber" },
    { label: "מספר חשבון", name: "accountNumber" },
    { label: "שם האישה", name: "womenName" },
    { label: "מספר טלפון אישה", name: "womenPhoneNumber" },
    { label: "כתובת אימייל אישה", name: "womenEmailAddress" }
  ];

  const addAvrech = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:5678/api/avrechim", fields);

      setAlert({ message: "האברך נוסף בהצלחה ✅", type: "success" });
      setFields(Object.fromEntries(Object.keys(fields).map(k => [k, ""]))); // איפוס כל השדות
      onAdd();
      handleClose();
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
      console.error(error);
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
        הוסף אברך
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
            הוספת אברך חדש
          </Typography>
        </DialogTitle>

        <form onSubmit={addAvrech}>
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
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

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
              הוסף אברך
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  );
}

