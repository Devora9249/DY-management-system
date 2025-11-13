import { useState } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, IconButton, Typography } from '@mui/material';
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import DeleteDialog from '../GeneralConponents/DeleteDialog';

const ExpenseList = ({ expenseList, onChange }) => {


  const [alert, setAlert] = useState(null);

  const deleteExpense = async (id) => {
    try {
      await Axios.delete(`http://localhost:5678/api/expenses/${id}`);
      setAlert({ message: "ההוצאה נמחקה בהצלחה ✅", type: "success" });
      onChange();
    } catch (error) {
      setAlert({
        message: error.response?.data?.message || error.message,
        type: "error",
      });
      console.error(error);
    }
  };

  return (
    <TableContainer component={Paper} >
      <Typography  >
        רשימת הוצאות
      </Typography>

      <Table>
        {/* כותרות הטבלה */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25%" }}></TableCell>
            <TableCell sx={{ width: "25%" }}>סכום</TableCell>
            <TableCell sx={{ width: "25%" }}>מטרה</TableCell>
            <TableCell sx={{ width: "25%" }}>תאריך</TableCell>
          </TableRow>
        </TableHead>

        {/* גוף הטבלה */}
        <TableBody>
          {expenseList.map((expense, index) => (
            <TableRow key={expense._id}>
              <TableCell sx={{ width: "25%" }}>
                <DeleteDialog deleteFunc={deleteExpense} itemId={expense._id} />
              </TableCell>
              <TableCell sx={{ width: "25%" }}>
                {expense.amount} ₪
              </TableCell>
              <TableCell sx={{ width: "25%" }}>{expense.description}</TableCell>
              <TableCell sx={{ width: "25%" }}>
                {new Date(expense.date).toLocaleDateString("he-IL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </TableContainer>
  );
};

export default ExpenseList;
