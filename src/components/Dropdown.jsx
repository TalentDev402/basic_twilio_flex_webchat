// Package Imports
import React from 'react';

// Material UI
import {
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

// Consts
const defaultDropdownLabel = 'Please select an option';

// Component
const Dropdown = ({ curInteractives, sendMessage }) => {
  // Render
  return (
    <div>
      <FormControl fullWidth>
        <Select
          labelId="select-label"
          id="select"
          defaultValue={''}
          displayEmpty={true}
          renderValue={(value) =>
            value || curInteractives.dropdownLabel || defaultDropdownLabel
          }
          onChange={(e) => sendMessage(e.target.value)}
        >
          {curInteractives.options.map((o, idx) => (
            <MenuItem key={o.uuid} value={o.value}>
              {o.content}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;