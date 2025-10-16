// import { useEffect, useState } from 'react'
// import Axios from 'axios';
// import { IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddExpense from './AddExpense';


// const ExpenseList = ({expenseList, onChange}) => {

//   const deleteExpense = async (id) => {
//     try {
//       const { data } = await Axios.delete(`http://localhost:5678/api/expenses/${id}`)
//       alert("ההוצאה נמחקה בהצלחה");
//       onChange()
//     }
//     catch (error) {
//       alert(error.message);
//     }
//   }

//   return (
//     <>
//       <div>expenseList</div>
//       {expenseList.map((expense) => (
//         <div key={expense._id}>
//           <h6>מטרה: {expense.description} סכום: {expense.amount} תאריך: {new Date(expense.date).toLocaleDateString('he-IL')}</h6>
//           <IconButton onClick={() => deleteExpense(expense._id)} ><DeleteIcon /></IconButton> 
//         </div>
//       ))}
//     </>

//   )
// }

// export default ExpenseList

 
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';

const ExpenseList = ({ expenseList, onChange, setDeleteAlert }) => {

  const deleteExpense = async (id) => {
    try {
      await Axios.delete(`http://localhost:5678/api/expenses/${id}`);
      setDeleteAlert(true);
      onChange();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h6" align="center" sx={{ p: 2, fontWeight: 'bold' }}>
        רשימת הוצאות
      </Typography>
      <Table>
        {/* כותרות הטבלה */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>סכום</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>מטרה</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>תאריך</TableCell>


          </TableRow>
        </TableHead>

        {/* גוף הטבלה */}
        <TableBody>
          {expenseList.map((expense) => (
            <TableRow key={expense._id} hover>
              <TableCell> <IconButton onClick={() => deleteExpense(expense._id)} ><DeleteIcon /></IconButton> </TableCell>
              <TableCell>{expense.amount} ₪</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString('he-IL')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;

