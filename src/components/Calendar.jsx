// Package Imports
import React, { useEffect } from 'react';
import moment from 'moment-timezone';

// Material UI
import { TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';

// Component
const Calendar = ({ curInteractives, sendMessage }) => {
  // Effects
  useEffect(() => {
    moment.tz.setDefault(curInteractives.timezone);
  }, [curInteractives.timezone]);

  // Render
  return (
      <div>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            renderInput={(props) => <TextField {...props} />}
            value={moment()}
            default={moment()}
            onChange={(value) =>
              sendMessage(
                moment(value)
                  .tz(curInteractives.timezone)
                  .format('MM/DD/YYYY')
              )
            }
            allowSameDateSelection={true}
          />
        </LocalizationProvider>
      </div>
  );
};
export default Calendar;