import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';

const Signup = () => {
    const [usernameReg, setUsernameReg] = useState("");
    const [E_mailReg, setE_mailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const navigate = useNavigate();

    const register = () => {
        axios.post("http://localhost:8081/register", {
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
    };

    const handleClickLogin = () => {
        navigate('/loginForm');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        register();
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
                                />
                            </div>
                        </div>
                        
                        <div className='input-box'>
                            <div className='input-icon'>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Enter Password'
                                    className='form-control'
                                    value={passwordReg}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <button type="submit">Sign up</button>
                        
                        <div>
                            <p style={{ fontSize: "14px" }}>Already have an account? <a onClick={handleClickLogin}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signup;
