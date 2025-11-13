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
      <Box >
        {/* חובות שנלקחו */}
        <Box     >
          <TakenDebtsList
            fields={fields}
            takenList={takenDebts}
            onChange={onChange}
            showAll={showAll}
          />
        </Box>

        {/* חובות שניתנו */}
        <Box  >
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
