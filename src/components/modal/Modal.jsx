import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { apiRoutes } from "../../api/api";
import axios from "axios";
import { useModal } from '../../context/ModalContext/ModalContext';
import ButtonLaoding from '../button/Button';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function Modal({children, ...otherProps}) {

  const { icon, title, iD } = otherProps;

  const [open, setOpen] = React.useState(false);

  const { value, setValue } = useModal();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCallback = (e) => {
    e.preventDefault();
    
    const data = {
      id: iD,
      status: value,
    };
    sendChangeStatus(data);
  };

  const sendChangeStatus = (reqData) => {
    const token = localStorage.getItem("token");

    axios
      .post(apiRoutes.status.changeStatus, {
        ...reqData,
      }, { headers: {
        Authorization: `Bearer ${token}`,
      }},)
      .then((res) => {
        console.log(res);
        let { data } = res;
        if (data.result.message && data.error == null) {
          setOpen(false);
        }
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {icon}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <div onClick={saveCallback}>
            <ButtonLaoding />
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}