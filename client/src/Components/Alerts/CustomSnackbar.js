import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function InnerSnackbar({ alert, setAlert }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (alert?.message) {
      enqueueSnackbar(alert.message, {
        variant: alert.type || "default", // success | error | info | warning
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} color="inherit" size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        ),
        style: {
          backgroundColor:
            alert.type === "success"
              ? "#43a047"
              : alert.type === "error"
              ? "#e53935"
              : alert.type === "info"
              ? "#1e88e5"
              : "#fbc02d",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
        },
      });

      // איפוס אחרי הצגה
      setTimeout(() => setAlert(null), 2500);
    }
  }, [alert]);

  return null;
}

export default function CustomSnackbar({ alert, setAlert }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <InnerSnackbar alert={alert} setAlert={setAlert} />
    </SnackbarProvider>
  );
}
