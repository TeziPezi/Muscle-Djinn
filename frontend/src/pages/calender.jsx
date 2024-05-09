import React, { Component } from 'react';

class Calender extends Component {
    state = {} 
    render() { 
        return (
            <div>
                <div className="container">
                    <img className="logo" src="/img/logo.png" alt="Logo" />
                    <h1 className="headline">
                        <br /><br /> <br /> Dein <span className="white">täglicher</span> Trainingspartner
                    </h1>
                </div>
                <div className="mobile-navbar"> {/* Navigationsleiste nur für Smartphones */}
                    <a className="menu-link button" href="">Training</a>
                    <a className="menu-link button" href="">Calender</a>
                    <a className="menu-link button" href="">History</a>
                    <a className="menu-link button" href="">Account</a>
                </div>
            </div>
        );
    }
}
 
export default Calender;