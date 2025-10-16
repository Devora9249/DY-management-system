import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';

function MyApp( {successAlert, setSuccessAlert} ) {

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('נוסף בהצלחה', { variant });
    setTimeout(() => setSuccessAlert(false), 2000);
  };

  useEffect(() => {    
    if (successAlert) {
      handleClickVariant('success')();
    }},[successAlert])          

  return (
    null
  );
}

export default function IntegrationNotistack({successAlert, setSuccessAlert}) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp successAlert={successAlert} setSuccessAlert={setSuccessAlert}/>
    </SnackbarProvider>
  );
}