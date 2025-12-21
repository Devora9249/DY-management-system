import { useState, useEffect } from "react";
import Axios from "axios";
import AddDonor from "../AddDonor/AddDonor";
import DonorCard from "../DonorCard/DonorCard";
import { Typography, TextField, Box, Button, Paper } from "@mui/material";
import DonorsGrid from "./DonorsGrid";
import DownloadDetailsXL from "./DownloadDetailsXL";
import CustomSnackbar from "../../Alerts/CustomSnackbar";

const DonorsPage = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorsList, setDonorsList] = useState([]);
  // const [filterFrequency, setFilterFrequency] = useState("");
  // const [filterPayment, setFilterPayment] = useState("");
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


  return (
    <Paper variant="mainPaper">
      <Typography variant="h5">רשימת תורמים</Typography>

      <Box sx={{width:"50%", display:"flex",   justifyContent: "space-around", alignItems: "center",}}>

        {/* כפתור הוספת תורם */}
        <Button variant="addButton" onClick={() => setOpenModal("add")}> הוספת תורם </Button>

        {/* חיפוש לפי שם תורם */}
        <Box>
          <TextField
            label="חיפוש לפי שם תורם"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            multiline={false}
          />
        </Box>

        {/* כפתור להורדת קובץ אקסל */}
        <DownloadDetailsXL DonorsList={donorsList} />
      </Box>

      {/* הצגת כרטיסיות התורמים */}
      <DonorsGrid
        onSelect={(donor) => {
          setSelectedDonor(donor);
          setOpenModal("donor");
        }}
        onDelete={deleteTorem}
        donors={donorsList}
      />

      {/* פתיחת כרטיסייה הוספת תורם */}
      {openModal === "add" && (
        <AddDonor
          isOpen={true}
          onClose={() => setOpenModal(null)}
          onAdd={catchData}
          showAlert={setAlert}
        />
      )}

      {/* פתיחת כרטיסייה תורם לצפייה/עריכה */}
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
    </Paper>
  );
};

export default DonorsPage;
