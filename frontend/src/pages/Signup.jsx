
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { FaUser, FaLock } from "react-icons/fa";
import '../styles.css';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://45.81.234.159/pvi?v=1', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            alert('User created successfully!');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error');
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { username, email, password } = this.state;

        return (
            <React.Fragment>
                <div className='container' style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className='wrapper'>   
                        <form onSubmit={this.handleSubmit}>
                            <h1><span style={{ color: "white" }}>Signup</span></h1>
                            
                            <div className='input-box'>
                                <label htmlFor="username">Username</label>
                                <div className='input-icon'>
                                    
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder='Enter username'
                                        className='form-control'
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className='input-box'>
                                <label htmlFor="email">Email</label>
                                <div className='input-icon'>
                                    
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Enter Email'
                                        className='form-control'
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className='input-box'>
                                <label htmlFor="password">Password</label>
                                <div className='input-icon'>
                                    
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='Enter Password'
                                        className='form-control'
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <button type="submit" className='btn btn-success'>Sign up</button>
                            
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Signup;
