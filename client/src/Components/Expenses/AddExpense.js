import React from 'react'
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';

const AddExpense = () => {
    const [description,setDescription]  = useState("");
    const [amount,setAmount]  = useState("");

    const sendExpense = async()=>{
      try {
        const {data} = await Axios.post("http://localhost:5678/api/expenses",{description,amount})
        console.log(data);
        alert("ההוצאה נוספה בהצלחה");
      } catch (error) {
        alert(error.message);
      }}


  return (
    <>
    <div>AddExpense</div>
    <TextField value={description} onChange={e =>setDescription(e.target.value)}  label="מהות ההוצאה" type='text' variant="outlined" required />
    <TextField value={amount} onChange={e =>setAmount(e.target.value)}  label="סכום" type='number' variant="outlined" required />
        <Button variant="contained" color="primary" onClick={sendExpense}>הוסף הוצאה</Button>
    </>
    
  )
}

export default AddExpense