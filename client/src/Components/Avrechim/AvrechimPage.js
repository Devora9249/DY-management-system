import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AvrechimListComp from './AvrechimListComp';
import AddAvrech from './AddAvrech';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';
import ShowNotActiveAvrechim from './ShowNotActiveAvrechim';
import DownloadDetailsXL from './DownloadDetailsXL';

const AvrechimPage = () => {
  const [AvrechimList, setAvrechimList] = useState([]);
  const [alert, setAlert] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
    <Paper variant="mainPaper">

      {/* כותרת הדף */}
      <Typography variant='h5'>
        דף אברכים
      </Typography>


      {/* כפתור הוספת אברך */}
      <Box sx={{width:"50%", display:"flex",   justifyContent: "space-around", alignItems: "center",}}>
        <AddAvrech onAdd={catchData} setAlert={setAlert} />
        <ShowNotActiveAvrechim setShowAll={setShowAll} showAll={showAll} />
        <DownloadDetailsXL AvrechimList={AvrechimList} />
      </Box>



      {/* טבלת אברכים */}
      <AvrechimListComp
        AvrechimList={AvrechimList}
        onChange={catchData}
        setAlert={setAlert}
        showAll={showAll}
      />

      {/* האלרט המעוצב */}
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </Paper>
  );
};

export default AvrechimPage;
