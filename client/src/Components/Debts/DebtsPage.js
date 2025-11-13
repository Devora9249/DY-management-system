import React from 'react'
import { useEffect, useState } from 'react'
import Axios from 'axios';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';
import DebtsList from '../Debts/DebtsList';
import ShowPaidDebts from '../Debts/ShowPaidDebts';
import AddDebt from '../Debts/AddDebt';

const DebtsPage = () => {

    // const [debtsList, setDebtsList] = useState([]);
    const [takenDebts, setTakenDebts] = useState([]);
    const [givenDebts, setGivenDebts] = useState([]);

  const [alert, setAlert] = useState(null);  
  const [showAll, setShowAll] = React.useState(false);


  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/debts");
      console.log(data, "data");
      
      const takenData = data.filter(debt => debt.type === 'taken');
      const givenData = data.filter(debt => debt.type === 'given');
      setTakenDebts(takenData);
      console.log(takenData, "takenData");
      
      setGivenDebts(givenData);
      console.log(givenData, "givenData");
      
      // setDebtsList(data);
    }
    catch (error) {
         setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error(error);
    }
  }

  useEffect(() => {
    catchData();
  }, [])


  return (
    <>
      <Box>
        <Paper elevation={3}>
          {/* כותרת הדף */}
          <Typography>
            דף חובות
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* כפתור הוספת הוצאה */}
          <Grid container justifyContent="center" sx={{ mb: 3 }}>
            <Grid item>
              <AddDebt onAdd={catchData}/>
              <ShowPaidDebts  showAll={showAll} setShowAll={setShowAll} />
            </Grid>
          </Grid>

          {/* טבלת הוצאות */}
          <DebtsList
            givenDebts={givenDebts}
            takenDebts={takenDebts}
            onChange={catchData}
            showAll={showAll}
          />

          {/* התראות הצלחה ומחיקה */}
                   {/* <CustomSnackbar alert={alert} setAlert={setAlert} /> */}
        </Paper>
      </Box>
    </>
  )
}

export default DebtsPage