import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles.css';

const EditPopup = ({ show, handleClose, username, email, userID }) => {
    const [formData, setFormData] = useState({

        username: username,
        email: email,
        password: '',
        confirmPassword: '',
        userID: userID
    });

    useEffect(() => {
        // Setze formData erneut, falls die Props sich ändern
        setFormData({
            userID: userID,
            username: username,
            email: email,
            password: '',
            confirmPassword: ''
        });
    }, [userID, username, email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSave = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            axios.post(`${process.env.REACT_APP_API_URL}/updateUser`, formData)
                .then(res => {
                    handleClose();
                    window.location.reload();
                })
                .catch(err => console.log(err));
        } else {
            alert("Passwords do not match")
        }

    };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner">
                <h2>Edit Personal Info</h2>
                <form onSubmit={handleSave}>
                    <label>
                        Username:
                       
                    </label>
                    <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    <label>
                        Email:
                    </label>
                    <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    <label>
                        Password:
                    </label>
                    <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    <label>
                        repeat Password:
                        
                    </label>
                    <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    <div>
                        <button type="submit" className='Button'>Save</button>
                        <button type="button" className='Button' onClick={handleClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPopup;