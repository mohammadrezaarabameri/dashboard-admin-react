import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { apiRoutes } from "../../api/api";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "../../components/modal/Modal";
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import SelectComponent from "../../components/select/Select";
import TimeLine from "../../components/timeline/TimeLine";
import { produced, wasted, warehouse } from "../../api/Status";
import { ModalProvider } from "../../context/ModalContext/ModalContext";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useModal } from "../../context/ModalContext/ModalContext";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './userList.css'
//import tab
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const values = [
  {
    name: produced.name,
    value: produced.value
  },
  {
    name: wasted.name,
    value: wasted.value
  },
  {
    name: warehouse.name,
    value: warehouse.value
  }
]

export default function UserList() {

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
        return ( params.row.status ? params.row.status : "Produced" ) }
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <>
          <div>
          <ModalProvider>
            <Modal title={'Change Status'} icon={<EditIcon  />} iD={ params.row.id}>
              <SelectComponent values={values} />
            </Modal>
          </ModalProvider>
            </div>
        <div>
          <ModalProvider>
            <Modal title={'History'} icon={<HistoryIcon  />} >
              <TimeLine iD={ params.row.id}/>
             </Modal>
          </ModalProvider>
        </div>
         </>
        )
      }
    },
  ]);

  const [rows, setRows] = useState([]);

  const {valuee, setValuee} = useModal();

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
        setValuee(true);
      });
  }, [rows]);

  useEffect( ()=> {
    if(valuee) {
      
      alertRef.current.classList.add('show')
    }
  },[valuee])

  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div className='list'>
        <Stack className="hiden" ref={alertRef} value={valuee} sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success"   > This is a success alert — check it out!</Alert>
        </Stack>
        <Box sx={{ bgcolor: 'background.paper', width: '98%' }}>
      <AppBar position="static">
        <Tabs style={{backgroundColor: "#613fe5"}}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Container sx={{ height: 400, width: "100%" }}>
      <DataGrid 
        rows={rows}
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
        rows={rows}
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

        </div>
      </div>
    </div>
  );
}