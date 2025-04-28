// Package Imports
import React from 'react';

// Material UI
import { Button } from '@mui/material';

// Component
const Buttons = ({ curInteractives, sendMessage }) => {
  // Render
  return (
    <div>
      {curInteractives.options.map((o, idx) => (
        <Button
          key={o.uuid}
          onClick={() => sendMessage(o.value)}
          variant="contained"
        >
          {o.content}
        </Button>
      ))}
    </div>
  );
};

export default Buttons;