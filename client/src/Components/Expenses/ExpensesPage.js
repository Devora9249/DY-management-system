import React from 'react'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from '@mui/material';
import AddExpense1 from './AddExpense1';
import SuccessAlert from './SuccessAlert';
import DeleteAlert from './DeleteAlert';

const ExpensesPage = () => {

  const [expenseList, setExpenseList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/expenses")
      setExpenseList(data);
      console.log(data);
    }
    catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    catchData();
  }, [])


  return (
    <>
      <div>ExpensesPage</div>
      <AddExpense1 onAdd={catchData} setSuccessAlert={setSuccessAlert} successAlert={successAlert} />
      <ExpenseList expenseList={expenseList} onChange={catchData} setDeleteAlert={setDeleteAlert} />
      <SuccessAlert successAlert={successAlert} setSuccessAlert={setSuccessAlert} />
      <DeleteAlert deleteAlert={deleteAlert} setDeleteAlert={setDeleteAlert} />
    </>
  )
}

export default ExpensesPage