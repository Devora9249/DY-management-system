import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Grid } from '@mui/material';
import Axios from 'axios';


const AddExpense = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
    const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])


  const sendExpense = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5678/api/expenses", { 
        date: Date.now(), 
        description, 
        amount 
      });
      setDescription("");
      setAmount("");
      setNewDate(new Date().toISOString().split('T')[0]);
      alert("ההוצאה נוספה בהצלחה");
      onAdd();
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 420,
        mx: "auto",
        mt: 6,
        borderRadius: 3,
        bgcolor: "#fafafa", // ⭐ רקע אפור-לבן בהיר ונקי
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // ⭐ הצללה רכה ומודרנית
      }}
    >
      <Grid container direction="column" spacing={2}>
        {/* כותרת */}
        <Grid item>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontWeight: 600,
              color: "#b71c1c", // ⭐ אדום עדין
              letterSpacing: "0.5px",
            }}
          >
            הוספת הוצאה חדשה
          </Typography>
        </Grid>

        {/* שדה מהות ההוצאה */}
        <Grid item>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="מהות ההוצאה"
            type="text"
            variant="outlined"
            fullWidth
            required
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
        </Grid>

        {/* שדה סכום ותאריך */}
        <Grid item>
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
              mb: 1,
            }}
          />
          <TextField
            label="תאריך"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
        </Grid>

        {/* כפתור שליחה */}
        <Grid item>
          <Button
            variant="contained"
            fullWidth
            onClick={sendExpense}
            sx={{
              mt: 1,
              py: 1,
              fontWeight: 600,
              fontSize: "1rem",
              bgcolor: "#b71c1c", // ⭐ אדום עדין
              "&:hover": { bgcolor: "#a31515" },
            }}
          >
            הוסף הוצאה
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}




//   return (
//     <Paper 
//       elevation={3} 
//       sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4, borderRadius: 3 }}
//     >
//       <Grid container direction="column" spacing={2}>
//         <Grid item>
//           <Typography variant="h6" color="primary" fontWeight="bold" align="center">
//             הוספת הוצאה חדשה
//           </Typography>
//         </Grid>

//         <Grid item>
//           <TextField
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             label="מהות ההוצאה"
//             type="text"
//             variant="outlined"
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item>
//           <TextField
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             label="סכום"
//             type="number"
//             variant="outlined"
//             fullWidth
//             required
//           />
//                     <TextField
//             label="תאריך"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={newDate}
//             onChange={e => setNewDate(e.target.value)}
//             fullWidth
//             size="small"
//             margin="dense"
//           />
//         </Grid>

//         <Grid item>
//           <Button
//             variant="contained"
//             color="secondary"
//             fullWidth
//             sx={{ mt: 1, fontWeight: 'bold' }}
//             onClick={sendExpense}
//           >
//             הוסף הוצאה
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

export default AddExpense;
