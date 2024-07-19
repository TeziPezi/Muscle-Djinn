import React, { useState } from 'react';
import axios from 'axios';
import '../../styles.css';

const EMail = ({ show, handleNext, handleClose }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/EMailCode`, {
            EMail: email
        })
        .then((res) => {
            if (res.data.status) {
                handleNext();
            } else {
                alert(res.data.message);
            }
        })
        .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
    };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className='wrapper' style={{ backgroundColor: "#272727", maxWidth: 450, width: "100%", height: 500 }}>
                <span style={{ color: "white" }}><h3>Reset Password</h3></span>
                <span style={{ color: "white" }}>Please enter your email address</span><br />
                <span style={{ color: "white" }}>to receive a password reset code.</span>
                <div style={{ margin: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className='input-box'>
                            <div className='input-icon'>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Enter Email'
                                    className='form-control'
                                    value={email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <span style={{ color: "white" }}>If an account with this email exists,</span><br />
                        <span style={{ color: "white" }}>you will receive a code via email.</span><br />
                        <br />
                        <button className="Button" type="submit">Search</button><br />
                        <div className='register-link'>
                            <p><button type="button" onClick={handleClose} style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer', width: "150px", height: "20px", boxShadow: "0 0", color: 'white'}}>back to Login</button></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EMail;