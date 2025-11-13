import React from 'react'
import AddExpense from './AddExpense'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';
import ExpenseList from './ExpenseList';

const ExpensesPage = () => {

  const [expenseList, setExpenseList] = useState([]);

  const [alert, setAlert] = useState(null);

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/expenses")
      setExpenseList(data);
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
      <Box >
        <Paper  >
          {/* כותרת הדף */}
          <Typography  >
            דף הוצאות
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* כפתור הוספת הוצאה */}
          <Grid container justifyContent="center" sx={{ mb: 3 }}>
            <Grid item>
              <AddExpense
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
    </>
  )
}

export default ExpensesPage