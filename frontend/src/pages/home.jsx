import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import '../styles.css';


class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        The Homepage.<br/><br/>
                        <button type="button" className="Button"><NavLink to="/loginForm">Login</NavLink></button>
                        
                        <br/><br/>
                        <button type="button" className="Button" >Register</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
