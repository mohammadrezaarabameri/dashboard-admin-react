import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useModal } from '../../context/ModalContext/ModalContext';

export default function SelectComponent(props) {
    const { value, setValue } = useModal();
    const { values } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
      <FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
        <Select
          value={value}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'status' }}
        >
            {values.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
  );
}