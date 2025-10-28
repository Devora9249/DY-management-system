import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FormDialog({ avrechDetails, setOpen, open, onChange }) {



  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(null);
  const [avrechData, setAvrechData] = useState(avrechDetails);
  //const []

  const fields = [
    { key: "name", label: "שם" },
    { key: "id", label: "ת.ז" },
    { key: "phoneNumber", label: "טלפון" },
    { key: "address", label: "כתובת" },
    { key: "emailAddress", label: "אימייל" },
    { key: "bankName", label: "בנק" },
    { key: "branchNumber", label: "סניף" },
    { key: "accountNumber", label: "חשבון" },
    { key: "womenName", label: "שם אישה" },
    { key: "womenPhoneNumber", label: "טלפון אישה" },
    { key: "active", label: "פעיל" },
  ];


  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setUpdate(false)
    setOpen(false)
  };

  const handleFieldChange = (field, value) => {
    setAvrechData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  }
  const updateAvrechDetails = async () => {
    try {
      const { data } = await Axios.put(`http://localhost:5678/api/avrechim/${avrechDetails._id}`, avrechData);
      handleClose();
      setAlert({ type: "success", message: "פרטי האברך עודכנו בהצלחה" });
      onChange()
    } catch (error) {
      setAlert({ type: "error", message: "שגיאה בעדכון פרטי האברך" });
    }
  };

  useEffect(() => {
    setAvrechData(avrechDetails)
  }, [avrechDetails])

  return (
    <React.Fragment>
      {/* דיאלוג */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            minWidth: 450,
            bgcolor: "#fafafa",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          },
        }}
      >
        {/* כפתור סגירה */}
        <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
          {update ?
          //כפתור שמירת עדכונים
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                backgroundColor: "#b71c1c",
                "&:hover": { backgroundColor: "#a31515" }
              }}
              onClick={updateAvrechDetails}
            >
              שמירת עדכונים
            </Button>
            //כפתור עדכון פרטים
            : <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                backgroundColor: "#b71c1c",
                "&:hover": { backgroundColor: "#a31515" }
              }}
              onClick={() => setUpdate(true)}
            >
              עדכון פרטים
            </Button>}

          {/* כפתור סגירה */}
          <IconButton
            onClick={handleClose}
            sx={{
              bgcolor: "#ffe6e6",
              "&:hover": { bgcolor: "#ffcccc" },
            }}>
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        {/* כותרת */}
        <DialogTitle>
          <Typography
            variant="h6"
            fontWeight="bold"
            align="center"
            color="#b71c1c">
            פרטי אברך
          </Typography>
        </DialogTitle>

        {/* תוכן הדיאלוג */}
        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              mt: 2,
              border: "1px solid #eee",
            }}
          >
            <Table>
              {/* גוף */}
              <TableBody>
                {fields.map((field) => (
                  <TableRow
                    key={field.key}
                    hover
                    sx={{ "&:hover": { backgroundColor: "#fff5f5" } }}
                  >
                    {/* נתונים במצב עריכה */}
                    {update ? (//
                      field.key === "active" ? (
                        <Checkbox
                          checked={avrechData["active"]}
                          onChange={() =>
                            setAvrechData((prevData) => ({
                              ...prevData,
                              active: !prevData.active,
                            }))
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      ) : (
                        <TextField
                          value={avrechData[field.key]}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        />
                      )
                    ) : (
                      // נתונים במצב תצוגה
                      <TableCell align="center">
                        {field.key === "active" ? (
                          <Checkbox
                            checked={avrechData["active"]}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        ) : (
                          avrechDetails[field.key]
                        )}
                      </TableCell>
                    )}

                    {/* עמודת תוויות */}
                    <TableCell align="center" sx={{ color: "#b71c1c", fontWeight: "bold" }}>
                      {field.label}
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
      </Dialog>
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  );
}