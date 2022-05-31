import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snack({message,handleOpen,handleClose}) {
  const [open, setOpen] = React.useState(false);




  const action = (
    <React.Fragment>
      <Button className='name-alert-close-button' color="secondary" size="small" onClick={handleClose}>
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>

      <Snackbar className="alert" open={handleOpen} autoHideDuration={6000} onClose={(event,reason)=>{
        handleClose(event,reason)

      }} message={message} anchorOrigin={ {vertical:"bottom",horizontal:"right"} } action={action} autoHideDuration={2000}/>
    
    </Stack>
  );
}