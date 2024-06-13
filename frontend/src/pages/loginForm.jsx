import React, { useState } from 'react';
import '../styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [loginValues, setValues] = useState({
        loginUsername: '',
        loginPassword: ''
    })

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    // Senden der User Login-Daten für die Überprüfung
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/loginForm', {
            loginUsername: loginValues.loginUsername,
            loginPassword: loginValues.loginPassword
        })

            .then(res => {
                if (res.data.loginValue) {
                    navigate('/settings')

                } else {
                    alert(res.data.message)
                }
            })

            .catch(err => console.log(err));
    }

    return (
        <div className='headPosition'>
            <div className='container' style={{display: 'flex', justifyContent: 'space-around'}} >
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1><span style={{ color: "white" }}>Login</span></h1>
                        <div className='input-box'>
                            <input type="text" name="username" placeholder="Username"
                                    /*value={this.state.username}*/ onChange={e => setValues({ ...loginValues, loginUsername: e.target.value })} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" name='password' placeholder="Password"
                                    /*value={this.state.password} */ onChange={e => setValues({ ...loginValues, loginPassword: e.target.value })} required />
                            <FaLock className='icon2' />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                            <a href="/"> Forgot passwort?</a>
                        </div>

                        <button className="Button" type='submit'>Login</button>

                        <div className='register-link'>
                            <p>Don't have an account? <a href="/">Register</a></p>

                        </div>
                        {/*this.state.message && <p>{this.state.message}</p>*/}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login