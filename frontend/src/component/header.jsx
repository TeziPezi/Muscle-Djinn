import React, { Component } from 'react';
import Logo from '../img/logo.png'

class Header extends Component {
    state = {}
    render() {
        return <header>
            <div className="headPosition">
                <img src={Logo} alt="Logo" className="headLogo"/>
                <div className="headLine">Dein <span style={{ color: "rgb(200, 0, 0)"}}>täglicher</span> Begleiter</div>
            </div>
        </header>
    }
}

export default Header;