// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useState } from 'react';
// import Axios from 'axios';
// import { Grid } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// export default function FormDialog({ onAdd }) {
//     const [open, setOpen] = useState(false);
//     const [description, setDescription] = useState("");
//     const [amount, setAmount] = useState("");

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.currentTarget);
//         const formJson = Object.fromEntries(formData.entries());
//         const email = formJson.email;
//         console.log(email);
//         handleClose();
//     };

//     const sendExpense = async () => {
//         try {
//             const { data } = await Axios.post("http://localhost:5678/api/expenses", {
//                 date: Date.now(),
//                 description,
//                 amount
//             });
//             console.log(data);
//             setDescription("");
//             setAmount("");
//             alert("ההוצאה נוספה בהצלחה");
//             onAdd();
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     return (
//         <React.Fragment>
//             <Button variant="contained"
//                 color="secondary"
//                 sx={{ mt: 1, fontWeight: 'bold' }}
//                 onClick={handleClickOpen}>
//                 הוסף הוצאה
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogActions>
//                     <Button
//                         onClick={handleClose}
//                         variant="contained"
//                         color="secondary"
//                         sx={{ mt: 1, fontWeight: 'bold' }}>
//                        <CloseIcon />
//                     </Button>
//                 </DialogActions>
//                 <DialogTitle>הוספת הוצאה חדשה</DialogTitle>
//                 <DialogContent>
//                     <form onSubmit={handleSubmit} id="subscription-form">
//                         <Grid item>
//                             <TextField
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 label="מהות ההוצאה"
//                                 type="text"
//                                 variant="outlined"
//                                 fullWidth
//                                 required
//                             />
//                         </Grid>

//                         <Grid item>
//                             <TextField
//                                 value={amount}
//                                 onChange={(e) => setAmount(e.target.value)}
//                                 label="סכום"
//                                 type="number"
//                                 variant="outlined"
//                                 fullWidth
//                                 required
//                             />
//                         </Grid>
//                     </form>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         variant="contained"
//                         color="secondary"
//                         sx={{ mt: 1, fontWeight: 'bold' }}
//                         onClick={sendExpense}>
//                         הוסף הוצאה
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </React.Fragment>
//     );
// }


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

export default function FormDialog({ onAdd, successAlert, setSuccessAlert }) {



  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const sendExpense = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5678/api/expenses", {
        date: Date.now(),
        description,
        amount
      });
      console.log(data);
      setDescription("");
      setAmount("");
      setSuccessAlert(true);
      onAdd();
      handleClose();
    } catch (error) {
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
        הוסף הוצאה
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
            הוספת הוצאה חדשה
          </Typography>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <Grid container spacing={2} sx={{ mt: 1 }}>
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
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#ff7043' },
                      '&:hover fieldset': { borderColor: '#d84315' },
                      '&.Mui-focused fieldset': { borderColor: '#bf360c' },
                    }
                  }}
                />
              </Grid>

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
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#ff7043' },
                      '&:hover fieldset': { borderColor: '#d84315' },
                      '&.Mui-focused fieldset': { borderColor: '#bf360c' },
                    }
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              px: 4,
              py: 1.5,
              boxShadow: 3,
              '&:hover': { backgroundColor: '#d32f2f' }
            }}
            onClick={sendExpense}
          >
            הוסף הוצאה
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
