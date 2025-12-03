import React, { useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'; 

const MainDetails = ({ data, totalIncome, totalExpense, balance }) => {

    
  return (
<Box
  sx={{
    mb: 4,
    p: 3,
    borderRadius: 4,
    background: "linear-gradient(135deg, #ffffff, #f9fafb)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  }}
>
  {/* כותרת */}
  <Typography variant="h5" > דו"ח כספי </Typography>

  {/* אזור נתונים */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 4,
    }}
  >
    {/* הכנסות */}
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: "0.85rem",
          color: "#6b7280",
          mb: 0.5,
        }}
      >
        סה"כ הכנסות
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#15803d",
        }}
      >
        ₪ {(totalIncome ?? 0).toLocaleString()}
      </Typography>
    </Box>

    {/* מפריד אנכי עדין */}
    <Box
      sx={{
        width: "1px",
        height: "50px",
        backgroundColor: "#e5e7eb",
        display: { xs: "none", md: "block" },
      }}
    />

    {/* הוצאות */}
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: "0.85rem",
          color: "#6b7280",
          mb: 0.5,
        }}
      >
        סה"כ הוצאות
      </Typography>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#b71c1c",
        }}
      >
        ₪ {(totalExpense ?? 0).toLocaleString()}
      </Typography>
    </Box>

    {/* מפריד */}
    <Box
      sx={{
        width: "1px",
        height: "50px",
        backgroundColor: "#e5e7eb",
        display: { xs: "none", md: "block" },
      }}
    />

    {/* יתרה */}
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: "0.85rem",
          color: "#6b7280",
          mb: 0.5,
        }}
      >
        יתרה כוללת
      </Typography>
      <Typography
        sx={{
          fontSize: "1.7rem",
          fontWeight: "bold",
          color: balance >= 0 ? "#15803d" : "#b71c1c",
          transition: "color 0.3s ease",
        }}
      >
        ₪ {(balance ?? 0).toLocaleString()}
      </Typography>
    </Box>
  </Box>
</Box>



  )
}

export default MainDetails