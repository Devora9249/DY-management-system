import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const DownloadDetailsXL = ({ DonorsList }) => {
  const downloadExcel = () => {
    if (!DonorsList || DonorsList.length === 0) {
      window.alert("אין נתונים להורדה");
      return;
    }

    // מיפוי הנתונים לעברית
   const translatedList = DonorsList.map((donor) => ({
  "שם": donor.name || "",
  "תעודת זהות": donor.donorId || "",
  "כתובת": donor.address || "",
  "טלפון": donor.phoneNumber || "",
  "אימייל": donor.emailAddress || "",
  "וואטסאפ": donor.whatsappNumber || "",
  "תאריך לידה": donor.birthDate
    ? new Date(donor.birthDate).toLocaleDateString("he-IL")
    : "",

  // יארצייטים
  "יארצייטים":
    donor.yahrzeitDate && donor.yahrzeitDate.length > 0
      ? donor.yahrzeitDate
          .map(
            (y) =>
              `${y.name} – ${new Date(y.date).toLocaleDateString("he-IL")}`
          )
          .join(" | ")
      : "אין נתונים",

  // תרומות
  "תרומות":
    donor.donations && donor.donations.length > 0
      ? donor.donations
          .map(
            (d) =>
              `${new Date(d.date).toLocaleDateString("he-IL")}: ${
                d.amount
              }₪ (${d.frequency})`
          )
          .join(" | ")
      : "אין תרומות",

  "סה״כ תרומות": donor.donations
    ? donor.donations.reduce((sum, d) => sum + (d.amount || 0), 0)
    : 0,
}));


    // יצירת קובץ Excel
    const worksheet = XLSX.utils.json_to_sheet(translatedList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "תורמים");

    // כתיבה לקובץ והורדה
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "רשימת_תורמים.xlsx");
  };

  return (
    <Button
      variant="addButton"
      onClick={downloadExcel}
    >
      ⬇️ הורד כאקסל 
    </Button>
  );
};

export default DownloadDetailsXL;
