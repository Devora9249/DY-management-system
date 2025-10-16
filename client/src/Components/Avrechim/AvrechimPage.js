import React from 'react'
import AvrechimListComp from './AvrechimListComp'
import { useState, useEffect } from 'react'
import AddAvrech from './AddAvrech'
import Axios from 'axios'
import SuccessAlert from '../Alerts/SuccessAlert'
import DeleteAlert from '../Alerts/DeleteAlert'

const AvrechimPage = () => {
    const [AvrechimList, setAvrechimList] = useState([])
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    

    const catchData = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5678/api/avrechim")
            setAvrechimList(data)
            console.log(AvrechimList,"AvrechimList1");
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        catchData();
    }, [])

    return (
        <>
            <div>AvrechimPage</div>
            <AddAvrech onAdd={catchData} setSuccessAlert={setSuccessAlert} successAlert={successAlert}/>
            <AvrechimListComp AvrechimList={AvrechimList} onChange={catchData} setDeleteAlert={setDeleteAlert}/>
            <SuccessAlert successAlert={successAlert} setSuccessAlert={setSuccessAlert} />
            <DeleteAlert deleteAlert={deleteAlert} setDeleteAlert={setDeleteAlert} />
        </>

    )
}

export default AvrechimPage