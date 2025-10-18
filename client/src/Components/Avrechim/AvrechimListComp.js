import Axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import AvrechMilgotCard from './AvrechMilgotCard'
import DeleteDialog from '../GeneralConponents/DeleteDialog';

const AvrechimListComp = ({ onChange, AvrechimList, setDeleteAlert }) => {


    console.log(AvrechimList, "AvrechimList2");
    const deleteAvrech = async (id) => {
        try {
            await Axios.delete(`http://localhost:5678/api/avrechim/${id}`);
            setDeleteAlert(true);
            onChange();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div>AvrechimList</div>

            <Table>
                {/* כותרות הטבלה */}
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>ת.ז.</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>שם</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}></TableCell>


                    </TableRow>
                </TableHead>

                <TableBody>
                    {AvrechimList.map((avrech) => (
                        <TableRow key={avrech._id} hover>
                            <TableCell>{avrech.id} </TableCell>
                            <TableCell>{avrech.name}</TableCell>
                            <TableCell><AvrechMilgotCard avrechId={avrech._id} avrechName={avrech.name} /></TableCell>
                            <TableCell> <DeleteDialog deleteFunc={deleteAvrech} itemId={avrech._id}/> </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>


    )
}

export default AvrechimListComp