import React, { useEffect, useState } from 'react';
import EditPopup from '../component/editPopup';
import '../styles.css';
import axios from 'axios'


function Settings() {

    const [auth, setAuth] = useState(false); // hier false
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/logged')
            .then(res => {
                if (res.data.loginValue) {
                    setAuth(true)
                    setUsername(res.data.username)
                }
                else {
                    setAuth(false) // hier false
                    setMessage(res.data.Error)
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    const handleEdit = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='headPosition'>
            <div className='container'>

                {
                    auth ? (
                        <div>
                            <h3 style={{ color: "white" }}>Welcome back {username}!</h3>
                            <br></br>
                            <button type="button" className='Button' onClick={handleEdit}>Edit Profile</button>
                            <br></br>
                            <br></br>
                            <button type="button" className="Button" onClick={handleDelete}>Logout</button>
                        </div>
                    )
                        : (
                            <div >
                                <h3>{message}</h3>
                            </div>
                        )}
                <EditPopup
                    show={showPopup}
                    handleClose={handleClosePopup}
                    username={username}
                    email={email}
                />
            </div>
        </div>
    );
}

export default Settings;