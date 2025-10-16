import Axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import AvrechMilgot from './AvrechMilgot'

const AvrechimListComp = ({AvrechimList}) => {


console.log(AvrechimList,"AvrechimList2");

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


                    </TableRow>
                </TableHead>

                <TableBody>
                    {AvrechimList.map((avrech) => (
                        <TableRow key={avrech._id} hover>
                            <TableCell>{avrech.id} </TableCell>
                            <TableCell>{avrech.name}</TableCell>
                            <TableCell><AvrechMilgot avrechId={avrech._id} avrechName={avrech.name}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>


    )
}

export default AvrechimListComp