import * as React from 'react';
import { useState } from 'react';
import Axios from 'axios';
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
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function FormDialog({ avrechId, avrechName }) {



    const [open, setOpen] = useState(false);
    const [milgot, setMilgot] = useState([]);

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
            alert(error.message);
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    mt: 2,
                    fontWeight: 'bold',
                    fontSize: '16px',
                    boxShadow: 3,
                    '&:hover': { backgroundColor: '#d32f2f' }
                }}
                onClick={handleClickOpen}
            >
                מלגות אחרונות
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 2,
                        minWidth: 400,
                        bgcolor: '#fff8f0'
                    }
                }}
            >
                <DialogActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton
                        onClick={handleClose}
                        color="error"
                        sx={{
                            bgcolor: '#ffe6e6',
                            '&:hover': { bgcolor: '#ffcccc' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogActions>

                <DialogTitle>
                    <Typography variant="h6" fontWeight="bold" color="secondary">
                        מלגות אחרונות של: {avrechName}                      </Typography>
                </DialogTitle>

                <DialogContent>

                    <Table>
                        {/* כותרות הטבלה */}
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>תאריך</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>סכום</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {milgot.map((milga) => (
                                <TableRow key={milga._id} hover>
                                    <TableCell>{new Date(milga.date).toLocaleDateString('he-IL')} </TableCell>
                                    <TableCell>{milga.milgaAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
