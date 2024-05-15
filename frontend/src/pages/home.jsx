import React, { Component } from 'react';
import '../styles.css';


class Home extends Component {
    handleLoginRedirect = () => {
        window.location.href = './loginForm'; // Ändere die URL zur gewünschten Login-Seite
    };
    handleRegisterRedirect = () => {
        window.location.href = 'https://www.example.com/register'; // Ändere die URL zur gewünschten Register-Seite
    };

    render() {
        return (
            <React.Fragment>
                <div className="headPosition">
                    <div className="container">
                        The Homepage.<br/><br/>
                        <button type="button" className="Button" onClick={this.handleLoginRedirect}>Login</button>
                        <br/><br/>
                        <button type="button" className="Button" onClick={this.handleRegisterRedirect}>Register</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
