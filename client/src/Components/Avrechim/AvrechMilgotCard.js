import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

export default function FormDialog({ avrechId, avrechName }) {

    const [open, setOpen] = useState(false);
    const [milgot, setMilgot] = useState([]);
    const [alert, setAlert] = useState(null);

    const handleClickOpen = () => {
        setOpen(true)
        getMilgot()
    };
    const handleClose = () => setOpen(false);


    const getMilgot = async () => {
        try {
            const { data } = await Axios.get(`http://localhost:5678/api/avrechim/${avrechId}`)
            setMilgot(data)
        }
        catch (error) {
            setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error("שגיאה בטעינת המלגות:", error);
        }
    };

    return (
        <React.Fragment>
            {/* כפתור פתיחת הדיאלוג */}
            <Button
                variant="miniButton"
                onClick={handleClickOpen}
            >
                מלגות אחרונות
            </Button>

            {/* דיאלוג */}
            <Dialog open={open} onClose={handleClose}>
                {/* כפתור סגירה */}
                <DialogActions sx={{ justifyContent: "flex-end", mb: -1 }}>
                    <IconButton onClick={handleClose} variant="iconButton">
                        <CloseIcon color="error" />
                    </IconButton>
                </DialogActions>

                {/* כותרת */}
                <DialogTitle>
                    <Typography variant="h6" align="center">
                        מלגות אחרונות של: {avrechName}
                    </Typography>
                </DialogTitle>

                {/* תוכן הדיאלוג */}
                <DialogContent>
                    <Paper
                        elevation={0}
                        sx={{ overflow: "hidden", mt: 2, }}>
                        <Table>
                            {/* כותרות */}
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center" >
                                        תאריך
                                    </TableCell>
                                    <TableCell align="center" >
                                        סכום
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {/* גוף */}
                            <TableBody>
                                {milgot.length > 0 ? (
                                    milgot.map((milga) => (
                                        <TableRow key={milga._id} hover>
                                            <TableCell align="center">
                                                {new Date(milga.date).toLocaleDateString("he-IL")}
                                            </TableCell>

                                            <TableCell align="center" >
                                                {milga.milgaAmount} ₪
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align="center" colSpan={2} sx={{ py: 3 }}>
                                            <Typography color="text.secondary">
                                                אין מלגות להצגה
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </Paper>
                </DialogContent>
            </Dialog>

            <CustomSnackbar alert={alert} setAlert={setAlert} />
        </React.Fragment>
    );
}
