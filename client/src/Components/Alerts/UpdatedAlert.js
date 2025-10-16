import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';

function MyApp( {updatedAlert, setUpdatedAlert} ) {

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('עודכן בהצלחה', { variant });
    setTimeout(() => setUpdatedAlert(false), 2000);
  };

  useEffect(() => {    
    if (updatedAlert) {
      handleClickVariant('success')();
    }},[updatedAlert])          

  return (
    null
  );
}

export default function IntegrationNotistack({updatedAlert, setUpdatedAlert}) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp updatedAlert={updatedAlert} setUpdatedAlert={setUpdatedAlert}/>
    </SnackbarProvider>
  );
}