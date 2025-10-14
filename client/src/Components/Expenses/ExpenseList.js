import { useEffect, useState } from 'react'
import Axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const ExpenseList = () => {
  const [expenseList,setExpenseList] = useState([]);

  const catchData = async()=>{
    
    try {
       const {data} = await Axios.get("http://localhost:5678/api/expenses")
       setExpenseList(data);
       console.log(data);
       

    }
      catch (error) {
      alert(error.message);
    }
  }

  useEffect(()=>{
    catchData();
  },[])

  const deleteExpense = async(id)=>{
    try {
      const {data} = await Axios.delete(`http://localhost:5678/api/expenses/${id}`)}
      catch (error) {
        alert(error.message);
      }}
  
  return (
    <>
    <div>expenseList</div>
      {/* <h6>{expenseList}</h6> */}
      {expenseList.map((expense)=>(
        <div key={expense._id}>
          <h6>מטרה: {expense.description} סכום: {expense.amount} </h6>
          <IconButton onClick={()=>deleteExpense(expense._id)} ><DeleteIcon/></IconButton>
        </div>
      ))}
      </>
    
  )
}

export default ExpenseList