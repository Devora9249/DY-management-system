import { useState, useEffect } from "react";
import Axios from "axios";
import AddDonor from "../AddDonor/AddDonor";
import DonorCard from "../DonorCard/DonorCard";
import { Typography, TextField, Box } from "@mui/material";
import DonorsFilters from "./DonorsFilters";
import DonorsGrid from "./DonorsGrid";
import DownloadDetailsXL from "./DownloadDetailsXL";
import CustomSnackbar from "../../Alerts/CustomSnackbar";
const DonorsList = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorsList, setDonorsList] = useState([]);
  const [filterFrequency, setFilterFrequency] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState("");

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/donors", {
        params: { search }, //  אם ריק -> יחזיר הכל
      });
      setDonorsList(data);
    } catch (error) {
      setAlert({ message: error.response?.data?.message || error.message, type: "error" });
    }
  };

  useEffect(() => {
    catchData();
  }, [search]); //  כל שינוי בחיפוש – מביא נתונים מחדש

  const deleteTorem = async (id) => {
    try {
      await Axios.delete(`http://localhost:5678/api/donors/${id}`);
      catchData();
      setAlert({ message: "התורם נמחק בהצלחה", type: "success" });
    } catch (error) {
      setAlert({ message: error.response?.data?.message || error.message, type: "error" });
    }
  };

  // // סינון (נשאר כמו שלך)
  const filteredDonors = donorsList.filter((donor) => {
    if (!filterFrequency && !filterPayment) return true;
    if (!donor.donations || donor.donations.length === 0) return false;

    return donor.donations.some((d) => {
      const freqMatch = filterFrequency ? d.frequency === filterFrequency : true;
      const payMatch = filterPayment ? d.paymentMethod === filterPayment : true;
      return freqMatch && payMatch;
    });
  });

  return (
    <>
      <Typography>רשימת תורמים</Typography>

      <Box sx={{ mt: 2 }}>
        <TextField
          label="חיפוש לפי שם תורם"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
        />
      </Box>

      <DonorsFilters
        // filterFrequency={filterFrequency}
        // setFilterFrequency={setFilterFrequency}
        // filterPayment={filterPayment}
        // setFilterPayment={setFilterPayment}
        onAdd={() => setOpenModal("add")}
      />

      <DownloadDetailsXL DonorsList={donorsList} />

      <DonorsGrid
        donors={filteredDonors}
        onSelect={(donor) => {
          setSelectedDonor(donor);
          setOpenModal("donor");
        }}
        onDelete={deleteTorem}
      />

      {openModal === "add" && (
        <AddDonor
  isOpen={true}
  onClose={() => setOpenModal(null)}
  onAdd={catchData}
  showAlert={setAlert}
/>
      )}

      {selectedDonor && openModal === "donor" && (
        <DonorCard
          isOpen={true}
          setOpen={setOpenModal}
          open={openModal}
          donor={selectedDonor}
          onChange={catchData}
        />
      )}
       <CustomSnackbar alert={alert} setAlert={setAlert} />
       
    </>
  );
};

export default DonorsList;
