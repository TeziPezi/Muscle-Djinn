import React, { useState } from 'react';
import axios from 'axios';
import '../../styles.css';

const Password = ({ show, handleClose }) => {
    const [code, setCode] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 === password2) {
            axios.post(`${process.env.REACT_APP_API_URL}/PasswordReset`, {
                Code: code,
                Password1: password1
            })
            .then((res) => {
                if (res.data.status) {
                    handleClose();
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => console.log(err));
        } else {
            alert('Passwords do not match');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'code') setCode(value);
        if (name === 'password1') setPassword1(value);
        if (name === 'password2') setPassword2(value);
    };

    return (
        <React.Fragment>
            <div className={`popup ${show ? 'show' : ''}`}>
                <div className='wrapper' style={{ backgroundColor: "#272727", maxWidth: 450, width: "100%", height: 500 }}>
                    <span style={{ color: "white" }}><h3>New Password</h3></span>
                    <div style={{ margin: "20px" }}>
                        <form onSubmit={handleSubmit}>
                            <div className='input-box'>
                                <div className='input-icon'>
                                    <input
                                        type="number"
                                        name="code"
                                        placeholder='Enter Code'
                                        className='form-control'
                                        value={code}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <br />
                                <div className='input-icon'>
                                    <input
                                        type="password"
                                        name="password1"
                                        placeholder='Password'
                                        className='form-control'
                                        value={password1}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <br />
                                <div className='input-icon'>
                                    <input
                                        type="password"
                                        name="password2"
                                        placeholder='Repeat Password'
                                        className='form-control'
                                        value={password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <br />
                                <button className="Button" type="submit">Submit</button>
                                <div className='register-link'>
                                    <p><button type="button" onClick={handleClose} style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer', width: "150px", height: "20px", boxShadow: "0 0", color: 'white'}}>back to Login</button></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Password;