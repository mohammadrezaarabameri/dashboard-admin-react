import React, { createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// export const SnackbarContext = React.createContext({value: {
//     open: false,
//     vertical: 'top',
//     horizontal: 'left',
//     severity: "info",
//     duration: 5000
//   }, setValue: () => {}})

// export const SnackbarProvider = ({children}) => {
//     let [value, setValue] = React.useState({
//         open: false,
//         vertical: 'top',
//         horizontal: 'left',
//         severity: "info",
//         duration: 5000
//       });

//     return <SnackbarContext.Provider value={{value, setValue}}>{children}</SnackbarContext.Provider>
// }

// export const useSnackbar = () => {
//     return React.useContext(SnackbarContext);
// }

const SnackbarContext = createContext({value:'', setValue: (()=>{})});

export const SnackbarProvider = ({ children }) => {
  let [value, setValue] = useState({
    open: false,
    vertical: "top",
    horizontal: "left",
    severity: "info",
    duration: 5000,
  });

  const { vertical, horizontal, open, severity, duration, message } = value;

  const handleOpen = (message) => {
    setValue({ open: true, message: message, ...value });
  };

  const handleClose = () => {
    setValue({ ...value, open: false });
  };

  const contextValue = {
    handleOpen: handleOpen,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={duration}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;