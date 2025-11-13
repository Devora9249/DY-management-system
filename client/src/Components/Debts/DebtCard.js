import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Table, TableBody, TableRow, TableCell, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FormDialog({ debtDetails, setOpen, open, onChange }) {



  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(null);
  const [debtData, setDebtData] = useState(debtDetails);
  //const []

  const fields = [
    { label: "לווה", name: "borrower" },
    { label: "מלווה", name: "lender" },
    { label: "סכום", name: "amount" },
    { label: "תאריך הלוואה", name: "dateBorrowed" },
    { label: "תאריך פרעון", name: "dueDate" },
    { label: "תיאור", name: "description" },
    { label: "שולם", name: "paid" },
  ];


  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setUpdate(false)
    setOpen(false)
  };

  const handleFieldChange = (field, value) => {
    setDebtData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  }
  const updateDebtDetails = async () => {
    try {
      const { data } = await Axios.put(`http://localhost:5678/api/debts/${debtDetails._id}`, debtData);
      handleClose();
      setAlert({ type: "success", message: "פרטי החוב עודכנו בהצלחה" });
      onChange()
    } catch (error) {
      setAlert({ type: "error", message: "שגיאה בעדכון פרטי החוב" });
      console.log(error.message, "שגיאה בעדכון חוב");

    }
  };

  useEffect(() => {
    setDebtData(debtDetails)
  }, [debtDetails])

  return (
    <React.Fragment>
      {/* דיאלוג */}
      <Dialog open={open} onClose={handleClose}>
        {/* כפתור סגירה */}
        <DialogActions>
          {update ?
            //כפתור שמירת עדכונים
            <Button onClick={updateDebtDetails} >
              שמירת עדכונים
            </Button>
            //כפתור עדכון פרטים
            : <Button onClick={() => setUpdate(true)}>
              עדכון פרטים
            </Button>}

          {/* כפתור סגירה */}
          <IconButton
            onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>

        {/* כותרת */}
        <DialogTitle>
          <Typography>
            פרטי חוב
          </Typography>
        </DialogTitle>

        {/* תוכן הדיאלוג */}
        <DialogContent>
          <Paper>
            <Table>
              {/* גוף */}
              <TableBody>
                {fields.map((field) => (
                  <TableRow key={field.key}>
                    {/* נתונים במצב עריכה */}
                    {update ? (//
                      field.name === "paid" ? (
                        <Checkbox
                          checked={debtData["paid"]}
                          onChange={() =>
                            setDebtData((prevData) => ({
                              ...prevData,
                              paid: !prevData.paid,
                            }))
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      ) : (
                        <TextField
                          value={debtData[field.name]}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        />
                      )
                    ) : (
                      // נתונים במצב תצוגה
                      <TableCell align="center">
                        {field.name === "paid" ? (
                          <Checkbox
                            checked={debtData["paid"]}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        ) : (
                          debtData[field.name]
                        )}
                      </TableCell>
                    )}

                    {/* עמודת תוויות */}
                    <TableCell>
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