import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import MilgaRow from "./MilgaRow";

const MilgaTable = ({ AvrechimList, milgaAmounts, setMilgaAmounts, milgaDetails, setMilgaDetails, newDate, sendMilgaById, resetVersion, }) => {
    return (
        <Table >
            <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell > עדכון </TableCell>
                    <TableCell > פירוט </TableCell>
                    <TableCell > סכום  </TableCell>
                    <TableCell >  שם   </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {AvrechimList.map((avrech) => (
                    <MilgaRow
                        key={`${avrech._id}-${resetVersion}`} //  יכריח רינדור מחדש
                        avrech={avrech}
                        milgaAmounts={milgaAmounts}
                        setMilgaAmounts={setMilgaAmounts}
                        milgaDetails={milgaDetails}
                        setMilgaDetails={setMilgaDetails}
                        newDate={newDate}
                        sendMilgaById={sendMilgaById}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default MilgaTable;
