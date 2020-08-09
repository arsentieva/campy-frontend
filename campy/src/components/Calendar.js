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
import Axios from 'axios';
import { CampyContext } from "../context/CampyContext";
import { ErrorNotice } from "./ErrorNotice";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function CalendarMaterialUIPickers() {
    // The first commit of Material-UI
    const { id } = useParams();
    const { currentUser, userID } = useContext(CampyContext);
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [locationCalendar, setLocationCalendar] = React.useState(undefined);
    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const formatDate = date => {
        let fdate = date.toLocaleDateString("en-US", { // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).split("/")

        // let s = [fdate.slice(0, 1)]
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
        // console.log(formatDate(selectedStartDate), "start date selected")
        // console.log(formatDate(selectedEndDate), "end date selected")
        // console.log(id, "id")

        await Axios.post(`${url}/locations/${id}/calendar/`, {

            start_date: formatDate(selectedStartDate),
            end_date: formatDate(selectedEndDate),
            location_id: id,
            user_id: userID,
        })
        .then((result) => {
            if (result.status === 200) {
                setSuccess(true)
            } else {
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
        // use direction="column" to display down
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="column">
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
            </Grid>
            <Grid>
                <Button variant="contained" color="primary" onClick={postCalendar}>Submit</Button>
                <Button variant="contained" color="primary" onClick={() => console.log(locationCalendar)}>Log Calendar</Button>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

/**
 * TODO:
 * Set up Error Message Handling for returns from backend routes
 *
 */
