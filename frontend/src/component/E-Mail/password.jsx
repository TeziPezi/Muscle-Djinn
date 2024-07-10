import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Password() {
    const [code, setCode] = useState("");
    const [password1, setpassword1] = useState("");
    const [password2, setpassword2] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 === password2) {
            axios.post("http://localhost:8081/PasswordReset", {
                Code: code,
                Password1: password1
            })
            .then((res) => {
                if (res.data.status) {
                    navigate('/');
                } else {
                    alert(res.data.message)
                }
            })

        } else {alert('Password übereinstimmt nicht')}
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'code') setCode(value);
        if (name === 'password1') setpassword1(value);
        if (name === 'password2') setpassword2(value);
    };

    return <React.Fragment>
        <div style={{ height: "475px", width: "400px", border: "2px solid white", margin: "0 auto", marginTop: "200px", textAlign: "center" }}>
            <br />
            <span style={{ color: "white" }}><h3>Neues Password</h3></span>
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
                    </div>
                    <br />
                    <button className="Button" type="submit">Suchen</button><br />
                    <div className='register-link'>
                        <br />
                        <p><a href="/loginForm">Zurück zum Login</a></p>
                    </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
}

export default Password;