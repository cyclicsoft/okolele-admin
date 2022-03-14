import React, { useEffect, useState } from 'react'
import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

function DateValidate(props) {

    // The first commit of Material-UI
    const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
    const [selectedStartTime, setselectedStartTime] = React.useState(new Date());
    const [selectedEndDate, setselectedEndDate] = React.useState(new Date());
    const [selectedEndTime, setselectedEndTime] = React.useState(new Date());

    const {handleStartDate, handleStartTime, handleEndDate, handleEndTime} = props

      //Start Date
    const handleStartDateChange = (date) => {
        console.log(date)
        setselectedStartDate(date);
        handleStartDate(date);
    }
    //Start Time
    const handleStartTimeChange = (date) => {
        setselectedStartTime(date);
        handleStartTime(date);
    }
    //End Date
    const handleEndDateChange = (date) => {
        console.log(date)
        setselectedEndDate(date);
        handleEndDate(date);
    }
    //End Time
    const handleEndTimeChange = (date) => {
        setselectedEndTime(date);
        handleEndTime(date);
    }

    


    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedStartTime}
                        onChange={handleStartTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />

                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedEndTime}
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </>
    )
}

export default DateValidate
