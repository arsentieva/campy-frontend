import 'date-fns';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Button,
    TextField
} from '@material-ui/core'
import url from '../config';
import DateFnsUtils from '@date-io/date-fns';
import { CampyContext } from "../CampyContext";
import { ErrorNotice } from "./ErrorNotice";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function CalendarMaterialUIPickers() {
    // The first commit of Material-UI
    const { id } = useParams();
    const {getUser, authAxios } = useContext(CampyContext);   
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [locationCalendar, setLocationCalendar] = React.useState(undefined);
    const [message, setMessage] = React.useState(undefined)
    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const formatDate = date => {
        let fdate = date.toLocaleDateString("en-US", { // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).split("/")
          const s = [fdate[2],fdate[0],fdate[1]].join("-")
        return s;
    }

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = date => {
        setSelectedEndDate(date);
    }

    const postCalendar = async () => {
        await authAxios.post(`/locations/${id}/calendar/`, {
            start_date: formatDate(selectedStartDate),
            end_date: formatDate(selectedEndDate),
        })
        .then((result) => {
            console.log(result)
            if (result.status === 200) {
                setMessage(result.data["message"])
                setSuccess(true)
            } else if (result.status === 202) {
                setMessage(result.data["message"])
            }
            else {
                setIsError(true)
            }
        })
        .catch(err => {
            console.error(err) && setIsError(err);
        });
    }

    useEffect(() => {
        (async function getLocationCalendarDates() {
            let dates = await fetch(`${url}/locations/${id}/calendar/`);
            let json = await dates.json();
            setLocationCalendar(json.dates)
        })();
    }, []);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="column">
                <Grid container>
                    <h1>Calendar!</h1>
                </Grid>
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
                <Grid container alignContent="center" justify="center">
                    {message}
                </Grid>
            </Grid>
            <Grid>
                <Button variant="contained" color="primary" onClick={postCalendar}>Submit</Button>
                {/* <Button variant="contained" color="primary" onClick={() => console.log(locationCalendar)}>Log Calendar</Button> */}
            </Grid>
        </MuiPickersUtilsProvider>
    )
}
