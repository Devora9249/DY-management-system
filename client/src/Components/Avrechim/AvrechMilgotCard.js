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
    Grid,
    IconButton,
    Typography
} from '@mui/material';
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
            console.log(data, "כרטיסיית מילגות לאברך מסויים");
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
                onClick={handleClickOpen}
            >
                מלגות אחרונות
            </Button>

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

                {/* כותרת */}
                <DialogTitle>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        align="center"
                        color="#b71c1c"
                    >
                        מלגות אחרונות של: {avrechName}
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
                            {/* כותרות */}
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        תאריך
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                                        סכום
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {/* גוף */}
                            <TableBody>
                                {milgot.length > 0 ? (
                                    milgot.map((milga) => (
                                        <TableRow
                                            key={milga._id}
                                            hover
                                            sx={{
                                                "&:hover": { backgroundColor: "#fff5f5" },
                                            }}
                                        >
                                            <TableCell align="center">
                                                {new Date(milga.date).toLocaleDateString("he-IL")}
                                            </TableCell>
                                            <TableCell align="center" sx={{ color: "#b71c1c", fontWeight: "bold" }}>
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