import { Calendar } from 'antd'
import React, { useState } from 'react'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';


const CalendarWidget = () => {
    const [date, setDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Grid item xs={12} md={3}>
    <CalendarPicker date={date} />
  </Grid>
  

    </LocalizationProvider>
  )
}

export default CalendarWidget