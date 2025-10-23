import React from 'react'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from '@mui/material';
import AddExpense1 from './AddExpense1';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';

const ExpensesPage = () => {

  const [expenseList, setExpenseList] = useState([]);

  const [alert, setAlert] = useState(null);

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/expenses")
      setExpenseList(data);
      console.log(data, "רשימת הוצאות");
    }
    catch (error) {
         setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error(error);
    }
  }

  useEffect(() => {
    catchData();
  }, [])


  return (
    <>
      <Box
        sx={{
          bgcolor: "#f9f9f9", // ⭐ רקע בהיר ונקי
          minHeight: "100vh",
          py: 5,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 1000,
            mx: "auto",
            p: 4,
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          {/* כותרת הדף */}
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "#b71c1c",
            }}
          >
            דף הוצאות
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* כפתור הוספת הוצאה */}
          <Grid container justifyContent="center" sx={{ mb: 3 }}>
            <Grid item>
              <AddExpense1
                onAdd={catchData}


              />
            </Grid>
          </Grid>

          {/* טבלת הוצאות */}
          <ExpenseList
            expenseList={expenseList}
            onChange={catchData}
                      
          />

          {/* התראות הצלחה ומחיקה */}
                   <CustomSnackbar alert={alert} setAlert={setAlert} />
        </Paper>
      </Box>











      {/* <AddExpense1 onAdd={catchData} setSuccessAlert={setSuccessAlert} successAlert={successAlert} />
      <ExpenseList expenseList={expenseList} onChange={catchData} setDeleteAlert={setDeleteAlert} />
      <SuccessAlert successAlert={successAlert} setSuccessAlert={setSuccessAlert} />
      <DeleteAlert deleteAlert={deleteAlert} setDeleteAlert={setDeleteAlert} /> */}
    </>
  )
}

export default ExpensesPage