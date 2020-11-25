import 'react-dates/initialize';
import React, { Component } from 'react'
import { withRouter } from "react-router"
import { Button, Grid } from '@material-ui/core'
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../assets/styles/react_dates_overrides.css';
import { url } from '../config';

const classes = () => ({
  stem: {
    display: "flex",
    direction: "column",
    "justify-content": "center",
    "align-items": "center",
    width: "100%",
  },
  leaf: {
    width: "250px",
  },
  button: {
    marginTop: "18.76px",
  },
});

class NewCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      authToken: props.authToken ? props.authToken : null,
      startDate: null,
      endDate: null,
      focusedInput: null,
      message: undefined,
      reservations: [],
      unavailable: [],
    };

    this.postCalendar = this.postCalendar.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.isDayBlocked = this.isDayBlocked.bind(this);
  }

  getUnavailableDates = function () {
    let reservations = this.state.reservations;
    let unavailability = []
    reservations.forEach(booking => {
      let start = new Date(booking.start_date.split('\"').join(''));
      let end = new Date(booking.end_date.split('\"').join(''));
      if (start === end) {
        unavailability.push(new Date(this.formatDate(start)));
      }
      else {
        let item = start;
        while (item <= end) {
          unavailability.push(new Date(item));
          item.setDate(item.getDate() + 1);
        }
      }
    })
    this.setState({ unavailable: unavailability })
  }

  getCalendarDates = async function () {
    try {
      await fetch(`${url}/locations/${this.state.id}/calendar/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(async result => {
          result = await result.json();
          let dates = result.dates;
          let relevant = dates.filter(element => {
            let n = element.end_date.split("\"").join('')   // there's an extra set of quotes for some reason, I'm removing them
            let now = new Date(); // used to get today's date, in the database, it will be floored to the day's beginning
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            now.setMilliseconds(0);
            if (new Date(n) >= now) return element;
          });
          this.setState({ reservations: relevant });
        })
    } catch (err) {
      console.error(err);
    }
  }

  isDayBlocked(day) {
    // date to date comparison was not working for some reason, so I am converting these days to strings
    day._d.setHours(0)
    day = day._d
    let badDates = this.state.unavailable;
    badDates = badDates.map(date => String(date)) // convert the badDate array into Strings
    if (badDates.includes(String(day))) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.state.id = id;
    this.getCalendarDates().then(() => {
      this.getUnavailableDates();
    })
  }

  componentDidUpdate() { /* Intentionally Empty */ }

  formatDate = function (date) {
    let fdate = date.toLocaleDateString("en-US", { // you can skip the first argument
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split("/")
    const s = [fdate[2], fdate[0], fdate[1]].join("-");
    return s;
  }

  postCalendar = async function () {
    if (!this.state.authToken) this.setState({ message: "Please Sign Up or Login to schedule your stay!" })
    else if (!this.state.startDate || !this.state.endDate) this.setState({ message: "Oops, you entered an invalid date!" })
    else {
      try {
        await fetch(`${url}/locations/${this.state.id}/calendar/`, {
          method: "POST",
          body: JSON.stringify({
            start_date: this.formatDate(this.state.startDate._d),
            end_date: this.formatDate(this.state.endDate._d),
          }),
          headers:
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.state.authToken}`
          },
        })
          .then(async (result) => {
            result = await result.json()
            console.log(result["message"]);
            if (result.status === 200) {
              this.setState({ message: result["message"] });
            } else if (result.status === 202) {
              this.setState({ message: result["message"] })
            }
            else {
              this.setState({ message: result["message"] })
            }
            this.componentDidMount();
            this.componentDidUpdate();
          })
          .catch(err => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    return (
      <Grid container spacing={1} alignItems="center" justify="center">
        <Grid container justify="center">
          <h1>Calendar</h1>
        </Grid>
        <Grid item xs={8} className={classes.stem}>
          <DateRangePicker
            minimumNights={0} // allow Single Day entries
            numberOfMonths={1} // show only one calendar
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
            onFocusChange={this.onFocusChange}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            showClearDates={true}
            isDayBlocked={this.isDayBlocked}
            startDatePlaceholderText={"First Night"}
            endDatePlaceholderText={"Last Night"}
          />
        </Grid>
        <Grid container justify="center">
          <Grid item xs={2} className={classes.stem, classes.button}>
            <Button variant="contained" color="primary" onClick={this.postCalendar}>Submit</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} id="message" className={classes.stem}>
          {this.state.message}
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(NewCalendar)
