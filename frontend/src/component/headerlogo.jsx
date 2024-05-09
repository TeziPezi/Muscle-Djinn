import React, { Component } from 'react';
import Logo from '../img/logo.png'

class HeaderLogo extends Component {
    state = {}
    render() {
        return <header className="header">
            <div className="headerlogo">
                <img src={Logo} alt="Logo" className="logo"/>
            </div>
        </header>
    }
}

export default HeaderLogo;