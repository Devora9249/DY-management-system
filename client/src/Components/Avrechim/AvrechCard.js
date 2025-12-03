
import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import {
  Table, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, Grid, Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FormDialog({ avrechDetails, setOpen, open, onChange }) {

  const [isEditing, setIsEditing] = useState(false); // ⭐ מצב עריכה/תצוגה
  const [alert, setAlert] = useState(null);
  const [avrechData, setAvrechData] = useState(avrechDetails);

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

  const handleClose = () => {
    setIsEditing(false); // ⭐ שינוי מצב לעריכה
    setOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setAvrechData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const updateAvrechDetails = async () => {
    try {
      await Axios.put(
        `http://localhost:5678/api/avrechim/${avrechDetails._id}`,
        avrechData
      );
      handleClose();
      setAlert({ type: "success", message: "פרטי האברך עודכנו בהצלחה" });
      onChange();
    } catch (error) {
      setAlert({ type: "error", message: "שגיאה בעדכון פרטי האברך" });
    }
  };

  useEffect(() => {
    setAvrechData(avrechDetails);
  }, [avrechDetails]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        {/* כפתורים תחתונים  */}
        <DialogActions sx={{ justifyContent: "space-between" }}> 
          {/* כפתור שמירת עדכונים */}
          <Button
            variant="activeButton"
            onClick={isEditing ? updateAvrechDetails : () => setIsEditing(true)} 
          >
            {isEditing ? "שמירת עדכונים" : "עדכון פרטים"}
          </Button>

          {/* כפתור סגירה */}
          <IconButton onClick={handleClose} variant="iconButton">
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        {/* כותרת */}
        <DialogTitle>
          <Typography variant="h6" align="center">
            פרטי אברך
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Paper>
            <Table>
              <TableBody>
                {fields.map((field) => (
                  <TableRow sx={{ height: "80px", margin: "0", padding: "0" }} key={field.key} hover>
                    {/* הצגת שדות */}
                    <TableCell sx={{width:"60%", margin: "0"}}>
                      {isEditing ? (
                        field.key === "active" ? (
                          <Checkbox
                            checked={avrechData["active"]}

                            onChange={() =>
                              setAvrechData((prev) => ({
                                ...prev,
                                active: !prev.active,
                              }))
                            }
                          />
                        ) : (
                          <TextField
                            variant='standard'
                            sx={{ margin: "0", padding: "0" }}
                            value={avrechData[field.key]}
                            onChange={(e) =>
                              handleFieldChange(field.key, e.target.value)
                            }
                          />
                        )
                      ) : (
                        field.key === "active" ? (
                          <Checkbox checked={avrechData["active"]} />
                        ) : (
                          avrechDetails[field.key]
                        )
                      )}
                    </TableCell>
                    {/* שם השדה */}
                    <TableCell sx={{width:"40%", margin: "0", color: "#7f0000"}}>
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
    </>
  );
}
