import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import Uebungen from './Uebungen';
import axios from 'axios';

const Training = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [Ubung, setUbung] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/Ubung');
                setUbung(response.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, []);

    const handleClickUebungen = () => {
        navigate('/uebungen');
    };

    return (
        <React.Fragment>
            <div className="headPosition">
                <div className="container">
                    
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
            </div>

            <button onClick={() => setVisible(true)} className="icon-button">
                <span className="text">Add</span>
                <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>

            <Modal 
                isOpen={visible} 
                onRequestClose={() => setVisible(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <Uebungen />
                <button onClick={() => setVisible(false)} className="close-button" > </button>
            </Modal>
        </React.Fragment>
    );
};

export default Training;

