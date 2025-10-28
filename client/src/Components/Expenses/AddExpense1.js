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

export default function FormDialog({ onAdd }) {



  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])


  const [alert, setAlert] = useState(null);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    handleClose();
  };

  const sendExpense = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5678/api/expenses", {
        date: newDate,
        description,
        amount
      });
      setDescription("");
      setAmount("");
      setNewDate(new Date().toISOString().split('T')[0]);
      setAlert({ message: "הוצאה חדשה נוספה בהצלחה ✅", type: "success" });

      onAdd();
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
          borderRadius: "12px", // ⭐ עיגול רך יותר
          px: 3,
          py: 1,
          backgroundColor: "#b71c1c", // ⭐ אדום עמוק ועדין
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          "&:hover": { backgroundColor: "#a31515" },
        }}
        onClick={handleClickOpen}
      >
        הוסף הוצאה
      </Button>

      {/* דיאלוג */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            bgcolor: "#fafafa", // ⭐ אפור-לבן בהיר
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
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
            color="#b71c1c" // ⭐ אדום תואם עיצוב כללי
          >
            הוספת הוצאה חדשה
          </Typography>
        </DialogTitle>

        {/* תוכן */}
        <DialogContent>
          <form onSubmit={handleSubmit} id="expense-form">
            <Grid container spacing={2} sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
              {/* שדה מהות ההוצאה */}
              <Grid item xs={12}>
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="מהות ההוצאה"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    backgroundColor: "white", // ⭐ שדה בהיר
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#b71c1c" },
                      "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                    },
                  }}
                />
              </Grid>

              {/* שדה סכום */}
              <Grid item xs={12}>
                <TextField
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  label="סכום"
                  type="number"
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

              {/* תאריך */}
              <Grid item xs={12}>
                <TextField
                  label="תאריך"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  fullWidth
                  variant="outlined"
                  required
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
    "& input": {
      width: "195px", // ⭐ מבטיח שה־input הפנימי יתפוס את כל הרוחב
      // boxSizing: "border-box", // ⭐ מונע גלישה פנימית
    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#b71c1c" },
                      "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
                    },
                  }
                  }
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        {/* כפתור שליחה */}
        <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
          <Button
            variant="contained"
            onClick={sendExpense}
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
            הוסף הוצאה
          </Button>
        </DialogActions>
      </Dialog>
               <CustomSnackbar alert={alert} setAlert={setAlert} />
    </React.Fragment>
  );
}
//     <React.Fragment>
//       <Button
//         variant="contained"
//         color="secondary"
//         sx={{
//           mt: 2,
//           fontWeight: 'bold',
//           fontSize: '16px',
//           boxShadow: 3,
//           '&:hover': { backgroundColor: '#d32f2f' }
//         }}
//         onClick={handleClickOpen}
//       >
//         הוסף הוצאה
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             p: 2,
//             minWidth: 400,
//             bgcolor: '#fff8f0'
//           }
//         }}
//       >
//         <DialogActions sx={{ justifyContent: 'flex-end' }}>
//           <IconButton
//             onClick={handleClose}
//             color="error"
//             sx={{
//               bgcolor: '#ffe6e6',
//               '&:hover': { bgcolor: '#ffcccc' }
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogActions>

//         <DialogTitle>
//           <Typography variant="h6" fontWeight="bold" color="secondary">
//             הוספת הוצאה חדשה
//           </Typography>
//         </DialogTitle>

//         <DialogContent>
//           <form onSubmit={handleSubmit} id="subscription-form">
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}>
//                 <TextField
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   label="מהות ההוצאה"
//                   type="text"
//                   variant="outlined"
//                   fullWidth
//                   required
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': { borderColor: '#ff7043' },
//                       '&:hover fieldset': { borderColor: '#d84315' },
//                       '&.Mui-focused fieldset': { borderColor: '#bf360c' },
//                     }
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   label="סכום"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                   required
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       '& fieldset': { borderColor: '#ff7043' },
//                       '&:hover fieldset': { borderColor: '#d84315' },
//                       '&.Mui-focused fieldset': { borderColor: '#bf360c' },
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="תאריך"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={newDate}
//                   onChange={e => setNewDate(e.target.value)}
//                   fullWidth
//                   size="small"
//                   margin="dense"
//                 />
//               </Grid>
//             </Grid>
//         </form>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
//         <Button
//           variant="contained"
//           color="secondary"
//           sx={{
//             fontWeight: 'bold',
//             fontSize: '16px',
//             px: 4,
//             py: 1.5,
//             boxShadow: 3,
//             '&:hover': { backgroundColor: '#d32f2f' }
//           }}
//           onClick={sendExpense}
//         >
//           הוסף הוצאה
//         </Button>
//       </DialogActions>
//     </Dialog>
//     </React.Fragment >
//   );
// }
