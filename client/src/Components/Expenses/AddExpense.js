// import React from 'react'
// import { Button, TextField } from '@mui/material';
// import { useState } from 'react';
// import Axios from 'axios';
// import { useEffect } from 'react';
// import { use } from 'react';

// const AddExpense = ({ onAdd }) => {
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");


//   const sendExpense = async () => {
//     try {
//       const { data } = await Axios.post("http://localhost:5678/api/expenses", { date: Date.now(), description, amount })
//       console.log(data);
//       setDescription("");
//       setAmount("");
//       alert("ההוצאה נוספה בהצלחה");
//       onAdd()
//     } catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <>
//       <div>AddExpense</div>
//       <TextField value={description} onChange={e => setDescription(e.target.value)} label="מהות ההוצאה" type='text' variant="outlined" required />
//       <TextField value={amount} onChange={e => setAmount(e.target.value)} label="סכום" type='number' variant="outlined" required />
//       <Button variant="contained" color="primary" onClick={sendExpense}>הוסף הוצאה</Button>
//     </>

//   )
// }

// export default AddExpense

import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Grid } from '@mui/material';
import Axios from 'axios';

const AddExpense = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const sendExpense = async () => {
    try {
      const { data } = await Axios.post("http://localhost:5678/api/expenses", { 
        date: Date.now(), 
        description, 
        amount 
      });
      setDescription("");
      setAmount("");
      alert("ההוצאה נוספה בהצלחה");
      onAdd();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4, borderRadius: 3 }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6" color="primary" fontWeight="bold" align="center">
            הוספת הוצאה חדשה
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="מהות ההוצאה"
            type="text"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>

        <Grid item>
          <TextField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="סכום"
            type="number"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 1, fontWeight: 'bold' }}
            onClick={sendExpense}
          >
            הוסף הוצאה
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddExpense;
