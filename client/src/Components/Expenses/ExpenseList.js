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
import DeleteDialog from '../GeneralConponents/DeleteDialog';

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
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        maxWidth: 800,
        mx: "auto",
        borderRadius: 3, // ⭐ פינות מעוגלות
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)", // ⭐ הצללה רכה
        overflow: "hidden", // ⭐ שומר על העיצוב גם כשהטבלה רחבה
        backgroundColor: "#fafafa", // ⭐ רקע אפור בהיר
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          p: 2,
          fontWeight: "bold",
          color: "#b71c1c", // ⭐ אדום עדין
          bgcolor: "#f5f5f5", // ⭐ כותרת על רקע טיפה כהה
          borderBottom: "2px solid #b71c1c",
        }}
      >
        רשימת הוצאות
      </Typography>

      <Table>
        {/* כותרות הטבלה */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            <TableCell align="center" sx={{ width: "25%", fontWeight: "bold", color: "#444" }}></TableCell>
            <TableCell align="center" sx={{ width: "25%", fontWeight: "bold", color: "#444" }}>סכום</TableCell>
            <TableCell align="center" sx={{ width: "25%", fontWeight: "bold", color: "#444" }}>מטרה</TableCell>
            <TableCell align="center" sx={{ width: "25%", fontWeight: "bold", color: "#444" }}>תאריך</TableCell>
          </TableRow>
        </TableHead>

        {/* גוף הטבלה */}
        <TableBody>
          {expenseList.map((expense, index) => (
            <TableRow
              key={expense._id}
              hover
              sx={{
                backgroundColor: "#ffffff",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#f7a9a9ff",
                },
              }}
            >
              <TableCell align="center" sx={{ width: "25%" }}>
                <DeleteDialog deleteFunc={deleteExpense} itemId={expense._id} />
              </TableCell>
              <TableCell align="center" sx={{ width: "25%", color: "#b71c1c", fontWeight: "bold" }}>
                {expense.amount} ₪
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>{expense.description}</TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                {new Date(expense.date).toLocaleDateString("he-IL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
