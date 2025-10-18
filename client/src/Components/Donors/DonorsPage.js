// import React from 'react'
// import DonorsList from './DonorsList'
// import { useState, useEffect } from 'react'
// import AddDonor from './AddDonor'
// import Axios from 'axios'
// import SuccessAlert from '../Alerts/SuccessAlert'
// import DeleteAlert from '../Alerts/DeleteAlert'

// const AvrechimPage = () => {
//      const [donorsList, setDonorsList] = useState([]);
//     const [successAlert, setSuccessAlert] = useState(false);
//     const [deleteAlert, setDeleteAlert] = useState(false);
    

//   const catchData = async () => {
//     try {
//       const { data } = await Axios.get("http://localhost:5678/api/donors");
//       setDonorsList(data);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   useEffect(() => {
//     catchData();
//   }, []);

//     return (
//         <>
//             <div>DonorsPage</div>
//             <AddDonor onAdd={catchData} setSuccessAlert={setSuccessAlert} successAlert={successAlert}/>
//             <DonorsList DonorsList={DonorsList} onChange={catchData} setDeleteAlert={setDeleteAlert}/>
//             <SuccessAlert successAlert={successAlert} setSuccessAlert={setSuccessAlert} />
//             <DeleteAlert deleteAlert={deleteAlert} setDeleteAlert={setDeleteAlert} />
//         </>

//     )
// }

// export default AvrechimPage