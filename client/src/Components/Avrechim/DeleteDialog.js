import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';    

export default function AlertDialog({ deleteAvrech, avrechId }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleCloseAndDelete = () => {
    deleteAvrech(avrechId);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           האם אתה בטוח שברצונך למחוק את האברך הזה?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button  onClick={handleCloseAndDelete} autoFocus>    
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
