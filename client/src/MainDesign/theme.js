// ⭐ src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl", //  RTL
  palette: {
    primary: { main: "#b71c1c" }, //  האדום הקבוע
    secondary: { main: "#a31515" },
    background: { default: "#f9f9f9", paper: "#ffffff" },
    text: { primary: "#333", secondary: "#555" },
  },
  shape: {
    borderRadius: 12, //  פינות עגולות גלובליות
  },
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
    h6: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
  components: {
    //  כפתורים אדומים כברירת מחדל
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#b71c1c",
          "&:hover": { backgroundColor: "#a31515" },
        },
      },
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
    //  שדות עם מסגרת אדומה בהובר/פוקוס
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b71c1c",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b71c1c",
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: "#e0e0e0",
        },
      },
    },
    //  טבלאות: שורת כותרת בהירה
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    //  דיאלוגים
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          border: "1.5px solid #b71c1c",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        },
      },
    },
  },
});

export default theme;
