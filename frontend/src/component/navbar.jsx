import React, { Component } from 'react';
import Logo from '../img/logo.png'

class Navbar extends Component {
    state = {  } 
    render() { 
        return <nav className="navbar fixed-bottom navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} width="" height="40" alt=""/>
          </a>
        </div>
      </nav>
    }
}
 
export default Navbar;