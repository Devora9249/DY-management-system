import React from 'react'
import { useState } from "react";
import AddDonor from "./AddDonor";
import Button from '@mui/material/Button';
const DonorsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div> 
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        הוספת תורם
      </Button>

      <AddDonor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /></div>
  )
}

export default DonorsList