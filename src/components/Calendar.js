import 'date-fns';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core'
import {url} from '../config';
import DateFnsUtils from '@date-io/date-fns';
import { CampyContext } from "../CampyContext";
// import { ErrorNotice } from "./ErrorNotice";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";

export default function CalendarMaterialUIPickers() {
    // The first commit of Material-UI
    const { id } = useParams();
    const { authAxios } = useContext(CampyContext);
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [locationCalendar, setLocationCalendar] = React.useState(undefined);
    const [message, setMessage] = React.useState(undefined)
    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const useStyles = makeStyles((theme) => ({
        stem: {
            display: "flex",
            direction: "column",
            "justify-content": "center",
            "align-items": "center",
            width: "100%",
        },
        leaf: {
            width: "250px",
        }
    }));

    const formatDate = date => {
        let fdate = date.toLocaleDateString("en-US", { // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).split("/")
        const s = [fdate[2], fdate[0], fdate[1]].join("-")
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

    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.stem}>
                    <h1>Calendar</h1>
                </Grid>
                <Grid item xs={12} className={classes.stem}>
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
                </Grid>
                <Grid item xs={12} className={classes.stem}>
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
                <Grid item xs={12} className={classes.stem} >
                    {message}
                </Grid>
                <Grid item xs={12} className={classes.stem}>
                    <Button variant="contained" color="primary" onClick={postCalendar} className={classes.leaf}>Submit</Button>
                    {/* <Button variant="contained" color="primary" onClick={() => console.log(locationCalendar)}>Log Calendar</Button> */}
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    )
}
