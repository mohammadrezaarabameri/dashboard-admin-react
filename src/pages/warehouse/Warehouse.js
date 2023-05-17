import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "./warehouse.css";
import { apiRoutes } from "../../api/api";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import { Chip, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "../../components/modal/Modal";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import SelectComponent from "../../components/select/Select";
import TimeLine from "../../components/timeline/TimeLine";
import { produced, wasted, warehouse } from "../../api/Status";
import { ModalProvider } from "../../context/ModalContext/ModalContext";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useModal } from "../../context/ModalContext/ModalContext";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import SnackbarContext from "../../context/SnackbarContext/SnackbarContext";

const values = [
  {
    name: produced.name,
    value: produced.value,
    color: produced.color,
  },
  {
    name: wasted.name,
    value: wasted.value,
    color: wasted.color,
  },
  {
    name: warehouse.name,
    value: warehouse.value,
    color: warehouse.color,
  },
];

export default function Warehouse() {
  const theme = useTheme();

  const [columns, setColumns] = useState([
    {
      field: "SerialNumber",
      headerName: "SerialNumber",
      width: 150,
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 150,
    },
    {
      field: "childesCount",
      headerName: "Quantity",
      type: "number",
      width: 80,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        let colorVal = "";

        if (params.row.status !== "") {
          colorVal = values.filter(
            (item) =>
              item.name.toLowerCase() === params.row.status.toLowerCase()
          )[0].color;
        } else {
          colorVal = produced.color;
        }

        return (
          <Chip
            label={params.row.status ? params.row.status : "Produced"}
            style={{ backgroundColor: `${colorVal}`, color: "#fff" }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <div>
              <ModalProvider>
                <Modal
                  title={"set bid"}
                  icon={
                    <div className="editIcon">
                      {" "}
                      <label className="lablEdit">Edit</label>
                      <EditIcon />
                    </div>
                  }
                  id={params.row.id}
                  price={
                    <input
                    className="inputBid"
                    type="number"
                    value={5}
                    onChange={handleInput}
                    placeholder="enter your bid ..."
                  />
                  }
                >
                </Modal>
              </ModalProvider>
            </div>
            <div>
              <ModalProvider>
                <Modal
                  title={"History"}
                  icon={
                    <div className="historyIcon">
                      {" "}
                      <label className="lablHistory">History</label>
                      <HistoryIcon />
                    </div>
                  }
                >
                  <TimeLine id={params.row.id} />
                </Modal>
              </ModalProvider>
            </div>
          </>
        );
      },
    },
  ]);

  const [rows, setRows] = useState([]);

  const { value, setValue } = useModal();

  const [number, setNumber] = useState();

  const alertRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(apiRoutes.asset.getAssetByOwner, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { data } = res;
        setRows(data.result);
        console.log(data.result);
      });
  }, []);

const handleInput = (e)=>{
  setNumber(e.target.value);
}
  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div className="list">
          <Stack
            className="hiden"
            ref={alertRef}
            sx={{ width: "100%" }}
            spacing={2}
          >
            <Alert severity="success">
              {" "}
              This is a success alert — check it out!
            </Alert>
          </Stack>
          <Box
            sx={{ bgcolor: "background.paper", width: "98%" }}
            style={{ borderRadius: "10px" }}
          >
            <Container sx={{ height: 400, width: "100%" }}>
              <DataGrid
                style={{ color: "#ffffff", borderColor: "black" }}
                rows={rows.filter((item) => item.type.toLowerCase() == "batch")}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Container>
          </Box>
        </div>
      </div>
    </div>
  );
}
