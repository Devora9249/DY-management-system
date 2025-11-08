import { useEffect, useState } from "react";
import { TableContainer, Paper, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import TakenDebtsList from "./TakenDebtsList";
import GivenDebtsList from "./GivenDebtsList";

const DebtsList = ({ takenDebts, givenDebts, onChange, showAll }) => {
  const [alert, setAlert] = useState(null);

  const fields = [
    { label: "תיאור", name: "description" },
    { label: "תאריך פרעון", name: "dueDate" },
    { label: "תאריך הלוואה", name: "dateBorrowed" },
    { label: "סכום", name: "amount" },
    { label: "מלווה", name: "lender" },
    { label: "לווה", name: "borrower" },
  ];

  return (
    <>
      {/* חלוקה לשני חלקים */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          p: 1,
        }}
      >
        {/* חובות שנלקחו */}
        <Box
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            p: 2,
            transition: "0.3s",
            "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.08)" },
          }}
        >
          <TakenDebtsList
            fields={fields}
            takenList={takenDebts}
            onChange={onChange}
            showAll={showAll}
          />
        </Box>

        {/* חובות שניתנו */}
        <Box
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            p: 2,
            transition: "0.3s",
            "&:hover": { boxShadow: "0 4px 14px rgba(0,0,0,0.08)" },
          }}
        >
          <GivenDebtsList
            fields={fields}
            givenList={givenDebts}
            onChange={onChange}
            showAll={showAll}
          />
        </Box>
      </Box>

      {/* הודעות Snackbar */}
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </>
  );
};

export default DebtsList;
