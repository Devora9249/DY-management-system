import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function DonorsFilters({
  filterFrequency,
  setFilterFrequency,
  filterPayment,
  setFilterPayment,
  onAdd
}) {
  return (
    <Box>
      <Button variant="contained" onClick={onAdd}>
        הוספת תורם
      </Button>

      <FormControl sx={{ minWidth: 180 }} size="small">

        <InputLabel>סוג תרומה</InputLabel>
        <Select
          value={filterFrequency}
          label="סוג תרומה"
          onChange={(e) => setFilterFrequency(e.target.value)} >
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
          onChange={(e) => setFilterPayment(e.target.value)} >
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
