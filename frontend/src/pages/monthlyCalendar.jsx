import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './monthlyCalendar.css';
import '../styles.css';
import axios from 'axios';

class MonthlyCalendar extends Component {
    state = {
        dateState: new Date(),
        trainingDates: [],
        selectedTraining: ''
    };

    componentDidMount() {
        this.fetchTrainingDates();
    }

    fetchTrainingDates = async () => {
        try {
            const response = await axios.get('http://localhost:8081/trainingDates', { withCredentials: true });
            const trainingDates = response.data.map(entry => new Date(entry.Datum).toISOString().split('T')[0]);  
            this.setState({ trainingDates });
        } catch (error) {
            console.error('Error retrieving training data:', error);
        }
    }

    fetchTrainingByDate = async (date) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await axios.get('http://localhost:8081/trainingByDate', {
                params: { date: formattedDate },
                withCredentials: true
            });
            this.setState({ selectedTraining: response.data.training });
        } catch (error) {
            console.error('Error retrieving training for the date:', error);
        }
    }

    changeDate = (e) => {
        this.setState({ dateState: e }, () => {
            this.fetchTrainingByDate(e);
        });
    }

    renderTileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            const hasTraining = this.state.trainingDates.includes(dateString);
            return hasTraining ? <div className="training-indicator"></div> : null;
        }
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
                                tileContent={this.renderTileContent}
                            />
                        </div>
                        <br/>
                        <p>Selected date: <b>{moment(this.state.dateState).format('MMMM Do YYYY')}</b></p>
                        <p>Training was: <b>{this.state.selectedTraining}</b></p>
                        <br/><br/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MonthlyCalendar;