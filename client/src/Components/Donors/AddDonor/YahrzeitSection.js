// import { Typography, TextField, Box, Button, Paper, Stack } from '@mui/material';
// import { useState } from 'react';

// export default function YahrzeitSection({ yahrzeits, setYahrzeits }) {
//   const [tempName, setTempName] = useState('');
//   const [tempDate, setTempDate] = useState('');

//   const handleAdd = () => {
//     if (!tempDate || !tempName) return alert("נא למלא שם ותאריך");
//     setYahrzeits([...yahrzeits, { name: tempName, date: tempDate }]);
//     setTempName('');
//     setTempDate('');
//   };

//   return (
//     <Stack spacing={2} sx={{minHeight:"400px", width:"70%"}}>

//       {/* הוספה */}
//       <Stack spacing={1}>
//         <TextField
//           fullWidth
//           label="שם הנפטר"
//           value={tempName}
//           onChange={(e) => setTempName(e.target.value)}
//         />

//         <TextField
//           type="date"
//           value={tempDate}
//           label='תאריך'
//           onChange={(e) => setTempDate(e.target.value)}
//         />

//         <Button variant="contained" onClick={handleAdd}>
//           הוסף
//         </Button>
//       </Stack>

//       {/* רשימה עם גלילה */}
//       <Paper
//         variant="outlined"
//         sx={{
//           maxHeight: 180, 
//           overflowY: "auto",
//           p: 1,
//           // width:"100%"
//         }}
//       >
//         {yahrzeits.length === 0 ? (
//           <Typography variant="body2" color="text.secondary" align="center">
//             לא נוספו יארצייטים
//           </Typography>
//         ) : (
//           <Stack spacing={1}>
//             {yahrzeits.map((y, i) => (
//               <Box
//                 key={i}
//                 sx={{
//                   display: "flex",
//                   gap: 1,
//                   p: 1,
//                   borderRadius: 1,
//                   backgroundColor: "#f5f5f5"
//                 }}
//               >
//                 <TextField value={y.name} disabled fullWidth size="small" />
//                 <TextField value={y.date} disabled size="small" />
//               </Box>
//             ))}
//           </Stack>
//         )}
//       </Paper>

//     </Stack>
//   );
// }


import { Typography, TextField, Box, Button, Paper, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function YahrzeitSection({ yahrzeits, setYahrzeits }) {
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');

  const handleAdd = () => {
    if (!tempName || !tempDate) {
      alert("נא למלא שם ותאריך");
      return;
    }

    setYahrzeits([
      ...yahrzeits,
      { name: tempName, date: tempDate }
    ]);

    setTempName('');
    setTempDate('');
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...yahrzeits];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setYahrzeits(updated);
  };

  const handleDelete = (index) => {
    setYahrzeits(yahrzeits.filter((_, i) => i !== index));
  };

  return (
    <Stack spacing={2} sx={{ minHeight: "400px", width: "100%" }}>

      {/* הוספת יארצייט */}
      <Stack spacing={1}>
        <TextField
          fullWidth
          label="שם הנפטר"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />

        <TextField
          type="date"
          label="תאריך"
          value={tempDate}
          onChange={(e) => setTempDate(e.target.value)}
        />

        <Button variant="contained" onClick={handleAdd}>
          הוסף
        </Button>
      </Stack>

      {/* רשימת יארצייטים */}
      <Paper
        variant="outlined"
        sx={{ maxHeight: 200, overflowY: "auto", p: 1 }}
      >
        {yahrzeits.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center">
            לא נוספו יארצייטים
          </Typography>
        ) : (
          <Stack spacing={1}>
            {yahrzeits.map((y, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: "#f5f5f5"
                }}
              >
                <TextField
                  size="small"
                  label="שם הנפטר"
                  fullWidth
                  value={y.name}
                  onChange={(e) =>
                    handleUpdate(i, 'name', e.target.value)
                  }
                />

                <TextField
                  size="small"
                  type="date"
                  value={y.date}
                  label="תאריך"
                  fullWidth
                  onChange={(e) =>
                    handleUpdate(i, 'date', e.target.value)
                  }
                />

                <IconButton
                  color="error"
                  onClick={() => handleDelete(i)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
