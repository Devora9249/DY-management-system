

import { useState, useEffect } from "react";
import Axios from 'axios';
import AddDonor from "../AddDonor/AddDonor";
import DonorCard from "../DonorCard/DonorCard";
import { Box, Typography } from "@mui/material";
import DonorsFilters from "./DonorsFilters";
import DonorsGrid from "./DonorsGrid";

const DonorsList = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorsList, setDonorsList] = useState([]);
  const [filterFrequency, setFilterFrequency] = useState('');
  const [filterPayment, setFilterPayment] = useState('');

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/donors");
      setDonorsList(data);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    catchData();
  }, []);

  const deleteTorem = async (id) => {
    try {
      await Axios.delete(`http://localhost:5678/api/donors/${id}`);
      catchData();
    } catch (error) {
      alert(error.message);
    }
  };

  // סינון
  const filteredDonors = donorsList.filter((donor) => {
    if ((!filterFrequency && !filterPayment)) return true;
    if (!donor.donations || donor.donations.length === 0) return false;
    return donor.donations.some((d) => {
      const freqMatch = filterFrequency ? d.frequency === filterFrequency : true;
      const payMatch = filterPayment ? d.paymentMethod === filterPayment : true;
      return freqMatch && payMatch;
    });
  });

  return (
    <Box>
  {/* כותרת כללית */}
  <Typography> רשימת תורמים </Typography>

  {/* סינון + כפתור הוספה */}
  <DonorsFilters
    filterFrequency={filterFrequency}
    setFilterFrequency={setFilterFrequency}
    filterPayment={filterPayment}
    setFilterPayment={setFilterPayment}
    onAdd={() => setOpenModal("add")}
  />

  {/* רשימת התורמים */}
  <DonorsGrid
    donors={filteredDonors}
    onSelect={(donor) => {
      setSelectedDonor(donor);
      setOpenModal("donor");
    }}
    onDelete={deleteTorem}
  />

  {/* דיאלוגים */}
  {openModal === "add" && (
    <AddDonor isOpen={true} onClose={() => setOpenModal(null)} onAdd={catchData} />
  )}

  {selectedDonor && openModal === "donor" && (
    <DonorCard
      isOpen={true}
      donor={selectedDonor}
      onClose={() => {
        setSelectedDonor(null);
        setOpenModal(null);
      }}
    />
  )}
</Box>

  );
};

export default DonorsList;

