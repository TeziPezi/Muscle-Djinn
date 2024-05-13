import React, { Component } from 'react';
import Header from '../component/header';
import Navbar from '../component/navbar';
import '../styles.css';

class NoPage extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
            <Header/>
            <h1 className="headline">
                Error 404: Page not found!
            </h1>
            <Navbar/>
            </React.Fragment>
        );
    }
}

export default NoPage;
