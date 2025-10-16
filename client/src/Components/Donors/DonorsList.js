// import  { useState, useEffect } from "react";
// import Axios from 'axios';
// import AddDonor from "./AddDonor";
// import DonorCard from "./DonorCard";
// import Button from '@mui/material/Button';
// import { Card, CardContent, Typography, Box } from '@mui/material';

// const DonorsList = () => {
//   const [openModal, setOpenModal] = useState(null);
//   const [selectedDonor, setSelectedDonor] = useState(null);
//   const [donorsList, setDonorsList] = useState([]);

//   const catchData = async () => {
//     try {
//       const { data } = await Axios.get("http://localhost:5678/api/donors");
//       setDonorsList(data);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   useEffect(() => {
//     catchData();
//   }, []);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2, width: '80%' }}>
//       <Button variant="contained" color='white' onClick={() => setOpenModal('add')}> הוספת תורם </Button>
//       {openModal === 'add' && (
//         <AddDonor
//           isOpen={true}
//           onClose={() => setOpenModal(null)}
//           onAdd={catchData} 
//         />
//       )}
// <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, justifyContent: 'center', width: '80%' }}>
//   {donorsList.map(donor => (
//     <Card
//       key={donor._id}
//       sx={{
//         border: '2px solid #7b1fa2',
//         flex: '1 1 calc(20% - 16px)', // 20% פחות הגאפ
//         minHeight: '120px', // כמות גובה אחידה לשורה הראשונה
//         boxSizing: 'border-box',
//       }}
//     >
//       <CardContent sx={{ textAlign: 'right' }} onClick={() => { setSelectedDonor(donor); setOpenModal('donor'); }}>
//         <Typography>שם: {donor.name}</Typography>
//         {donor.donations && donor.donations.length > 0 ? (
//           donor.donations.map((d) => (
//             <Typography key={d._id}>תרומה: {d.amount} | {d.frequency} | {new Date(d.date).toLocaleDateString()}</Typography>
//           ))
//         ) : (
//           <Typography>אין תרומות</Typography>
//         )}
//       </CardContent>
//     </Card>
//   ))}
// </Box>
//       {selectedDonor && openModal === 'donor' && (
//         <DonorCard 
//           isOpen={true} 
//           donor={selectedDonor} 
//           onClose={() => { setSelectedDonor(null); setOpenModal(null); }} 
//         />
//       )}
//     </Box>
//   );
// };

// export default DonorsList;


import { useState, useEffect } from "react";
import Axios from 'axios';
import AddDonor from "./AddDonor";
import DonorCard from "./DonorCard";
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DonorsList = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorsList, setDonorsList] = useState([]);
  const [filter, setFilter] = useState(''); // חדש – שמירת מצב הסינון

  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/donors");
      setDonorsList(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    catchData();
  }, []);

  // סינון התורמים לפי סוג תרומה
  const filteredDonors = donorsList.filter((donor) => {
    if (!filter) return true;
    if (!donor.donations || donor.donations.length === 0) return false;
    return donor.donations.some((d) => d.frequency === filter);
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2, width: '80%' }}>
      {/* שורת כפתור + סינון */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
        <Button variant="contained" color='white' onClick={() => setOpenModal('add')}>
          הוספת תורם
        </Button>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="filter-label">סינון לפי סוג תרומה</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            label="סינון לפי סוג תרומה"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">ללא סינון</MenuItem>
            <MenuItem value="חדפ">חדפ</MenuItem>
            <MenuItem value="הוראת קבע">הוראת קבע</MenuItem>
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
                  <Typography key={d._id}>תרומה: {d.amount} | {d.frequency} | {new Date(d.date).toLocaleDateString()}</Typography>
                ))
              ) : (
                <Typography>אין תרומות</Typography>
              )}
            </CardContent>
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
