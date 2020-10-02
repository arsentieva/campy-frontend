import 'react-dates/initialize';
import React, { Component, useContext } from 'react'
import { withRouter } from "react-router"
import { Button, Grid } from '@material-ui/core'
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../assets/styles/react_dates_overrides.css';
import { url } from '../config';
// import { CampyContext } from '../CampyContext';

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
  }
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
    };

    this.postCalendar = this.postCalendar.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.state.id = id;
  }
  componentDidUpdate() { /* Intentionally empty */ }

  formatDate = function (date) {
    let fdate = date.toLocaleDateString("en-US", { // you can skip the first argument
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split("/")
    const s = [fdate[2], fdate[0], fdate[1]].join("-");
    console.log(s);
    return s;
  }

  postCalendar = async function () {
    if (!this.state.authToken) this.state.message.setState("Please Sign Up or Login to schedule your stay!")
    else if (!this.state.startDate || !this.state.endDate) this.message = "Oops, you entered an invalid date!"
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
            this.componentDidUpdate()
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
          <Grid item xs={7}>
            <h1>Calendar</h1>
          </Grid>
        <Grid item xs={8} className={classes.stem}>
          <DateRangePicker
            minimumNights={1}
            numberOfMonths={1}
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
          />
        </Grid>
        <Grid item xs={2} className={classes.stem}>
          <Button variant="contained" color="primary" onClick={this.postCalendar}>Submit</Button>
        </Grid>
        <Grid item xs={12} id="message" className={classes.stem}>
          {this.state.message}
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(NewCalendar)
