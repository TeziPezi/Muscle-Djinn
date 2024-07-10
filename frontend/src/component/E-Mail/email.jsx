import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EMail() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/EMailCode", {
            EMail: email
        })
        .then((res) => {
            if (res.data.status) {
                navigate('/PasswordReset');
            } else {
                alert(res.data.message)
            }
        })
 
        .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
    };

    return <React.Fragment>
        <div style={{ height: "425px", width: "400px", border: "2px solid white", margin: "0 auto", marginTop: "200px", textAlign: "center" }}>
            <br />
            <span style={{ color: "white" }}><h3>Password zurücksetzen</h3></span>
            <span style={{ color: "white" }}>Bitte geben Sie Ihre E-Mail-Adresse ein,</span><br />
            <span style={{ color: "white" }}>um einen Zurücksetzungscode zu erhalten.</span>
            <div style={{ margin: "20px" }}>
                <form onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <div className='input-icon'>
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter E-Mail'
                                className='form-control'
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br/>
                    <span style={{ color: "white" }}>Falls ein Konto mit dieser E-Mail existiert,</span><br />
                    <span style={{ color: "white" }}>Bekommen sie eine Code per E-Mail.</span><br />
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

export default EMail;
