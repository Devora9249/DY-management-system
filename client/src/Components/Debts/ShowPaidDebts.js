import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';

const ShowPaidDebts = ({ setShowAll, showAll }) => {
  return (
      <FormControlLabel control={<Checkbox checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />} label="הצג חובות ששולמו" />

  )
}

export default ShowPaidDebts