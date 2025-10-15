import React from 'react'
import Axios from 'axios';
import { useState, useEffect } from "react";
import AddDonor from "./AddDonor";
import DonorCard from "./DonorCard"
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, Box } from '@mui/material';
const DonorsList = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorsList, setDonorsList] = useState([]);

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/donors")
      setDonorsList(data);
      console.log(data);


    }
    catch (error) {
      alert(error.message);
    }
  }


  useEffect(() => {
    catchData();
  }, [])

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2, width: '100%' }}>
      <Button variant="contained" color='white' onClick={() => setOpenModal('add')}> הוספת תורם </Button>
      {openModal === 'add' && (<AddDonor
        isOpen={true}
        onClose={() => setOpenModal(null)}
        onAdd={catchData} />)}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center', width: '100%' }}>
        {donorsList.map(donor => (
          <Card key={donor._id} sx={{ border: '2px solid #7b1fa2', width: '20%' }}>
            <CardContent sx={{ textAlign: 'right' }}
              onClick={() => { setSelectedDonor(donor); setOpenModal('donor'); }}>
              <Typography>שם: {donor.name}</Typography>
              <Typography>סכום תרומה: {donor.donationAmount}</Typography>
              <Typography>תדירות: {donor.frequency}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {
        selectedDonor && openModal === 'donor' && (<DonorCard isOpen={true} donor={selectedDonor} onClose={() => { setSelectedDonor(null); setOpenModal(null); }} />
        )
      }
    </Box >
  )
}

export default DonorsList