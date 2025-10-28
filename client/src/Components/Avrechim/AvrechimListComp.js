import Axios from 'axios'
import { useState } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import AvrechMilgotCard from './AvrechMilgotCard'
import DeleteDialog from '../GeneralConponents/DeleteDialog';
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, TableContainer, Paper } from '@mui/material';
import AvrechCard from './AvrechCard'

const AvrechimListComp = ({ onChange, AvrechimList, showAll }) => {
console.log(showAll, "showAll");


  const [alert, setAlert] = useState(null);
  const [selectedAvrech, setSelectedAvrech] = useState({})
  const [open, setOpen] = useState(false);
  
  
    const openAvrechCard = (avrech)=>{
        setSelectedAvrech(avrech)
        setOpen(true)
    }

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
                    cursor: "pointer"                }}
            >
                <Table>
                    {/* כותרות הטבלה */}
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
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
                                sx={{ width: "25%", fontWeight: "bold", color: "#333" }}>
                                שם
                            </TableCell>


                        </TableRow>
                    </TableHead>

                    {/* גוף הטבלה */}
                    <TableBody>
                        {AvrechimList.map((avrech) => (                            
                            // <Link >
                            avrech.active || showAll ? (
                            <TableRow
                                key={avrech._id}
                                hover
                                onClick={()=>openAvrechCard(avrech)}
                                sx={{
                                    "&:hover": { backgroundColor: "#fff5f5" },
                                    transition: "0.2s",
                                }}
                            >
                                <TableCell align="center" sx={{ width: "25%", }}>
                                    <div onClick={(e)=>e.stopPropagation()}>
                                        <AvrechMilgotCard
                                        avrechId={avrech._id}
                                        avrechName={avrech.name}
                                    /></div>
                                </TableCell>
                                <TableCell align="center" sx={{ width: "25%", }}>{avrech.id}</TableCell>
                                <TableCell align="center" sx={{ width: "25%", fontWeight: 500 }}>
                                    {avrech.name}
                                </TableCell>
                            </TableRow>
                            ) : null
                            // </Link>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomSnackbar alert={alert} setAlert={setAlert} />
            {selectedAvrech!=null?<AvrechCard avrechDetails={selectedAvrech} setOpen={setOpen} open={open} onChange={onChange}></AvrechCard>:null}
        </Box>
        
    );
}

export default AvrechimListComp