// import React from 'react'
// import { useState, useEffect } from 'react'
// import Axios from 'axios'
// import { Input, Typography } from '@mui/material'
// import TextField from '@mui/material/TextField';

// const MilgotPage = () => {

//     const [AvrechimList, setAvrechimList] = useState([])
//     const [milgaAmount, setMilgaAmount] = useState(0)



//     const catchData = async () => {
//         try {
//             const { data } = await Axios.get("http://localhost:5678/api/avrechim")
//             setAvrechimList(data)
//             console.log(AvrechimList, "AvrechimList1");
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         catchData();
//     }, [])

//     const sendMilgot = async (avrechId) => {
//         try {
//             const { data } = await Axios.post(`http://localhost:5678/api/avrechim/${avrechId}`, { milgaAmount, date: new Date() })

//     return (
//         <>
//             <div>MilgotPage</div>
//             {AvrechimList.map((avrech) => (
//                 <div key={avrech._id}>
//                     <Typography>{avrech.name}</Typography>
//                     <TextField
//                         id={avrech._id}
//                         value={milgaAmount}
//                         onChange={(e) => setMilgaAmount(e.target.value)}
//                         label="סכום"
//                         type="number"
//                         variant="outlined"
//                         required
//                         sx={{
//                             '& .MuiOutlinedInput-root': {
//                                 '& fieldset': { borderColor: '#ff7043' },
//                                 '&:hover fieldset': { borderColor: '#d84315' },
//                                 '&.Mui-focused fieldset': { borderColor: '#bf360c' },
//                             }
//                         }}
//                     />
//                 </div>
//             ))}

//         </>

//     )
// }

// export default MilgotPage

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Typography, TextField, Button } from "@mui/material";
import UpdatedAlert from "../Alerts/UpdatedAlert"

const MilgotPage = () => {
  const [AvrechimList, setAvrechimList] = useState([]);
  const [milgaAmounts, setMilgaAmounts] = useState({});
  const [updatedAlert, setUpdatedAlert] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0])


  const catchData = async () => {
    try {
      const { data } = await Axios.get("http://localhost:5678/api/avrechim");
      setAvrechimList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    catchData();
  }, []);

  const sendAllMilgot = async () => {
    try {
      const promises = AvrechimList.map((avrech) =>
        Axios.post(`http://localhost:5678/api/avrechim/${avrech._id}`, {
          milgaAmount: milgaAmounts[avrech._id] || 0,
          date: newDate
        })
      );
      await Promise.all(promises);
      setUpdatedAlert(true);
      setMilgaAmounts({});
    } catch (err) {
      console.error(err);
      alert("אירעה שגיאה בעדכון");
    }
  };

  return (
    <>
      <div>MilgotPage</div>
      {AvrechimList.map((avrech) => (
        <div key={avrech._id}>
          <Typography>{avrech.name}</Typography>
          <TextField
            value={milgaAmounts[avrech._id] || ""}
            onChange={(e) =>
              setMilgaAmounts({
                ...milgaAmounts,
                [avrech._id]: e.target.value,
              })
            }
            label="סכום"
            type="number"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ff7043' },
                '&:hover fieldset': { borderColor: '#d84315' },
                '&.Mui-focused fieldset': { borderColor: '#bf360c' },
              },
              marginBottom: 2
            }}
          />
        </div>
      ))}

      <TextField
        label="תאריך"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={newDate}
        onChange={e => setNewDate(e.target.value)}
        size="small"
        margin="dense"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={sendAllMilgot}
        sx={{ marginTop: 2 }}
      >
        עדכן לכולם
      </Button>
      <UpdatedAlert updatedAlert={updatedAlert} setUpdatedAlert={setUpdatedAlert} />

    </>

  );
};

export default MilgotPage;
