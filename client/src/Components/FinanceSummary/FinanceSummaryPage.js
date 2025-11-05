import React, { use } from 'react'
import { useEffect } from 'react';
import Axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from '@mui/material';

const FinanceSummaryPage = () => {

    const [financeData, setFinanceData] = React.useState([]);
    const [balance, setBalance] = React.useState(0);
    const [totalIncome, setTotalIncome] = React.useState(0);
    const [totalExpense, setTotalExpense] = React.useState(0);
    const [alert, setAlert] = React.useState(null);

    console.log(financeData, "financeData");
    

    const catchData = async () => {
        try {
            const {data} = await Axios.get("http://localhost:5678/api/integration");
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
    <Box sx={{ p: 3, direction: "rtl" }}>
      <Typography
        variant="h5"
        align="center"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#b71c1c",
          letterSpacing: 1,
        }}
      >
        דוח אינטגרציה כספית 💰
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        סיכום
      </Typography>
      <Typography variant="body1" align="center">
        סך הכל הכנסות: ₪ {totalIncome}
      </Typography>
      <Typography variant="body1" align="center">
        סך הכל הוצאות: ₪ {totalExpense}
      </Typography>
      <Typography variant="body1" align="center">
        יתרה: ₪ {balance}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                תאריך
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                שם
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                סוג פעולה
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                מקור
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                סכום
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                פרטים
              </TableCell>
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
                <TableCell align="center">
                  {new Date(row.date).toLocaleDateString("he-IL")}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>

                {/* סוג פעולה - הוצאה/הכנסה */}
                <TableCell align="center">
                  <Chip
                    label={row.type === "income" ? "תרומה" : row.type === "milga" ? "מלגה" : "הוצאה"}
                    sx={{
                      backgroundColor:
                        row.type === "income" ? "#e8f5e9" : "#ffebee",
                      color: row.type === "income" ? "green" : "#b71c1c",
                      fontWeight: "bold",
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
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color: row.type === "income" ? "green" : "#b71c1c",
                  }}
                >
                  ₪ {row.amount?.toLocaleString()}
                </TableCell>

                {/* פרטים */}
                <TableCell align="center">
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