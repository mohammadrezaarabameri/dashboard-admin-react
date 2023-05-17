import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { apiRoutes } from "../../api/api";
import axios from "axios";
import { useModal } from "../../context/ModalContext/ModalContext";
import ButtonLaoding from "../button/Button";
import "./Modal.css";

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

const changeAssetOwner = async ( reqData ) => {
  const token = localStorage.getItem("token");
  await axios
  .post(apiRoutes.changeOwner.ownerShip, reqData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    let { data } = res;
    console.log(data) 
  })
}


export default function Modal({ children, ...otherProps }) {
  const { icon, title, id, price } = otherProps;

  const [open, setOpen] = React.useState(false);

  const { value, setValue } = useModal();
  
  const username = localStorage.getItem("username");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCallback = (e) => {
    e.preventDefault();
      if (username === 'username@OrgD2'){
 
    const priceData = {
      id: id,
      price: price.props.value,
    }
    setAssetPrice(priceData);
    console.log(priceData);
  }
  else {
    const data = {
      id: id,
      status: value,
    };
    sendChangeStatus(data);
  }
  };

  const sendChangeStatus = async (reqData) => {
    const token = localStorage.getItem("token");

    if (reqData.status.toLowerCase() === "warehouse") {
      const assetOwnerData = {
        id: reqData.id,
        newOwner: "username@OrgD2"
      }
      await changeAssetOwner(assetOwnerData);
    }

    await axios
      .post(
        apiRoutes.status.changeStatus,
        {
          ...reqData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        let { data } = res;
        if (data.result.message && data.error == null) {
          setOpen(false);
        }
      });


  };

  const setAssetPrice = (reqData)=>{
    const token = localStorage.getItem("token");
    axios
    .post(
      apiRoutes.asset.setAssetPrice,
      {
        ...reqData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      let { data } = res;
      if (data.result.message && data.error == null) {
        setAssetPublicToSale();
      }
    });
  }

  const setAssetPublicToSale = ()=>{
    const token = localStorage.getItem("token");
    const data = {
      assetId : id,
      price : value,
    }
    axios
    .post(
      apiRoutes.asset.setAssetToSale,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      let { data } = res;
      if (data.result.message && data.error == null) {
        setOpen(false);
      }
    });
  }

  return (
    <div>
      <Button
        style={{ border: "none", color: "black" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {icon}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>{username === 'username@OrgD2'? price : children}</DialogContent>
        <DialogActions className="buttonModal">
          <Button autoFocus onClick={handleClose} className="buttonCancel">
            Cancel
          </Button>
          <div onClick={saveCallback}>
            <ButtonLaoding nameButton={"save"} />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
