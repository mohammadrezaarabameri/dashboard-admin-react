import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
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
import "./userList.css";
//import tab
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SnackbarContext from "../../context/SnackbarContext/SnackbarContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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

export default function UserList() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { handleOpen } = useContext(SnackbarContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
        let colorVal = '';
        if (params.row.status !== "") {
          colorVal = values.filter(item => item.name.toLowerCase() === params.row.status.toLowerCase())[0].color
                     
        } else {
          colorVal = produced.color;
        }
        if (params.row.status === 'warehouse'){
          console.log("if");
          const data = {
            id: params.row.id,
            newOwner: "username@OrgD2"
          };
          changeAssetOwner(data);
        }

        return (
          <Chip label={params.row.status ? params.row.status : "Produced"} 
          style={{ backgroundColor: `${colorVal}`, color: '#fff' }}
          
          />
          
          )
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
                  title={"Change Status"}
                  icon={
                    <div className="editIcon">
                      {" "}
                      <label className="lablEdit"></label>
                      <EditIcon style={{color: "#fff"}} />
                    </div>
                  }
                  id={params.row.id}
                >
                  <SelectComponent
                    values={values}
                    style={{ backgroundColor: `${values[0].color}` }}
                  />
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
                      <label className="lablHistory"></label>
                      <HistoryIcon style={{color: "#fff"}} />
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
  const [loading, setLoading] = useState(false);

  const { valuee, setValuee } = useModal();

  const alertRef = useRef();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(apiRoutes.asset.getAssetByOwner, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { data } = res;
        let assets = data.result.filter(item => item.status !== "warehouse")
        setRows(assets);
        console.log(assets);
        setLoading(false);
      });
  }, []);

  const changeAssetOwner = (reqData)=>{
    console.log("owner");
    const token = localStorage.getItem("token");
    axios
    .post(apiRoutes.changeOwner.ownerShip, reqData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      let { data } = res;
    })
  }


  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div className="list">
          {loading &&
                <div className="container">

    <div className="loader">
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
    </div>
  </div>
          }
          {!loading && 
          <>
          <Stack
            className="hiden"
            ref={alertRef}
            value={valuee}
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
            <AppBar position="static">
              <Tabs
                style={{ backgroundColor: "rgb(18, 14, 22)" }}
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="full width tabs example"
              >
                <Tab label="Batch " {...a11yProps(0)} />
                <Tab label="Item " {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                style={{ backgroundColor: "#000000" }}
              >
                <Container sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    style={{ color: "#ffffff",    borderColor: "black"}}
                    rows={rows.filter(item => item.type.toLowerCase() == "batch")}
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
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Container sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    style={{ color: "#ffffff" }}
                    rows={rows.filter(item => item.type.toLowerCase() == "asset")}
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
              </TabPanel>
            </SwipeableViews>
          </Box>
          </>
          }
        </div>
      </div>
    </div>
  );
}
