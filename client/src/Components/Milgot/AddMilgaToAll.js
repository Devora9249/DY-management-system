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
                הוסף מילגה כללית
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
                        הוספת מילגה כללית
                    </Typography>
                </DialogTitle>

                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {/* ⭐ לולאה על כל השדות */}
                            {/* פירוט */}
                            <TableCell align="center">
                                <TextField
                                    value={generalMilga.details || ""}
                                    onChange={(e) =>
                                        setGeneralMilga({ ...generalMilga, details: e.target.value })
                                    }
                                    size="small"
                                    placeholder="פירוט המלגה"
                                    sx={{
                                        width: 90,
                                        backgroundColor: "white",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#e0e0e0" },
                                            "&:hover fieldset": { borderColor: "#b71c1c" },
                                            "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                                        },
                                    }}
                                />
                            </TableCell>

                            {/* סכום */}
                            <TableCell align="center">
                                <TextField
                                    value={generalMilga.amount || ""}
                                    onChange={(e) => checkAndSetAmount(e)}
                                    type="number"
                                    size="small"
                                    placeholder="₪"
                                    sx={{
                                        width: 90,
                                        backgroundColor: "white",
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#e0e0e0" },
                                            "&:hover fieldset": { borderColor: "#b71c1c" },
                                            "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                                        },
                                    }}
                                />
                            </TableCell>
                            {/* תאריך */}
                            <TextField
                                label="תאריך"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={generalMilga.date}
                                onChange={(e) => setGeneralMilga({ ...generalMilga, date: e.target.value })}
                                fullWidth
                                size="small"
                                sx={{
                                    mt: 2,
                                    backgroundColor: "white",
                                    borderRadius: 1,
                                }}
                            />
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={closeAndSend}
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
                            עדכן
                        </Button>
                    </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddMilgaToAll