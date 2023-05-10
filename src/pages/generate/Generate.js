import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { apiRoutes } from "../../api/api";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Generate.css";
import { margin } from "@mui/system";
import { useRef } from "react";
import ButtonLaoding from "../../components/button/Button";
import { useButtonLoading } from "../../context/ButtonLoadingContext/ButtonLoadingContext";

const batchType = {
  fullBatch: "fullbatch",
  emptyBatch: "emptybatch",
  bulk: "bulk",
};

export default function Generate() {
  const [generate, setGenerate] = useState("fullbatch");
  const [count, setCount] = useState(10);
  const inputRef = useRef(null);
  const tableRef = useRef();
  

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
  ]);

  const [rows, setRows] = useState([]);

  const handleChange = (event) => {
    setGenerate(event.target.value);
  }
  useEffect (()=>{
      console.log(generate);
      switch (generate) {
        case "fullbatch":
          setCount(10);
          inputRef.current.disabled = true;
          return;
  
        case "emptybatch":
          setCount(0);
          inputRef.current.disabled = true;
          return;
  
        case "bulk":
          setCount(1);
          inputRef.current.disabled = false;
          return;
      
    };
  }, [generate])

  const saveCallback = (e) => {
    e.preventDefault();
    setCount(e.target.value);

    switch (generate) {
      case "fullbatch":
        addBatchFull();
        return;

      case "emptybatch":
        console.log("empty");
        addBatchEmpty();
        return;

      case "bulk":
        addBulk(count);
        return;
    }
  };

  const addBatchFull = () => {
    const token = localStorage.getItem("token");

    const data = {
      assetType: "Batch",
      tag: "",
      status: "",
      price: 0,
    };

    axios
      .post(apiRoutes.generate.addBatchFull, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        let { data } = res;
        setRows([...rows, data.result.body]);
        tableRef.current.style.display = "block"
      })
      .catch((err) => console.error(err));
  };

  const addBatchEmpty = () => {
    const token = localStorage.getItem("token");
    const data = {
      tag: "",
      status: "Produced",
      price: 0,
    };

    axios
      .post(apiRoutes.generate.addBatchEmpty, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        let { data } = res;
        setRows([...rows, data.result.body]);
        tableRef.current.style.display = "block"
      });
  };

  const addBulk = (count) => {
    const token = localStorage.getItem("token");
    const reqData = {
      assetType: "Bulk",
      tag: "",
      status: "Produced",
      price: 0,
    };
    const data = {
      count: count,
      ...reqData,
    };
    axios
      .post(apiRoutes.generate.addBulk, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // [1, 2, 3] -> 1, 2, 3
        let { data } = res;
        setRows([...rows, ...data.result.body]);
        tableRef.current.style.display = "block"
      });
  };

  return (
    <div>
      <Topbar />
      <div className="row">
        <Sidebar />
        <div className="list">
          <div className="generate">
            <div className="generateItem">
              <span className="generateTittle">Generate Product</span>
              <div className="generateContainer">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <div className="lable">
                  <label style={{color: "#ffffff", padding: "10px"}}>Type</label>
                  <Select
                    sx={{ width: "12rem" }}
                    className="select"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={generate}
                    onChange={handleChange}
                  >
                    <MenuItem value="fullbatch">fullbatch</MenuItem>
                    <MenuItem value="bulk">bulk</MenuItem>
                    <MenuItem value="emptybatch">emptybatch</MenuItem>
                  </Select>
 
                  </div>
                  <div className="generateInput">
                    <label style={{color: "#ffffff", padding: "10px"}}>count </label>
                    <input type="number" className="inputCount" value={count} ref={inputRef} disabled />
                  </div>
                </FormControl>
              </div>
                  <div className="generateSubmit" onClick={saveCallback}>
                    <ButtonLaoding nameButton={"create"} backgroundColor={"#000"} />
                  </div>
            </div>
          </div>
          <div style={{display: "none"}} ref={tableRef}>
            <Container sx={{ height: 300, width: "80%", marginTop: 5 }}>
              <DataGrid
                style={{ color: "#ffffff" }}
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
    </div>
  );
}
