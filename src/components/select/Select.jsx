import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useModal } from '../../context/ModalContext/ModalContext';

export default function SelectComponent(props) {
    const { value, setValue } = useModal();
    const { values } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
      <FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
       <InputLabel id="demo-simple-select-standard-label">Select Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label="Select Status"
          inputProps={{ 'aria-label': 'status' }}
        >
            {values.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
  );
}