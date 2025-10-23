import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AvrechimListComp from './AvrechimListComp';
import AddAvrech from './AddAvrech';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';

const AvrechimPage = () => {
  const [AvrechimList, setAvrechimList] = useState([]);
  const [alert, setAlert] = useState(null); // 👈 אלרט אחד בלבד

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/avrechim");
      setAvrechimList(data);
    } catch (err) {
      setAlert({ message: "שגיאה בטעינת הנתונים", type: "error" });
      console.error("שגיאה בטעינת האברכים:", err);
    }
  };

  useEffect(() => {
    catchData();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 4,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        {/* כותרת הדף */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#b71c1c",
          }}
        >
          דף אברכים
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* כפתור הוספת אברך */}
        <Grid container justifyContent="center" sx={{ mb: 3 }}>
          <Grid item>
            <AddAvrech onAdd={catchData} setAlert={setAlert} /> {/* 👈 מעבירים setAlert */}
          </Grid>
        </Grid>

        {/* טבלת אברכים */}
        <AvrechimListComp
          AvrechimList={AvrechimList}
          onChange={catchData}
          setAlert={setAlert} // 👈 גם כאן
        />

        {/* האלרט המעוצב */}
        <CustomSnackbar alert={alert} setAlert={setAlert} />
      </Paper>
    </Box>
  );
};

export default AvrechimPage;
