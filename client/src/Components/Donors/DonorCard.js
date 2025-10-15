import React from 'react'
import { Modal, Card, CardHeader, CardContent, TextField, Select, MenuItem, Button, FormControl, InputLabel, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const DonorCard = ({ isOpen, donor, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 3, border: '2px solid #7b1fa2' }}>
                <CloseIcon variant="outlined" onClick={onClose} color="secondary" ></CloseIcon>
                <Card elevation={0} sx={{ border: 'none' ,textAlign:'right'}}>
                    <CardHeader title="טופס פרטי תורם" sx={{ textAlign: 'center', color: '#7b1fa2', fontWeight: 'bold', fontSize: '1.2rem' }} />
                   <CardContent>שם: {donor.name}</CardContent>
                   <CardContent>תז: {donor.donorId}</CardContent>
                   <CardContent>כתובת: {donor.address}</CardContent>
                   <CardContent>פלאפון: {donor.phoneNumber}</CardContent>
                   <CardContent>מייל: {donor.emailAddress}</CardContent>
                   <CardContent>וואצאפ: {donor.whatsappNumber}</CardContent>
                   <CardContent>תאריך לידה: {donor.birthDate}</CardContent>
                   <CardContent>תאריך יוארצייט: {donor.yahrzeitDare}</CardContent>
                   <CardContent>סכום תרומה: {donor.donationAmount}</CardContent>
                   <CardContent>סוג תשלום: {donor.paymentMethod}</CardContent>
                   <CardContent>תדירות: {donor.frequency}</CardContent>
                   <CardContent>תאריך תרומה: {donor.donationDate}</CardContent>
                </Card>
            </Box>
        </Modal>
    )
}

export default DonorCard