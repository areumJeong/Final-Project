import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function OptionDropdown({ option, handleQuantityChange, decreaseQuantity, increaseQuantity }) {
  const [showControls, setShowControls] = useState(false);

  return (
    <Box key={option.option} marginBottom={1}>
      <Select
        value=''
        onChange={(e) => {
          setShowControls(true);
          handleQuantityChange(option.option, parseInt(e.target.value));
        }}
      >
        {[...Array(option.count).keys()].map(num => (
          <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
        ))}
      </Select>
      {showControls && (
        <Box display="flex" alignItems="center" marginBottom={1}>
          <span>{option.option} {option.count}</span>
          <Button onClick={() => decreaseQuantity(option.option)}>-</Button>
          <Input
            value={option.count}
            readOnly
          />
          <Button onClick={() => increaseQuantity(option.option)}>+</Button>
        </Box>
      )}
    </Box>
  );
}