import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import MilgaRow from "./MilgaRow";

const MilgaTable = ({
    AvrechimList,
    milgaAmounts,
    setMilgaAmounts,
    milgaDetails,
    setMilgaDetails,
    newDate,
    sendMilgaById,
    resetVersion,
    setAlert
}) => {
    return (
        <Table
            sx={{
                "& .MuiTableCell-root": { py: 0.8, px: 1.5 },
            }}
        >
            <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        עדכון
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        פירוט
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        סכום
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        שם
                    </TableCell>
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
