import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './monthlyCalendar.css';
import '../styles.css';

class MonthlyCalendar extends Component {
    state = {
        dateState: new Date()
    };

    changeDate = (e) => {
        this.setState({ dateState: e });
    }

    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        <div className="calendar-wrapper">
                            <Calendar 
                                value={this.state.dateState}
                                onChange={this.changeDate}
                                prevLabel="<"
                                nextLabel=">"
                                prev2Label="<<"
                                next2Label=">>"
                                formatMonthYear={(locale, date) => moment(date).format('MMMM YYYY')}
                            />
                        </div>
                        <br/>
                        <p>Selected date: <b>{moment(this.state.dateState).format('MMMM Do YYYY')}</b></p>
                        <br/><br/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MonthlyCalendar;