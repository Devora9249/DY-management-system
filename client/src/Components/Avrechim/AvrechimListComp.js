import { useState } from 'react'
import AvrechMilgotCard from './AvrechMilgotCard'
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { Box, TableContainer, Paper,  Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import AvrechCard from './AvrechCard'

const AvrechimListComp = ({ onChange, AvrechimList, showAll }) => {


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
                    overflow: "hidden",
                    cursor: "pointer"                
                }}
            >
                <Table>
                    {/* כותרות הטבלה */}
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: "25%" }}>
                                מלגות
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ width: "25%" }}>
                                ת.ז.
                            </TableCell>
                            <TableCell
                                align="center"    >
                                שם
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* גוף הטבלה */}
                    <TableBody>
                        {AvrechimList.map((avrech) => (
                            
                            avrech.active || showAll ? (
                            <TableRow
                                key={avrech._id}
                                hover
                                onClick={()=>openAvrechCard(avrech)}
                                sx={{
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
                                <TableCell align="center" sx={{ width: "25%" }} >
                                    {avrech.name}
                                </TableCell>
                            </TableRow>
                            ) : null
                            
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
