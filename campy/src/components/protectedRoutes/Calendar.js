import React, { useState, Component } from "react";
import Calendar from "react-calendar";
// import DatePicker from 'material-ui/DatePicker';

// const useStyles = makeStyles((theme) => ({
//     appBar: {
//       background: "#39A5A7",
//       bottom: 0,
//       top: "92%",
//       color: "#22577A",
//     },
//   }));


export default class CalendarApp extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        const { value } = this.state;
        return (
            <div className="Main__container">
                <header>
                    <h1>Schedule a Stay!</h1>
                </header>
                <div className="Calendar__container">
                    <main>
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                        />
                    </main>
                </div>
            </div>
        );
    }
}
