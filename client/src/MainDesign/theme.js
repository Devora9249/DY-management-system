import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b71c1c",
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
    borderRadius: 5,
  },

  typography: {
    fontFamily: "Rubik, Arial",

    h5: {
      fontSize: "25px",
      color: "#7f0000",
      fontWeight: 700,
      display: "block",
      textAlign: "center",
      margin: "16px",
    },

    h6: {
      fontSize: "16px",
      color: "black",
      fontWeight: 600,
      textAlign: "center",
    },

    h1: {
      fontSize: "20px",
      color: "#7f0000",
      fontWeight: 700,
      display: "block",
      textAlign: "center",
    }
  },

  components: {

    // כפתורים
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 18px",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          display: "block"
        },

        contained: {
          backgroundColor: "#b71c1c",
          "&:hover": {
            backgroundColor: "#a31515",
          },
        },
      },

      variants: [
        {
          props: { variant: "addButton" },
          style: {
            backgroundColor: "#b71c1c",
            color: "#ffffff",
            margin: "16px",
            "&:hover": {
              backgroundColor: "#7f0000",
            },
          },
        },

        {
          props: { variant: "miniButton" },
          style: {
            backgroundColor: "background.paper",
            color: "#b71c1c",
            margin: "16px",
            border: "2px solid #b71c1c",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)"
            },
          },
        },

        {
          props: { variant: "activeButton" },
          style: {
            backgroundColor: "background.paper",
            color: "#b71c1c",
            // margin: "16px",
            border: "2px solid #b71c1c",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(255, 245, 245, 1)"
            },
          },
        },

        {
          props: { variant: "iconButton" },
          style: {
            bgcolor: "#ffe6e6",
            "&:hover": { bgcolor: "#ffcccc" },
          },
        },
      ],





    },

    // שדות טקסט
    MuiTextField: {
      defaultProps: {
        multiline: true,
        minRows: 1,
        maxRows: 8,
      },

      styleOverrides: {
        root: {
          margin: "16px",
        },
      },

      variants: [
        {
          props: { variant: "descriptionField" },
          style: {
            "& .MuiInputBase-root": {
              maxHeight: "200px",
              overflowY: "auto",
            },
            "& textarea": {
              resize: "vertical",
            }
          }
        }
      ]
    },

    // טבלאות
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
          textAlign: "center",
        },
        root: {
          textAlign: "center",
        },
      },
      variants: [
        {
          props: { variant: "cellDivider" },
          style: {
            width: "0.8px",
            backgroundColor: "#cfcbcbff",
            padding: 0
          }
        }
      ]
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "whiteSmoke",
          },
        },
      },
    },

    // Paper
    MuiPaper: {
      styleOverrides: {
        root: {

        },
      },

      variants: [
        {
          props: { variant: "mainPaper" },
          style: {
            width: "100%",
            borderRadius: 0,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        },
        {
          props: { variant: "tablePaper" },
          style: {
            width: "50%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "16px",
            borderRadius: 12,
            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            backgroundColor: "#ffffff",
            marginBottom: "40px"
          },
        },
      ],
    },

    // Cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transition: "0.25s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },

      variants: [
        {
          props: { variant: "donorCard" },
          style: {
            borderRadius: 20,
            border: "1.5px solid #b71c1c",
            boxShadow: "0 4px 14px rgba(31, 31, 31, 0.15)",
            padding: "12px",
            backgroundColor: "#fffafafa",
            cursor: "pointer",
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          },
        },
        {
          props: { variant: "linkCard" },
          style: {
            height: "100%",
            textAlign: "center",
            padding: "16px",
            borderRadius: "14px",
            "&:hover": {
              transform: "translateY(-5px)",
              transition: "0.3s",
            },
          },
        },
      ],
    },

    // דיאלוגים
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: "10px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          width: "25vw",
        },
      },
      defaultProps: {
        // width: "40vw",
        // maxWidth: "sm",
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          textAlign: "center",
          fontWeight: "bold",
          color: "#b71c1c",
          fontSize: "1.25rem",
          padding: "18px 16px 10px",
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          // padding: "24px",
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },

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

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#333",
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          padding: "4px",
        },
      },
    },

    // MuiBox: {
    //   styleOverrides: {
    //     root: {
    //       display: "flex",
    //     },
    //   },
    // },

  },

});

export default theme;
