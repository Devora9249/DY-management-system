import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, TextField, IconButton, Typography, TableCell, DialogContentText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const AddMilgaToAll = ({ addMilga, generalMilga, setGeneralMilga, setAlert }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const closeAndSend = () => {
        handleClose();
        addMilga();
    }

    const checkAndSetAmount = (e) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= 10000) {
            setGeneralMilga({ ...generalMilga, amount: e.target.value })
        }
        else {
            setAlert({ message: "הסכום חייב להיות בין 0 ל-10,000 ₪", type: "error" });
            setGeneralMilga({ ...generalMilga, amount: "" })
        }
    }

    return (
        <React.Fragment>
            {/* כפתור פתיחה */}
            <Button variant="contained" onClick={handleClickOpen} >
                הוסף מילגה כללית
            </Button>

            {/* דיאלוג */}
            <Dialog
                open={open}
                onClose={handleClose}   >
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
                    <Typography>
                        הוספת מילגה כללית
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {/*לולאה על כל השדות*/}
                        {/* פירוט */}
                        <TableCell align="center">
                            <TextField
                                value={generalMilga.details || ""}
                                onChange={(e) =>
                                    setGeneralMilga({ ...generalMilga, details: e.target.value })
                                }
                                placeholder="פירוט המלגה"    />
                        </TableCell>

                        {/* סכום */}
                        <TableCell align="center">
                            <TextField
                                value={generalMilga.amount || ""}
                                onChange={(e) => checkAndSetAmount(e)}
                                type="number"
                                placeholder="₪"    />
                        </TableCell>
                        {/* תאריך */}
                        <TextField
                            label="תאריך"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={generalMilga.date}
                            onChange={(e) => setGeneralMilga({ ...generalMilga, date: e.target.value })}
                />
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
                    <Button
                        variant="contained"
                        onClick={closeAndSend}    >
                        עדכן
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddMilgaToAll