import React, { useState, useContext, useEffect } from 'react'
import DateRangePicker from 'react-daterange-picker';
import { CampyContext } from "../CampyContext";
import { useParams } from 'react-router-dom';
import 'react-daterange-picker/dist/css/react-calendar.css'; // For some basic styling. (OPTIONAL)
import { url } from '../config';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default function Scheduler() {

  const [dates, setDates] = useState(null);
  const { id } = useParams();
  const { authToken } = useContext(CampyContext);
  const [message, setMessage] = useState(undefined);
  const [dateStates, setDateStates] = useState(null);

  const stateDefinitions = {
    available: {
      color: null,
      label: 'Available',
    },
    enquire: {
      color: '#ffd200',
      label: 'Enquire',
    },
    unavailable: {
      selectable: false,
      color: '#78818b',
      label: 'Unavailable',
    },
  };

  const dateRanges = [
    {
      state: 'unavailable',
      range: moment.range(
        moment().add(3, 'weeks'),
        moment().add(3, 'weeks').add(5, 'days')
      ),
    },
  ];

  const useStyles = makeStyles(() => ({
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

  const postCalendar = async () => {
    await fetch(`${url}/locations/${id}/calendar/`, {
      method: "POST",
      body: JSON.stringify({
        start_date: formatDate(dates.start["_d"]),
        end_date: formatDate(dates.end["_d"]),
      }),
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
    })
      .then(async (result) => {
        result = await result.json()
        if (result.status === 200) {
          setMessage(result["message"])
        } else if (result.status === 202) {
          setMessage(result["message"])
        }
        else {
          setMessage(result["message"])
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    (async function getDateStates() {
      let dates = await fetch(`${url}/locations/${id}/calendar/`);
      setDateStates(dates);
      console.log(await dates.json());
    })();
  }, []);


  const onSelect = dates => setDates(dates);
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <DateRangePicker
          onSelect={onSelect}
          value={dates}
          locale={"en"}
          numberOfCalendars={1}
          selectionType="range"
          singleDateRange={true}
          stateDefinitions={stateDefinitions}
          dateStates={dateRanges}
        />
      </Grid>
      <Grid item xs={12} className={classes.stem}>
        <Button variant="contained" color="primary" onClick={postCalendar} className={classes.leaf}>Submit</Button>
      </Grid>
      <Grid item xs={12} className={classes.stem} >
        {message}
      </Grid>
      <button onClick={() => console.log(dates)}>Log Dates</button>
    </Grid>
  )
}
