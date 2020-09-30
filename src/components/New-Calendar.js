import 'react-dates/initialize';
import React, { Component, useContext } from 'react'
import { withRouter } from "react-router"
import { Button } from '@material-ui/core'
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../assets/styles/react_dates_overrides.css';
import { url } from '../config';
import {CampyContext} from '../CampyContext';

class NewCalendar extends Component {
  static context = CampyContext
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      authToken: null,
      startDate: null,
      endDate: null,
      focusedInput: null,
      message: undefined,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.postCalendar = this.postCalendar.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const {authToken} = this.context;

    this.state.id = id;
    this.state.authToken = authToken;
  }

  formatDate = function (date) {
    let fdate = date.toLocaleDateString("en-US", { // you can skip the first argument
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split("/")
    const s = [fdate[2], fdate[0], fdate[1]].join("-")
    return s;
  }

  postCalendar = async function () {
    console.log("startDate",this.startDate);
    console.log("endDate",this.endDate)
    await fetch(`${url}/locations/${this.state.id}/calendar/`, {
      method: "POST",
      body: JSON.stringify({
        start_date: this.formatDate(this.startDate),
        end_date: this.formatDate(this.endDate),
      }),
      headers:
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.authToken}`
      },
    })
      .then(async (result) => {
        result = await result.json()
        if (result.status === 200) {
          this.message = result["message"];
        } else if (result.status === 202) {
          this.message = result["message"]
        }
        else {
          this.message = result["message"]
        }
      })
      .catch(err => {
        console.error(err);
      });
  }


  onDatesChange({ startDate, endDate }) {
    const { daysViolatingMinNightsCanBeClicked, minimumNights } = this.props;
    let doesNotMeetMinNights = false;
    if (daysViolatingMinNightsCanBeClicked && startDate && endDate) {
      const dayDiff = endDate.diff(startDate.clone().startOf('day').hour(12), 'days');
      doesNotMeetMinNights = dayDiff < minimumNights && dayDiff >= 0;
    }
    this.setState({
      startDate,
      endDate: doesNotMeetMinNights ? null : endDate,
      errorMessage: doesNotMeetMinNights
        ? 'That day does not meet the minimum nights requirement'
        : null,
    });
  }

  onFocusChange(focusedInput) {
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  }

  render() {
    return (
      <>
        <DateRangePicker
          minimumNights={1}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={this.focusedInput}
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
        <Button onClick={this.postCalendar}>Schedule</Button>
      </>
    )
  }
}

export default withRouter(NewCalendar)
