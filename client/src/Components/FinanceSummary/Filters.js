import React from 'react'
import { FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';

const Filters = ({ filterFrequency, setFilterFrequency, filterPayment, setFilterPayment }) => {
    return (
        <Paper variant='tablePaper' sx={{justifyContent:"center", flexDirection:"row", gap:"10px", width:"400px"}}>

            <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel>סוג תרומה</InputLabel>
                <Select
                    value={filterFrequency}
                    label="סוג תרומה"
                    onChange={(e) => setFilterFrequency(e.target.value)}>
                    <MenuItem value="">ללא סינון</MenuItem>
                    <MenuItem value="once">חד"פ</MenuItem>
                    <MenuItem value="monthly">הוראת קבע</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel>אמצעי תשלום</InputLabel>
                <Select
                    value={filterPayment}
                    label="אמצעי תשלום"
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
        </Paper>
    )
}

export default Filters