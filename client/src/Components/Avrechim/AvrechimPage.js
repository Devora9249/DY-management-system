import React from 'react'
import AvrechimListComp from './AvrechimListComp'
import { useState, useEffect } from 'react'
import AddAvrech from './AddAvrech'
import Axios from 'axios'

const AvrechimPage = () => {
    const [AvrechimList, setAvrechimList] = useState([])

    const catchData = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5678/api/avrechim")
            setAvrechimList(data)
            console.log(AvrechimList,"AvrechimList1");
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        catchData();
    }, [])

    return (
        <>
            <div>AvrechimPage</div>
            <AddAvrech onAdd={catchData} />
            <AvrechimListComp AvrechimList={AvrechimList} />
        </>

    )
}

export default AvrechimPage