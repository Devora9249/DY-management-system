import * as React from "react";
import { useState } from "react";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import Axios from "axios";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,

} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AddLink({ onAdd }) {

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const [websitelink, setWebsitelink] = useState("");
    const [websiteName, setWebsiteName] = useState("");
    const [description, setDescription] = useState("");



    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const addLink = async (event) => {
        event.preventDefault();
        try {
            const {data} = await Axios.post("http://localhost:5678/api/links", {websiteName, websitelink, description});

            setAlert({ message: "הקישור נוסף בהצלחה ✅", type: "success" });
            console.log(data);
            setWebsiteName("");
            setWebsitelink("");
            setDescription("");
            onAdd();
            handleClose();
        } catch (error) {
            setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error("Error adding link:", error);
        }
    };

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
                הוסף קישור חדש
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
                        הוספת קישור חדש
                    </Typography>
                </DialogTitle>

                <form onSubmit={addLink}>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    name="websiteName"
                                    label="שם אתר"
                                    value={websiteName}
                                    onChange={e => setWebsiteName(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required="true"
                                    type="text"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="websitelink"
                                    label="קישור לאתר"
                                    value={websitelink}
                                    onChange={e => setWebsitelink(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required="true"
                                    type="text"
                                />
                            </Grid>

                            
                            <Grid item xs={12}>
                                <TextField
                                    name="description"
                                    label="תיאור אתר"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    required="true"
                                    type="text"
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
                            הוסף קישור
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <CustomSnackbar alert={alert} setAlert={setAlert} />
        </React.Fragment>
    )
}
