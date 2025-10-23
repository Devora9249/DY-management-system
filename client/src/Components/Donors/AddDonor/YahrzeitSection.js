import { Typography, TextField, Box, Button } from '@mui/material';
import { useState } from 'react';


export default function YahrzeitSection({ yahrzeits, setYahrzeits }) {
  const [tempName, setTempName] = useState('');
  const [tempDate, setTempDate] = useState('');

  const handleAdd = () => {
    if (!tempDate || !tempName) return alert("נא למלא שם ותאריך");
    setYahrzeits([...yahrzeits, { name: tempName, date: tempDate }]);
    setTempDate('');
    setTempName('');
  };

  return (
    <>


      <Box
  sx={{
    mt: 3,
    p: 2,
    borderRadius: 3,
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fafafa",
    border: "1px solid #eee",
  }}
>
  {/* כותרת בתוך הבוקס */}
  <Typography
    variant="h6"
    sx={{
      mb: 2,
      color: "#b71c1c",
      fontWeight: 700,
      pb: 0.5,
      textAlign: "center",
    }}
  >
    יארצייטים
  </Typography>

  {/* רשימת יארצייטים קיימים */}
  {yahrzeits.length ? (
    yahrzeits.map((y, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          gap: 2,
          mb: 1.5,
          backgroundColor: "#fff",
          p: 1.5,
          borderRadius: 2,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          alignItems: "center",
        }}
      >
        <TextField
          value={y.name}
          size="small"
          disabled
          fullWidth
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#b71c1c" },
            },
          }}
        />
        <TextField
          type="date"
          value={y.date}
          InputLabelProps={{ shrink: true }}
          size="small"
          disabled
          fullWidth
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ddd" },
              "&:hover fieldset": { borderColor: "#b71c1c" },
            },
          }}
        />
      </Box>
    ))
  ) 
  :null}

  {/* הוספת יארצייט חדש */}
  <Box
    sx={{
      display: "flex",
      gap: 2,
      mt: 2,
      backgroundColor: "#fff",
      p: 2,
      borderRadius: 2,
      boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
      alignItems: "center",
    }}
  >
    <TextField
      placeholder="שם הנפטר"
      size="small"
      value={tempName}
      onChange={(e) => setTempName(e.target.value)}
      fullWidth
      sx={{
        backgroundColor: "#fafafa",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
        },
      }}
    />
    <TextField
      type="date"
      InputLabelProps={{ shrink: true }}
      size="small"
      value={tempDate}
      onChange={(e) => setTempDate(e.target.value)}
      fullWidth
      sx={{
        backgroundColor: "#fafafa",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
          "&:hover fieldset": { borderColor: "#b71c1c" },
          "&.Mui-focused fieldset": { borderColor: "#b71c1c" },
        },
      }}
    />
    <Button
      variant="contained"
      size="small"
      onClick={handleAdd}
      sx={{
        backgroundColor: "#b71c1c",
        fontWeight: "bold",
        px: 3,
        py: 0.8,
        borderRadius: 2,
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        "&:hover": { backgroundColor: "#9a1313" },
        whiteSpace: "nowrap",
      }}
    >
      הוסף
    </Button>
  </Box>
</Box>
    </>
  );
} 