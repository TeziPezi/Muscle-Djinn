import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPopup from '../component/editPopup';
import '../styles.css';
import axios from 'axios';
import Notification from '../component/Notification';

function Settings() {
    const [auth, setAuth] = useState(false); // hier false
    const [message, setMessage] = useState('');
    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [email] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/logged`)
            .then(res => {
                if (res.data.loginValue) {
                    setAuth(true);
                    setUserID(res.data.userID);
                    setUsername(res.data.username);
                } else {
                    setAuth(false); // hier false
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/logout`)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleLoginClick = () => {
        navigate('/loginForm');
    };

    const handleRegisterClick = () => {
        navigate('/Signup');
    };

    return (
                auth ? (
                    <div className='headPosition'>
                        <div className='container'>
                        <h3 style={{ color: "white" }}>Welcome back {username}!</h3>
                        <br />
                        <button type="button" className='Button' onClick={handleEdit}>Edit Profile</button>
                        <br /><br />
                        <button type="button" className="Button" onClick={handleDelete}>Logout</button>
                        {showNotification && (
                    <Notification
                        message="Als Gast werden Daten nur temporär gespeichert"
                        onClose={() => setShowNotification(false)}
                    />
                )}
                <EditPopup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    username={username}
                    email={email}
                    userID={userID}
                />
                        </div>
                        
                    </div>
                ) : (
                    <div className="headPosition">
                        <div className="container">
                            <h2>{message}</h2>
                            <h6>As a guest, data will only be stored temporarily,<br /> and you will have limited functionality.</h6>
                            <br /><br />
                            <button type="button" className="Button" onClick={handleLoginClick}>Login</button>
                            <br /><br />
                            <button type="button" className="Button" onClick={handleRegisterClick}>Register</button>
                            <br /><br />
                        </div>
                    </div>
                )
                
    );
}

export default Settings;
