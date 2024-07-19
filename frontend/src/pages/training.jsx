import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import Uebungen from './Uebungen';
import axios from 'axios';

function Training() {
    const [auth, setAuth] = useState(false);
    const [userID, setUserID] = useState('');
    const [visible, setVisible] = useState(false);
    const [Ubung, setUbung] = useState([]);
    const [cachedExercises, setCachedExercises] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/logged`)
            .then(res => {
                if (res.data.loginValue) {
                    setAuth(true);
                    setUserID(res.data.userID);
                } else {
                    setAuth(false);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const deleteUbung = async (id) => {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/loeschen_ubung/${id}`);
            setUbung(Ubung.filter(ubung => ubung.UbungID !== id));
        } catch (error) {
            console.error('Error deleting the Übung', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/Ubung`);
                const filteredData = response.data.filter(ubung => ubung.UserID === userID);
                setUbung(filteredData);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, [userID]);

    useEffect(() => {
        const fetchCachedExercises = () => {
            const cachedData = localStorage.getItem('cachedExercises');
            if (cachedData) {
                setCachedExercises(JSON.parse(cachedData));
            } else {
                setCachedExercises([]);
            }
        };
        fetchCachedExercises();
    }, []);

    const handleWeightChange = (index, value) => {
        const updatedExercises = [...cachedExercises];
        updatedExercises[index].Weight = value;
        setCachedExercises(updatedExercises);
        localStorage.setItem('cachedExercises', JSON.stringify(updatedExercises));
    };

    return (


        auth ? (

            <div className='headPosition'>
                <div className='container'>
                    <div className='next'>
                        <button onClick={() => setVisible(true)} className="icon-button">
                            <span className="text">Add</span>
                            <FontAwesomeIcon icon={faPlus} className="icon" />
                        </button>
                    </div>


                    <div className="table-con">
                        <h1>My Exercises</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th style={{ width: "10%" }}>Del</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Ubung.map((ubung) => (
                                    <tr key={ubung.UbungID}>
                                        <td>{ubung.bezeichnung}</td>
                                        <td>
                                            <button style={{ width: "38px" }} onClick={() => deleteUbung(ubung.UbungID)} className="icon-button">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        </td>
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
                        <button onClick={() => setVisible(false)} className="close-button"></button>
                    </Modal>
                    <br /><br /><br /><br />
                </div>
            </div>





        ) : (
            <div className='headPosition'>
                <div className='container'>
                <div className='next'>
                        <button onClick={() => setVisible(true)} className="icon-button">
                            <span className="text">Add</span>
                            <FontAwesomeIcon icon={faPlus} className="icon" />
                        </button>
                    </div>

                    <h1>Gast Exercises</h1>
                    {cachedExercises.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cachedExercises.map((exercise, index) => (
                                    <tr key={index}>
                                        <td>{exercise.bezeichnung}</td>
                                        
                                        <td>
                                            <input
                                                type="text"
                                                value={exercise.Weight}
                                                onChange={(e) => handleWeightChange(index, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No cached exercises available.</p>
                    )}

                    <br />
                    <Modal
                        isOpen={visible}
                        onRequestClose={() => setVisible(false)}
                        className="modal-content"
                        overlayClassName="modal-overlay"
                    >
                        <Uebungen />
                        <button onClick={() => setVisible(false)} className="close-button"></button>
                    </Modal>
                    <br /><br /><br /><br />

                </div>
            </div>






        ));
    
}






export default Training;
