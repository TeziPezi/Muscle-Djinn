import React, { Component } from 'react';
import '../styles.css';
import { FaUser, FaLock } from "react-icons/fa";


class Login extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className='container' style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className='wrapper'>
                        <form action="">
                            <h1><span style={{ color: "white" }}>Login</span></h1>
                            <div className='input-box'>
                                <input type="text" placeholder="Username" required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="passwort" placeholder="Passwort" required />
                                <FaLock className='icon2' />
                            </div>
                            <div className="remember-forgot">
                                <label><input type="checkbox" />Remember me</label>
                                <a href="/"> Forgot passwort?</a>
                            </div>

                            <button type='submit'>Login</button>

                            <div className='register-link'>
                                <p>Don't have an account? <a href="/">Register</a></p>

                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;