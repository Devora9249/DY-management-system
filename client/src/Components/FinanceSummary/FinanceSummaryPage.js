import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';
import MainDetails from './MainDetails';
const FinanceSummaryPage = () => {

  const [financeData, setFinanceData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [alert, setAlert] = useState(null);

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/integration");
      setFinanceData(data.integratedData);
      setBalance(data.summary.balance);
      setTotalIncome(data.summary.totalIncome);
      setTotalExpense(data.summary.totalExpense);
    } catch (err) {
      setAlert({
        message: err.response?.data?.message || err.message,
        type: "error",
      });
    }
  }

  useEffect(() => {
    catchData();
  }, []);


  return (
    <>
      <Paper variant='mainPaper' >

        <MainDetails balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />

        <Paper variant='tablePaper' sx={{ width: "60%" }}>
          <Table sx={{ "& .MuiTableCell-root": { borderBottom: "1px solid #000", },}}>
            <TableHead>
              <TableRow >
                <TableCell >סכום</TableCell>
                <TableCell variant='cellDivider' />
                <TableCell >פרטים</TableCell>

                <TableCell variant='cellDivider' />
                <TableCell >שם</TableCell>
                <TableCell variant='cellDivider' />
                <TableCell >סוג פעולה</TableCell>
                <TableCell variant='cellDivider' />
                <TableCell>תאריך</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {financeData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: row.type === "income" ? "#e8f5e9" : "#ffebee" },
                  }}
                >
                  {/* סכום */}
                  <TableCell sx={{ color: row.type === "income" ? "green" : "#b71c1c", }}>
                    ₪ {row.amount?.toLocaleString()}
                  </TableCell>

                  <TableCell variant='cellDivider' />

                  {/* פרטים */}
                  <TableCell >
                    {typeof row.details === "object"
                      ? Object.values(row.details).join(" | ")
                      : row.details || "-"}
                  </TableCell>

                  <TableCell variant='cellDivider' />

                  {/* 'פירוט' */}
                  <TableCell >{row.name}</TableCell>

                  <TableCell variant='cellDivider' />

                  {/* סוג פעולה - הוצאה/הכנסה */}
                  <TableCell >
                    <Chip
                      label={row.type === "income" ? "תרומה" : row.type === "milga" ? "מלגה" : "הוצאה"}
                      sx={{
                        backgroundColor:
                          row.type === "income" ? "#e8f5e9" : "#ffebee",
                        color: row.type === "income" ? "green" : "#b71c1c",
                      }}
                    />
                  </TableCell>

                  <TableCell variant='cellDivider' />

                  {/* תאריך */}
                  <TableCell >
                    {new Date(row.date).toLocaleDateString("he-IL")}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Paper>
    </>
  )
}

export default FinanceSummaryPage