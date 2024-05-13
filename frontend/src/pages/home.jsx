import React, { Component } from 'react';
import Header from '../component/header';
import Navbar from '../component/navbar';
import Navbar2 from '../component/navbar2';
import '../styles.css';

class Home extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="headPosition">
                    <div className="container">
                        Das ist die Homepage.
                    </div>
                </div>

                <Navbar />
            </React.Fragment>
        );
    }
}

export default Home;
