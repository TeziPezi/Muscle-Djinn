import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const ImportPlanPopup = ({ show, handleClose, userID }) => {
    const [username, setUsername] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/searchUser`, {
                params: { username }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching user:", error);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchResults([]);
        setUsername(user.Username);
    };

    const handleImportPlans = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/importPlans`, {
                sourceUserID: selectedUser.UserID,
                targetUserID: userID
            });
            handleClose();
        } catch (error) {
            console.error("Error importing plans:", error);
        }
    };

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup-inner">
                <h2>User Name</h2>
                <form onSubmit={handleSearch} className="centered-button">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Search user..."
                        required
                    />
                    <button type="submit" className="Button">Search</button>
                </form>
                {searchResults.length > 0 && (
                    <ul className="search-results">
                        {searchResults.map((user) => (
                            <li key={user.UserID} onClick={() => handleSelectUser(user)}>
                                {user.Username}
                            </li>
                        ))}
                    </ul>
                )}
                {selectedUser && (
                    <div className="centered-button">
                        <button type="button" className="Button" onClick={handleImportPlans}>Import now</button>
                    </div>
                )}
                <div className="centered-button">
                    <button type="button" className="Button" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ImportPlanPopup;