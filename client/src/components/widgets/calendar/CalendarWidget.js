import { Calendar } from 'antd'
import React, { useState } from 'react'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';


const CalendarWidget = () => {
    const [date, setDate] = useState(new Date());
    const bookings = useSelector((state) => state.experiences.bookings);
    console.log(bookings)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Grid item xs={12} md={3}>
    <CalendarPicker date={date} />
  </Grid>
  

    </LocalizationProvider>
  )
}

export default CalendarWidget