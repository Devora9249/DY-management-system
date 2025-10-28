
import * as React from 'react';
import { useState } from 'react';
import CustomSnackbar from "../Alerts/CustomSnackbar";
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

export default function AddAvrech({ onAdd }) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [bankName, setBankName] = useState("");
    const [branchNumber, setBranchNumber] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [womenName, setWomenName] = useState("");
    const [womenPhoneNumber, setWomenPhoneNumber] = useState("");
    const [womenEmailAddress, setWomenEmailAddress] = useState("");


    const [alert, setAlert] = useState(null);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addAvrech = async (event) => {
        event.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5678/api/avrechim", {
                id,
                name,
                phoneNumber,
                address,
                emailAddress,
                bankName,
                branchNumber,
                accountNumber,
                womenName,
                womenPhoneNumber,
                womenEmailAddress,
            });

            setAlert({ message: "האברך נוסף בהצלחה ✅", type: "success" });
            setName("");
            setId("");
            setPhoneNumber("");
            setAddress("");
            setEmailAddress("");
            setBankName("");
            setBranchNumber("");
            setAccountNumber("");
            setWomenName("");
            setWomenPhoneNumber("");
            setWomenEmailAddress("");
            onAdd(); // מרענן את הרשימה
            handleClose();
        } catch (error) {
            setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error(error);
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
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    backgroundColor: "#b71c1c",
                    "&:hover": { backgroundColor: "#a31515" },
                }}
                onClick={handleClickOpen}
            >
                הוסף אברך
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
                        הוספת אברך חדש
                    </Typography>
                </DialogTitle>

                {/* טופס */}
                <form onSubmit={addAvrech}>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="שם האברך"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    label="תעודת זהות"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    label="מספר טלפון"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    label="כתובת מגורים"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    label="כתובת אימייל"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    label="מספר בנק"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={branchNumber}
                                    onChange={(e) => setBranchNumber(e.target.value)}
                                    label="מספר סניף"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    label="מספר חשבון"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={womenName}
                                    onChange={(e) => setWomenName(e.target.value)}
                                    label="שם האישה"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={womenPhoneNumber}
                                    onChange={(e) => setWomenPhoneNumber(e.target.value)}
                                    label="מספר טלפון אישה"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={womenEmailAddress}
                                    onChange={(e) => setWomenEmailAddress(e.target.value)}
                                    label="כתובת אימייל אישה"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
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
                            הוסף אברך
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* ✅ האלרט עצמו */}
            <CustomSnackbar
                alert={alert}
                setAlert={setAlert}
            />
        </React.Fragment>
    );
}
