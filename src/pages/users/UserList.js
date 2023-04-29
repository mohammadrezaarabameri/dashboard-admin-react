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
            <Modal title={'Change Status'} icon={<EditIcon/>} iD={ params.row.id}>
              <SelectComponent values={values} />
            </Modal>
          </ModalProvider>
            </div>
        <div>
          <ModalProvider>
            <Modal title={'History'} icon={<HistoryIcon/>} >
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

  const {value, setValue} = useModal();

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
        setValue(true);
      });
  }, [rows]);

  useEffect( ()=> {
    if(value) {
      
      alertRef.current.classList.add('show')
    }
  },[value])

  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div className='list'>
        <Stack className="hiden" ref={alertRef} value={value} sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success"   > This is a success alert — check it out!</Alert>
        </Stack>
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
        </div>
      </div>
    </div>
  );
}