import React, { Component } from 'react';
import Logo from '../logo.png'

class Header extends Component {
    state = {}
    render() {
        return <header>
            <div className="headPosition">
                <img src={Logo} alt="Logo" className="headLogo"/>
                <div className="headLine">Your <span style={{ color: "rgb(200, 0, 0)"}}>daily</span> companion.</div>
            </div>
        </header>
    }
}

export default Header;