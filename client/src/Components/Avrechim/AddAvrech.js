import CustomSnackbar from "../Alerts/CustomSnackbar";
import Axios from 'axios';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, IconButton, Typography, Stepper, Step, StepLabel,
  Box
} from '@mui/material';

import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function AddAvrech({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

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
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const addAvrech = async (event) => {
    event.preventDefault();
    try {
      await Axios.post("http://localhost:5678/api/avrechim", fields);

      setAlert({ message: "האברך נוסף בהצלחה ", type: "success" });
      onAdd();
      handleClose();
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
    }
    setFields(Object.fromEntries(Object.keys(fields).map(k => [k, ""])));

  };

  // שלבי ה־Stepper
  const steps = ["פרטי האברך", "פרטי בנק", "פרטי האישה"];

  const sections = [
    ["name", "id", "phoneNumber", "address", "emailAddress"],
    ["bankName", "branchNumber", "accountNumber"],
    ["womenName", "womenPhoneNumber", "womenEmailAddress"]
  ];

  const fieldData = {
    name: "שם האברך",
    id: "תעודת זהות",
    phoneNumber: "מספר טלפון",
    address: "כתובת מגורים",
    emailAddress: "כתובת אימייל",
    bankName: "מספר בנק",
    branchNumber: "מספר סניף",
    accountNumber: "מספר חשבון",
    womenName: "שם האישה",
    womenPhoneNumber: "מספר טלפון אישה",
    womenEmailAddress: "כתובת אימייל אישה"
  };

  return (
    <>
      <Button variant="addButton" onClick={handleClickOpen}>
        הוסף אברך
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 4,
            minWidth: { xs: "90%", md: 600 },
            p: 2
          }
        }}
      >
        {/*  סגירה */}
        <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
          <IconButton onClick={handleClose}
            variant="iconButton">
            <CloseIcon />
          </IconButton>
        </DialogActions>

        <DialogTitle><Typography variant="h1">הוספת אברך</Typography></DialogTitle>

        {/* stepper */}
        <DialogTitle>
          <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>

        <form onSubmit={addAvrech}>
          <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
              {sections[activeStep].map((name) => (
                <TextField
                  name={name}
                  label={fieldData[name]}
                  value={fields[name]}
                  onChange={handleChange}
                />
              ))}
            </Box>
          </DialogContent>

          {/* כפתורי ניווט */}
          <DialogActions
            sx={{
              justifyContent: "space-between",
              px: 2,
              pb: 2
            }}
          >
            <IconButton
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => prev - 1)}
            >
              <ArrowBackIcon />
            </IconButton>

            {activeStep < 2 ? (
              <IconButton onClick={() => setActiveStep(prev => prev + 1)}
              >
                <ArrowForwardIcon />
              </IconButton>
              // variant="activeButton"
            ) : (
              <Button
                type="submit"
                variant="activeButton"
                sx={{ px: 4 }}
              >
                שמור
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog >

      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </>
  );
}
