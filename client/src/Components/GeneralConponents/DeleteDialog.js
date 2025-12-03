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
      <IconButton onClick={handleClickOpen} variant="iconButton">
        <DeleteIcon />
      </IconButton>

      {/* דיאלוג */}
      <Dialog
        open={open}
        onClose={handleClose}>
        {/* כותרת עם אייקון אזהרה */}
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <WarningAmberRoundedIcon sx={{ color: "#b71c1c", fontSize: 28 }} />
            <Typography> אישור מחיקה</Typography>
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
            onClick={handleClose} >
            ביטול
          </Button>

          <Button
            onClick={handleCloseAndDelete}
            variant="contained"
            autoFocus
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
