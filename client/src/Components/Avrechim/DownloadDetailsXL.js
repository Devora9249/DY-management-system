import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import CustomSnackbar from "../Alerts/CustomSnackbar";
import { useState } from "react";
const DownloadDetailsXL = ({ AvrechimList }) => {
  const [alert, setAlert] = useState(null);

  const downloadExcel = () => {
    if (!AvrechimList || AvrechimList.length === 0) {
      setAlert({ type: 'warning', message: 'אין נתונים להורדה' });
      return;
    }

    // מיפוי הנתונים לעברית
    const translatedList = AvrechimList.map((avrech) => ({
      "שם": avrech.name || "",
      "תעודת זהות": avrech.id || "",
      "טלפון": avrech.phoneNumber || "",
      "כתובת": avrech.address || "",
      "אימייל": avrech.emailAddress || "",
      "שם אישה": avrech.womenName || "",
      "טלפון אישה": avrech.womenPhoneNumber || "",
      "כתובת אימייל אישה": avrech.emailAddress || "",
      "בנק": avrech.bankName || "",
      "סניף": avrech.branchNumber || "",
      "מספר חשבון": avrech.accountNumber || "",
      "סטטוס": avrech.active ? "פעיל" : "לא פעיל",
      "מלגות אחרונות":
        avrech.lastMilgot && avrech.lastMilgot.length > 0
          ? avrech.lastMilgot.map((m) => `${m.date}: ${m.amount}₪`).join(" | ")
          : "אין נתונים",
    }));

    // יצירת קובץ Excel
    const worksheet = XLSX.utils.json_to_sheet(translatedList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "אברכים");

    // כתיבה לקובץ והורדה
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "רשימת_אברכים.xlsx");
  };

  return (
    <>
      <Button
        variant="addButton"
        onClick={downloadExcel}
      >
        ⬇️ הורד כאקסל
      </Button>
      <CustomSnackbar alert={alert} setAlert={setAlert} />
    </>
  );
};

export default DownloadDetailsXL;
