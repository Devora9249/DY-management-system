import React from 'react'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, TextField, IconButton, Typography, TableCell, DialogContentText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const AddMilgaToAll = ({ addMilga, generalMilga, setGeneralMilga, setAlert }) => {
    console.log(generalMilga, 'generalMilga');
    

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
            <Button variant="addButton" onClick={handleClickOpen} >
                הוסף מילגה כללית
            </Button>

            {/* דיאלוג */}
            <Dialog
                open={open}
                onClose={handleClose}  >
                <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
                    <IconButton
                        onClick={handleClose}
                       variant="iconButton" >
                        <CloseIcon color="error" />
                    </IconButton>
                </DialogActions>

                <DialogTitle>
                    <Typography variant='h1'>
                        הוספת מילגה כללית
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>

                        {/*לולאה על כל השדות*/}
                        {/* פירוט */}
                        <TextField
                            value={generalMilga.details || ""}
                            onChange={(e) =>
                                setGeneralMilga({ ...generalMilga, details: e.target.value })
                            }
                            placeholder="פירוט המלגה" 
                            required/>


                        {/* סכום */}
                        <TextField
                            value={generalMilga.amount || ""}
                            onChange={(e) => checkAndSetAmount(e)}
                            type="number"
                            placeholder="₪ סכום"
                            required />

                        {/* תאריך */}
                        <TextField
                            label="תאריך"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={generalMilga.date}
                            onChange={(e) => setGeneralMilga({ ...generalMilga, date: e.target.value })}
                            required    
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
                    <Button
                        variant="activeButton"
                        onClick={closeAndSend}    >
                        עדכן
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddMilgaToAll