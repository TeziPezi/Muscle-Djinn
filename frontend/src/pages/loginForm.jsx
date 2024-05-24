import React, { Component } from 'react';
import '../styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


class Login extends Component {
    state = {
        username: '',
        password: '',
        message: '',

    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        axios.post('http://localhost:8081/loginForm', {username, password})
        //.then(res => console.log(res.message))

        .then((res) => {
            
            if(res.data.loginValue){
                this.props.navigate('/training')
                
            }
            else(
                
                this.setState({ message: res.data.message }, () =>
                {
 
                })
            )

        })

        .catch(err => console.log(err));

    };

    render() {
        return (
            <React.Fragment>
                <div className='container' style={{display: 'flex', justifyContent: 'space-around'}}>
                    <div className='wrapper'>
                        <form onSubmit={this.handleSubmit}>
                            <h1><span style={{ color: "white" }}>Login</span></h1>
                            <div className='input-box'>
                                <input type="text" name="username" placeholder="Username"
                                value={this.state.username} onChange={this.handleInputChange} required />
                                <FaUser className='icon' />
                            </div>
                            <div className='input-box'>
                                <input type="password" name='password' placeholder="Password" 
                                value={this.state.password} onChange={this.handleInputChange} required />
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
                            {this.state.message && <p>{this.state.message}</p>}
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const LoginWithNavigate = (props) => {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate}  />
};

export default LoginWithNavigate;