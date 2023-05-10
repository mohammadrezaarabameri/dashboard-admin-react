import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useSnackbar } from '../../context/SnackbarContext/SnackbarContext';



export default function SnackbarComponent() {
    
  const [state, setState] = useSnackbar();
  
  const { vertical, horizontal, open, severity, duration, message } = state;
  

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={duration}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
