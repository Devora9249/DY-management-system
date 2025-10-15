import React from 'react'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import { useEffect, useState } from 'react'
import Axios from 'axios';

const ExpensesPage = () => {

  const [expenseList, setExpenseList] = useState([]);

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
      <AddExpense onAdd = {catchData}/>
      <ExpenseList expenseList={expenseList} onChange = {catchData} />
    </>
  )
}

export default ExpensesPage