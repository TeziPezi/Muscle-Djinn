import React, { Component } from 'react';
import Calendar from 'react-calendar'
import '../styles.css';


class MonthlyCalendar extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        <br/><br/>
                        <Calendar/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MonthlyCalendar;