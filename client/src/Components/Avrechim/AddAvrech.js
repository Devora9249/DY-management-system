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

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

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
      setFields(Object.fromEntries(Object.keys(fields).map(k => [k, ""])));
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
    <>
      {/* כפתור פתיחה */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        הוסף אברך
      </Button>

      {/* דיאלוג */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          // sx: {
          //   minWidth: 400,   // ❗ אפשר להשאיר — גודל מקומי
          // },
        }}
      >
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            mb: -1,
          }}
        >
          <IconButton onClick={handleClose}   >
            <CloseIcon />
          </IconButton>
        </DialogActions>

        <DialogTitle>
          <Typography
            variant="h6"
            align="center"
          >
            הוספת אברך חדש
          </Typography>
        </DialogTitle>

        <form onSubmit={addAvrech}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {fieldData.map((field) => (
                <Grid item xs={12} key={field.name}>
                  <TextField
                    name={field.name}
                    label={field.label}
                    value={fields[field.name]}
                    onChange={handleChange}
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
              type="submit"
              sx={{
                px: 4,
                py: 1.2,
              }}
            >
              הוסף אברך
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </>
  );
}
