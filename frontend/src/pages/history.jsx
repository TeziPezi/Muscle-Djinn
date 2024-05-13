import React, { Component } from 'react';
import Header from '../component/header';
import Navbar from '../component/navbar';
import '../styles.css';

class History extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="headPosition">
                    <div className="container">
                        Das ist die Historypage.
                    </div>
                </div>
                <Navbar />
            </React.Fragment>
        );
    }
}

export default History;