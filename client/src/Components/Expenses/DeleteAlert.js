import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';

function MyApp( {deleteAlert, setDeleteAlert} ) {

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('נמחק בהצלחה', { variant });
    setTimeout(() => setDeleteAlert(false), 2000);
  };

  useEffect(() => {
    if (deleteAlert) {
      handleClickVariant('success')();
    }},[deleteAlert])          

  return (
    null
  );
}

export default function IntegrationNotistack({deleteAlert, setDeleteAlert}) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp deleteAlert={deleteAlert} setDeleteAlert={setDeleteAlert}/>
    </SnackbarProvider>
  );
}