import { useState, useEffect } from "react";
import Axios from 'axios';
import AddDonor from "./AddDonor";
import DonorCard from "./DonorCard";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, Typography, IconButton, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ToDelete from './ToDelete';
const DonorsList = () => {
    const [openModal, setOpenModal] = useState(null);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [donorsList, setDonorsList] = useState([]);
    const [filterFrequency, setFilterFrequency] = useState(''); // סינון לפי frequency
    const [filterPayment, setFilterPayment] = useState(''); // סינון לפי paymentMethod

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
            // setDeleteAlert(true);
            catchData();
        } catch (error) {
            alert("ghjkl" + error.message);
        }
    };

    // סינון התורמים לפי frequency ו-paymentMethod
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2, width: '80%' }}>
            {/* שורת כפתור + סינונים */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%', gap: 2 }}>
                <Button variant="contained" color='white' onClick={() => setOpenModal('add')}>
                    הוספת תורם
                </Button>

                {/* סינון לפי סוג תרומה */}
                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel id="filter-frequency-label">סינון לפי סוג תרומה</InputLabel>
                    <Select
                        labelId="filter-frequency-label"
                        value={filterFrequency}
                        label="סינון לפי סוג תרומה"
                        onChange={(e) => setFilterFrequency(e.target.value)}
                    >
                        <MenuItem value="">ללא סינון</MenuItem>
                        <MenuItem value="חדפ">חד"פ</MenuItem>
                        <MenuItem value="הוראת קבע">הוראת קבע</MenuItem>
                    </Select>
                </FormControl>

                {/* סינון לפי אמצעי תשלום */}
                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel id="filter-payment-label">סינון לפי אמצעי תשלום</InputLabel>
                    <Select
                        labelId="filter-payment-label"
                        value={filterPayment}
                        label="סינון לפי אמצעי תשלום"
                        onChange={(e) => setFilterPayment(e.target.value)}
                    >
                        <MenuItem value="">ללא סינון</MenuItem>
                        <MenuItem value="מזומן">מזומן</MenuItem>
                        <MenuItem value="נדרים פלוס">נדרים פלוס</MenuItem>
                        <MenuItem value="חשבון בנק בינלאומי">חשבון בנק בינלאומי</MenuItem>
                        <MenuItem value="חשבון דעת יהודית">חשבון דעת יהודית</MenuItem>
                        <MenuItem value="חשבון משה וקסלר">חשבון משה וקסלר</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {openModal === 'add' && (
                <AddDonor
                    isOpen={true}
                    onClose={() => setOpenModal(null)}
                    onAdd={catchData}
                />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, justifyContent: 'center', width: '80%' }}>
                {filteredDonors.map(donor => (
                    <Card
                        key={donor._id}
                        sx={{
                            border: '2px solid #7b1fa2',
                            flex: '1 1 calc(20% - 16px)',
                            minHeight: '120px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <CardContent sx={{ textAlign: 'right' }} onClick={() => { setSelectedDonor(donor); setOpenModal('donor'); }}>
                            <Typography>שם: {donor.name}</Typography>
                            {donor.donations && donor.donations.length > 0 ? (
                                donor.donations.map((d) => (
                                    <Typography key={d._id}>
                                        סכום: {d.amount} | {d.frequency}
                                    </Typography>
                                ))
                            ) : (
                                <Typography>אין תרומות</Typography>
                            )}


                        </CardContent>
                            <ToDelete deleteId={deleteTorem} id={donor._id} />
                    </Card>
                ))}
            </Box>

            {selectedDonor && openModal === 'donor' && (
                <DonorCard
                    isOpen={true}
                    donor={selectedDonor}
                    onClose={() => { setSelectedDonor(null); setOpenModal(null); }}
                />
            )}
        </Box>
    );
};

export default DonorsList;
