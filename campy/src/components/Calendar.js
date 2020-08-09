import 'date-fns';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Button,
    TextField
} from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import Axios from 'axios';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function CalendarMaterialUIPickers() {
    // The first commit of Material-UI
    const { id } = useParams();
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [locationCalendar, setLocationCalendar] = React.useState(undefined);

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = date => {
        setSelectedEndDate(date);
    }

    const getLocationCalendar = async () => {
        let dates = await fetch(`http://localhost:5000/locations/${id}/calendar/`);
        let json = await dates.json();
        return json;
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="End Date"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
            <Grid>
                <Button variant="contained" color="primary" onClick={() => console.log(getLocationCalendar())}>Submit</Button>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
