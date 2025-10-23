import React from 'react'
import AvrechimListComp from './AvrechimListComp'
import { useState, useEffect } from 'react'
import AddAvrech from './AddAvrech'
import Axios from 'axios'
import SuccessAlert from '../Alerts/SuccessAlert'
import DeleteAlert from '../Alerts/DeleteAlert'
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';

const AvrechimPage = () => {
    const [AvrechimList, setAvrechimList] = useState([])
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);


    const catchData = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5678/api/avrechim")
            setAvrechimList(data)
            console.log(AvrechimList, "AvrechimList1");
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        catchData();
    }, [])

    return (
        <>
            <Box
                sx={{
                    bgcolor: "#f9f9f9", // ⭐ רקע בהיר נקי
                    minHeight: "100vh",
                    py: 5,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 1000,
                        mx: "auto",
                        p: 4,
                        borderRadius: 4,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        backgroundColor: "#ffffff",
                    }}
                >
                    {/* כותרת הדף */}
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            mb: 3,
                            color: "#b71c1c",
                        }}
                    >
                        דף אברכים
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    {/* כפתור הוספת אברך */}
                    <Grid container justifyContent="center" sx={{ mb: 3 }}>
                        <Grid item>
                            <AddAvrech
                                onAdd={catchData}
                                setSuccessAlert={setSuccessAlert}
                                successAlert={successAlert}
                            />
                        </Grid>
                    </Grid>

                    {/* טבלת אברכים */}
                    <AvrechimListComp
                        AvrechimList={AvrechimList}
                        onChange={catchData}
                        setDeleteAlert={setDeleteAlert}
                    />

                    {/* התראות */}
                    <Box sx={{ mt: 3 }}>
                        <SuccessAlert
                            successAlert={successAlert}
                            setSuccessAlert={setSuccessAlert}
                        />
                        <DeleteAlert
                            deleteAlert={deleteAlert}
                            setDeleteAlert={setDeleteAlert}
                        />
                    </Box>
                </Paper>
            </Box>

        </>

    )
}

export default AvrechimPage