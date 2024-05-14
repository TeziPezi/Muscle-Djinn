import React, { Component } from 'react';
import '../styles.css';


class NoPage extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
            <h1 className="headline">
                Error 404: Page not found!
            </h1>
            </React.Fragment>
        );
    }
}

export default NoPage;
