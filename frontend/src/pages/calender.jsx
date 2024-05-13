import React, { Component } from 'react';
import Header from '../component/header';
import Navbar from '../component/navbar';
import '../styles.css';

class Calender extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="headPosition">
                    <div className="container">
                        Das ist die Calenderpage.
                    </div>
                </div>
                <Navbar />
            </React.Fragment>
        );
    }
}

export default Calender;