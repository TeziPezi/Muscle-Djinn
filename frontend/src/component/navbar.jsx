import React, { Component } from 'react';

class Navbar extends Component {
    state = {  } 
    render() { 
        return <nav className="navbar">
            <a href="" className="site-title">Muscel Djinn</a>
            <ul>
                <li><a href="http://localhost:3000/">Start</a></li>
            </ul>
        </nav>
    }
}
 
export default Navbar;