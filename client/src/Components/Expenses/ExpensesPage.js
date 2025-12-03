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
      <Paper variant='mainPaper' >

        {/* כותרת הדף */}
        <Typography variant='h5' >
          דף הוצאות
        </Typography>


        {/* כפתור הוספת הוצאה */}
        <AddExpense onAdd={catchData} />

        {/* טבלת הוצאות */}
        <ExpenseList
          expenseList={expenseList}
          onChange={catchData}
        />

        {/* התראות הצלחה ומחיקה */}
        <CustomSnackbar alert={alert} setAlert={setAlert} />
      </Paper>
    </>
  )
}

export default ExpensesPage