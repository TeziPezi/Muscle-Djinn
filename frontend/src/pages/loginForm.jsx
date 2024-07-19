import React, { useState } from 'react';
import '../styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EMail from '../component/E-Mail/email';
import PasswordReset from '../component/E-Mail/password';

function Login() {
    const [showEmailToCode, setShowEmailToCode] = useState(false);
    const [showCodeToPw, setShowCodeToPw] = useState(false);

    const [loginValues, setValues] = useState({
        loginUsername: '',
        loginPassword: ''
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    // Senden der User Login-Daten für die Überprüfung
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/loginForm`, {
            loginUsername: loginValues.loginUsername,
            loginPassword: loginValues.loginPassword
        })
            .then(res => {
                if (res.data.loginValue) {
                    navigate('/settings');
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => console.log(err));
    };

    const emailCode = () => {
        setShowEmailToCode(true); 
    };

    const CloseEmailCode = () => {
        setShowEmailToCode(false);
    };

    const EmailSwitchCode = () => {
        setShowEmailToCode(false);
        setShowCodeToPw(true);

    }

    const closeCodePW = () => {
        setShowCodeToPw(false);
    };

    return (
        <div className='headPosition'>
            <div className='container' style={{ display: 'flex', justifyContent: 'space-around' }} >
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1><span style={{ color: "white" }}>Login</span></h1>
                        <div className='input-box'>
                            <input type="text" name="username" placeholder="Username"
                             onChange={e => setValues({ ...loginValues, loginUsername: e.target.value })} required />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input type="password" name='password' placeholder="Password"
                             onChange={e => setValues({ ...loginValues, loginPassword: e.target.value })} required />
                            <FaLock className='icon2' />
                        </div>
                        <div className="remember-forgot">
                            <button type="button" onClick={emailCode} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: "150px", height: "20px", boxShadow: "0 0", color: 'white'}}>Forgot password?</button>
                        </div>

                        <button className="Button" type='submit'>Login</button>

                        <div className='register-link'>
                            <p>Don't have an account? <a href="/Signup">Register</a></p>
                        </div>
                    </form>
                </div>

                <EMail 
                    show={showEmailToCode}
                    handleNext={EmailSwitchCode}
                    handleClose={CloseEmailCode}
                />

                <PasswordReset 
                    show={showCodeToPw}
                    handleClose={closeCodePW}
                />
            </div>
        </div>     
    );
}

export default Login;