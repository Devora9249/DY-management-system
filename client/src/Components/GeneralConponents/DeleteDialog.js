import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Box, Typography } from '@mui/material';

export default function AlertDialog({ deleteFunc, itemId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndDelete = () => {
    deleteFunc(itemId);
    setOpen(false);
  };

  return (

    <React.Fragment>
      {/* כפתור מחיקה */}
      <IconButton
        onClick={handleClickOpen}
        sx={{
          color: "#b71c1c",
          "&:hover": { color: "#a31515", backgroundColor: "#ffe6e6" },
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* דיאלוג */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            bgcolor: "#fafafa",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            minWidth: 350,
          },
        }}
      >
        {/* כותרת עם אייקון אזהרה */}
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <WarningAmberRoundedIcon sx={{ color: "#b71c1c", fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold" color="#b71c1c">
              אישור מחיקה
            </Typography>
          </Box>
        </DialogTitle>

        {/* טקסט הדיאלוג */}
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              fontSize: "16px",
              color: "#444",
              mt: 1,
            }}
          >
            ?האם אתה בטוח שברצונך למחוק רשומה זו
          </DialogContentText>
        </DialogContent>

        {/* כפתורים */}
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              px: 3,
              borderColor: "#b71c1c",
              color: "#b71c1c",
              "&:hover": { backgroundColor: "#fff5f5", borderColor: "#a31515" },
            }}
          >
            ביטול
          </Button>

          <Button
            onClick={handleCloseAndDelete}
            variant="contained"
            sx={{
              px: 3,
              backgroundColor: "#b71c1c",
              "&:hover": { backgroundColor: "#a31515" },
              fontWeight: "bold",
            }}
            autoFocus
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
