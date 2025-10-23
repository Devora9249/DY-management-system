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

export default function FormDialog({ onAdd, setSuccessAlert }) {



    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addAvrech = async (event) => {
        event.preventDefault();
        try {
            const { data } = await Axios.post("http://localhost:5678/api/avrechim", {
                id,
                name
            });
            console.log(data);
            setName("");
            setId("");
            setSuccessAlert(true);
            onAdd();
            handleClose();
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
        handleClose();
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
                <form onSubmit={addAvrech} id="subscription-form">
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
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: 1,
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#e0e0e0" },
                                            "&:hover fieldset": { borderColor: "#b71c1c" },
                                            "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                                        },
                                    }}
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
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: 1,
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "#e0e0e0" },
                                            "&:hover fieldset": { borderColor: "#b71c1c" },
                                            "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    {/* כפתור שליחה */}
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
        </React.Fragment>
    );
}























//         <React.Fragment>
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 sx={{
//                     mt: 2,
//                     fontWeight: 'bold',
//                     fontSize: '16px',
//                     boxShadow: 3,
//                     '&:hover': { backgroundColor: '#d32f2f' }
//                 }}
//                 onClick={handleClickOpen}
//             >
//                 הוסף אברך
//             </Button>

//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 PaperProps={{
//                     sx: {
//                         borderRadius: 3,
//                         p: 2,
//                         minWidth: 400,
//                         bgcolor: '#fff8f0'
//                     }
//                 }}
//             >
//                 <DialogActions sx={{ justifyContent: 'flex-end' }}>
//                     <IconButton
//                         onClick={handleClose}
//                         color="error"
//                         sx={{
//                             bgcolor: '#ffe6e6',
//                             '&:hover': { bgcolor: '#ffcccc' }
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogActions>

//                 <DialogTitle>
//                     <Typography variant="h6" fontWeight="bold" color="secondary">
//                         הוספת אברך חדש
//                     </Typography>
//                 </DialogTitle>

//                 <form onSubmit={addAvrech} id="subscription-form">
//                     <DialogContent>
//                         <Grid container spacing={2} sx={{ mt: 1 }}>
//                             <Grid item xs={12}>
//                                 <TextField
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     label=" שם האברך"
//                                     type="text"
//                                     variant="outlined"
//                                     fullWidth
//                                     required
//                                     sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                             '& fieldset': { borderColor: '#ff7043' },
//                                             '&:hover fieldset': { borderColor: '#d84315' },
//                                             '&.Mui-focused fieldset': { borderColor: '#bf360c' },
//                                         }
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid item xs={12}>
//                                 <TextField
//                                     value={id}
//                                     onChange={(e) => setId(e.target.value)}
//                                     label="ת.ז"
//                                     type="text"
//                                     variant="outlined"
//                                     fullWidth
//                                     required
//                                     sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                             '& fieldset': { borderColor: '#ff7043' },
//                                             '&:hover fieldset': { borderColor: '#d84315' },
//                                             '&.Mui-focused fieldset': { borderColor: '#bf360c' },
//                                         }
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>
//                     </DialogContent>

//                     <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             type='submit'
//                             sx={{
//                                 fontWeight: 'bold',
//                                 fontSize: '16px',
//                                 px: 4,
//                                 py: 1.5,
//                                 boxShadow: 3,
//                                 '&:hover': { backgroundColor: '#d32f2f' }
//                             }}
//                         >
//                             הוסף אברך
//                         </Button>
//                     </DialogActions>
//                 </form>
//             </Dialog>
//         </React.Fragment>
//     );
// }
