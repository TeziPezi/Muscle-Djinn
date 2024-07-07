import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';

const Signup = () => {
    const [usernameReg, setUsernameReg] = useState("");
    const [E_mailReg, setE_mailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [confirmPasswordReg, setConfirmPasswordReg] = useState(""); 
    const [passwordsMatch, setPasswordsMatch] = useState(true); 
    const [showPassword, setShowPassword] = useState(false); 

    const navigate = useNavigate();

    const register = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/register`, {
            Username: usernameReg,
            E_mail: E_mailReg,
            Password: passwordReg
        }).then((response) => {
            console.log(response);
        }).catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsernameReg(value);
        if (name === 'E_mail') setE_mailReg(value);
        if (name === 'password') setPasswordReg(value);
        if (name === 'confirmPassword') setConfirmPasswordReg(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordReg !== confirmPasswordReg) {
            setPasswordsMatch(false);
            return;
        }
        setPasswordsMatch(true);
        register();
        navigate('/')
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <React.Fragment>
            <div className='container' style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1><span style={{ color: "white" }}>Signup</span></h1>

                        <div className='input-box'>
                            <div className='input-icon'>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder='Enter username'
                                    className='form-control'
                                    value={usernameReg}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='input-box'>
                            <div className='input-icon'>
                                <input
                                    type="email"
                                    name="E_mail"
                                    placeholder='Enter E-mail'
                                    className='form-control'
                                    value={E_mailReg}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className='input-box'>
                            <div className='input-icon' style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder='Enter Password'
                                    className='form-control'
                                    value={passwordReg}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    onClick={toggleShowPassword}
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: 10,
                                        cursor: 'pointer',
                                        color: '#aaa'
                                    }}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>
                        
                        <div className='input-box'>
                            <div className='input-icon' style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                    className='form-control'
                                    value={confirmPasswordReg}
                                    onChange={handleChange}
                                    required
                                />
                                <span
                                    onClick={toggleShowPassword}
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: 10,
                                        cursor: 'pointer',
                                        color: '#aaa'
                                    }}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>
                        </div>

                        {!passwordsMatch && (
                            <p style={{ color: 'red' }}>Passwords do not match!</p>
                        )}
                        
                        <button className="Button" type="submit">Sign up</button>
                        
                        <div className='register-link'>
                            <p>Already have an account? <a href="/loginForm">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signup;
