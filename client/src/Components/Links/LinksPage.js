import React, { use } from 'react'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { TableCell, TableRow, Table } from '@mui/material';
import AddLink from './AddLink';
import { Link } from 'react-router-dom';
import DeleteDialog from '../GeneralConponents/DeleteDialog';
import CustomSnackbar from '../Alerts/CustomSnackbar';


const LinksPage = () => {

    const [linksList, setLinksList] = useState([])
    const [alert, setAlert] = useState(null);


    const catchData = async () => {
        const { data } = await Axios.get("http://localhost:5678/api/links");
        setLinksList(data);
        console.log(linksList, "linksList");
    }

    useEffect(() => {
        catchData()
    }, [])

    const deleteLink = async (id) => {
        try {
            await Axios.delete(`http://localhost:5678/api/links/${id}`);
            setAlert({ message: "הקישור נמחק בהצלחה 🗑️", type: "success" });
            catchData();
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    return (
        <>
            <AddLink onAdd={catchData} />
            <Table>
                <TableRow>
                    <TableCell>מחיקה </TableCell>
                    <TableCell>תיאור</TableCell>
                    <TableCell>שם אתר</TableCell>
                    <TableCell>לוגו</TableCell>

                </TableRow>
                {linksList.map((link) => (
                    <TableRow>
                        <TableCell><DeleteDialog deleteFunc={deleteLink} itemId={link._id} /></TableCell>
                        <TableCell>{link.description}</TableCell>
                        <TableCell><a href={link.websitelink} target="_blank">{link.websiteName}</a></TableCell>
                        <TableCell><img src={`${link.websiteName}.png`} alt={link.websiteName} style={{ width: '50px', height: '50px' }} /></TableCell>

                    </TableRow>
                ))}
            </Table>
            <CustomSnackbar alert={alert} setAlert={setAlert} />
        </>
    )
}

export default LinksPage