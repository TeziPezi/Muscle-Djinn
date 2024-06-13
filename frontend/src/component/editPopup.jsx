import React, { useState } from "react";
import axios from 'axios';
import '../styles.css';

const EditPopup = ({ show, handleClose, username, email }) => {
    const [formData, setFormData] = useState({
        username: username,
        email: email,
        password: ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/updateUser', formData)
            .then(res => {
                alert(res.data.message);
                handleClose();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner">
                <h2>Edit Personal Info</h2>
                <form onSubmit={handleSave}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default EditPopup;