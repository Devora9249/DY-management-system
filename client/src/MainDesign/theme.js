import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b71c1c",
      light: "#d84a4a",
      dark: "#7f0000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },

  shape: {
    borderRadius: 14, // ⭐ אחידות פינות עגולות
  },

  typography: {
    fontFamily: "Rubik, Arial",
    h6: { fontWeight: 700 },
    button: { fontWeight: 600 },
  },

  components: {
    // ⭐ כפתורים
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 18px",
          borderRadius: 14,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        },
        contained: {
          backgroundColor: "#b71c1c",
          "&:hover": {
            backgroundColor: "#a31515",
          },
        },
      },
    },

    // ⭐ שדות טקסט
    MuiTextField: {
      styleOverrides: {
        root: { marginBottom: "16px" },
      },
    },

    // ⭐ טבלאות
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#ffe6e6",
          color: "#b71c1c",
          fontWeight: 700,
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#fff2f2",
          },
        },
      },
    },

    // ⭐ כרטיסים / דיאלוגים
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: 18,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        },
      },
    },

    // ⭐ דיאלוגים
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          padding: "10px",
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#b71c1c",
          fontWeight: 700,
          paddingBottom: 0,
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: "10px",
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "10px 24px",
        },
      },
    },

    // ⭐ איקונים
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#b71c1c",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#b71c1c",
        },
      },
    },

    // ⭐ טיפוגרפיה – טקסט אחיד
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#333",
        },
      },
    },

    // ⭐ Grid — רווחים רכים
    MuiGrid: {
      styleOverrides: {
        root: {
          padding: "4px",
        },
      },
    },

    // ⭐ Box – שום override כדי שלא יתנגש
    MuiBox: {
      styleOverrides: {},
    },
  },
});

export default theme;
