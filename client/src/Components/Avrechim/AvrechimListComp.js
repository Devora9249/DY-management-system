import Axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import AvrechMilgotCard from './AvrechMilgotCard'
import DeleteDialog from '../GeneralConponents/DeleteDialog';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, Typography, TableContainer, Paper } from '@mui/material';

const AvrechimListComp = ({ onChange, AvrechimList }) => {


  const [alert, setAlert] = useState(null);
    console.log(AvrechimList, "AvrechimList2");
    const deleteAvrech = async (id) => {
        try {
            await Axios.delete(`http://localhost:5678/api/avrechim/${id}`);
            setAlert({ message: "האברך נמחק בהצלחה 🗑️", type: "error" });

            onChange();
        } catch (error) {
             setAlert({
                message: error.response?.data?.message || error.message,
                type: "error",
            });
            console.error("שגיאה במחיקת האברך:", error);
        }
    };

    return (

        <Box sx={{ mt: 4 }}>
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: 800,
                    mx: "auto",
                    borderRadius: 3,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                }}
            >
                <Table>
                    {/* כותרות הטבלה */}
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell align="center" sx={{ width: "25%", fontWeight: "bold" }}>
                                מחיקה
                            </TableCell>
                            <TableCell align="center" sx={{ width: "25%", fontWeight: "bold" }}>
                                מלגות
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ width: "25%", fontWeight: "bold", color: "#333" }}
                            >
                                ת.ז.
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ width: "25%", fontWeight: "bold", color: "#333" }}
                            >
                                שם
                            </TableCell>


                        </TableRow>
                    </TableHead>

                    {/* גוף הטבלה */}
                    <TableBody>
                        {AvrechimList.map((avrech) => (
                            <TableRow
                                key={avrech._id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#fff5f5" },
                                    transition: "0.2s",
                                }}
                            >
                                <TableCell align="center" sx={{ width: "25%", }}>
                                    <DeleteDialog
                                        deleteFunc={deleteAvrech}
                                        itemId={avrech._id}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ width: "25%", }}>
                                    <AvrechMilgotCard
                                        avrechId={avrech._id}
                                        avrechName={avrech.name}
                                    />
                                </TableCell>
                                <TableCell align="center" sx={{ width: "25%", }}>{avrech.id}</TableCell>
                                <TableCell align="center" sx={{ width: "25%", fontWeight: 500 }}>
                                    {avrech.name}
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomSnackbar alert={alert} setAlert={setAlert} />
        </Box>
    );
}

export default AvrechimListComp