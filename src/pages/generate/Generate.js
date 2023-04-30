import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Topbar from '../../components/topbar/topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import { apiRoutes } from '../../api/api';
import { useEffect, useState } from 'react';
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import './Generate.css'
import { margin } from '@mui/system';
import { useRef } from 'react';

export default function Generate () {
    const [generate, setGenerate] = useState('');
    const [count, setCount] = useState('');
    const inputRef = useRef(null)

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
      console.log(generate);
      switch(generate){
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
      }
    };

    const saveCallback = (e) => {
        e.preventDefault();
        setCount(e.target.value);

        switch(generate){
          case "fullbatch":
            addBatchFull();
            return;

          case "emptyBatch":
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
          status: "Produced",
          price: 0,
      };
    
        axios
          .post(apiRoutes.generate.addBatchFull, {
            data,
          }, { headers: {
            Authorization: `Bearer ${token}`,
          }},)
          .then((res) => {
            console.log(res);
            let { data } = res;
            setRows(data.result.body);
          });
      };

      const addBatchEmpty = () => {
        const token = localStorage.getItem("token");
        const data = {
          tag: "",
          status: "Produced",
          price: 0,
      };
    
        axios
          .post(apiRoutes.generate.addBatchEmpty, {
            data,
          }, { headers: {
            Authorization: `Bearer ${token}`,
          }},)
          .then((res) => {
            console.log(res);
            let { data } = res;
            setRows(data.result.body);
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
        ...reqData
      }
        axios
          .post(apiRoutes.generate.addBulk, {
            data,
          }, { headers: {
            Authorization: `Bearer ${token}`,
          }},)
          .then((res) => {
            console.log(res);
            let { data } = res;
            setRows(data.result.body);
          });
      };

      useEffect( ()=>{
console.log(rows)
      },[rows])

  return (
    <div>
         <Topbar />
      <div className="row">
        <Sidebar />
        <div className='list'>
        <div className="generate">
        <div className="generateItem">
            <span className="generateTittle">Generate Producte</span>
        <div className="generateContainer">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label" className='inputSelect'>Select</InputLabel>
      <Select className='select'
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={generate}
        label="Select"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="fullbatch">fullbatch</MenuItem>
        <MenuItem value="bulk">bulk</MenuItem>
        <MenuItem value="emptybatch">emptybatch</MenuItem>
      </Select>
      <div className='generateInput'>
      <input type='number' value={count} ref={inputRef}/>
      </div>
      <div className='generateSubmit'>
      <button type='submit' className='submit' onClick={saveCallback}>create</button>
      </div>
    </FormControl>
        </div>
        </div>
        </div>
        <div>
    <Container sx={{ height: 300, width: "100%", marginTop: 5 }}>
      <DataGrid style={{ color: "#ffffff"}}
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
  )
}
