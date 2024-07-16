import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import Uebungen from './Uebungen';
import axios from 'axios';

function Training() {

    const [auth, setAuth] = useState(false); // hier false
    const [userID, setUserID] = useState('');
    const [visible, setVisible] = useState(false);
    const [Ubung, setUbung] = useState([]);


    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/logged`)
            .then(res => {
                if (res.data.loginValue) {
                    setAuth(true)
                    setUserID(res.data.userID)
                }
                else {
                    setAuth(false) // hier false
                }
            })
            .catch(err => console.log(err));
    }, [])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/Ubung`);
                // Filtern der Daten nach userID
                const filteredData = response.data.filter(ubung => ubung.UserID === userID);
                setUbung(filteredData);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, [userID]);  // `userID` als Abhängigkeit hinzufügen, um bei Änderungen neue Daten zu holen
    

    return (
            <div className='headPosition'>
                <div className='container'>
                    <div className='next'>
                    <button onClick={() => setVisible(true)} className="icon-button">
                        <span className="text">Add</span>
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                    </button>
                    </div>
                    <div className="table-container">
                        <h1>Alle Übungen</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Bezeichnung</th>
                                    <th>Muskelgruppe</th>
                                    <th>Beschreibung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Ubung.map((ubung) => (
                                    <tr key={ubung.bezeichnung}>
                                        <td>{ubung.bezeichnung}</td>
                                        <td>{ubung.muskelgruppe}</td>
                                        <td>{ubung.beschreibung}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    

                    <Modal
                        isOpen={visible}
                        onRequestClose={() => setVisible(false)}
                        className="modal-content"
                        overlayClassName="modal-overlay"
                    >
                        <Uebungen />
                        <button onClick={() => setVisible(false)} className="close-button" > </button>
                    </Modal>

                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>

      
)};

export default Training;

