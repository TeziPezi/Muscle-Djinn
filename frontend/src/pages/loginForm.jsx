import React, { useState } from 'react';
import '../styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [values, setValues] = useState ({
        name: '',
        password: ''
    })

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit =  (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/loginForm', {
            name: values.name,
            password: values.password
        })

        .then(res => {
            if(res.data.loginValue){
                navigate('/training')
                alert(res.data.token)
            } else {
                alert(res.data.message)
            }
        })

        .catch(err => console.log(err+" hier vielleicht"));
    }

    return (
        <div className='container' style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className='wrapper'>
                        <form onSubmit={handleSubmit}>
                            <h1><span style={{ color: "white" }}>Login</span></h1>
                            <div className='input-box'>
                                <input type="text" name="username" placeholder="Username"
                                /*value={this.state.username}*/ onChange={e => setValues({...values, name: e.target.value})} required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="password" name='password' placeholder="Password" 
                                /*value={this.state.password} */ onChange={e => setValues({...values, password: e.target.value})} required />
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
                            {/*this.state.message && <p>{this.state.message}</p>*/}
                        </form>
                    </div>
                </div>
    )
}

export default Login