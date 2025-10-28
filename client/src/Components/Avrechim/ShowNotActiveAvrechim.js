import React from 'react'
import { Checkbox, FormControlLabel } from '@mui/material';

const ShowNotActiveAvrechim = ({ setShowAll, showAll }) => {
  return (
      <FormControlLabel control={<Checkbox checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />} label="הצג אברכים במצב לא פעיל" />

  )
}

export default ShowNotActiveAvrechim