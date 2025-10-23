import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function DonorsFilters({
  filterFrequency,
  setFilterFrequency,
  filterPayment,
  setFilterPayment,
  onAdd
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: 2,
        backgroundColor: '#fafafa', // ✅ רקע רך
        p: 2,
        borderRadius: 3, // ✅ פינות מעוגלות
        boxShadow: '0 3px 10px rgba(0,0,0,0.08)', // ✅ הצללה רכה
      }}
    >
      <Button
        variant="contained"
        onClick={onAdd}
        sx={{
          backgroundColor: '#b71c1c', // ✅ אדום עדין
          fontWeight: 'bold',
          borderRadius: 2,
          px: 3,
          py: 1,
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          '&:hover': { backgroundColor: '#9a1313' }, // ⭐ hover מעודן
        }}
      >
        הוספת תורם
      </Button>

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>סוג תרומה</InputLabel>
        <Select
          value={filterFrequency}
          label="סוג תרומה"
          onChange={(e) => setFilterFrequency(e.target.value)}
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#b71c1c' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#b71c1c' },
          }}
        >
          <MenuItem value="">ללא סינון</MenuItem>
          <MenuItem value="חדפ">חד"פ</MenuItem>
          <MenuItem value="הוראת קבע">הוראת קבע</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>אמצעי תשלום</InputLabel>
        <Select
          value={filterPayment}
          label="אמצעי תשלום"
          onChange={(e) => setFilterPayment(e.target.value)}
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#b71c1c' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#b71c1c' },
          }}
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
  );
}
