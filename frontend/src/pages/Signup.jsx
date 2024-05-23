import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';

const Signup = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleClickLogin = () => {
        navigate('/loginForm');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://45.81.234.159/pvi?v=1', userData);
            alert('User created successfully!');
        } catch (error) {
            console.error('Error creating user:', error);
            
        }
    };

    const { username, email, password } = userData;

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
                                    value={username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        


                        <div className='input-box'>
                            
                            <div className='input-icon'>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Enter Email'
                                    className='form-control'
                                    value={email}
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
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        

                        <button type="submit" >Sign up</button>
                        
                        <div>

                         <p style={{ fontSize: "14px" }}>already have an account? <a href = '/' className="Loginlink" onClick={handleClickLogin} >Login</a> </p>
                        </div>





                        


                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signup;
