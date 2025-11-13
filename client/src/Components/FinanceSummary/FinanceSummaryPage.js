import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';

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
      <Box >
        <Typography  >   דוח אינטגרציה כספית 💰  </Typography>
        <Typography > סיכום </Typography>
        <Typography > סך הכל הכנסות: ₪ {totalIncome} </Typography>
        <Typography> סך הכל הוצאות: ₪ {totalExpense}</Typography>
        <Typography > יתרה: ₪ {balance} </Typography>

        <TableContainer
          component={Paper}     >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell>תאריך</TableCell>
                <TableCell >שם</TableCell>
                <TableCell >סוג פעולה</TableCell>
                <TableCell >מקור</TableCell>
                <TableCell >סכום</TableCell>
                <TableCell >פרטים</TableCell>
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
                  {/* תאריך */}
                  <TableCell >
                    {new Date(row.date).toLocaleDateString("he-IL")}
                  </TableCell>
                  <TableCell >{row.name}</TableCell>

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

                  {/* מקור הנתון */}
                  <TableCell align="center">
                    {row.source === "donation"
                      ? "תרומה"
                      : row.source === "milga"
                        ? "מלגה"
                        : "הוצאה כללית"}
                  </TableCell>

                  {/* סכום */}
                  <TableCell sx={{ color: row.type === "income" ? "green" : "#b71c1c", }}>
                    ₪ {row.amount?.toLocaleString()}
                  </TableCell>

                  {/* פרטים */}
                  <TableCell >
                    {typeof row.details === "object"
                      ? Object.values(row.details).join(" | ")
                      : row.details || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default FinanceSummaryPage