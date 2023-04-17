import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiRoutes } from "../../api/api";
import { jsx, css, Global, ClassNames } from "@emotion/react";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "../../components/modal/Modal";
import EditIcon from '@mui/icons-material/Edit';
import SelectComponent from "../../components/select/Select";
import { produced, wasted, warehouse } from "../../api/Status";
import { ModalProvider } from "../../context/ModalContext/ModalContext";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";

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
          <ModalProvider>
            <Modal title={'Change Status'} icon={<EditIcon />} id={ params.row.id}>
              <SelectComponent values={values} />
            </Modal>
          </ModalProvider>
        )
      }
    },
  ]);

  const [rows, setRows] = useState([]);
  

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
      });
  }, []);

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
      });
  }, [rows]);

  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div>
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