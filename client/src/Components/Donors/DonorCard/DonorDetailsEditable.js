import {TableContainer, TableHead ,Paper, Table, TableBody, TableRow, TableCell, TextField, Typography } from "@mui/material";

export default function DonorDetailsEditable({ donorData, setDonorData, isEditing }) {
  const fields = [
    { key: "name", label: "שם" },
    { key: "donorId", label: "ת.ז" },
    { key: "address", label: "כתובת" },
    { key: "phoneNumber", label: "פלאפון" },
    { key: "emailAddress", label: "מייל" },
    { key: "whatsappNumber", label: "וואצאפ" },
    { key: "birthDate", label: "תאריך לידה", type: "date" },
  ];

  const handleFieldChange = (field, value) => {
    setDonorData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ p: 1 }}>פרטי תורם</Typography>

    <TableContainer component={Paper}>

        <Table>

        <TableHead>
          <TableRow>
            <TableCell>ערך</TableCell>
            <TableCell>שדה</TableCell>
 
          </TableRow>
        </TableHead>

          <TableBody>
            {fields.map((f) => (
              <TableRow key={f.key} hover sx={{ height: "80px", margin: "0", padding: "0" }}>
                <TableCell sx={{ width: "60%", margin: "0" }}>
                  {isEditing ?
                    (
                      <TextField
                        variant="standard"
                        type={f.type || "text"}
                        InputLabelProps={f.type === "date" ? { shrink: true } : undefined}
                        value={donorData?.[f.key] || ""}
                        onChange={(e) => handleFieldChange(f.key, e.target.value)}
                        sx={{ margin: "0", padding: "0" }}
                      />
                    )
                    :
                    (
                      f.type === "date"
                        ? (donorData?.[f.key] ? new Date(donorData[f.key]).toLocaleDateString("he-IL") : "-")
                        : (donorData?.[f.key] || "-")
                    )}
                </TableCell>
                <TableCell sx={{ width: "40%", margin: "0", color: "#7f0000" }}>
                  {f.label}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

