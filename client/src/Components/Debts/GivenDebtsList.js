import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import DebtCard from "./DebtCard";

const GivenDebtsList = ({
  fields,
  givenList,
  onChange,
  showAll,
}) => {
  const [selectedDebt, setSelectedDebt] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const openDebtCard = (debt) => {
    setSelectedDebt(debt);
    setOpen(true);
  };

  return (
    <>
      {/* כותרת עליונה */}
      <Typography
        variant="h6"
        align="center"
        sx={{
          p: 2,
          fontWeight: "bold",
          color: "#b71c1c", // ✅ אדום קבוע
          bgcolor: "#fafafa", // ✅ רקע בהיר רך
          borderBottom: "2px solid #b71c1c",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        חובות שניתנו ע"י הכולל
      </Typography>

      {/* מעטפת הטבלה */}
      <Table
        sx={{
          borderRadius: "12px", // ✅ פינות מעוגלות
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)", // ✅ הצללה עדינה
          width: "100%",
          maxWidth: "1000px",
          mx: "auto", // ✅ ממרכז את הטבלה
          mt: 2,
        }}
      >
        {/* כותרות */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f5f5f5", // ✅ רקע בהיר
              "& th": {
                fontWeight: "bold",
                color: "#444",
                textAlign: "center",
                py: 1.2,
                borderBottom: "2px solid #e0e0e0",
              },
            }}
          >
            <TableCell align="center">?שולם</TableCell>
            {fields.map((field) => (
              <TableCell key={field.name} align="center">
                {field.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* גוף הטבלה */}
        <TableBody>
          {givenList.map((debt) =>
            !debt.paid || showAll ? (
              <TableRow
                key={debt._id}
                hover
                onClick={() => openDebtCard(debt)}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#fff5f5", // ✅ רמז אדום רך בריחוף
                  },
                }}
              >
                {/* תיבת סימון */}
                <TableCell align="center">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={debt.paid}
                      sx={{
                        color: "#b71c1c",
                        "&.Mui-checked": { color: "#b71c1c" },
                      }}
                    />
                  </div>
                </TableCell>

                {/* עמודות הדאטה */}
                {fields.map((field) => (
                  <TableCell
                    key={field.name}
                    align="center"
                    sx={{
                      color: "#b71c1c",
                      fontWeight: 600,
                      borderBottom: "1px solid #f0f0f0",
                      py: 1,
                    }}
                  >
                    {(field.name === "dateBorrowed" || field.name === "dueDate") && debt[field.name] !== undefined
                      ? new Date(debt[field.name]).toLocaleDateString("he-IL")
                      : debt[field.name]}
                    {field.name === "amount" && "₪"}
                  </TableCell>
                ))}
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>

      {/* כרטיס פירוט חוב */}
      <DebtCard
        debtDetails={selectedDebt}
        setOpen={setOpen}
        open={open}
        onChange={onChange}
      />
    </>

  )
};

export default GivenDebtsList;
