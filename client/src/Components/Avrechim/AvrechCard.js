import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import {
   Table, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FormDialog({ avrechDetails, setOpen, open, onChange }) {

  const [update, setUpdate] = useState(false);
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
    setUpdate(false);
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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        {/* פעולות עליונות */}
        <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
          {/* כפתור שמירת עדכונים */}
          {update ? (
            <Button
              variant="contained"
              onClick={updateAvrechDetails}
            >
              שמירת עדכונים
            </Button>
          ) : (
            /* כפתור עדכון פרטים */
            <Button
              variant="contained"
              onClick={() => setUpdate(true)}
            >
              עדכון פרטים
            </Button>
          )}

          {/* כפתור סגירה */}
          <IconButton
            onClick={handleClose}
          >
            <CloseIcon color="error" />
          </IconButton>
        </DialogActions>

        {/* כותרת */}
        <DialogTitle>
          <Typography
            variant="h6"
            align="center"
          >
            פרטי אברך
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              mt: 2,
              border: "1px solid #eee", 
            }}
          >
            <Table>
              <TableBody>
                {fields.map((field) => (
                  <TableRow
                    key={field.key}
                    hover
                  >
                    {/* מצב עריכה */}
                    {update ? (
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
                          value={avrechData[field.key]}
                          onChange={(e) =>
                            handleFieldChange(field.key, e.target.value)
                          }
                        />
                      )
                    ) : (
                      /* מצב תצוגה */
                      <TableCell align="center">
                        {field.key === "active" ? (
                          <Checkbox checked={avrechData["active"]} />
                        ) : (
                          avrechDetails[field.key]
                        )}
                      </TableCell>
                    )}

                    {/* תווית שדה */}
                    <TableCell
                      align="center"
                    >
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
